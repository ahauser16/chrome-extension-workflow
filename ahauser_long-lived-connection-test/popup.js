//Step 3= request the meeting ID from the background.js (meetingIdAcquisition)

document.addEventListener('DOMContentLoaded', () => {
    chrome.runtime.sendMessage({ type: "GET_MEETING_ID" }, response => {
      document.getElementById('meetingIdDisplay').textContent = response.meetingId || "No active meeting";
    });
  });
  