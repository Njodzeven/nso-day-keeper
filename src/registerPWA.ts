// Register service worker and listen for the beforeinstallprompt to show install prompt

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((err) => {
      console.warn('Service worker registration failed:', err);
    });
  });
}

// Listen for beforeinstallprompt and show prompt when fired
// Attempt to show install prompt when the browser fires beforeinstallprompt.
// Note: modern browsers often restrict programmatic prompting; this code
// prevents the automatic prompt and attempts to call prompt() once the event fires.
window.addEventListener('beforeinstallprompt', (e: Event) => {
  const promptEvent: any = e;
  try {
    // Some browsers require user gesture; this may be ignored.
    e.preventDefault();
    promptEvent.prompt();
    promptEvent.userChoice.then((choice: any) => {
      console.log('PWA install choice:', choice);
    });
  } catch (err) {
    console.warn('PWA prompt error:', err);
  }
});

export {};
