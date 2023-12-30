
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

//boilerplate from chatGPT notes
// if (location.href.includes("meet.google.com")) {
  // Retrieve the uploaded documents from chrome.storage
  // Inject elements to display the documents in the Google Meet window
//}
