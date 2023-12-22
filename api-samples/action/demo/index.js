// Copyright 2021 Google LLC
//
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file or at
// https://developers.google.com/open-source/licenses/bsd

/**
 * @param {number} timeout
 * @param {(event: Event) => void} callback
 * @return {(event: Event) => void}
 */
//ANALYSIS ONE
// This mechanism ensures that the callback function is not called immediately but is delayed until a certain amount of time (timeout) has passed without any new events being fired.
// It effectively "debounces" the events, reducing the frequency of callback executions, which can improve performance and responsiveness, especially for events that fire rapidly.
function debounce(timeout, callback) {
  let timeoutID = 0;
  return (event) => {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => callback(event), timeout);
  };
}

// ------------------
// .enable / .disable
// ------------------

// When the user clicks the button with ID toggle-state-button, the extension's action button in the Chrome toolbar will be toggled between enabled and disabled states. This functionality is useful for controlling the availability of the extension's features directly from the extension's user interface.

//ANALYSIS TWO
document
  .getElementById('toggle-state-button')
  .addEventListener('click', async () => {
    // "chrome.action.isEnabled()" is a method from the Chrome Extensions API. It checks whether the extension's action (usually represented by a toolbar icon) is currently enabled and returns a boolean value.  Use the isEnabled method to read the action's current state.

    //NB--> The await keyword is used to wait for the promise returned by this method to resolve.
    let actionEnabled = await chrome.action.isEnabled();
    // when the button is clicked negate the state
    if (actionEnabled) {
      //This is a method from the Chrome Extensions API used to disable the extension's action. When disabled, the action typically appears grayed out and is not interactive.
      chrome.action.disable();
    } else {
      //This is also a method from the Chrome Extensions API. It's used to enable the extension's action, making it active and interactive again.
      chrome.action.enable();
    }
  });

//ANALYSIS THREE
document
  //document.getElementById('popup-options'): This selects the HTML element with the ID popup-options. This element is expected to be a <select> dropdown menu.
  // .addEventListener('change', async (event) => {...}): Adds an event listener for the change event to the selected element. The change event is triggered whenever the selected option in the dropdown changes. The listener is an asynchronous function, indicated by async, allowing the use of await within it.
  .getElementById('popup-options')
  .addEventListener('change', async (event) => {

    //const popup = event.target.value;: When the dropdown's selected option changes, this line retrieves the value of the selected option. "event.target" refers to the element that triggered the event (the <select> element), and "event.target.value" is the value of the currently selected option.
    const popup = event.target.value;

    // chrome.action.setPopup({ popup }): This line calls the "setPopup" method of the "chrome.action" API, setting the popup for the extension's action to the specified path. The popup variable contains the path to the new popup HTML file.

    //await is used to wait for the operation to complete. This is necessary because setPopup is an asynchronous operation that returns a Promise.
    await chrome.action.setPopup({ popup });

    // Show the updated popup path.  After setting the new popup, this line calls a function getCurrentPopup(). While the function's implementation isn't shown in the snippet, it's likely designed to update the UI to display the current popup path or perform some other related action.

    // Again, await is used, indicating that getCurrentPopup is also asynchronous and returns a Promise.
    await getCurrentPopup();
  });


//ANALYSIS FOUR
//The provided function getCurrentPopup is an asynchronous function designed to retrieve the current popup URL set for a Google Chrome extension's action (such as the toolbar icon) and display it in an HTML element.

//async function getCurrentPopup() {...}: This defines an asynchronous function named getCurrentPopup. The async keyword allows the use of await within the function to handle asynchronous operations.
async function getCurrentPopup() {

  //   step A-->Retrieves the current popup URL set for the extension's action.
  //await chrome.action.getPopup({}): This line calls the getPopup method of the chrome.action API. The method retrieves the URL of the current popup set for the extension's action.
  // await is used to wait for the Promise returned by getPopup to resolve. The resolved value (the URL of the current popup) is stored in the popup variable.
  const popup = await chrome.action.getPopup({});//--> popup=current popup URL

  // Log the retrieved popup URL to the console
  console.log("Current popup URL:", popup);

  // step B--> Updates an input field (or similar element) with the ID current-popup-value to display this URL.
  //This line selects an HTML element with the ID current-popup-value. This element is expected to be an input field or similar.
  // It then sets the value of this element to the popup URL retrieved from the chrome.action.getPopup call. This updates the UI to display the current popup URL.
  document.getElementById('current-popup-value').value = popup;//-->sets value of an input element to the current popup URL.

  //step C--> Returns the URL for potential use elsewhere in the script.
  //The function returns the popup URL. This allows other parts of the script to use the URL returned by getCurrentPopup if needed.
  return popup;
}


//ANALYSIS FIVE
//The provided JavaScript function showCurrentPage is designed to display the current popup page set for a Chrome extension's action in the user interface of the extension. It uses the getCurrentPopup utility function to retrieve the current popup URL and then updates a dropdown menu to reflect this selection.

//This defines an asynchronous function named showCurrentPage. The async keyword allows the use of await within the function.
async function showCurrentPage() {


  const popup = await getCurrentPopup();
  let pathname = '';
  if (popup) {
    pathname = new URL(popup).pathname;
  }

  const options = document.getElementById('popup-options');
  const option = options.querySelector(`option[value="${pathname}"]`);
  option.selected = true;
}

// Populate popup inputs on page load
showCurrentPage();

// ----------
// .onClicked
// ----------

// If a popup is specified, our on click handler won't be called. We declare it here rather than in
// the `onclicked-button` handler to prevent the user from accidentally registering multiple
// onClicked listeners.
chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({ url: 'https://html5zombo.com/' });
});

document
  .getElementById('onclicked-button')
  .addEventListener('click', async () => {
    // Our listener will only receive the action's click event after clear out the popup URL
    await chrome.action.setPopup({ popup: '' });
    await showCurrentPage();
  });

document
  .getElementById('onclicked-reset-button')
  .addEventListener('click', async () => {
    await chrome.action.setPopup({ popup: 'popups/popup.html' });
    await showCurrentPage();
  });

// ----------
// badge text
// ----------

async function showBadgeText() {
  const text = await chrome.action.getBadgeText({});
  document.getElementById('current-badge-text').value = text;
}

// Populate badge text inputs on page load
showBadgeText();

document
  .getElementById('badge-text-input')
  .addEventListener('input', async (event) => {
    const text = event.target.value;
    await chrome.action.setBadgeText({ text });

    showBadgeText();
  });

document
  .getElementById('clear-badge-button')
  .addEventListener('click', async () => {
    await chrome.action.setBadgeText({ text: '' });

    showBadgeText();
  });

// --------------------------
// get/set badge text color
// --------------------------
async function showBadgeTextColor() {
  const color = await chrome.action.getBadgeTextColor({});
  document.getElementById('current-badge-txt-color').value = JSON.stringify(
    color,
    null,
    0
  );
}

showBadgeTextColor();

document
  .getElementById('set-badge-txt-color-button')
  .addEventListener('click', async () => {
    // To show off this method, we must first make sure the badge has text
    let currentText = await chrome.action.getBadgeText({});
    if (!currentText) {
      chrome.action.setBadgeText({ text: 'Test' });
      showBadgeText();
    }

    // Next, generate a random RGBA color
    const color = [0, 0, 0].map(() => Math.floor(Math.random() * 255));

    // Use the default background color ~10% of the time.
    //
    // NOTE: Alpha color cannot be set due to crbug.com/1184905. At the time of writing (Chrome 89),
    // an alpha value of 0 sets the default color while a value of 1-255 will make the RGB color
    // fully opaque.
    if (Math.random() < 0.1) {
      color.push(0);
    } else {
      color.push(255);
    }

    chrome.action.setBadgeTextColor({ color });
    showBadgeTextColor();
  });

document
  .getElementById('reset-badge-txt-color-button')
  .addEventListener('click', async () => {
    chrome.action.setBadgeTextColor({ color: '#000000' });
    showBadgeTextColor();
  });

// ----------------------
// badge background color
// ----------------------

async function showBadgeColor() {
  const color = await chrome.action.getBadgeBackgroundColor({});
  document.getElementById('current-badge-bg-color').value = JSON.stringify(
    color,
    null,
    0
  );
}

// Populate badge background color inputs on page load
showBadgeColor();

document
  .getElementById('set-badge-background-color-button')
  .addEventListener('click', async () => {
    // To show off this method, we must first make sure the badge has text
    let currentText = await chrome.action.getBadgeText({});
    if (!currentText) {
      chrome.action.setBadgeText({ text: 'hi :)' });
      showBadgeText();
    }

    // Next, generate a random RGBA color
    const color = [0, 0, 0].map(() => Math.floor(Math.random() * 255));

    // Use the default background color ~10% of the time.
    //
    // NOTE: Alpha color cannot be set due to crbug.com/1184905. At the time of writing (Chrome 89),
    // an alpha value of 0 sets the default color while a value of 1-255 will make the RGB color
    // fully opaque.
    if (Math.random() < 0.1) {
      color.push(0);
    } else {
      color.push(255);
    }

    chrome.action.setBadgeBackgroundColor({ color });
    showBadgeColor();
  });

document
  .getElementById('reset-badge-background-color-button')
  .addEventListener('click', async () => {
    chrome.action.setBadgeBackgroundColor({ color: [0, 0, 0, 0] });
    showBadgeColor();
  });

// -----------
// action icon
// -----------

const EMOJI = ['confetti', 'suit', 'bow', 'dog', 'skull', 'yoyo', 'cat'];

let lastIconIndex = 0;
document
  .getElementById('set-icon-button')
  .addEventListener('click', async () => {
    // Clear out the badge text in order to make the icon change easier to see
    chrome.action.setBadgeText({ text: '' });

    // Randomly pick a new icon
    let index = lastIconIndex;
    index = Math.floor(Math.random() * EMOJI.length);
    if (index === lastIconIndex) {
      // Dupe detected! Increment the index & modulo to make sure we don't go out of bounds
      index = (index + 1) % EMOJI.length;
    }
    const emojiFile = `images/emoji-${EMOJI[index]}.png`;
    lastIconIndex = index;

    // There are easier ways for a page to extract an image's imageData, but the approach used here
    // works in both extension pages and service workers.
    const response = await fetch(chrome.runtime.getURL(emojiFile));
    const blob = await response.blob();
    const imageBitmap = await createImageBitmap(blob);
    const osc = new OffscreenCanvas(imageBitmap.width, imageBitmap.height);
    let ctx = osc.getContext('2d');
    ctx.drawImage(imageBitmap, 0, 0);
    const imageData = ctx.getImageData(0, 0, osc.width, osc.height);

    chrome.action.setIcon({ imageData });
  });

document.getElementById('reset-icon-button').addEventListener('click', () => {
  const manifest = chrome.runtime.getManifest();
  chrome.action.setIcon({ path: manifest.action.default_icon });
});

// -------------
// get/set title
// -------------

const titleInput = document.getElementById('title-input');
titleInput.addEventListener(
  'input',
  debounce(200, async (event) => {
    const title = event.target.value;
    chrome.action.setTitle({ title });

    showActionTitle();
  })
);

document
  .getElementById('reset-title-button')
  .addEventListener('click', async () => {
    const manifest = chrome.runtime.getManifest();
    let title = manifest.action.default_title;

    chrome.action.setTitle({ title });

    showActionTitle();
  });

async function showActionTitle() {
  let title = await chrome.action.getTitle({});

  // If empty, the title falls back to the name of the extension
  if (title === '') {
    // … which we can get from the extension's manifest
    const manifest = chrome.runtime.getManifest();
    title = manifest.name;
  }

  document.getElementById('current-title').value = title;
}

// Populate action title inputs on page load
showActionTitle();
