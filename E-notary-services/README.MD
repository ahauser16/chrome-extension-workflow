# E-NOTARY SERVICES
#### Currently this README contains notes from learning how the Google Chrome Extension Github repository codebase works.

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

### toggling  state of  Action buton with `.enable` and `.disable`


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