chrome.runtime.onConnect.addListener((port) => {
  console.assert(port.name === "notaryConnection");

  port.onMessage.addListener((msg) => {
    if (msg.type === "NEW_MEETING") {
      // Handle new meeting ID
      console.log("Received new meeting ID: " + msg.meetingId);
      // You can perform additional actions here based on the meeting ID
    }
  });

  chrome.tabs.onUpdated.addListener((tabId, tab) => {
    if (tab.url && tab.url.includes("meet.google.com/")) {
      const meetingIdSnippet = tab.url.split("meet.google.com/")[1];
      const meetingId = meetingIdSnippet.split("?")[0];

      console.log("Extracted meetingId: " + meetingId);

      // Send the meeting ID to the content script
      port.postMessage({ type: "NEW_MEETING", meetingId: meetingId });
    }
  });
});

// This code will log messages at various points:

// When any tab is updated, it logs the tab ID and URL.
// If the URL includes "meet.google.com/", it extracts and logs the meeting ID.
// It sends a message to the content script and logs an error if it fails, or confirms successful sending.
// If you're still encountering the "Could not establish connection. Receiving end does not exist." error, it's likely that the content script is not active or properly loaded in the tab when sendMessage is called. This could be due to several reasons:

// The content script is not being injected into the page. This could be due to the matches pattern in the manifest file not correctly matching the URL, or the content script not being loaded for other reasons.
// The content script is not listening for messages when sendMessage is called. This could happen if the content script has not been initialized or if it has been unloaded.
// To further debug, ensure that your content script is loaded and active in the Google Meet tab. You can check this by looking for logs from the content script in the Chrome DevTools console for that tab.

// SAMPLE ERROR IN CONTENTSCRIPT DEV TOOLS CONSOLE:

// Tab updated - ID: 224710157, URL: https://meet.google.com/mja-zpbv-kvb?ijlm=1703791174775&adhoc=1&hs=187
//***********NOTE************************************************
//NOTE 2: The script successfully extracts the meeting ID ("mja-zpbv-kvb") from the URL. This indicates that your URL parsing logic is working correctly.
//***********NOTE**************************************************
// background.js:28 Extracted meetingId: mja-zpbv-kvb
// background.js:6 Retrying sendMessage. Attempts left: 5. Error: Could not establish connection. Receiving end does not exist.
// (anonymous) @ background.js:6
// background.js:22 Tab updated - ID: 224710157, URL: undefined
// background.js:38 URL does not include 'meet.google.com/'
// background.js:22 Tab updated - ID: 224710157, URL: undefined
// background.js:38 URL does not include 'meet.google.com/'
// background.js:22 Tab updated - ID: 224710157, URL: undefined
// background.js:38 URL does not include 'meet.google.com/'
// background.js:22 Tab updated - ID: 224710157, URL: undefined
// background.js:38 URL does not include 'meet.google.com/'
// background.js:22 Tab updated - ID: 224710157, URL: https://meet.google.com/mja-zpbv-kvb
// background.js:28 Extracted meetingId: mja-zpbv-kvb
// background.js:22 Tab updated - ID: 224710157, URL: undefined
// background.js:38 URL does not include 'meet.google.com/'
// background.js:22 Tab updated - ID: 224710157, URL: undefined
// background.js:38 URL does not include 'meet.google.com/'
// background.js:22 Tab updated - ID: 224710157, URL: undefined
// background.js:38 URL does not include 'meet.google.com/'
//***********NOTE************************************************
//NOTE 1: The log shows multiple "Tab updated" events. Some of these events have a valid URL that includes "meet.google.com", while others have an undefined URL. This is normal behavior as the onUpdated event fires multiple times during the loading of a tab, and initially, the URL might not be set.
//***********NOTE**************************************************
// background.js:6 Retrying sendMessage. Attempts left: 5. Error: The message port closed before a response was received.
// (anonymous) @ background.js:6
// background.js:6 Retrying sendMessage. Attempts left: 4. Error: The message port closed before a response was received.
// (anonymous) @ background.js:6
// background.js:22 Tab updated - ID: 224710157, URL: undefined
// background.js:38 URL does not include 'meet.google.com/'
// background.js:6 Retrying sendMessage. Attempts left: 4. Error: The message port closed before a response was received.
// (anonymous) @ background.js:6
// 2background.js:6 Retrying sendMessage. Attempts left: 3. Error: The message port closed before a response was received.
// (anonymous) @ background.js:6
// 2background.js:6 Retrying sendMessage. Attempts left: 2. Error: The message port closed before a response was received.
// (anonymous) @ background.js:6
// background.js:6 Retrying sendMessage. Attempts left: 1. Error: The message port closed before a response was received.
// (anonymous) @ background.js:6
// background.js:22 Tab updated - ID: 224710157, URL: undefined
// background.js:38 URL does not include 'meet.google.com/'
// background.js:6 Retrying sendMessage. Attempts left: 1. Error: The message port closed before a response was received.
// (anonymous) @ background.js:6
// 2background.js:9 Failed to send message after retries. Error: The message port closed before a response was received.
//***********NOTE************************************************
//NOTE 3: The script attempts to send a message to the content script multiple times but fails. The error "Could not establish connection. Receiving end does not exist" suggests that the content script is not ready or not present in the tab when the message is being sent.
//***********NOTE**************************************************
//***********NOTE************************************************
//NOTE 4: The error "The message port closed before a response was received" indicates that the communication channel between the background script and the content script was closed before the message could be successfully sent and a response received.
//***********NOTE**************************************************