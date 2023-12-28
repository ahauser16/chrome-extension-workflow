console.log("Content script loaded");

(() => {
  let googleMeetLeftControls, googleMeetPlayer;
  let currentMeeting = "";

  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, value, meetingId } = obj;

    if (type === "NEW") {
      currentMeeting = meetingId;
      newMeetingLoaded();
    }
  });

  const newMeetingLoaded = async () => {

    const notaryBtnExists = document.getElementsByClassName("notary-btn")[0];

    console.log("content-script.js received meetingId:" + notaryBtnExists);

  };
})();
