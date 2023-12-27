//The code below essentially runs in the background and listens to any updates in our tab system and find the most recent tab or the tab that we're on currently and see if it's a YouTube page.

//E-Notary Services equivalent will function the same way except it will listen for a Google Meet page.

chrome.tabs.onUpdated.addListener((tabId, tab) => {
    if (tab.url && tab.url.includes("youtube.com/watch")) {
      const queryParameters = tab.url.split("?")[1];
      const urlParameters = new URLSearchParams(queryParameters);
  
      chrome.tabs.sendMessage(tabId, {
        type: "NEW",
        videoId: urlParameters.get("v"),
      });
    }
  });
  