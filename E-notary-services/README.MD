# E-NOTARY SERVICES
#### Currently this README contains notes from learning how the Google Chrome Extension Github repository codebase works.

# Opening the side panel through a user interaction

This example demonstrates using [`chrome.sidePanel.open()`](https://developer.chrome.com/docs/extensions/reference/sidePanel/#method-open) to open a global side panel through a context menu click and a tab-specific side panel by clicking a button in an extension page or a button click injected by a content script. This feature will be available starting **Chrome 116**.

## Running this extension

1. Clone this repository.
2. Load this directory in Chrome as an [unpacked extension](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked).

### Test with a context menu

1. Navigate to any page, like [example.com](http://example.com/).
2. Right-click on any word.
3. Choose the context menu "Open side panel".

### Test in an extension page

1. The extension page will open when you install the extension.
2. Click on the "Open side panel" button.

### Test by clicking on an injected element

1. Navigate to [google.com](http://www.google.com/).
2. Scroll to the very bottom of the page.
3. Click on the "Open side panel" button.

## API Sample - ACTION
### notes about manipulating text in the extension's Action (badge icon in toolbar)
### [API Sample - ACTION github](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/action)

### `debounce` utility function:
#### This mechanism ensures that the callback function is not called immediately but is delayed until a certain amount of time (timeout) has passed without any new events being fired.  It effectively "debounces" the events, reducing the frequency of callback executions, which can improve performance and responsiveness, especially for events that fire rapidly.

```
function debounce(timeout, callback) {
  let timeoutID = 0;
  return (event) => {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => callback(event), timeout);
  };
}
```
---

### toggling state of Action buton with `.enable` and `.disable`
### The provided code snippet is designed to toggle the enabled state of a Chrome extension's action (such as the icon in the browser toolbar) when a specific button is clicked. 

```
document
  .getElementById('toggle-state-button')
  .addEventListener('click', async () => {
    let actionEnabled = await chrome.action.isEnabled();        if (actionEnabled) {
        chrome.action.disable();
    } else {
      chrome.action.enable();
    }
});
```

#### Code Analysis
##### 1. Selecting the Button Element:
`document.getElementById('toggle-state-button')` this selects an HTML element with the ID `toggle-state-button` which is expected to be a button in the extension's user interface.

##### 2. Adding an Event Listener for Click Events:
`.addEventListener('click', async () => {` adds an event listener to the selected button which is set to respond to `click` events. The `async` keyword before the function indicates that it's an asynchronous function, which allows the use of `await` within it.

##### 3. Handling the Click Event (Asynchronous):
##### (within the callback function)
- `let actionEnabled = await chrome.action.isEnabled();` this  calls the `isEnabled` method from the Chrome Extensions API to check if the extension's action is currently enabled. The `await` keyword is used to wait for the Promise returned by `isEnabled` to resolve. The resolved value (a boolean indicating whether the action is enabled) is stored in the `actionEnabled` variable.
  
- `if (actionEnabled) { chrome.action.disable(); } else { chrome.action.enable(); }` this conditional statement checks the value of `actionEnabled`. If the action is currently enabled (`actionEnabled` is `true`), it calls `chrome.action.disable()` to disable the action. If the action is not enabled (`actionEnabled` is `false`), it calls `chrome.action.enable()` to enable it.

#### Functionality and Usefulness:
- **Toggling Action State**: The primary purpose of this snippet is to provide a way for users to toggle the enabled state of the extension's action. Clicking the `toggle-state-button` will either enable or disable the action, depending on its current state.
- **User Interaction and Immediate Feedback**: This functionality enhances user interaction by providing a straightforward way to control the state of the extension's action. It allows users to enable or disable the action with a single click, seeing the immediate effect of their action.
- **Dynamic Extension Behavior**: By enabling or disabling the action, the snippet allows for dynamic changes in the behavior of the extension. For example, a disabled action might not show a popup or respond to clicks in the same way as when it's enabled.
- **In summary**, this code is an essential part of the extension's functionality that deals with enabling or disabling the action. It provides a user-friendly and efficient way to control the state of the action, ensuring that the extension's behavior can be dynamically adjusted based on user preferences or other conditions.
---

### Popup update from user input
#### The provided code snippet is designed to update the popup of a Chrome extension's action (such as the icon in the browser toolbar) based on a user's selection from a dropdown menu. 

```
document
    .getElementById('popup-options')
    .addEventListener('change', async (event) => {
        const popup = event.target.value;
        await chrome.action.setPopup({ popup });
        await getCurrentPopup();
    });
```

#### Analysis
##### 1. Selecting the Dropdown Menu Element:

`document.getElementById('popup-options')` selects an HTML element with the ID `popup-options`. This element is expected to be a dropdown menu (`<select>` element) in the extension's user interface.

##### 2. Adding an Event Listener for Change Events:

`.addEventListener('change', async (event) => { ... })` adds an event listener to the dropdown menu. The listener responds to change events, which are triggered when the user selects a different option in the dropdown. The `async` keyword indicates that the callback function is asynchronous, allowing the use of `await` within it.

##### 3. Handling the Change Event (Asynchronous):

##### 3a. Inside the callback function

- `const popup = event.target.value;` this retrieves the value of the selected option in the dropdown menu. 
- `event.target` refers to the element that triggered the `event` (the dropdown menu), and `event.target.value` is the value of the currently selected option.
- `await chrome.action.setPopup({ popup });`  this calls the `setPopup` method from the Chrome Extensions API to set the popup for the extension's action to the selected option's value. The `await` keyword is used to ensure that the operation completes before moving to the next line of code.

##### 4. Refreshing the Popup Display:

`await getCurrentPopup();` after setting the new popup, this line calls the `getCurrentPopup` function. While the implementation of `getCurrentPopup` is not shown, it is likely responsible for updating the UI to display the current popup setting, possibly in another part of the extension's interface.

#### Functionality and Usefulness:

- **Dynamic Popup Update**: The primary purpose of this snippet is to allow users to change the popup associated with the extension's action dynamically. As the user selects a different option from the popup-options dropdown, the popup displayed when clicking the extension's action icon is updated accordingly.
- **User Interaction and Feedback**: This functionality enhances user interaction by providing a way to customize the behavior of the extension's action. It allows users to see the immediate effect of their selection on the extension's popup.
- **Synchronization with Extension State**: By calling getCurrentPopup after updating the popup, the snippet ensures that any other UI elements that display the current popup setting are also updated, maintaining consistency across the extension's interface.
- **In summary**, this code snippet plays a crucial role in the interactivity and customization of the extension's popup feature. It provides a responsive and user-friendly way for users to modify the popup associated with the extension's action and see the immediate effect of their changes. This snippet, combined with a function like `getCurrentPopup`, forms a comprehensive system for managing the popup in the extension, allowing for both manual updates and real-time feedback.

---

### Popup URL retrieval & display
#### The provided code snippet defines an asynchronous function named `getCurrentPopup` that retrieves the current popup URL set for a Chrome extension's action and updates a specific element in the extension's user interface to display this URL. 

```
async function getCurrentPopup() {
    const popup = await chrome.action.getPopup({});
    document.getElementById('current-popup-value').value = popup;
    return popup;
}
```

#### Analysis
##### 1. Asynchronous Function Declaration:
`async function getCurrentPopup() {  }` an asynchronous function declaration indicated by the `async` keyword allowing the use of await within its body.

##### 2. Retrieving the Current Popup URL:
`const popup = await chrome.action.getPopup({});` this calls the `getPopup` method from the Chrome Extensions API to retrieve the current popup URL set for the extension's action. The method is called with an empty object `{}`, which typically means it retrieves the popup URL in a global context (not specific to any tab). The `await` keyword is used to pause the function execution until the `getPopup` method completes and returns the popup URL, which is then stored in the `popup` variable.

##### 3. Updating the UI Element:

`document.getElementById('current-popup-value').value = popup;` selects an HTML element with the ID `current-popup-value` and sets its value property to the retrieved popup URL. This element is expected to be an input field or a similar UI component where the popup URL is displayed.

##### 4. Returning the Popup URL:
`return popup;` returns the retrieved popup URL which allows other parts of the extension's script to use the current popup URL, for example, to make decisions or further update the UI based on this value.

#### Functionality and Usefulness: utility function

- **Displaying Current Popup URL**: The primary purpose of this function is to fetch and display the current popup URL in the extension's UI. This is useful for keeping the user informed about the current popup that is set for the extension's action, especially in settings or options pages of the extension.
- **User Interface Synchronization**: By updating the `current-popup-value` element with the popup URL, the function ensures that the extension's UI is synchronized with its current popup setting. This enhances the user experience by providing immediate and accurate feedback.
- **In summary**, the `getCurrentPopup` function is **utility function** that deals with popup management. It ensures that the current popup URL is fetched and displayed appropriately in the extension's UI, providing a clear and immediate reflection of the extension's current popup setting. This function, along with others that manage the popup setting, forms a comprehensive system for managing and reflecting the popup URL in the extension's user interface.

---

### Display Current Popup
#### The provided code snippet defines an asynchronous function named `showCurrentPage` that retrieves the current popup URL set for a Chrome extension's action, extracts its pathname, and updates a dropdown menu to reflect the current selection based on this pathname. 

```
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
showCurrentPage()
```

#### Analysis
##### 1. Asynchronous Function Declaration:
`async function showCurrentPage() { }` This declares an asynchronous function named `showCurrentPage`. The `async` keyword indicates that the function can perform asynchronous operations, allowing the use of `await` within its body.


##### 2. Retrieving the Current Popup URL:
`const popup = await getCurrentPopup();` this function calls `getCurrentPopup`, an asynchronous function that retrieves the current popup URL set for the extension's action. The `await` keyword is used to pause the execution of `showCurrentPage` until `getCurrentPopup` completes and returns the popup URL.

##### 3. Extracting the Pathname from the URL:
- 3a.  `let pathname = '';` initializes a variable pathname by assigning an empty string to it.
- 3b. `if (popup) { pathname = new URL(popup).pathname; }` a conditional statement with the ternary logic: if the `popup` variable contains a URL (as opposed to being empty), the function creates a new `URL` object from this string and extracts its `pathname` property. The `pathname` is the part of the URL that comes after the domain name.

##### 4. Updating the Dropdown Menu:
- `const options = document.getElementById('popup-options');` this selects the dropdown menu element with the ID `popup-options`.
- `const option = options.querySelector(option[value="${pathname}"]);` this finds the `<option>` element within the dropdown that has a `value` attribute matching the `pathname`.
- `option.selected = true;` This sets the found option as the selected one in the dropdown menu.

##### 5. Function Invocation:

- `showCurrentPage();` this calls the `showCurrentPage` function immediately after its definition. This is a common practice for **initialization functions**, ensuring that the dropdown menu is updated to reflect the current popup setting as soon as the script runs (e.g., when the extension's options page or popup is loaded).

#### Functionality and Usefulness: initialization function
- **Immediate UI Update**: The immediate invocation of `showCurrentPage()` after its declaration ensures that the dropdown menu is updated with the current popup setting right when the page or extension popup loads. This provides a clear and immediate reflection of the extension's current state.
- **Dynamic Popup URL Handling**: The function dynamically handles popup URLs, updating the UI based on the current setting. It enhances user interaction by providing accurate feedback on the extension's current popup configuration.
- **User Interface Synchronization**: By updating the `popup-options` dropdown menu, the function ensures that the extension's UI is in sync with its current popup setting, enhancing the user experience.
- **In summary**, the `showCurrentPage` function, along with its immediate invocation, forms an integral part of the extension's popup management system. It ensures that the UI accurately reflects the current popup setting, providing immediate and clear feedback to the user. This function, combined with others like `getCurrentPopup`, creates a comprehensive system for managing and displaying popup settings in the extension's user interface.
  
---


### Open New Tab by clicking Action button
#### The provided code snippet is part of a Chrome extension and is designed to define a specific behavior that occurs when the extension's action (typically represented by an icon in the browser toolbar) is clicked. 

```
chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({ url: 'https://html5zombo.com/' });
});
```

#### Analysis
##### 1. Adding an Event Listener to the Extension's Action:
`chrome.action.onClicked.addListener(() => {  })` this adds an event listener to the extension's action using the `onClicked` event of the `chrome.action` API. The `onClicked` event is triggered when the user clicks on the extension's action icon in the Chrome toolbar.

##### 2. Defining the Callback Function:
- The `() => { ... }` part is an arrow function that serves as a callback. This function is executed every time the extension's action is clicked.
- Inside the callback function, there is no use of `async` or `await`, indicating that the operations within are either synchronous or that the function does not wait for any asynchronous operations to complete.

##### 3. Creating a New Browser Tab:
- `chrome.tabs.create({ url: 'https://html5zombo.com/' });` this line of code (within the callback function) calls the `create` method of the `chrome.tabs` API. It instructs the browser to open a new tab with the specified URL (`'https://html5zombo.com/'`).
- The `{ url: 'https://html5zombo.com/' }` is an object passed to the `create` method, specifying the URL of the page that should be opened in the new tab.

#### Functionality and Usefulness: initialization function
- **Custom Action on Click**: The primary purpose of this snippet is to define a custom behavior that occurs when the user clicks on the extension's action. In this case, it opens a specific webpage.
- **Enhancing User Experience**: This functionality enhances the user experience by providing immediate access to a specific webpage directly from the extension's action. It can be particularly useful for extensions that need to direct users to a particular site or resource quickly.
- **Simplicity and Directness**: The code is straightforward and direct, focusing on a single action (opening a new tab with a specified URL) without additional complexity.
- **In summary**, this code snippet demonstrates a simple yet effective way to add functionality to a Chrome extension's action. By listening to the `onClicked` event and defining a specific action (opening a new tab with a designated URL), it provides a quick and convenient way for users to access a webpage directly from the Chrome toolbar. This kind of functionality is typical in extensions that aim to enhance browser usability and provide quick access to web resources.
  
#### Special Behavior Exclusive to Google Chrome Extensions
##### 1. Popup vs. onClicked Behavior:
- The comment begins by explaining a key behavior in Chrome extensions: If a popup is specified for the extension's action (using `chrome.action.setPopup`), then the `onClicked` event listener will not be triggered when the action is clicked. Instead, clicking the action will open the specified popup.
  
- This means that the `onClicked` listener is only active when there is no popup defined for the action.

##### 2. Declaration Location of the onClicked Listener:
- The author then explains why they've placed the `onClicked` listener directly in the script, rather than inside another event handler (like a button's `click` event).
  
- The reason for this placement is to prevent the possibility of registering multiple `onClicked` listeners for the same action. If the `onClicked` listener was added inside another event handler that might be triggered multiple times (like a button click inside the extension's UI), it could lead to multiple registrations of the `onClicked` listener. Each time the button is clicked, another `onClicked` listener would be added, potentially leading to unintended behaviors or performance issues.

- By declaring the `onClicked` listener at the top level of the script, the author ensures that it is registered only once when the script is executed. This approach avoids the risk of multiple registrations and keeps the behavior consistent and predictable.

- The comment is a thoughtful explanation of a design choice made by the author to ensure the correct and efficient functioning of the extension. It highlights an important aspect of Chrome extension development: understanding and managing the interaction between popups and background scripts, particularly in relation to event listeners like onClicked. The author's approach demonstrates good practice in extension development, ensuring that event listeners are registered in a way that avoids duplication and potential errors.
  
##### 3. Preventing Multiple Registrations:


---


<!-- **********not caught up yet************** -->
### Badge `text` manipulation:
#### The three code snippets provided work together to create a feature in a Chrome extension that manages the badge text of the extension's action (the icon in the toolbar). Let's analyze how each snippet relates to the others and then look at an example showcasing their combined use:

#### Snippet A - Displaying Current Badge Text
```
async function showBadgeText() {
  const text = await chrome.action.getBadgeText({});
  document.getElementById('current-badge-text').value = text;
}
showBadgeText();
```
##### Analysis:
- Code snippet A is designed to retrieve and display the current badge text of a Chrome extension's action (such as the icon in the browser toolbar) in a specific element of the extension's user interface.
- Displaying Current Badge Text: The primary purpose of this function is to fetch and display the current badge text in the extension's UI. This is useful for keeping the user informed about the current state or count represented by the badge text, especially in settings or options pages of the extension.
- User Interface Synchronization: By updating the `current-badge-text` element with the badge text, the function ensures that the extension's UI is synchronized with its current state. This enhances the user experience by providing immediate and accurate feedback.
- In summary, code snippet A is a key part of the extension's functionality that deals with badge text management. It ensures that the current badge text is fetched and displayed appropriately in the extension's UI, providing a clear and immediate reflection of the extension's current state. This snippet, along with others like snippet C, forms a comprehensive system for managing and reflecting the badge text in the extension's user interface.

#### Snippet B - Updating Badge Text
```
document.
    getElementById('badge-text-input')
    .addEventListener('input', async (event) => {
        const text = event.target.value;
        await chrome.action.setBadgeText({ text });
        showBadgeText();
    });
```
##### Analysis:

- The code snippet B is designed to dynamically update the badge text of a Chrome extension's action (such as the icon in the browser toolbar) based on user input in a text field.
- Real-Time Badge Text Update: The primary purpose of this snippet is to allow real-time updating of the badge text based on user input. As the user types into the badge-text-input field, the badge text on the extension's action is updated to reflect this input.
- User Interaction and Feedback: This functionality enhances user interaction by providing immediate feedback. It allows users to see the effect of their input on the extension's badge text in real-time.
- Synchronization with Extension State: By calling showBadgeText after updating the badge text, the snippet ensures that any other UI elements that display the badge text are also updated, maintaining consistency across the extension's interface.
- In summary, code snippet B plays a crucial role in the interactivity of the extension's badge text feature. It provides a responsive and user-friendly way for users to modify the badge text and see the immediate effect of their changes. This snippet, combined with snippets A and C, forms a comprehensive system for managing the badge text in the extension, allowing for both manual updates and reset functionality.

#### Snippet C - Clearing Badge Text
```
document
    .getElementById('clear-badge-button')
    .addEventListener('click', async () => {
        await chrome.action.setBadgeText({ text: '' });
        showBadgeText();
    });
```
##### Analysis:

- The code snippet C is designed to clear the badge text of a Chrome extension's action (such as the icon in the browser toolbar) when a specific button is clicked.
- Resetting Badge Text: The primary purpose of this snippet is to provide a way for users to reset or clear the badge text of the extension's action. This is particularly useful in scenarios where the badge text is used to display dynamic information like notification counts or status indicators.
- User Interaction and Immediate Feedback: This functionality enhances user interaction by providing a straightforward way to reset the badge text. It allows users to clear the badge text with a single click, seeing the immediate effect of their action.
- Consistent State Across the UI: By calling showBadgeText after clearing the badge text, the snippet ensures that any other UI elements that display the badge text are also updated to reflect the cleared state, maintaining consistency across the extension's interface.
- In summary, code snippet C is an essential part of the badge text management system in the extension. It provides a user-friendly and efficient way to reset the badge text, ensuring that the extension's UI remains synchronized with its current state. This snippet, along with snippets A and B, forms a complete system for managing the badge text in the extension, allowing for dynamic updates, real-time feedback, and easy reset functionality.

#### Combined Flow in a Chrome Extension
##### 1. Initial Display: When the extension's options page loads, showBadgeText is called (from snippet A), displaying the current badge text in the current-badge-text input field.

##### 2. User Updates Text: The user enters new text in the badge-text-input field. As they type, snippet B updates the badge text in real-time and refreshes the display.

##### 3. Clearing Text: If the user wants to clear the badge text, they can click the button targeted in snippet C. This clears the badge text and updates the display to show the empty state.

### line-by-line explanation

#### Snippet A - Displaying Current Badge Text
```
async function showBadgeText() {
  const text = await chrome.action.getBadgeText({});
  document.getElementById('current-badge-text').value = text;
}
showBadgeText();
```
##### In Depth Analysis:

`async function showBadgeText() {`  this is the beginning of the asynchronous function declaration.

`const text = await chrome.action.getBadgeText({});` this line retrieves the current text of the badge on the extension's action (icon in the toolbar).

The `{}` passed to `getBadgeText` is an empty object, which is the required syntax for this API method. It DOES NOT reset the text; rather, it's likely used to specify the context (like a specific tab) from which the badge text should be retrieved. If no context is specified, it gets the badge text for the extension's action globally.

Also, since `await` is used to wait for the Promise returned by `getBadgeText` to resolve then the resolved value (the current badge text) is stored in the `text` variable.

  `document.getElementById('current-badge-text').value = text;` this line selects an HTML element with the ID `current-badge-text` and sets its value property to the retrieved badge text (`text`), which at this point is a string and not a Promise.

`}` this is the end of the asynchronous function declaration.

`showBadgeText();` this line is called immediately after its declaration initialize the state or UI when the page or extension popup loads.  In other words it populates badge text inputs on page load.

---

#### Snippet B - Updating Badge Text
```
document
    .getElementById('badge-text-input')
    .addEventListener('input', async (event) => {
        const text = event.target.value;
        await chrome.action.setBadgeText({ text });
        showBadgeText();
    });
```
##### In Depth Analysis:

(a) Selecting the HTML Element:
`document.getElementById('badge-text-input')`  this selects an HTML element with the ID `badge-text-input` which is expected to be an input field where the user can type the badge text.

(b) Adding an Event Listener:
`.addEventListener('input', async (event) => {` adds an event listener to the selected input field that responds to input events which are triggered every time the user types or changes the text within the input field. The `async` keyword indicates that the callback function is asynchronous thus allowing the use of the `await` keyword within it.
    
(c) Handling the Input Event:
`const text = event.target.value;` this retrieves the current value of the input field (the text typed by the user). `event.target` refers to the element that triggered the event (the input field), and `event.target.value` is the text currently entered in that field.

(d) Setting the Badge Text (Asynchronous):
`await chrome.action.setBadgeText({ text });` this calls the `setBadgeText` method from the Chrome Extensions API to set the badge text of the extension's action to the text entered by the user.  The `await` keyword is used to ensure that the operation completes before moving to the next line of code.

(e) Updating the Badge Text Display:
`showBadgeText();` after setting the new badge text, this line calls the `showBadgeText` function. While the implementation details of `showBadgeText` are not provided, it is likely responsible for updating the UI to display the current badge text, possibly in another part of the extension's interface.

  `});` this ends ends the code snippet.

---

#### Snippet C - Clearing Badge Text
```
document
  .getElementById('clear-badge-button')
  .addEventListener('click', async () => {
    await chrome.action.setBadgeText({ text: '' });
    showBadgeText();
  });
```
##### In Depth Analysis:

(a) Selecting the HTML Element:
`document.getElementById('clear-badge-button')` this selects an HTML element with the ID 'clear-badge-button' which is expected to be a button in the extension's user interface.

(b) Adding an Event Listener:
`.addEventListener('click', async () => {` adds an event listener to the selected button which is set to respond to `click` events. The `async` keyword before the function indicates that it's an asynchronous function, which allows the use of `await` within it.
    
(c) Handling the Click Event (Asynchronous):
`await chrome.action.setBadgeText({ text: '' });` This calls the `setBadgeText` method from the Chrome Extensions API to clear the badge text of the extension's action. It does this by setting the `text` property to an empty string `('')`. The `await` keyword is used to ensure that the operation completes before moving to the next line of code.

(d) Updating the Badge Text Display:
`showBadgeText();` this calls the `showBadgeText` function. This function is likely responsible for updating the UI to reflect the change in the badge text. While the implementation of `showBadgeText` is not shown, it presumably updates an element in the UI to show that the badge text is now empty.

`});` this ends ends the code snippet.

---