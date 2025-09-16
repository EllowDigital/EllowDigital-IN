// Type definitions for Google Analytics gtag.js

// Extend the Window interface to include optional gtag function
interface Window {
  gtag?: GtagFunction;
}

// Define the gtag function type
type GtagFunction = (
  command: "config" | "event" | "set" | "js",
  targetIdOrEventName: string,
  params?: Record<string, any>
) => void;

// Declare global gtag function
declare const gtag: GtagFunction;
