(() => {
  let googleMeetLeftControls, googleMeetVideo;
  let currentMeeting = "";

  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, value, meetingId } = obj;

    if (type === "NEW") {
      currentMeeting = meetingId;
      newMeetingLoaded();
    }
  });

  const newMeetingLoaded = () => {
    const notaryBtnExists = document.getElementsByClassName("notary-btn")[0];

    console.log("content-script.js received meetingId:" + meetingId);

    console.log("content-script.js received meetingId:" + notaryBtnExists);
  }

})();

// const button = new DOMParser().parseFromString(
//   '<button>Click to open side panel</button>',
//   'text/html'
// ).body.firstElementChild;
// button.addEventListener('click', function () {
//   chrome.runtime.sendMessage({ type: 'open_side_panel' });
// });
// document.body.append(button);
