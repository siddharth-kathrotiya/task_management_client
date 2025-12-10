import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:7800/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const get = async (url) => {
  try {
    const response = await apiClient.get(url);
    return response;
  } catch (error) {
    throw { message: "Error making GET request", error };
  }
};

export const postRequest = async (url, data) => {
  try {
    const response = await apiClient.post(url, data);
    return response;
  } catch (error) {
    throw { message: "Error making POST request", error };
  }
};

export const deleteRequest = async (url) => {
  try {
    const response = await apiClient.delete(url);
    return response;
  } catch (error) {
    throw { message: "Error making DELETE request", error };
  }
};

export const putRequest = async (url, data) => {
  try {
    const response = await apiClient.put(url, data);
    return response;
  } catch (error) {
    throw { message: "Error making PUT request", error };
  }
};
