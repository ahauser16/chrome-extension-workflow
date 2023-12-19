console.log("sw-tips.js")

// The setTimeout() or setInterval() methods are commonly used to perform delayed or periodic tasks. However, these APIs can fail because the scheduler will cancel the timers when the service worker is terminated. Instead, extensions can use the chrome.alarms API.

// Start by requesting the "alarms" permission in the manifest. Additionally, to fetch the extension tips from a remote hosted location, you need to request host permission.

//The extension will fetch all the tips, pick one at random and save it to storage. We will create an alarm that will be triggered once a day to update the tip. Alarms are not saved when you close Chrome. So we need to check if the alarm exists and create it if it doesn't.

// Fetch tip & save in storage
const updateTip = async () => {
    const response = await fetch('https://extension-tips.glitch.me/tips.json');
    const tips = await response.json();
    const randomIndex = Math.floor(Math.random() * tips.length);
    return chrome.storage.local.set({ tip: tips[randomIndex] });
};

const ALARM_NAME = 'tip';

// Check if alarm exists to avoid resetting the timer.
// The alarm might be removed when the browser session restarts.
async function createAlarm() {
    const alarm = await chrome.alarms.get(ALARM_NAME);
    if (typeof alarm === 'undefined') {
        chrome.alarms.create(ALARM_NAME, {
            delayInMinutes: 1,
            periodInMinutes: 1440
        });
        updateTip();
    }
}

createAlarm();

// Update tip once a day
chrome.alarms.onAlarm.addListener(updateTip);

//The final step is to add a message handler to our service worker that sends a reply to the content script with the daily tip.// Send tip to content script via messaging
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.greeting === 'tip') {
    chrome.storage.local.get('tip').then(sendResponse);
    return true;
  }
});