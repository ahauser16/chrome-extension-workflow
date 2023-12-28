import { getActiveTabURL } from "./utils";

// adding a new bookmark row to the popup
// const addNewBookmark = () => { };

// const viewBookmarks = () => { };

// const onPlay = e => { };

// const onDelete = e => { };

// const setBookmarkAttributes = () => { };

document.addEventListener("DOMContentLoaded", async () => {
    const activeTab = await getActiveTabURL();
    const meetingIdSnippet = tab.url.split("meet.google.com/")[1];
    const meetingId = meetingIdSnippet.split("?")[0];

    const currentMeeting = meetingId;

    if (activeTab.url.includes("meet.google.com/") && currentMeeting) {
        chrome.storage.sync.get([currentMeeting], (data) => {
            const currentMeetingBookmarks = data[currentMeeting] ? JSON.parse(data[currentMeeting]) : [];

            // viewBookmarks(currentMeetingBookmarks);
        });
    } else {  //this else condition occurs when the currentMeeting variable returns a falsey value or when we are not on a Google Meet live session webpage.
        const container = document.getElementsByClassName("container")[0];

        container.innerHTML = '<div class="title">This is not a Google Meet live session page.</div>';
    }
});
