let port = null;

function startLiveMeetSession() {
  if (port) {
    console.log("Live Meet session already started");
    return;
  }

  port = chrome.runtime.connect({ name: "liveMeetConnection" });

  const meetingId = extractMeetingId();
  if (!meetingId) {
    console.error("Failed to extract meeting ID from URL");
    return;
  }

  port.postMessage({ type: "MEETING_ID", meetingId: meetingId });

  port.postMessage({ greeting: "hello" });

  port.onMessage.addListener(handleMessage);
}

function handleMessage(msg) {
  console.log("Message received from background script:", msg);

  switch (msg.type) {
    case "greeting":
      handleGreeting(msg);
      break;
    default:
      console.error("Received unknown message type:", msg.type);
  }
}

function handleGreeting(msg) {
  if (msg.greeting === "hi there!") {
    console.log("Received 'hi there!' from background script");
    document.body.style.backgroundColor = 'lightblue';
  } else {
    console.error("Received unknown greeting:", msg.greeting);
  }
}

function extractMeetingId() {
  const url = window.location.href;
  let meetingId = null;

  try {
    meetingId = url.split("meet.google.com/")[1].split("?")[0];
  } catch (error) {
    console.error("Failed to extract meeting ID from URL:", url);
    return null;
  }

  if (!meetingId) {
    console.error("No meeting ID found in URL:", url);
    return null;
  }

  return meetingId;
}

function isInLiveMeetSession() {
  const url = window.location.href;
  // Check if the URL includes "meet.google.com/"
  if (!url.includes("meet.google.com/")) {
    return false;
  }

  // Extract the part of the URL after "meet.google.com/"
  const urlParts = url.split("meet.google.com/");
  if (urlParts.length < 2) {
    console.error("No meeting ID found in URL:", url);
    return false;
  }

  // Check if there's a unique meeting ID in the URL
  const meetingId = urlParts[1].split("?")[0];
  if (!meetingId) {
    console.error("No meeting ID found in URL:", url);
    return false;
  }

  return true;
}

// Check if the user is in a live Meet session every 5 seconds
setInterval(() => {
  if (isInLiveMeetSession()) {
    startLiveMeetSession();
  }
}, 3000);




// function retrieveFiles() {
//   console.log("Retrieving files from local storage...");
//   chrome.storage.local.get(['uploadedFiles'], (result) => {
//     if (chrome.runtime.lastError) {
//       console.error("Error retrieving files:", chrome.runtime.lastError.message);
//       return;
//     }

//     const files = result.uploadedFiles;
//     if (!files) {
//       console.log("No files found in local storage.");
//       return;
//     }

//     console.log("Files retrieved:", Object.keys(files));


//     if (result.uploadedFiles) {
//       displayFiles(result.uploadedFiles);
//     } else {
//       console.log('No files found in storage.');
//     }
//   });
// }
// retrieveFiles();
