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

//SidepanelButtonInPopup-Step 2-->listen for the message from popup.js and open the side panel. FYI, You'll need to keep track of the current active tab ID to open the side panel in the correct tab.-->question=how do I keep track of the current active tab using the "long-lived connection" syntax.
let currentTabId = null;

// this is a listener for when the active tab changes
chrome.tabs.onActivated.addListener(activeInfo => {
  currentTabId = activeInfo.tabId; // Store the ID of the currently active tab
});

// Listener for messages from other parts of the extension
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received in background:", message);

  if (message.action === "openSidePanel") {
    openSidePanel();
  }
});

function openSidePanel() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length === 0) {
      console.error("No active tab found");
      return;
    }

    const tabId = tabs[0].id;
    if (tabId && tabs[0].url.includes("meet.google.com")) {
      chrome.sidePanel.open({ tabId: tabId }).then(() => {
        console.log("Side panel opened on tab:", tabId);
      }).catch((error) => {
        console.error("Error opening side panel:", error);
      });
    } else {
      console.log("Side panel can only be opened on Google Meet pages.");
    }
  });
}


//How It Works
//1.  Track the Current Active Tab: The script keeps track of the currently active tab. Whenever the active tab changes, it updates currentTabId with the new tab's ID. This is important because the side panel is context-specific and needs to know which tab to display in.

//2. Listen for Messages: The script listens for messages from other parts of the extension (like your popup script). This is When a message is received, the script checks if the action specified in the message is "openSidePanel". This is a custom action we expect to be sent from the popup when the user clicks the "Open Side Panel" button.

//3. Open the Side Panel: If the current tab ID is available (meaning the script knows which tab is currently active), it uses the chrome.sidePanel.open method to open the side panel in that tab. This method requires the tabId to specify where the side panel should be opened.






