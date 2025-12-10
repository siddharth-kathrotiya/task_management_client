import React from "react";
import { Button, TextField, MenuItem, Autocomplete, Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const NewTaskFormComponent = ({ setOpenForm }) => {
  const taskSchemaValidation = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    priority: Yup.number()
      .min(1, "Priority must be at least 1")
      .max(5, "Priority cannot exceed 5")
      .required("Priority is required"),
    dependencies: Yup.array(),
    deadline: Yup.date().required("Deadline is required").nullable(),
    estimatedTime: Yup.number()
      .min(0, "Estimated time must be positive")
      .required("Estimated time is required"),
    status: Yup.string()
      .oneOf(["pending", "in-progress", "completed"])
      .required(),
    tags: Yup.array(),
  });

  return (
    <div>
      <Box className="max-w-xl mx-auto mt-8 p-6 bg-white rounded shadow-md">
        <Formik
          initialValues={{
            title: "",
            priority: 1,
            dependencies: [],
            deadline: null,
            estimatedTime: 0,
            status: "pending",
            tags: [],
          }}
          validationSchema={taskSchemaValidation}
          onSubmit={(values) => {
            console.log(":: New Task >>", values);
            setOpenForm(false);
          }}
        >
          {({ values, setFieldValue }) => (
            <Form className="space-y-4">
              <div>
                <Field
                  as={TextField}
                  label="Title"
                  name="title"
                  fullWidth
                  helperText={<ErrorMessage name="title" />}
                  error={Boolean(values.title === "")}
                />
              </div>
              <div>
                <Field
                  as={TextField}
                  select
                  label="Priority"
                  name="priority"
                  fullWidth
                  helperText={<ErrorMessage name="priority" />}
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <MenuItem key={num} value={num}>
                      {num}
                    </MenuItem>
                  ))}
                </Field>
              </div>
              <div>
                <Autocomplete
                  multiple
                  options={[{ id: "1", title: "Task 1" }]}
                  getOptionLabel={(option) => option.title}
                  value={values.dependencies}
                  onChange={(event, value) =>
                    setFieldValue("dependencies", value)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Dependencies"
                      placeholder="Select tasks"
                      helperText={<ErrorMessage name="dependencies" />}
                    />
                  )}
                />
              </div>
              <div>
                <Autocomplete
                  multiple
                  freeSolo
                  options={["Urgent", "Bug", "UI", "frontend", "backend"]}
                  value={values.tags}
                  onChange={(event, value) => setFieldValue("tags", value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tags"
                      placeholder="Add tags"
                      helperText={<ErrorMessage name="tags" />}
                    />
                  )}
                />
              </div>
              <div>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Deadline"
                    value={values.deadline}
                    onChange={(date) => setFieldValue("deadline", date)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        helperText={<ErrorMessage name="deadline" />}
                      />
                    )}
                  />
                </LocalizationProvider>
              </div>
              <div>
                <Field
                  as={TextField}
                  label="Estimated Time (hours)"
                  name="estimatedTime"
                  type="number"
                  fullWidth
                  helperText={<ErrorMessage name="estimatedTime" />}
                />
              </div>
              <div>
                <Field
                  as={TextField}
                  select
                  label="Status"
                  name="status"
                  fullWidth
                  helperText={<ErrorMessage name="status" />}
                >
                  {["pending", "in-progress", "completed"].map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Field>
              </div>

              <Button type="submit" variant="contained" color="primary">
                Create Task
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </div>
  );
};

export default NewTaskFormComponent;
