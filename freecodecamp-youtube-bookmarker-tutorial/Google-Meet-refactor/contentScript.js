console.log("Content script loaded");

(() => {
  let googleMeetLeftControls, googleMeetPlayer;
  let currentMeeting = "";

  const port = chrome.runtime.connect({ name: "notaryConnection" });

  port.onMessage.addListener((msg) => {
    if (msg.type === "NEW_MEETING") {
      currentMeeting = msg.meetingId;
      newMeetingLoaded();
    }
  });

  const newMeetingLoaded = () => {
    const notaryBtnExists = document.getElementsByClassName("notary-btn")[0];
    console.log("New meeting loaded with ID: " + currentMeeting);
    // Additional logic for new meeting
  };

  // You can also send messages to the background script if needed
  // port.postMessage({ ... });
})();
