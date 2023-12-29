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

#### `background.js`:

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


#### `contentScript.js`:

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