import { toast } from "sonner";

// Error types for categorizing different error scenarios
export enum ErrorType {
  NETWORK = "network",
  VALIDATION = "validation",
  AUTHORIZATION = "authorization",
  SERVER = "server",
  CLIENT = "client",
  UNKNOWN = "unknown",
}

// Enhanced error interface with additional context
export interface EnhancedError extends Error {
  type?: ErrorType;
  context?: Record<string, any>;
  originalError?: any;
}

/**
 * Create a standardized error with additional context
 */
export const createError = (
  message: string,
  type: ErrorType = ErrorType.UNKNOWN,
  context?: Record<string, any>,
  originalError?: any
): EnhancedError => {
  const error = new Error(message) as EnhancedError;
  error.type = type;
  error.context = context;
  error.originalError = originalError;
  return error;
};

/**
 * Handle errors with appropriate UI feedback
 * @param error The error to handle
 * @param silent If true, suppress UI notifications
 */
export const handleError = (error: any, silent = false): void => {
  const enhancedError = normalizeError(error);

  // Log errors in development for debugging
  if (process.env.NODE_ENV === "development") {
    console.error("Error caught:", enhancedError);
  }

  // Show user-friendly toast notifications unless silent is true
  if (!silent) {
    const message = getUserFriendlyMessage(enhancedError);
    toast.error(message, {
      description:
        enhancedError.type === ErrorType.NETWORK
          ? "Please check your connection and try again."
          : undefined,
      duration: 5000,
    });
  }
};

/**
 * Normalize any error into a standardized format
 */
const normalizeError = (error: any): EnhancedError => {
  if (error instanceof Error) {
    // If error is already an instance of Error, enhance it
    const enhancedError = error as EnhancedError;
    if (!enhancedError.type) {
      enhancedError.type = determineErrorType(error);
    }
    return enhancedError;
  } else if (typeof error === "string") {
    // If error is a string, create an error from it
    return createError(error);
  } else {
    // Handle unknown error format
    return createError("An unexpected error occurred", ErrorType.UNKNOWN, {
      rawError: error,
    });
  }
};

/**
 * Determine the type of the error based on its properties
 */
const determineErrorType = (error: any): ErrorType => {
  if (
    error.message?.includes("Network") ||
    error.message?.includes("fetch") ||
    error.message?.includes("connection") ||
    error.name === "AbortError"
  ) {
    return ErrorType.NETWORK;
  }

  if (
    error.status === 401 ||
    error.status === 403 ||
    error.message?.includes("unauthorized") ||
    error.message?.includes("permission")
  ) {
    return ErrorType.AUTHORIZATION;
  }

  if (error.status === 400 || error.message?.includes("validation")) {
    return ErrorType.VALIDATION;
  }

  if (
    (error.status && error.status >= 500) ||
    error.message?.includes("server")
  ) {
    return ErrorType.SERVER;
  }

  return ErrorType.UNKNOWN;
};

/**
 * Get a user-friendly error message based on the error type
 */
const getUserFriendlyMessage = (error: EnhancedError): string => {
  const defaultMessages: Record<ErrorType, string> = {
    [ErrorType.NETWORK]: "Network connection issue",
    [ErrorType.VALIDATION]: "Please check your input",
    [ErrorType.AUTHORIZATION]: "You don't have permission for this action",
    [ErrorType.SERVER]: "Server error occurred",
    [ErrorType.CLIENT]: "An error occurred in the application",
    [ErrorType.UNKNOWN]: "Something went wrong",
  };

  // Return the custom error message or default message based on type
  return error.message || defaultMessages[error.type || ErrorType.UNKNOWN];
};

/**
 * Try to execute a function and handle any errors
 * @param fn The function to execute
 * @param errorHandler Optional custom error handler
 * @returns Result of the function or undefined if an error occurs
 */
export const tryCatch = async <T>(
  fn: () => Promise<T>,
  errorHandler?: (error: any) => void
): Promise<T | undefined> => {
  try {
    return await fn();
  } catch (error) {
    if (errorHandler) {
      errorHandler(error);
    } else {
      handleError(error);
    }
    return undefined;
  }
};

/**
 * Wrap component event handlers with error handling
 * @param handler The event handler to wrap
 * @returns Wrapped handler with error handling
 */
export const withErrorHandling = <T extends (...args: any[]) => any>(
  handler: T
): ((...args: Parameters<T>) => ReturnType<T> | void) => {
  return (...args: Parameters<T>) => {
    try {
      const result = handler(...args);

      // Handle promises
      if (result instanceof Promise) {
        return result.catch((error) => {
          handleError(error);
        });
      }

      return result;
    } catch (error) {
      handleError(error);
    }
  };
};
