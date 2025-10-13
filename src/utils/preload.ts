// Utilities to preload images, videos and preconnect external origins.
// Non-blocking and respects Save-Data / slow-connections.

export type PreloadOptions = {
  images?: string[];
  videos?: string[];
  origins?: string[]; // preconnect / dns-prefetch targets
  timeoutMs?: number;
};

const defaultTimeout = 10000;

function isConnectionFast(): boolean {
  if (typeof navigator === 'undefined') return true;
  const anyNav = navigator as any;
  if (anyNav.connection) {
    const conn = anyNav.connection;
    if (conn.saveData) return false;
    const effectiveType = conn.effectiveType || '';
    // treat 2g as slow
    if (/2g/i.test(effectiveType)) return false;
  }
  return true;
}

export function preloadAssets(opts: PreloadOptions) {
  const { images = [], videos = [], origins = [], timeoutMs = defaultTimeout } = opts;

  if (!isConnectionFast()) {
    // skip aggressive precache on slow connections / save-data
    return { cancel: () => {} };
  }

  const timers: number[] = [];

  // Preconnect / dns-prefetch for external origins
  origins.forEach((origin) => {
    try {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = origin;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);

      const dns = document.createElement('link');
      dns.rel = 'dns-prefetch';
      dns.href = origin;
      document.head.appendChild(dns);
    } catch (e) {
      // ignore
    }
  });

  // Preload images via Image objects
  const imagePromises = images.map((src) =>
    new Promise<void>((resolve) => {
      try {
        const img = new Image();
        let settled = false;
        const t = window.setTimeout(() => {
          if (!settled) {
            settled = true;
            resolve();
          }
        }, timeoutMs);
        timers.push(t);
        img.onload = () => {
          if (!settled) {
            settled = true;
            clearTimeout(t);
            resolve();
          }
        };
        img.onerror = () => {
          if (!settled) {
            settled = true;
            clearTimeout(t);
            resolve();
          }
        };
        img.src = src;
      } catch (e) {
        resolve();
      }
    })
  );

  // Preload videos by creating <link rel="preload" as="video"> or by fetching range
  videos.forEach((src) => {
    try {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'video';
      link.href = src;
      // some browsers support type attribute, leave it optional
      document.head.appendChild(link);
    } catch (e) {
      // fallback: create video element and set preload
      try {
        const v = document.createElement('video');
        v.preload = 'auto';
        v.src = src;
      } catch (e2) {}
    }
  });

  // Note: we don't attempt to load iframe contents (cross-origin) here, but we can preconnect

  const all = Promise.all(imagePromises);

  return {
    done: all,
    cancel: () => {
      timers.forEach((t) => clearTimeout(t));
    },
  };
}

export function extractOriginsFromUrls(urls: string[]) {
  const origins: string[] = [];
  urls.forEach((u) => {
    try {
      const url = new URL(u, window.location.origin);
      const origin = url.origin;
      if (origin && !origins.includes(origin) && origin !== window.location.origin) origins.push(origin);
    } catch (e) {
      // ignore
    }
  });
  return origins;
}
