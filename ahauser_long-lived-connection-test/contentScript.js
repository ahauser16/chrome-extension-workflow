// Ensure that contentScript.js is focused on handling any interactions specific to the Google Meet page that are still relevant to your extension's functionality. For example, if you need to trigger any actions when a Google Meet session starts or ends, you would handle that here.

//Step 1. Extracting the Meeting ID in the Content Script (meetingIdAcquisition)
const port = chrome.runtime.connect({ name: "meetConnection" });//<--Line A

// Function to extract meeting ID
function extractMeetingId() {
  const url = window.location.href;
  const meetingId = url.split("meet.google.com/")[1].split("?")[0];
  return meetingId;
}

// Send the meeting ID to the background script
const meetingId = extractMeetingId();
port.postMessage({ type: "MEETING_ID", meetingId: meetingId });
port.postMessage({ greeting: "hello" });//<--Line B
port.onMessage.addListener((msg) => {//<--Line C
  console.log("Message received from background script:", msg); // Log received messages
  if (msg.greeting === "hi there!") {//<--Line D
    console.log("Received 'hi there!' from background script");
    // Example interaction: Change the background color of the Google Meet page
    document.body.style.backgroundColor = 'lightblue';
  }
});

//workflow once user has saved files to storage and is about to join live session.
//Step 1: Retrieve Files from Storage
function retrieveFiles() {
  console.log("Retrieving files from local storage...");
  chrome.storage.local.get(['uploadedFiles'], (result) => {
    if (chrome.runtime.lastError) {
      console.error("Error retrieving files:", chrome.runtime.lastError.message);
      return;
    }

    const files = result.uploadedFiles;
    if (!files) {
      console.log("No files found in local storage.");
      return;
    }

    console.log("Files retrieved:", Object.keys(files));
    // displayFiles(files);


    if (result.uploadedFiles) {
      displayFiles(result.uploadedFiles);
    } else {
      console.log('No files found in storage.');
    }
  });
}
retrieveFiles();
