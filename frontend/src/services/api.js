import axios from "axios";

const API_URL = "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// User APIs
export const registerUser = (userData) =>
  axiosInstance.post("/auth/register", userData);
export const loginUser = (userData) =>
  axiosInstance.post("/auth/login", userData);

// Question APIs
export const getQuestions = () => axiosInstance.get("/questions");
export const getQuestionById = (id) => axiosInstance.get(`/questions/${id}`);
export const createQuestion = (data) => axiosInstance.post("/questions", data);

// Answer APIs
export const postAnswer = (data) => axiosInstance.post("/answers", data);

// Comment APIs
export const postComment = (data) => axiosInstance.post("/comments", data);
export const getComments = (questionId, answerId) =>
  axiosInstance.get(
    questionId
      ? `/comments?questionId=${questionId}`
      : `/comments?answerId=${answerId}`
  );
