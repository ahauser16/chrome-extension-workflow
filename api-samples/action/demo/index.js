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


//ANALYSIS FOUR START
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
//OVERALL SUMMARY: In summary, getCurrentPopup acts as a utility function within the extension, providing a specific piece of information (the current popup URL) to other parts of the extension that might require it. This approach enhances code organization and maintainability by avoiding duplication of the same logic across multiple functions.
//ANALYSIS FOUR END



//ANALYSIS FIVE START
//The provided JavaScript function showCurrentPage is designed to display the current popup page set for a Chrome extension's action in the user interface of the extension. It uses the getCurrentPopup utility function to retrieve the current popup URL and then updates a dropdown menu to reflect this selection.

//This defines an asynchronous function named showCurrentPage. The async keyword allows the use of await within the function.
async function showCurrentPage() {//-->Function Declaration:

  //await getCurrentPopup(): This line calls the previously discussed getCurrentPopup function, which returns the current popup URL set for the extension's action.
  // The await keyword is used to wait for the Promise returned by getCurrentPopup to resolve, and the resolved value (the current popup URL) is stored in the popup variable.
  const popup = await getCurrentPopup();//-->Retrieving the Current Popup URL:

  //   This block checks if popup has a value (i.e., if a popup URL is set).
  // If popup is not empty, it creates a new URL object from the popup string and extracts the pathname property. The pathname is the part of the URL that comes after the domain name.
  let pathname = '';//-->Extracting the Pathname from the URL:
  if (popup) {
    pathname = new URL(popup).pathname;
  }

  //document.getElementById('popup-options'): This selects the dropdown menu element with the ID popup-options.
  const options = document.getElementById('popup-options');//-->Updating the Dropdown Menu

  //options.querySelector(option[value="${pathname}"]): This finds the <option> element within the dropdown that has a value attribute matching the pathname.
  const option = options.querySelector(`option[value="${pathname}"]`);

  //option.selected = true;: This sets the found option as the selected one in the dropdown menu.
  option.selected = true;
}

//This line calls the showCurrentPage function when the script is loaded. It ensures that the dropdown menu reflects the current popup setting as soon as the page (likely a settings or options page for the extension) is loaded.
showCurrentPage();

//OVERALL BEHAVIOR: When "showCurrentPage" is called it: (i) Retrieves the current popup URL set for the extension's action, (ii) Extracts the pathname from this URL and (iii) Updates a dropdown menu (popup-options) to reflect the current popup setting based on this pathname.

//This function is likely called when the extension's options page is loaded, ensuring that the dropdown menu shows the correct current selection as soon as the page is displayed.
//ANALYSIS FIVE END


// ----------
// .onClicked
// ----------

//ANALYSIS SIX START
//The code below sets up an event listener for when the extension's action (typically represented by an icon in the browser toolbar) is clicked.

//chrome.action.onClicked.addListener(() => { ... });: This line adds an event listener to the extension's action using the onClicked event of the chrome.action API.
// When the extension's action is clicked, the provided callback function (() => { ... }) is executed.
chrome.action.onClicked.addListener(() => {//-->Event Listener for Action Click

  //Inside the callback function, chrome.tabs.create({ url: 'https://html5zombo.com/' }); is called. This line instructs the browser to open a new tab with the specified URL ('https://html5zombo.com/').
  chrome.tabs.create({ url: 'https://html5zombo.com/' });//-->Callback Function Behavior:
});

// ORIGINAL AUTHOR'S COMMENT-->If a popup is specified, on our click handler won't be called. We declare it here rather than in the `onclicked-button` handler to prevent the user from accidentally registering multiple onClicked listeners.

//MY CUSTOM FUNCTION THAT toggles between popup and onClicked behavior
// Function to toggle between popup and onClicked behavior
function popOrClick(usePopup) {
  // Ternary expression to determine behavior
  usePopup
    ? chrome.action.setPopup({ popup: 'popup.html' })
    : chrome.action.onClicked.addListener(() => {
      console.log('Action icon clicked');
    });
}

// Example usage
popOrClick(true); // Sets the popup
popOrClick(false); // Adds onClicked listener
//************************************************************** */
//EXPLANATION:
// The popOrClick function takes one parameter, usePopup, which is expected to be a boolean.
// The ternary expression usePopup ? ... : ... checks the value of usePopup.
// If usePopup is true, it executes chrome.action.setPopup({ popup: 'popup.html' }), setting the popup to popup.html.
// If usePopup is false, it executes chrome.action.onClicked.addListener(...), adding a listener that logs a message to the console when the action icon is clicked.
// The function allows you to easily switch between having a popup and having a click listener based on the usePopup value.
//USAGE:
// To set the popup, call popOrClick(true).
// To add an onClicked listener instead, call popOrClick(false).
// This function provides a convenient way to toggle the behavior of the extension's action based on different conditions or preferences.
//************************************************************** */



document
  //document.getElementById('onclicked-button'): This part of the code selects an HTML element with the ID onclicked-button. getElementById is a standard DOM method that retrieves an element from the HTML document based on its ID.
  .getElementById('onclicked-button')//-->target the html element with id "onclicked-button"

  //.addEventListener('click', async () => { ... }): This method attaches an event listener to the selected element. The listener is set to respond to click events. The use of async before the function indicates that it's an asynchronous function, which allows the use of await within it.
  .addEventListener('click', async () => {//-->add an event listener & pass in an async callback

    // await chrome.action.setPopup({ popup: '' });: This line calls the setPopup method from the Chrome Extensions API. It sets the popup for the extension's action to an empty string (''), effectively removing any popup that might have been set previously. The await keyword is used to wait for the operation to complete, ensuring that the popup is reset before moving on to the next line of code.  This way our listener will only receive the action's click event after the popup URL is reset.

    //NB!!!that chrome.action.setPopup({ popup: '' }) not only "resets" the popup but effectively disables it. After this line executes, clicking the extension's action will no longer open a popup until a new popup is set.
    await chrome.action.setPopup({ popup: '' });//-->Resetting ( disabling) the Popup

    //This function call (presumably to a function defined elsewhere in your script) is responsible for updating the UI to reflect the current state of the popup. Since showCurrentPage is an asynchronous function, await is used to ensure that any asynchronous operations within it are completed before proceeding.
    await showCurrentPage();//-->Updating the Current Page Display:
  });




document
  .getElementById('onclicked-reset-button')//(a) Targeting the HTML Element=identify the specific element (a button, in this case) that the subsequent event listener will be attached to.

  .addEventListener('click', async () => {//(b) Adding an Event Listener-->define what actions should be taken when the user clicks on the button.

    await chrome.action.setPopup({ popup: 'popups/popup.html' });//(c) Callback Function Behavior=change the popup that will be displayed when the extension's action icon is clicked.

    await showCurrentPage();//(d) Updating the Current Page Display=update the UI of the extension's page to reflect the new state of the popup. This could involve updating a dropdown menu, displaying a message, or other UI changes.
  });

//HOLES IN MY REASONING: 
//Purpose of showCurrentPage(): The call to showCurrentPage() after setting the popup suggests that this function updates the UI elements, possibly to reflect the new state of the popup. This could mean updating a dropdown or other visual indicators to show that the popup path has been reset to 'popups/popup.html'.

// Asynchronous Operations: The use of async and await ensures that the popup is set before the page is updated, maintaining the correct order of operations, especially important in asynchronous programming.


// ----------------------------------------------------------------------THE NOTES FOR BADGE TEXT HAS BEEN REFORMATTED INTO THE ENOTARY README
// badge text------------------------------------------------------------
// ----------------------------------------------------------------------

async function showBadgeText() {
  const text = await chrome.action.getBadgeText({});//(a) retrieves the current text of the badge on the extension's action (icon in the toolbar).

  //NB--> The '{}' passed to 'getBadgeText' is an empty object, which is the required syntax for this API method. It DOES NOT reset the text; rather, it's likely used to specify the context (like a specific tab) from which the badge text should be retrieved. If no context is specified, it gets the badge text for the extension's action globally.

  //NB--> Also, since 'await' is used to wait for the Promise returned by 'getBadgeText' to resolve then the resolved value (the current badge text) is stored in the 'text' variable.
  document.getElementById('current-badge-text').value = text;//(b) selects an HTML element with the ID current-badge-text and sets its value property to the retrieved badge text (text), which at this point is a string and not a Promise.
}

// Populate badge text inputs on page load
showBadgeText();//(c) done to initialize the state or UI when the page or extension popup loads.
//******************************** */


document
  .getElementById('badge-text-input')//(a)-->
  //selects an HTML element with the ID badge-text-input. This element is expected to be an input field where the user can type the badge text.

  .addEventListener('input', async (event) => {//(b)-->Adding an Event Listener:
    //An event listener is added to the selected input field. The listener responds to input events, which are triggered every time the user types or changes the text in the input field. The async keyword indicates that the callback function is asynchronous, allowing the use of await within it.

    const text = event.target.value;//(c)-->Handling the Input Event:
    //this line retrieves the current value of the input field (the text typed by the user). 'event.target' refers to the element that triggered the event (the input field), and 'event.target.value' is the text currently entered in that field.

    await chrome.action.setBadgeText({ text });//(d)-->Setting the Badge Text (Asynchronous):
    //this line calls the 'setBadgeText' method from the Chrome Extensions API to set the badge text of the extension's action to the text entered by the user. The 'await' keyword is used to ensure that the operation completes before moving to the next line of code.

    showBadgeText();//(e)-->Updating the Badge Text Display:
    //After setting the new badge text, this line calls the 'showBadgeText' function. While the implementation details of 'showBadgeText' are not provided, it is likely responsible for updating the UI to display the current badge text, possibly in another part of the extension's interface.
  });


//OVERALL SUMMARY:
// The provided code snippet below is designed to clear the badge text of a Chrome extension's action (such as the icon in the browser toolbar) when a specific button is clicked.

//When the user clicks the button with the ID clear-badge-button, the event listener triggers. It executes an asynchronous function that clears the badge text of the extension's action by setting it to an empty string. After clearing the badge text, it calls showBadgeText to update the UI, likely to indicate that the badge text has been cleared.

// This functionality is useful in scenarios where an extension uses badge text to display information (like notifications or counts) and needs a way to reset or clear this information based on user interaction.
document
  .getElementById('clear-badge-button')//(a)-->Selecting the HTML Element:
//This line selects an HTML element with the ID 'clear-badge-button'. This element is expected to be a button in the extension's user interface.

  .addEventListener('click', async () => {//(b)-->Adding an Event Listener:
    //An event listener is added to the selected button. The listener is set to respond to 'click' events. The 'async' keyword before the function indicates that it's an asynchronous function, which allows the use of 'await' within it.

    await chrome.action.setBadgeText({ text: '' });//(c)-->Handling the Click Event (Asynchronous):
    //This line calls the 'setBadgeText' method from the Chrome Extensions API to clear the badge text of the extension's action. It does this by setting the text property to an empty string (''). The await keyword is used to ensure that the operation completes before moving to the next line of code.

    showBadgeText();//(d)-->Updating the Badge Text Display:
    //this line calls the showBadgeText function. This function is likely responsible for updating the UI to reflect the change in the badge text. While the implementation of showBadgeText is not shown, it presumably updates an element in the UI to show that the badge text is now empty.
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
