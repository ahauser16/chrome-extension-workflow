

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'openSidePanel',
    title: 'Open side panel',
    contexts: ['all']
  });
  chrome.tabs.create({ url: 'page.html' });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'openSidePanel') {
    // This will open the panel in all the pages on the current window.
    chrome.sidePanel.open({ windowId: tab.windowId });
  }
});

chrome.runtime.onMessage.addListener((message, sender) => {
  // The callback for runtime.onMessage must return falsy if we're not sending a response
  (async () => {
    if (message.type === 'open_side_panel') {
      // This will open a tab-specific side panel only on the current tab.
      await chrome.sidePanel.open({ tabId: sender.tab.id });
      await chrome.sidePanel.setOptions({
        tabId: sender.tab.id,
        path: 'sidepanel-tab.html',
        enabled: true
      });
    }
  })();
});

//refactored from Youtube tutorial
//sample URL from a google meet session: https://meet.google.com/auq-irmc-ari

//this line adds an event listener to the `chrome.tabs.onUpdated` event which is triggered whenever a tab is updated (like when the URL changes, the tab is reloaded, etc). The listener function receives two parameters: `tabId` which is the ID of the updated tab and `tab` which is an object containing information about the tab.
chrome.tabs.onUpdated.addListener((tabId, tab) => {

  if (tab.url && tab.url.includes("meet.google.com/")) {
    const meetingId = tab.url.split("meet.google.com/")[1];
    
    // const urlParameters = new URLSearchParams(urlParts);

    chrome.tabs.sendMessage(tabId, {
      type: "NEW_MEETING",
      meetingId: meetingId,
    });
  }
});

//https://www.youtube.com/watch?v=fU9oWQvVayk