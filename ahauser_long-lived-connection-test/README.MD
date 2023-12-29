# Test is based on Google's own documentation:
## [Google doc](https://developer.chrome.com/docs/extensions/develop/concepts/messaging#connect)

There are two message passing APIs: one for one-time requests, and a more complex one for long-lived connections that allow multiple messages to be sent. For information about sending messages between extensions, see the cross-extension messages section.

When you load a Chrome extension, the sequence of events and the call stack depend on the components defined in the extension and their respective configurations in the manifest.json file. Here's a general walkthrough for an extension with a background script, content script, and a popup:

Loading the Extension:

When you load the extension into Chrome (either by installing it from the Chrome Web Store or loading it unpacked during development), Chrome reads the manifest.json file. This file defines the structure and permissions of your extension.
Initializing the Background Script:

If your extension has a background script defined in manifest.json (under "background"), Chrome initializes this script. The background script runs in the background and is typically used to maintain the state of the extension, listen for browser events, and manage long-lived connections or operations.
Any top-level code in the background script (not inside any function or event listener) is executed immediately upon initialization.
Content Script Injection:

Content scripts are injected into web pages based on the match patterns defined in manifest.json (under "content_scripts"). This happens when you navigate to a webpage that matches the specified patterns.
When a matching webpage is loaded, the content script is injected and executed. Like the background script, any top-level code in the content script is executed immediately upon injection.
Popup Initialization:

If your extension has a popup defined (specified in manifest.json under "action" or "browser_action"), the popup HTML file is loaded when you click the extension's icon in the Chrome toolbar.
The popup is a separate HTML page, and any scripts linked in this HTML file are executed when the popup is opened.
Event Listeners and Interactions:

Both the background script and content script can have event listeners (like chrome.runtime.onMessage, chrome.tabs.onUpdated, etc.). These listeners are set up during the initialization of their respective scripts and wait for specific events to occur.
For example, in your case, the chrome.tabs.onUpdated.addListener in the background script starts listening for tab update events as soon as the background script is initialized. Similarly, the chrome.runtime.onMessage.addListener in the content script starts listening for messages from the background script as soon as the content script is injected and executed.
User Interactions and Dynamic Events:

After the initial loading and setup, the extension reacts to user interactions and other events. For instance, clicking the extension's icon opens the popup, and navigating to a new page might trigger content script injection if the URL matches the specified patterns.
This sequence ensures that the extension is ready to interact with web pages and respond to user inputs as defined in its scripts and configurations.

### Long Lived Connection related code

### `background.js`:

First lets analyze the "listener" code in the background.js file.  This script runs in the background and manages the long-lived connections.

`background.js`
```
chrome.runtime.onConnect.addListener((port) => {
  console.assert(port.name === "meetConnection");

  port.onMessage.addListener((msg) => {
    if (msg.greeting === "hello") {
      console.log("Received hello from content script");
      port.postMessage({ greeting: "hi there!" });
    }
  });
});
```

#### Line-by-Line Analysis: Line A

##### I. Listening for Connections
- `chrome.runtime.onConnect.addListener((port) => {` listens for connection attempts from content-scripts or in this example `contentScript.js`

```
chrome.runtime.onConnect.addListener((port) => {
    ...
})
```

##### This first line sets up an event listener that listens for a connection attempt from a `content script` (or other parts of the extension). When a connection is initiated using `chrome.runtime.connect`, this listener is triggered.


- `chrome.runtime` this is a part of the Chrome extension APIs that provides access to various aspects of the Chrome extension runtime. It includes a set of methods and events for managing the extension's lifecycle, communication, and other functionalities.`

- `.onConnect` this is an event of the `chrome.runtime` API. It is fired whenever a script in the extension (like a `content script` or another `background script`) establishes a connection with the `background script` using `chrome.runtime.connect`.

- `.addListener` this method is used to attach an event listener to the `onConnect` event. It takes a callback function as a parameter. This callback function is executed every time the `onConnect` event is fired, which happens when a connection is established.

- the `callback function` this function that is provided to `addListener` is called with a `port` object as its argument. This `port` object represents the communication channel established between the connecting script (like a `content script`) and the `background script`. Through this `port`, messages can be sent back and forth between the two scripts.

##### So, in summary, `chrome.runtime.onConnect.addListener` sets up a listener in the `background script` that waits for connection attempts from other parts of the extension. When such a connection is established, the provided `callback function` is executed, allowing for communication through the established `port`.

#### Line-by-Line Analysis: Line B

##### II. Establishing the Connection

- `console.assert(port.name === "meetConnection");` - when a `contentScript.js` calls `chrome.runtime.connect` with the specified port name, which in this case is `"meetConnection"`, the listener is triggered in `background.js` and a connection is established.

```
chrome.runtime.onConnect.addListener((port) => {
    ...
    console.assert(port.name === "meetConnection");
    ...
})
```

##### This console.log checks if the name of the `port` is "meetConnection". It's a way to ensure that the connection is coming from the expected `content script`. If the condition is false, it will output an error to the console.

- QUESTION: where do you establish the name of an individual `port`?  How should I structure and name my ports in the context of my application?

#### Line-by-Line Analysis: Line C

##### III. Communication

- `port.onMessage.addListener((msg) => {` - once the connection is established, `background.js` listens for messages from `contentScript.js` using `port.onMessage.addListener`. When a message is received, it can respond back using `port.postMessage`.
    
  
```
chrome.runtime.onConnect.addListener((port) => {
    ...
    port.onMessage.addListener((msg) => {

    })
    ...
})
```

##### ` port.onMessage.addListener()` sets up another listener on the `port` object. It listens for messages sent from the content script through this `port`.  `(msg) => { ... }` is a callback function that is executed when a message is received from the content script.

```
chrome.runtime.onConnect.addListener((port) => {
    ...
    port.onMessage.addListener((msg) => {
        if (msg.greeting === "hello") {
            console.log("Received hello from content script");
            port.postMessage({ greeting: "hi there!" });
        }   
    })
    ...
})
```

##### `if (msg.greeting === "hello") { ... }`  this checks the content of the received message. If the message has a property `greeting` with the value `"hello"`, it executes the code inside the block.

##### `console.log("Received hello from content script");` this logs a message to the console indicating that the specific message was received.

##### `port.postMessage({ greeting: "hi there!" });` this sends a message back to the `content script` through the same `port`. The message being sent has an object with a `greeting` property set to `"hi there!"`.

##### IV. Bidirectional Messaging: 

- This setup allows for bidirectional messaging between `contentScript.js` and `background.js`. Messages can be sent back and forth as long as the connection is open.

##### V. Handling Specific Messages: 

- `background.js` checks the content of each message and can perform different actions based on the message content.
- 
##### Summary: 

- This long-lived connection approach is particularly useful for extensions that require ongoing communication between scripts, such as when monitoring changes in a web page over time or maintaining state across different parts of the extension.

#### Examples of "top-level" code typically found in a `background.js`

1. Setting Default Extension State:<br />
   `let extensionEnabled = true;`<br />
This is a variable to keep track of the extension's state

2. Initializing Extension Data:<br />
`const defaultSettings = { theme: 'dark', notifications: true };`
`chrome.storage.sync.set({ settings: defaultSettings });`<br />
This is a variable to keep track of the extension's state

3. Scheduling a Repeating Task:<br />
`setInterval(() => { task to repeat }, 10000);`<br />
Code to perform a background task at regular intervals, like checking for updates every ten seconds.

4. Registering Context Menu Items: such as below<br />
```
chrome.contextMenus.create({
  id: 'sampleMenu',
  title: 'Sample Context Menu',
  contexts: ['selection']
});
```

5. Performing an Initial API Call: such as below<br />
```
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => {
    // Process the data
  });
```

6. Logging Extension Load Time:<br />
`console.log('Extension loaded at:', new Date().toLocaleTimeString());`

7. Initializing Global Variables or State:<br />
`let cache = {};`

8. Setting Up a WebRequest Listener:<br />
```
chrome.webRequest.onBeforeRequest.addListener(
  function(details) { /* ... */ },
  { urls: ["<all_urls>"] },
  ["blocking"]
);
```

9. Creating Alarms for Future Actions:<br />
`chrome.alarms.create('reminder', { periodInMinutes: 60 });`

10. Performing Cleanup or Reset:<br />
`chrome.storage.local.clear();`<br />
Clears local storage (use with caution)




<br />

---

<br />
<br />

### `contentScript.js`:

Second, lets analyze the `contentScript.js` file.  This script runs in the background and manages the long-lived connections.

`contentScript.js`:
```
const port = chrome.runtime.connect({ name: "meetConnection" });

port.postMessage({ greeting: "hello" });

port.onMessage.addListener((msg) => {
  if (msg.greeting === "hi there!") {
    console.log("Received greeting from background script");
    // Additional logic here
  }
});
```

#### Line-by-Line Analysis: Line A

`const port = chrome.runtime.connect({ name: "meetConnection" });`

- `chrome.runtime.connect`: This method is used to establish a connection to the background script of the extension. It returns a `port` object that represents the communication channel.
- `{ name: "meetConnection" }`: This is an object passed to `connect`, specifying a name for the connection. This name is used in the background script to assert that the correct connection is being established.
- `const port`: The `port` object returned by `connect` is stored in a constant. This `port` is used to send and receive messages.

#### Line-by-Line Analysis: Line B

`port.postMessage({ greeting: "hello" });`

- `postMessage`: This method is used to send a message through the `port` to the background script.
- `{ greeting: "hello" }`: This is the message being sent. It's an object with a property `greeting` set to `"hello"`. This message is received by the background script, which listens for messages on the `port`.

#### Line-by-Line Analysis: Line C

`port.onMessage.addListener((msg) => { ... });`

- `port.onMessage`: This is an event of the `port` object that listens for incoming messages.
- `addListener`: Similar to the background script, this method attaches an event listener to the `onMessage` event of the `port`.
- `((msg) => { ... })`: This is the callback function that is executed when a message is received. The received message is passed as the `msg` argument.

#### Line-by-Line Analysis: Line D (inside the callback function)

- `if (msg.greeting === "hi there!") { ... }`: This checks if the received message has a `greeting` property equal to `"hi there!"`. This specific check corresponds to the message that the background script sends as a response.
- `console.log("Received greeting from background script");`: If the condition is true, this line logs a confirmation message to the console.
- // Additional logic here: This comment indicates where additional code can be added to handle the received message.

#### Interaction with the Background Script:

- When the content script runs, it immediately establishes a connection with the background script (chrome.runtime.connect) and sends a greeting message.
- The background script, upon receiving this connection and message, sends back a response.
- The content script listens for this response and logs a confirmation upon receiving it.
- This setup allows for continuous two-way communication between the content script and the background script. The content script can send messages to the background script and react to responses, enabling complex interactions based on events occurring in the content script's context (like changes in a web page).

#### Examples of common "top level" scripts to run in a content script file

##### In a Google Chrome extension, top-level code in a content script refers to any code that is not enclosed within a function or an event listener. This code is executed immediately when the content script is injected into a web page. Here are several examples of such top-level code commonly found in content scripts of Chrome extensions:

1. Modifying Page Style:<br />
`document.body.style.backgroundColor = 'lightblue';`<br />
Change the background color of the page

2. Adding a Custom CSS File:<br />
Injects a custom CSS file into the page via the head of the document using the `appendChild` function.
```
const styleLink = document.createElement('link');
styleLink.rel = 'stylesheet';
styleLink.href = chrome.runtime.getURL('styles/custom.css');
document.head.appendChild(styleLink); // Inject a custom CSS file into the page
```

3. Inserting a DOM Element:<br />
Add a banner or message at the top of the page via the `prepend` method.
```
const banner = document.createElement('div');
banner.textContent = 'This is a message from your extension!';
document.body.prepend(banner); 
```

4. Logging Current URL:<br />
`console.log('Content script loaded on:', window.location.href);`
Log the URL of the current page

5. Hiding Specific Page Elements:<br />
   `const ads = document.querySelectorAll('.ad-banner');`
   `ads.forEach(ad => ad.style.display = 'none');`<br />
Hide all elements with the class 'ad-banner'

6. Setting Up Initial State:<br />
`let isEnabled = true;`<br />
A variable to keep track of the script's state

7. Reading Page Content:<br />
`const pageTitle = document.title;`<br />
Store the title of the current page

8. Injecting a Script Tag:<br />
Inject a JavaScript file into the page
```
const scriptTag = document.createElement('script');
scriptTag.src = chrome.runtime.getURL('scripts/injected.js');
document.head.appendChild(scriptTag); 
```

9. Modifying Form Behavior:<br />
Change the action URL of a form
```
const form = document.querySelector('form');
form.action = 'https://example.com/new-action'; 
```

10. Adding Event Listeners to Existing Page Elements:<br />
Add click event listeners to all buttons on the page
```
const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click', () => {
  console.log('Button clicked!');
})); 

```

### Testing and Debugging
1. Load the Extension: Load your unpacked extension into Chrome and ensure it's active.
2. Open Google Meet: Navigate to a Google Meet session.
3. Check Console Logs: Open the Chrome Developer Tools (F12) and switch to the Console tab to see the logs from your content script. You should see logs indicating that messages are being sent and received.
4. Background Script Logs: To view logs from the background script, go to chrome://extensions/, find your extension, and click on the "background page" link under "Inspect views". This opens the Developer Tools for the background script.
5. Observe Changes: If your content script changes the background color of the Google Meet page, it's a sign that the message passing is working correctly.

#### As of 12/29/23 the long-lived connection worked!  See below the console.logs and notes.

I started a new session and received the console.logs below from the chrome extensions page:

Connection established with content script
background.js:12 Message received from content script: {greeting: 'hello'}
background.js:15 Received hello from content script

I also received the console.log below from the google meet page:
Message received from background script: Object
contentScript.js:11 Received 'hi there!' from background script

Based on these console logs the following is happening.

1. Connection Establishment:

- The message "Connection established with content script" in the background script indicates that the connection initiated by the content script (`chrome.runtime.connect`) was successful.

2. Message Exchange:

- The content script sends a message to the background script: `port.postMessage({ greeting: "hello" });`.
- The background script receives this message, as indicated by "Message received from content script: {greeting: 'hello'}".
- The background script logs "Received hello from content script", confirming it has processed the received message.

3. Response Handling:

- The background script sends a response back to the content script: `port.postMessage({ greeting: "hi there!" });`.
- The content script receives this response, as shown by the log "Message received from background script: Object".
- The content script logs "Received 'hi there!' from background script", confirming it has received and recognized the response from the background script.
- This flow demonstrates a successful two-way communication between your content script and background script using a long-lived connection. Each script is able to send and receive messages, and you're correctly logging these events.
- To further develop your extension, you can now build upon this messaging framework. Depending on your extension's functionality, you can use this communication channel to send relevant data, commands, or notifications between the background and content scripts. For example, in the context of a Google Meet extension, you might use this to control certain features or gather information from the Meet session.
