export const getBrowserInfo = () => {
  if (typeof window === 'undefined') return null;

  const userAgent = navigator.userAgent;
  const vendor = navigator.vendor || '';
  const platform = navigator.platform;

  // Browser detection
  const isChrome = /Chrome/.test(userAgent) && /Google Inc/.test(vendor);
  const isFirefox = /Firefox/.test(userAgent);
  const isSafari = /Safari/.test(userAgent) && /Apple Computer/.test(vendor);
  const isEdge = /Edg/.test(userAgent);
  const isOpera = /OPR/.test(userAgent) || /Opera/.test(userAgent);

  // Mobile detection
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent,
    );
  const isTablet =
    /iPad/.test(userAgent) ||
    (platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  // Screen info
  const screenInfo = {
    width: window.screen.width,
    height: window.screen.height,
    availWidth: window.screen.availWidth,
    availHeight: window.screen.availHeight,
    colorDepth: window.screen.colorDepth,
    pixelDepth: window.screen.pixelDepth,
  };

  // Viewport info
  const viewportInfo = {
    width: window.innerWidth,
    height: window.innerHeight,
    outerWidth: window.outerWidth,
    outerHeight: window.outerHeight,
  };

  return {
    userAgent,
    vendor,
    platform,
    browser: {
      isChrome,
      isFirefox,
      isSafari,
      isEdge,
      isOpera,
      name: isChrome
        ? 'Chrome'
        : isFirefox
          ? 'Firefox'
          : isSafari
            ? 'Safari'
            : isEdge
              ? 'Edge'
              : isOpera
                ? 'Opera'
                : 'Unknown',
    },
    device: {
      isMobile,
      isTablet,
      isDesktop: !isMobile && !isTablet,
      type: isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop',
    },
    screen: screenInfo,
    viewport: viewportInfo,
    connection: (navigator as any).connection
      ? {
          effectiveType: (navigator as any).connection.effectiveType,
          downlink: (navigator as any).connection.downlink,
          rtt: (navigator as any).connection.rtt,
        }
      : null,
    cookieEnabled: navigator.cookieEnabled,
    onLine: navigator.onLine,
    language: navigator.language,
    languages: navigator.languages,
    hardwareConcurrency: navigator.hardwareConcurrency,
    deviceMemory: (navigator as any).deviceMemory || 'Unknown',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
};
