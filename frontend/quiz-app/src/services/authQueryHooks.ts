import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// Types
export type LoginInputs = {
  email: string;
  password: string;
};

export type SignUpInputs = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export const useLoginMutation = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginInputs) =>
      axios.post(`${import.meta.env.VITE_API_URL}/users/login`, data, { withCredentials: true }),
    onError: (error, variables, context) => {
      console.log("error:", error);
      console.log("variables:", variables);
      console.log("context:", context);
    },
    onSuccess: (data, variables, context) => {
      login();
      navigate("/");
      console.log("data:", data);
      console.log("data.data:", data.data);
      console.log("headers:", data.headers);
      console.log("variables:", variables);
      console.log("context:", context);
    },
  });
};

export const useSignUpMutation = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: SignUpInputs) =>
      axios.post(`${import.meta.env.VITE_API_URL}/users/signup`, data, { withCredentials: true }),
    onError: (error, variables, context) => {
      console.log("error:", error);
      console.log("variables:", variables);
      console.log("context:", context);
    },
    onSuccess: (data, variables, context) => {
      login();
      navigate("/");
      console.log("data:", data);
      console.log("data.data:", data.data);
      console.log("headers:", data.headers);
      console.log("variables:", variables);
      console.log("context:", context);
    },
  });
};

export const useLogOutMutation = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => axios.get(`${import.meta.env.VITE_API_URL}/users/logout`, { withCredentials: true }),
    onError: (error, variables, context) => {
      console.log("error:", error);
      console.log("variables:", variables);
      console.log("context:", context);
    },
    onSuccess: (data, variables, context) => {
      logout();
      navigate("/login");
      console.log("data:", data);
      console.log("data.data:", data.data);
      console.log("headers:", data.headers);
      console.log("variables:", variables);
      console.log("context:", context);
    },
  });
};
