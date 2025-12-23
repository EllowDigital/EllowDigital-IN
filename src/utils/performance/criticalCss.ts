// Performance utilities for optimizing loading

export const deferNonCriticalCSS = () => {
  // Find all non-critical stylesheets and defer them
  const stylesheets = document.querySelectorAll('link[rel="stylesheet"][data-defer]');
  
  stylesheets.forEach((stylesheet) => {
    const link = stylesheet as HTMLLinkElement;
    link.media = 'print';
    link.onload = () => {
      link.media = 'all';
    };
  });
};

export const preloadCriticalAssets = (assets: string[]) => {
  assets.forEach((asset) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = asset;
    
    if (asset.endsWith('.woff2') || asset.endsWith('.woff')) {
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
    } else if (asset.endsWith('.js')) {
      link.as = 'script';
    } else if (asset.endsWith('.css')) {
      link.as = 'style';
    } else if (asset.match(/\.(jpg|jpeg|png|webp|avif)$/i)) {
      link.as = 'image';
    }
    
    document.head.appendChild(link);
  });
};

export const lazyLoadImages = () => {
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach((img) => {
      const image = img as HTMLImageElement;
      image.src = image.dataset.src || '';
      image.removeAttribute('data-src');
    });
  } else {
    // Fallback for browsers that don't support native lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    script.async = true;
    document.body.appendChild(script);
  }
};

export const reportWebVitals = (onPerfEntry?: (entry: PerformanceEntry) => void) => {
  if (onPerfEntry && typeof PerformanceObserver !== 'undefined') {
    try {
      // Observe LCP
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(onPerfEntry);
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

      // Observe FID
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(onPerfEntry);
      });
      fidObserver.observe({ type: 'first-input', buffered: true });

      // Observe CLS
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(onPerfEntry);
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });
    } catch (e) {
      console.warn('Performance Observer not fully supported');
    }
  }
};

export const prefetchRoute = (url: string) => {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = url;
  document.head.appendChild(link);
};

export const measureTTFB = (): number | null => {
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  if (navigation) {
    return navigation.responseStart - navigation.requestStart;
  }
  return null;
};
