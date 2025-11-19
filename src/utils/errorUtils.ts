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
  context?: Record<string, unknown>;
  originalError?: unknown;
}

/**
 * Create a standardized error with additional context
 */
export const createError = (
  message: string,
  type: ErrorType = ErrorType.UNKNOWN,
  context?: Record<string, unknown>,
  originalError?: unknown
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
export const handleError = (error: unknown, silent = false): void => {
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
const normalizeError = (error: unknown): EnhancedError => {
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
const determineErrorType = (error: unknown): ErrorType => {
  if (
    (error as { message?: string; name?: string }).message?.includes(
      "Network"
    ) ||
    (error as { message?: string; name?: string }).message?.includes("fetch") ||
    (error as { message?: string; name?: string }).message?.includes(
      "connection"
    ) ||
    (error as { message?: string; name?: string }).name === "AbortError"
  ) {
    return ErrorType.NETWORK;
  }

  if (
    (error as { status?: number; message?: string }).status === 401 ||
    (error as { status?: number; message?: string }).status === 403 ||
    (error as { status?: number; message?: string }).message?.includes(
      "unauthorized"
    ) ||
    (error as { status?: number; message?: string }).message?.includes(
      "permission"
    )
  ) {
    return ErrorType.AUTHORIZATION;
  }

  if (
    (error as { status?: number; message?: string }).status === 400 ||
    (error as { status?: number; message?: string }).message?.includes(
      "validation"
    )
  ) {
    return ErrorType.VALIDATION;
  }

  if (
    ((error as { status?: number }).status &&
      (error as { status?: number }).status! >= 500) ||
    (error as { message?: string }).message?.includes("server")
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
  errorHandler?: (error: unknown) => void
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
export const withErrorHandling = <T extends (...args: unknown[]) => unknown>(
  handler: T
): ((...args: Parameters<T>) => ReturnType<T> | void) => {
  return (...args: Parameters<T>) => {
    try {
      const result = handler(...args);

      // Handle promises
      if (result instanceof Promise) {
        return result.catch((error) => {
          handleError(error);
        }) as ReturnType<T>;
      }

      return result as ReturnType<T>;
    } catch (error) {
      handleError(error);
    }
  };
};
