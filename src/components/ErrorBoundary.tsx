import React, { Component, ErrorInfo, ReactNode } from "react";
import { Toaster } from "sonner";
import { toast } from "sonner"; // Keep toast for now as it's used
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Capture error details for logging
    this.setState({
      errorInfo,
    });

    // Log error to console
    console.error("Uncaught error:", error, errorInfo);

    // Report to analytics if available
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "error", {
        error_message: error.message,
        error_name: error.name,
        error_stack: error.stack,
        error_component: this.getComponentStack(errorInfo),
      });
    }

    // Show toast notification
    toast.error("Something went wrong", {
      description:
        "The application encountered an error and needs to be reloaded.",
      icon: <AlertTriangle className="h-5 w-5" />,
      duration: 5000,
    });
  }

  getComponentStack(errorInfo: ErrorInfo | null): string {
    if (!errorInfo) return "Unknown component";

    // Extract component name from stack trace
    const stackLines = errorInfo.componentStack.split("\n");
    if (stackLines.length > 1) {
      const match = stackLines[1].match(/in ([A-Za-z0-9_]+)/);
      return match ? match[1] : "Unknown component";
    }

    return "Unknown component";
  }

  handleReload = (): void => {
    window.location.reload();
  };

  handleClearAndRestart = (): void => {
    // Clear local storage and session storage
    window.localStorage.clear();
    window.sessionStorage.clear();

    // Clear any cookies related to app state
    document.cookie.split(";").forEach((cookie) => {
      const [name] = cookie.split("=");
      if (name.trim().startsWith("app_")) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
      }
    });

    // Redirect to home page
    window.location.href = "/";
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback UI
      return (
        this.props.fallback || (
          <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 bg-background text-foreground">
            <div className="max-w-md w-full p-6 rounded-lg bg-card border border-border shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="h-6 w-6 text-brand-yellow" />
                <h1 className="text-2xl font-bold">Something went wrong</h1>
              </div>

              <p className="mb-4 text-muted-foreground">
                We're sorry, but an error occurred while rendering this page.
              </p>

              {this.state.error && (
                <div className="p-3 bg-muted rounded mb-4 overflow-auto max-h-32 text-sm">
                  <code className="text-sm text-brand-yellow">
                    {this.state.error.toString()}
                  </code>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Button
                  onClick={this.handleReload}
                  className="bg-brand-yellow text-black hover:bg-brand-gold"
                >
                  Reload Page
                </Button>

                <Button
                  onClick={this.handleClearAndRestart}
                  variant="outline"
                  className="border-brand-yellow/20 hover:bg-brand-yellow/10"
                >
                  Clear Data & Restart
                </Button>
              </div>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
