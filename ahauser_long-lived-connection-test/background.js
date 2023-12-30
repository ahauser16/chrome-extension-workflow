//2. Handling the Message in the Background Script (meetingIdAcquisition)

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

// step 4=Modify background.js to handle messages from popup.js (or other context-scripts) and send back the current meeting ID. (meetingIdAcquisition)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "GET_MEETING_ID") {
    sendResponse({ meetingId: currentMeetingId });
  }
});







