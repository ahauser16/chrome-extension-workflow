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

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'storeFormData') {
    const formData = event.data.data;

    // Open a connection to the IndexedDB database
    const request = self.indexedDB.open('formDataDB', 1);

    request.onerror = (event) => {
      console.error('Error opening database:', event.target.error);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // Create an object store to store form data
      const objectStore = db.createObjectStore('formDataStore', { keyPath: 'id', autoIncrement: true });

      // Create an index for searching form data by a specific property
      objectStore.createIndex('nameIndex', 'name', { unique: false });
    };

    request.onsuccess = (event) => {
      const db = event.target.result;

      // Store form data in the object store
      const transaction = db.transaction('formDataStore', 'readwrite');
      const objectStore = transaction.objectStore('formDataStore');

      const addRequest = objectStore.add(formData);

      addRequest.onsuccess = () => {
        // Respond with a success message
        self.clients.matchAll().then((clients) => {
          clients.forEach((client) => {
            client.postMessage({
              type: 'formDataStored',
              message: 'Form data stored successfully'
            });
          });
        });
      };

      addRequest.onerror = (event) => {
        console.error('Error storing form data:', event.target.error);
      };

      transaction.oncomplete = () => {
        db.close();
      };
    };
  }
});