# Notes from "Build a Chrome Extension - Course for Beginners

### [Build a Chrome Extension - Course for Beginners](https://www.youtube.com/watch?v=0n809nd4Zu4&list=WL&index=1&t=3088s)

### Manifest V2 versus Manifest V3

a service_worker is a javascript file that runs separately from the main browser thread.  this will not have access to content of a webpage but it has capabilities to communicate with my extension using the extensions messaging system.

---

### Service Worker (JavaScript File)

excerpt from `manifest.json`
```
...
"background": {
      "service_worker": "background.js"
},
...
```

Definition: a `service_worker` is a javascript file that runs separately from the main browser thread.  this will not have access to content of a webpage but it has capabilities to communicate with my extension using the extensions messaging system.

---

### Content Script (JavaScript File)

excerpt from `manifest.json`
```
"content_scripts": [
      {
        "matches": ["https://*.youtube.com/*"],
        "js": ["contentScript.js"]
      }
],
```

Definition: a `content_script` is a javascript file that runs in the context of the webpage that we (the user) are on.  In other words its the script which enhances the webpage that our extension will enhance.

---

### Popup (HTML File)

excerpt from `manifest.json`
```
"action": {
      "default_icon": {
        "16": "assets/ext-icon.png",
        "24": "assets/ext-icon.png",
        "32": "assets/ext-icon.png"
      },
      "default_title": "My YT Bookmarks",
      "default_popup": "popup.html"
},
```

Definition: a Popup file specifies which HTML file will serve as our UI.  In this case we've specified that `popup.html` and within tht file our `popup.js` file will assist with its interactivity.

---

### Background.js 
#### Code Summary: 
The code below essentially listens to any updates in our tab system and find the most recent tab or the tab that we're on currently and see if it's a YouTube page. 

excerpt from `background.js`
```
chrome.tabs.onUpdated.addListener((tabId, tab) => {
    if (tab.url && tab.url.includes("youtube.com/watch")) {
      const queryParameters = tab.url.split("?")[1];
      const urlParameters = new URLSearchParams(queryParameters);
  
      chrome.tabs.sendMessage(tabId, {
        type: "NEW",
        videoId: urlParameters.get("v"),
      });
    }
  });
```

#### Line-by-Line Review:

##### Step One: 

`chrome.tabs.onUpdated.addListener((tabId, tab) => {`

we need to set up an event listener that will listen to the `tabs` object for any updates. This will require us to acquire permission to access the **Chrome tabs API**.  


##### Step Two: 

`if (tab.url && tab.url.includes("youtube.com/watch")) {`

from here we will want to know if there's a `tab.URL` and if so we will want to know if the URL includes "youtube.com/watch". NB--> every individual Youtube video has "youtube.com/watch" in its URL and in order for our extension to work we will need to know the current tab has "youtube.com/watch" in its URL.

##### Step Three: 

`const queryParameters = tab.url.split("?")[1];`

from here we will want to set our query parameters. And we're going to use query parameters as a unique ID for each video so that we can grab it from storage. we accomplish this by using the JavaScript `split` method.  essentially after the question mark that follows "watch" (e.g. "https://www.youtube.com/watch?v=0n809nd4Zu4&list=WL&index=1&t=3088s") we're going to grab the value that follows the `=` sign which for this tutorial is `0n809nd4Zu4&list=WL&index=1&t=3088s`.  This value will be our "unique video" value because every video on YouTube has a different "unique video" value which will help us store videos uniquely as well in our storage. 

##### Step Four: 

`const urlParameters = new URLSearchParams(queryParameters);`

from here we're going to add our URL parameters. And this is just an  interface to work with URLs URL search params. 

##### Step Five: 

`chrome.tabs.sendMessage(tabId, {`

Finally we want to send a message to our content script that tells it that a new video has loaded.  We are able to do this using the Google Chrome messaging system that happens between the extension. The `sendMessage` accepts a `tabId` which is a unique object consisting of
(1) the type of event which in our case is a "new video" event:

`type: "NEW",`

and (2) the `videoId` value which is obtained using `urlParameters.get("v"),`

#### Line-By-Line Synopsis of Background.js: 

This code is responsible for sending messages to our `contentScript.js`.  the `sendMessage` method accepts a `tabID` and a unique object which doesn't have to be only contain `type` or `videoId` so for example it could also accept `random: "randomString"` which would provide our `contentScript.js` access to the property: `random` and then the string: `randomString`.  In our case, the only thing that's applicable is the event `type` and then the `videoId` which is what our `contentScript.js` needs.  Next we will add a listenter in our `contentScript.js` that will listen to any incoming messages from our `background.js` file. 

---

### Content_Script.js 
#### Code Summary: 
To add an event listener that will listen to any incoming messages from `Background.js` we will use the following code: 

excerpt from `contentScript.js`
```
chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type, value, videoId } = obj;

        if (type === "NEW") {
            currentVideo = videoId;
            newVideoLoaded();
        }
    });
```

#### Line-by-Line Review:

##### Step One: 

`chrome.runtime.onMessage.addListener((obj, sender, response) => {`

this `addListener` method accepts three parameters: an `obj`, a `sender` and a `response`. The `response` is useful to us because as a message is being sent to the `contentScript.js` we can send a `response` back to where the message is coming from. 

##### Step Two: 

`const { type, value, videoId } = obj;`

we can destructure the `obj` parameter into three values, two of which we're getting back from our tab listender in `background.js` which (if you remember) are `type` and `videoId`.  

```
if (type === "NEW") {
            currentVideo = videoId;
            newVideoLoaded();
        }
```

We will obtain the `value` in a moment but first we need a ternary expression to check whether `type` is equal to `"NEW"`.  If this is the case then we will (1) set the `currentVideo` property, which will be a global variable in `contentScript.js`, as the `videoId`, and (2) call a function to handle any actions with `newVideo` so we're going to call a `newVideoLoaded` function.  At this point we will also want to set the `currentVideo` as a top level variable in `contentScript.js` and assign it an empty string value which will receive its value from a message sent from `background.js` once its received by `contentScript.js` on this end.

```
(() => {
    let youtubeLeftControls, youtubePlayer;
    let currentVideo = "";
    let currentVideoBookmarks = [];

    ...
```