import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Quiz } from "../models/quizTypes";

export const useGetQuizesQuery = (filter: string) => {
  return useQuery({
    queryKey: ["quizzes", filter],
    queryFn: async () => {
      const data = await axios.get(`${import.meta.env.VITE_API_URL}/quizzes`, {
        withCredentials: true,
        params: { filter },
      });
      return data;
    },
  });
};

export const useGetQuizQuery = (id: string) => {
  return useQuery({
    queryKey: ["quiz", id],
    queryFn: async () => {
      const data = await axios.get(`${import.meta.env.VITE_API_URL}/quizzes/${id}`, {
        withCredentials: true,
      });
      return data;
    },
  });
};

export const useCreateQuizMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (quizData: Quiz) =>
      axios.post(`${import.meta.env.VITE_API_URL}/quizzes`, quizData, { withCredentials: true }),
    onError: (error, variables, context) => {
      console.log("error:", error);
      console.log("variables:", variables);
      console.log("context:", context);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
    },
  });
};

export const useUpdateQuizMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (quizData: Quiz) =>
      axios.put(`${import.meta.env.VITE_API_URL}/quizzes/${quizData._id}`, quizData, { withCredentials: true }),
    onError: (error, variables, context) => {
      console.log("error:", error);
      console.log("variables:", variables);
      console.log("context:", context);
    },
    onSuccess: (_, quizData) => {
      queryClient.invalidateQueries({ queryKey: ["quiz", quizData._id] });
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
    },
  });
};

export const useDeleteQuizMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      axios.delete(`${import.meta.env.VITE_API_URL}/quizzes/${id}`, { withCredentials: true }),
    onError: (error, variables, context) => {
      console.log("error:", error);
      console.log("variables:", variables);
      console.log("context:", context);
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["quiz", id] });
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
    },
  });
};
