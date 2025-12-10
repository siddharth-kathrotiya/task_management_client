import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Chip, Button } from "@mui/material";
import { getDeadlineColor } from "./KanbanBoardComponent"; // reuse your existing functions
import { changeTaskStatus, getRecommendedTask } from "../lib/taskService";
import Loader from "./Loader";

const Sidebar = ({ setStatus, status }) => {
  const [loading, setLoading] = useState(false);
  const [recommendedTask, setRecommendedTask] = useState([]);

  const onStartTask = async (taskId) => {
    setLoading(true);
    await changeTaskStatus({ taskId, status: "in-progress" });
    setStatus(!status);
    setLoading(false);
  };

  const getRecommendedTaskData = async () => {
    try {
      setLoading(true);
      const response = await getRecommendedTask();
      if (response) {
        setRecommendedTask(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRecommendedTaskData();
  }, [status]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-72 bg-gray-50 p-4 rounded-lg shadow-lg">
      <Typography variant="h5" className="font-bold mb-4">
        Recommended Tasks
      </Typography>

      {recommendedTask.map((task) => {
        const { title, priority, deadline, dependencies, reason, _id } = task;

        return (
          <Card className="shadow-md mb-4" key={_id}>
            <CardContent>
              <Typography variant="h6">{title}</Typography>

              <div className="flex items-center gap-2 my-2">
                <Chip
                  label={`Priority ${
                    priority === 5 ? "high" : priority === 4 ? "medium" : "low"
                  }`}
                  sx={{
                    backgroundColor:
                      priority === 5
                        ? "red"
                        : priority === 4
                        ? "yellow"
                        : "green",
                    color: priority === 4 ? "black" : "white",
                  }}
                  size="small"
                />
              </div>

              <Typography
                variant="body2"
                className={getDeadlineColor(deadline)}
              >
                Deadline:{" "}
                {new Date(deadline).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </Typography>

              {reason && (
                <Typography variant="body2" className="text-gray-600 mt-2">
                  Reason: {reason}
                </Typography>
              )}

              {dependencies && dependencies.length > 0 && (
                <div className="mt-2">
                  <Typography variant="subtitle2" className="mb-1">
                    Dependencies:
                  </Typography>
                  <ul className="list-disc list-inside text-gray-500 text-sm mb-2">
                    {dependencies.map((dep) => (
                      <li key={dep.id}>{dep.title}</li>
                    ))}
                  </ul>
                </div>
              )}

              <Button
                variant="contained"
                color="primary"
                className="mt-4"
                fullWidth
                onClick={() => onStartTask(_id)}
              >
                Start Task
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default Sidebar;
