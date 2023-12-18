# Focus Mode Chrome Extension Tutorial


This README file provides a step-by-step guide on building a Chrome extension called "Focus Mode," which simplifies the styling of Chrome's official Extensions and Chrome Web Store documentation pages for easier reading.

[Focus Mode Chrome Extension Tutorial](https://developer.chrome.com/docs/extensions/get-started/tutorial/scripts-activetab).

## Overview
The "Focus Mode" extension is designed to enhance the readability of documentation pages by simplifying their styling. This tutorial covers:

- Using the extension service worker as an event coordinator.
  - https://developer.chrome.com/docs/extensions/develop/concepts/service-workers
- Preserving user privacy with the "activeTab" permission.
- Running code when the user clicks the extension toolbar icon.
- Inserting and removing a stylesheet using the Scripting API.
- Using a keyboard shortcut to execute code.

## Build the Extension
### Step 1: Add the Extension Data and Icons
#### First, create a manifest.json file with the following content:

```
{
  "manifest_version": 3,
  "name": "Focus Mode",
  "description": "Enable focus mode on Chrome's official Extensions and Chrome Web Store documentation.",
  "version": "1.0",
  "icons": {
    "16": "images/icon-16.png",
    "32": "images/icon-32.png",
    "48": "images/icon-48.png",
    "128": "images/icon-128.png"
  }
}
```

#### Second, create an `images` folder and download the icons from GitHub.

---

### Step 2: Initialize the Extension
#### First, register the service worker in `manifest.json`:

```
{
  ...
  "background": {
    "service_worker": "background.js"
  },
  ...
}
```

#### Second, create `background.js` with the following code:

```
chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});
```

#### the `chrome.runtime` API, `onInstalled` event and `addListener` event are exclusive to Chrome extensions.

##### The `onInstalled` event is fired when the extension is installed, updated, or when Chrome is updated.

- Event Trigger: The `onInstalled` event is triggered when the Chrome extension is installed for the first time, when it is updated to a new version, or when the Chrome browser itself is updated.

- Purpose: This event allows developers to perform specific actions at these critical moments in the lifecycle of the extension. Common uses include setting up or migrating preferences and databases, initializing default states, or performing one-time tasks like showing a welcome message or tutorial.

- Usage: To respond to this event, developers use `addListener`, attaching a callback function to `chrome.runtime.onInstalled` which is executed when the `onInstalled` event occurs.

##### The addListener method in the context of Chrome Extensions is used to register a callback function for a specific event in the Chrome Extensions API. It's a way to tell the extension to listen for certain events and define what actions should be taken when those events occur. Here's a breakdown of its functionality:

- Event Listening: `addListener` is used to attach a listener to various events provided by the Chrome Extensions API. These events can be related to the browser's runtime environment, tabs, windows, web requests, and more.
- Callback Function: When you use `addListener`, you provide a `callback function`. This function is executed whenever the specified event occurs. The nature of the `callback function` depends on the event it's associated with.
- Parameters: The `callback function` can receive parameters that provide more information about the event. For example, in the case of `chrome.runtime.onInstalled`, the `callback` receives a `details` object that contains information about the installation event, such as whether the extension was installed, updated, etc.
- Usage in Chrome Extensions: `addListener` is a common method in event-driven programming and is especially useful in Chrome Extensions for handling browser events. For instance, you might use it to execute a script **when a tab is updated**, **when the extension is installed**, or **when a message is received from a content script**.

### Step 3: Enable the Extension Action
#### First, declare the extension action in `manifest.json`:

```
{
  ...
  "action": {
    "default_icon": {
      "16": "images/icon-16.png",
      "32": "images/icon-32.png",
      "48": "images/icon-48.png",
      "128": "images/icon-128.png"
    }
  },
  ...
}
```

### Step 4: Track the State of the Current Tab
#### First, add code to background.js to track the state and toggle the extension:

```
const extensions = 'https://developer.chrome.com/docs/extensions';
const webstore = 'https://developer.chrome.com/docs/webstore';

chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.startsWith(extensions) || tab.url.startsWith(webstore)) {
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    const nextState = prevState === 'ON' ? 'OFF' : 'ON';
    
    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState,
    });
    ...
});
```

### Step 5: Add or Remove the Stylesheet
#### NB --> the CSS from the tutorial did not remove the left-side bar.  The central github repository had the working code which is below. <--NB.
#### First, create focus-mode.css with your desired styles.
#### Second, add code to background.js to insert or remove the stylesheet:

```
...
if (nextState === "ON") {
  await chrome.scripting.insertCSS({
    files: ["focus-mode.css"],
    target: { tabId: tab.id },
  });
} else if (nextState === "OFF") {
  await chrome.scripting.removeCSS({
    files: ["focus-mode.css"],
    target: { tabId: tab.id },
  });
}
...
```

### OPTIONAL: Assign a Keyboard Shortcut

#### First, add a shortcut to `manifest.json`:

```
{
  ...
  "commands": {
    "_execute_action": {
      "suggested_key": {
        "default": "Ctrl+B",
        "mac": "Command+B"
      }
    }
  }
}
```

## Test the Extension

- Load your extension locally as an unpacked extension.
- Test the extension on a documentation page by clicking the extension action or using the keyboard shortcut.

## Potential Enhancements
- Improve the CSS stylesheet.
- Assign a different keyboard shortcut.
- Change the layout of your favorite blog or documentation site.



### Extension Analysis: Reading Time Calculation for Articles
This script is designed to calculate the reading time for an article on a webpage and display it. Below is a detailed line-by-line analysis:

### `content.js` Breakdown
### 1. Selecting the Article Element: 
```
javascript
const article = document.querySelector("article");
```
This line uses `document.querySelector` to select the first `<article>` element from the DOM (Document Object Model). The ***article*** variable will hold a reference to this element.

---
### 2. Null Check: 
```
if (article) {
```
This "if statement" checks if the ***article*** variable is not `null`. `document.querySelector` returns `null` if no element matches the selector. This check ensures that the following code only runs if an `<article>` element is found on the page.


## Running this extension

1. Clone this repository.
2. Load this directory in Chrome as an [unpacked extension](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked).
