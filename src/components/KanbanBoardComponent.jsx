import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
  Card,
  CardContent,
  Chip,
  Typography,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import { getTasks, changeTaskStatus } from "../lib/taskService";
import Loader from "./Loader";

export const priorityColors = {
  high: "bg-red-600",
  medium: "bg-yellow-400 text-black",
  low: "bg-green-500",
};

export const getDeadlineColor = (deadline) => {
  const now = new Date();
  const due = new Date(deadline);
  const diff = due - now;

  if (diff < 0) return "text-red-600 font-semibold";
  if (diff < 48 * 60 * 60 * 1000) return "text-yellow-600 font-semibold";
  return "text-green-600";
};

const KanbanBoard = () => {
  const [columns, setColumns] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });
  const [loading, setLoading] = useState(false);

  const getTasksData = async () => {
    setLoading(true);
    try {
      const response = await getTasks();
      if (response) {
        const tasks = response.data.map((task) => ({
          id: task._id,
          title: task.title,
          priority:
            task.priority === 5
              ? "high"
              : task.priority === 4
              ? "medium"
              : "low",
          deadline: task.deadline,
          estimate: task.estimatedTime,
          tags: task.tags,
          status: task.status,
        }));

        setColumns({
          todo: tasks.filter((t) => t.status === "pending"),
          inProgress: tasks.filter((t) => t.status === "in-progress"),
          done: tasks.filter((t) => t.status === "completed"),
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTasksData();
  }, []);

  const [filters, setFilters] = useState({
    priority: "",
    status: "",
    tag: "",
    deadline: "",
  });

  const handleFilterChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const applyFilters = (tasks, columnKey) => {
    return tasks.filter((task) => {
      if (filters.status && filters.status !== columnKey) return false;
      if (filters.priority && task.priority !== filters.priority) return false;
      if (filters.tag && !task.tags.includes(filters.tag)) return false;
      if (
        filters.deadline &&
        new Date(task.deadline) < new Date(filters.deadline)
      )
        return false;
      return true;
    });
  };

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;

    const sourceItems = [...columns[sourceCol]];
    const destItems = [...columns[destCol]];

    const [movedItem] = sourceItems.splice(source.index, 1);

    if (sourceCol === destCol) {
      sourceItems.splice(destination.index, 0, movedItem);
      setColumns((prev) => ({ ...prev, [sourceCol]: sourceItems }));
    } else {
      destItems.splice(destination.index, 0, movedItem);
      setColumns((prev) => ({
        ...prev,
        [sourceCol]: sourceItems,
        [destCol]: destItems,
      }));
      const statusMap = {
        todo: "pending",
        inProgress: "in-progress",
        done: "completed",
      };

      const newStatus = statusMap[destCol];
      setLoading(true);
      await changeTaskStatus({ taskId: draggableId, status: newStatus });
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-4">
        <TextField
          select
          label="Priority"
          name="priority"
          value={filters.priority}
          onChange={handleFilterChange}
          size="small"
          className="flex-1 max-w-[100px]"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="high">High</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="low">Low</MenuItem>
        </TextField>

        <TextField
          select
          label="Status"
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          size="small"
          className="flex-1 max-w-[100px]"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="todo">To Do</MenuItem>
          <MenuItem value="inProgress">In Progress</MenuItem>
          <MenuItem value="done">Done</MenuItem>
        </TextField>

        <TextField
          label="Tag"
          name="tag"
          value={filters.tag}
          onChange={handleFilterChange}
          size="small"
        />

        <TextField
          label="Deadline"
          type="date"
          name="deadline"
          value={filters.deadline}
          onChange={handleFilterChange}
          InputLabelProps={{ shrink: true }}
          size="small"
        />

        <Button
          variant="outlined"
          onClick={() =>
            setFilters({
              priority: "",
              status: "",
              tag: "",
              deadline: "",
            })
          }
        >
          Reset
        </Button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-3 gap-4">
          {[
            { key: "todo", label: "To Do" },
            { key: "inProgress", label: "In Progress" },
            { key: "done", label: "Done" },
          ].map((col) => (
            <div key={col.key} className="bg-gray-100 rounded-lg p-4 shadow">
              <h2 className="font-bold text-xl mb-3">{col.label}</h2>

              <Droppable droppableId={col.key}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="min-h-[300px] space-y-3"
                  >
                    {applyFilters(columns[col.key], col.key).map(
                      (task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Card className="shadow-md">
                                <CardContent>
                                  <Typography variant="h6">
                                    {task.title}
                                  </Typography>

                                  <div className="flex items-center gap-2 my-2">
                                    <Chip
                                      label={`Priority ${task.priority}`}
                                      sx={{
                                        backgroundColor:
                                          task.priority === "high"
                                            ? "red"
                                            : task.priority === "medium"
                                            ? "yellow"
                                            : "green",
                                        color:
                                          task.priority === "medium"
                                            ? "black"
                                            : "white",
                                      }}
                                      size="small"
                                    />
                                  </div>

                                  <div className="flex gap-1 flex-wrap mb-2">
                                    {task.tags.map((tag) => (
                                      <Chip
                                        key={tag}
                                        label={tag}
                                        size="small"
                                        variant="outlined"
                                      />
                                    ))}
                                  </div>

                                  <Typography
                                    variant="body2"
                                    className={getDeadlineColor(task.deadline)}
                                  >
                                    Deadline:{" "}
                                    {new Date(task.deadline).toLocaleDateString(
                                      "en-US",
                                      {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                      }
                                    )}
                                  </Typography>

                                  <Typography
                                    variant="body2"
                                    className="text-gray-500"
                                  >
                                    Estimate: {task.estimate} min
                                  </Typography>
                                </CardContent>
                              </Card>
                            </div>
                          )}
                        </Draggable>
                      )
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
