# Inject scripts into the active tab

Simplify the styling of the current page by clicking the extension toolbar icon.


[Inject scripts into the active tab](https://developer.chrome.com/docs/extensions/get-started/tutorial/scripts-activetab).

## Overview
In this guide, we’re going to explain how to do the following:

- Use the extension service worker as the event coordinator.
- Preserve user privacy through the "activeTab" permission.
- Run code when the user clicks the extension toolbar icon.
- Insert and remove a stylesheet using the Scripting API.
- Use a keyboard shortcut to execute code.


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
