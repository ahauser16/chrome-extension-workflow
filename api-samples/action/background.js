
// Show the demo page once the extension is installed.  This is a very useful behavior when having a homepage for E-Notary Services.
chrome.runtime.onInstalled.addListener((_reason) => {
  chrome.tabs.create({
    url: 'demo/index.html'
  });
});
