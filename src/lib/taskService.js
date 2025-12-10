import { TASK_ENDPOINT } from "../utils/endPoints";
import { get, postRequest } from "./axiosMethod";

export const getTasks = async () => {
  try {
    const response = await get(TASK_ENDPOINT.getAllTasks);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const changeTaskStatus = async ({ taskId, status }) => {
  try {
    const response = await postRequest(TASK_ENDPOINT.changeStatus(taskId), {
      status,
    });
    return response.data;
  } catch (error) {
    console.error("Error changing task status:", error);
    throw error;
  }
};

export const getRecommendedTask = async () => {
  try {
    const response = await get(TASK_ENDPOINT.recommendedTask);
    return response.data;
  } catch (error) {
    console.error("Error fetching suggested tasks:", error);
    throw error;
  }
};

export const createNewTask = async (payload) => {
  try {
    const response = await postRequest(TASK_ENDPOINT.createTask, payload);
    return response.data;
  } catch (error) {
    console.error("Error on creating task:", error);
    throw error;
  }
};
