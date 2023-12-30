//Line A--> this line adds an event listener to the `chrome.tabs.onUpdated` event which is triggered whenever a tab is updated (like when the URL changes, the tab is reloaded, etc). The listener function receives two parameters: `tabId` which is the ID of the updated tab and `tab` which is an object containing information about the tab.
//Line B-->This line checks if the updated tab's URL (`tab.url`) exists and includes the string `"youtube.com/watch"`. This condition is used to determine if the tab is currently showing a YouTube video page.
//Line C--> this line splits the URL of the tab at the `?` character, which separates the base URL from the query parameters. The `[1]` accesses the second part of the split result, which is the string containing the query parameters.
//Line D--> this line creates a `URLSearchParams` object from the query parameters string. This object provides convenient methods to work with the query string of a URL.
////Code Block E-->this line sends a message to the content script running in the tab with the specified `tabId`. The message is an object with two properties: `type`, set to `"NEW"`, and `videoId`, which is extracted from the query parameters (`urlParameters.get("v")` gets the value of the `v` paramet er, typically the YouTube video ID).

chrome.tabs.onUpdated.addListener((tabId, tab) => {//Line A (Block A)
  if (tab.url && tab.url.includes("youtube.com/watch")) {//Line B
    const queryParameters = tab.url.split("?")[1];//Line C
    const urlParameters = new URLSearchParams(queryParameters);//Line D

    chrome.tabs.sendMessage(tabId, {//Code Block E
      type: "NEW",
      videoId: urlParameters.get("v"),
    });
  }
});

//In summary, this script listens for updates to tabs. When a tab navigates to a YouTube video page, it extracts the video ID from the URL and sends a message containing this video ID to a content script in that tab. This could be used, for example, to perform actions in the extension based on the currently playing YouTube video.