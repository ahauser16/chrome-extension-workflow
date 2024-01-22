//good article on long-lived connection syntax: https://www.linkedin.com/pulse/message-passing-chrome-extension-lakebrains-technologies/

//ExtractMeetingId-Step 3-->Handling the Message in the Background Script (meetingIdAcquisition)

let currentMeetingId = null;

//I. Listening for Connections
chrome.runtime.onConnect.addListener((port) => {//<-- line A 
  console.log("Connection established with content script"); // Log when a connection is established

  //II. Establishing the Connection
  console.assert(port.name === "meetConnection");//<-- line B 

  //III. Communication
  port.onMessage.addListener((msg) => {//<-- line C 
    console.log("Message received from content script:", msg); // Log received messages

    if (msg.greeting === "hello") {
      console.log("Received hello from content script");
      port.postMessage({ greeting: "hi there!" });
    } else if (msg.type === "MEETING_ID") {
      currentMeetingId = msg.meetingId;
      console.log("Received meeting ID: " + currentMeetingId);
    } else {
      console.error("Received unknown message type:", msg.type);
    }

  });
});

//ExtractMeetingId-step 4--> below handles messages from popup.js (or other context-scripts) and send back the current meeting ID. (meetingIdAcquisition)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "GET_MEETING_ID") {
    sendResponse({ meetingId: currentMeetingId });
  }
});

//boilerplate from sidepanel API documentation.
//https://developer.chrome.com/docs/extensions/reference/api/sidePanel
const GOOGLE_ORIGIN = 'https://meet.google.com/';
chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  if (!tab.url) return;
  const url = new URL(tab.url);
  // Enables the side panel on google.com
  if (url.origin === GOOGLE_ORIGIN) {
    await chrome.sidePanel.setOptions({
      tabId,
      path: 'googleMeetSidepanel.html',
      enabled: true
    });
  } else {
    // Disables the side panel on all other sites
    await chrome.sidePanel.setOptions({
      tabId,
      enabled: false
    });
  }
});



