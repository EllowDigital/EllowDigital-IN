/**
 * Link validation utility to check for broken links and security issues
 */

type LinkIssue = {
  url: string;
  element: HTMLAnchorElement;
  type: "security" | "external" | "fragment" | "tracking";
  description: string;
};

// Define validation options type to include consoleOutput
type ValidationOptions = {
  autoFix: boolean;
  consoleOutput: boolean;
};

/**
 * Validates links for potential issues like security problems, missing targets, etc.
 * @returns Function to start validation check
 */
export const createLinkValidator = () => {
  let issues: LinkIssue[] = [];

  // Security check for links that should use HTTPS
  const checkSecureLinks = (links: NodeListOf<HTMLAnchorElement>) => {
    links.forEach((link) => {
      const href = link.href;

      if (href.startsWith("http:") && !href.includes("localhost")) {
        issues.push({
          url: href,
          element: link,
          type: "security",
          description: "Link should use HTTPS for security",
        });
      }
    });
  };

  // Check for external links missing target and rel attributes
  const checkExternalLinks = (links: NodeListOf<HTMLAnchorElement>) => {
    const currentDomain = window.location.hostname;

    links.forEach((link) => {
      const href = link.href;
      try {
        const linkDomain = new URL(href).hostname;

        // If external link
        if (linkDomain && linkDomain !== currentDomain) {
          // Check for target attribute
          if (!link.target) {
            issues.push({
              url: href,
              element: link,
              type: "external",
              description: 'External link missing target="_blank" attribute',
            });
          }

          // Check for rel attribute with noreferrer and noopener for security
          if (
            !link.rel ||
            !link.rel.includes("noreferrer") ||
            !link.rel.includes("noopener")
          ) {
            issues.push({
              url: href,
              element: link,
              type: "security",
              description:
                'External link should have rel="noreferrer noopener" for security',
            });
          }
        }
      } catch (e) {
        // Invalid URL structure, likely a fragment link
      }
    });
  };

  // Check fragment links (anchors to page sections)
  const checkFragmentLinks = (links: NodeListOf<HTMLAnchorElement>) => {
    links.forEach((link) => {
      const href = link.getAttribute("href");

      if (href && href.startsWith("#") && href !== "#") {
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (!targetElement) {
          issues.push({
            url: href,
            element: link,
            type: "fragment",
            description: `Fragment link points to non-existent element with id "${targetId}"`,
          });
        }
      }
    });
  };

  // Check for tracking parameters in URLs that might be unnecessary
  const checkTrackingParameters = (links: NodeListOf<HTMLAnchorElement>) => {
    const trackingParams = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "fbclid",
      "gclid",
    ];

    links.forEach((link) => {
      const href = link.href;

      try {
        const url = new URL(href);

        trackingParams.forEach((param) => {
          if (url.searchParams.has(param)) {
            issues.push({
              url: href,
              element: link,
              type: "tracking",
              description: `Link contains tracking parameter "${param}" which may not be necessary for internal navigation`,
            });
          }
        });
      } catch (e) {
        // Invalid URL structure, ignore
      }
    });
  };

  // Fix link issues automatically
  const fixLinkIssues = (autoFix: boolean = false) => {
    if (!autoFix) return;

    issues.forEach((issue) => {
      const { element, type } = issue;

      switch (type) {
        case "security":
          // Fix HTTP to HTTPS
          if (element.href.startsWith("http:")) {
            element.href = element.href.replace("http:", "https:");
          }

          // Add security attributes to external links
          if (
            !element.getAttribute("rel") ||
            !element.getAttribute("rel")?.includes("noreferrer") ||
            !element.getAttribute("rel")?.includes("noopener")
          ) {
            element.setAttribute("rel", "noreferrer noopener");
          }
          break;

        case "external":
          // Add target blank to external links
          if (!element.target) {
            element.target = "_blank";
          }
          break;

        // We don't auto-fix fragment or tracking issues as they need manual review
      }
    });
  };

  // Main validation function - update to require consoleOutput parameter
  const validateLinks = (
    options: ValidationOptions = { autoFix: false, consoleOutput: true }
  ) => {
    if (typeof window === "undefined") return { issues: [] };

    // Reset issues
    issues = [];

    // Get all links
    const links = document.querySelectorAll<HTMLAnchorElement>("a[href]");

    // Run all checks
    checkSecureLinks(links);
    checkExternalLinks(links);
    checkFragmentLinks(links);
    checkTrackingParameters(links);

    // Auto fix if enabled
    if (options.autoFix) {
      fixLinkIssues(true);
    }

    // Console output for development
    if (options.consoleOutput) {
      if (issues.length > 0) {
        console.group("Link Validation Issues");
        issues.forEach((issue) => {
          console.warn(
            `${issue.type.toUpperCase()} issue with link: ${issue.url}`
          );
          console.warn(issue.description);
          console.warn("Element:", issue.element);
          console.warn("---");
        });
        console.groupEnd();
      } else {
        console.info("Link validation completed: No issues found.");
      }
    }

    return { issues };
  };

  return validateLinks;
};

/**
 * Run link validation when the page is fully loaded
 * Update to use the ValidationOptions type for the options parameter
 */
export const validateLinksAfterLoad = (
  options: ValidationOptions = { autoFix: false, consoleOutput: true }
) => {
  if (typeof window === "undefined") return () => {};

  const validator = createLinkValidator();

  // We use both load and DOMContentLoaded to ensure we catch as many links as possible
  const validate = () => {
    // Wait a bit after load to ensure all dynamic content is rendered
    setTimeout(() => {
      validator(options);
    }, 1000);
  };

  if (document.readyState === "complete") {
    validate();
  } else {
    window.addEventListener("load", validate);
  }

  return () => {
    window.removeEventListener("load", validate);
  };
};
