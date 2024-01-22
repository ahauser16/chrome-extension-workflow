let currentMeetingId = null;

chrome.runtime.onConnect.addListener(handleConnection);

function handleConnection(port) {
  if (port.name !== "liveMeetConnection") {
    console.log("Unexpected connection:", port.name);
    return;
  }

  console.log("Connection established with content script during Live Meet Session");

  port.onMessage.addListener(handleMessage.bind(null, port));
}

function handleMessage(port, msg) {
  console.log("Message received from content script:", msg);

  if (!msg || typeof msg.type !== 'string') {
    console.error("Received message in unexpected format:", msg);
    return;
  }

  switch (msg.type) {
    case "greeting":
      handleGreeting(msg, port);
      break;
    case "MEETING_ID":
      handleMeetingId(msg);
      break;
    default:
      console.error("Received unknown message type:", msg.type);
  }
}

function handleGreeting(msg, port) {
  if (msg.greeting === "hello") {
    console.log("Received hello from content script");
    port.postMessage({ greeting: "hi there!" });
  } else {
    console.error("Received unknown greeting:", msg.greeting);
  }
}

function handleMeetingId(msg) {
  if (!msg || typeof msg.meetingId !== 'string') {
    console.error("Received MEETING_ID message in unexpected format:", msg);
    return;
  }

  currentMeetingId = msg.meetingId;
  console.log("Received meeting ID: " + currentMeetingId);
}

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.type === "GET_MEETING_ID") {
//     sendResponse({ meetingId: currentMeetingId });
//   }
// });

// const GOOGLE_ORIGIN = 'https://meet.google.com/';
// chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
//   if (!tab.url) return;
//   const url = new URL(tab.url);
//   // Enables the side panel on google.com
//   if (url.origin === GOOGLE_ORIGIN) {
//     await chrome.sidePanel.setOptions({
//       tabId,
//       path: 'googleMeetSidepanel.html',
//       enabled: true
//     });
//   } else {
//     // Disables the side panel on all other sites
//     await chrome.sidePanel.setOptions({
//       tabId,
//       enabled: false
//     });
//   }
// });



