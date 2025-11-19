import { useEffect } from "react";
import { toast } from "sonner";
import { api } from "@/utils/apiClient";

// Component to set up axios interceptors
export const AxiosInterceptor = () => {
  useEffect(() => {
    // Request interceptor
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        // Add authorization token if available
        const token = localStorage.getItem("auth_token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    const responseInterceptor = api.interceptors.response.use(
      (response) => response, // Return the response as is
      (error) => {
        const status = error.response?.status;
        const isNetworkError = !error.response;

        // Handle network errors
        if (isNetworkError) {
          toast.error("Network error. Please check your connection.");
          return Promise.reject(error);
        }

        // Handle specific status codes
        switch (status) {
          case 401:
            toast.error("Authentication expired. Please log in again.");
            // Optionally clear token and redirect to login
            break;
          case 403:
            toast.error("You do not have permission to access this resource.");
            break;
          case 404:
            toast.error("Resource not found.");
            break;
          case 422:
            toast.error("Validation error. Please check your input.");
            break;
          case 429:
            toast.error("Too many requests. Please try again later.");
            break;
          case 500:
          case 502:
          case 503:
          case 504:
            toast.error("Server error. Please try again later.");
            break;
          default:
            toast.error("An error occurred. Please try again.");
        }

        return Promise.reject(error);
      }
    );

    // Cleanup interceptors when the component unmounts
    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return null; // No UI is rendered by this component
};
