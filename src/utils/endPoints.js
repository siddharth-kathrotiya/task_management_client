export const TASK_ENDPOINT = {
  getAllTasks: "/tasks",
  changeStatus: (taskId) => `/tasks/change-status/${taskId}`,
  recommendedTask: "/tasks/suggested",
  createTask: "/tasks",
};
