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
#### Code Objective: 
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

---

### Content_Script.js 
#### Code Objective: 
Now we need to create that `newVideoLoaded` function.  Afterward we create this function and all the functionality surrounding it, we should see the YouTube player button on the YouTube video. 

excerpt from `contentScript.js`
```
const newVideoLoaded = () => {
        const bookmarkBtnExists = document.getElementsByClassName("bookmark-btn")[0];
        console.log(bookmarkBtnExists);

        if (!bookmarkBtnExists) {
            const bookmarkBtn = document.createElement("img");

            bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png");
            bookmarkBtn.className = "ytp-button " + "bookmark-btn";
            bookmarkBtn.title = "Click to bookmark current timestamp";

            youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0];
            youtubePlayer = document.getElementsByClassName("video-stream")[0];
            
            youtubeLeftControls.append(bookmarkBtn);
            bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);
        }
    }
```


#### Line-by-Line Review:

##### Step One: 
first we initialize our `newVideoLoaded` variable and assign it to an anonymous function.  We want this function to check if a **Bookmark Button** already exists.  We can accomplish this by using the `getElementsByClassName` function and passing in the `"bookmark-btn"` class as its parameter.  `getElementsByClassName` returns an `HTML collection` so we can grab the first element that matches the `"bookmark-btn"` class name.  This **Bookmark Button** will exist on every single YouTube video page.

excerpt from `contentScript.js`
```
const newVideoLoaded = () => {
    const bookmarkBtnExists = document.getElementsByClassName("bookmark-btn")[0];
}
```

##### Step Two: 

```
if (!bookmarkBtnExists) {
    const bookmarkBtn = document.createElement("img");
```

if the **Bookmark Button** does not exist then we want to add it to every Youtube video website that we go to and we accomplish this by creating an `img` element using the `createElement` method.

##### Step Three: 

Once we create the `img` element we want to do three things: (1) add our own PNG file to the `src` attribute of the `img` element, (2) add two CSS classes to the `img` element and (3) add text to our `title` 

```
if (!bookmarkBtnExists) {
    const bookmarkBtn = document.createElement("img");
    
    bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png");
    bookmarkBtn.className = "ytp-button " + "bookmark-btn";
    bookmarkBtn.title = "Click to bookmark current timestamp";
```

- `bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png");` after we create the `img` element on the page this line will add our `bookmark.png` image to it by accessing the `src` attribute. 

- `bookmarkBtn.className = "ytp-button " + "bookmark-btn";` this line adds two CSS classes: `"ytp-button"` and `"bookmark-btn"` which represent Youtube's styles and our own styles.

- `bookmarkBtn.title = "Click to bookmark current timestamp";` this line shows the title of the video when the user hovers over our **Bookmark Button**.  We will display the text "Click to bookmark current timestamp".  

##### Step Four:
this code below requires an understanding of the Youtube watch webpage so we can reference the youtube player's controls on the lefthand side of the player.  When you inspect the Youtube page (when a video is playing/paused) there is a `div` with the class `"ytp-left-controls"`.  This `div` contains the row of `input` options such as the "replay", "play" / "pause", "next", "volume", "time display" and "chapter name" of the video.  We want to add our Bookmark Button in this row.  

we can use the `getElementsByClassName` method on the `document` object to grab the reference to the div container with the class name `"ytp-left-controls"` and assign it to the variable `youtubeLeftControls`. 

also, we can use the `getElementsByClassName` method on the `document` object to grab the reference to the youtube video player with the class name `"video-stream"` which is a `<video>` element and assign it to the variable `youtubePlayer`.

We need to initialize these two variables at the top of the `contentScript.js` file so they are in it's global scope.

```
if (!bookmarkBtnExists) {
    ...
    youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0];
    youtubePlayer = document.getElementsByClassName("video-stream")[0];
    ...
```

##### Step Five:
now we need to add our Bookmark Button using the reference to the `youtubeLeftControls` variable and the `append` function to pass in `bookmarkBtn` as its sole parameter.

Then we need to add a listener to listen to for `click` events on our icon/action. 

```
if (!bookmarkBtnExists) {
...
    youtubeLeftControls.append(bookmarkBtn);
...
}
```

##### Step Six

So there's a correction I  want to make to this portion of the video, before we continue, it's going to be very important in  order for your extension to work functionally.  And it's only one line of code, but it's going  to make such a big difference. I'm also going to explain an important concept of Chrome extensions that I neglected while I was writing this which is that in our `manifest.json` there is a match pattern for our `contentScript.js` which checks if any youtube.com video is loaded. If a video is loaded then we inject our `contentScript.js`  into the context of that web page. This means that anytime a youtube.com page shows up in our browser we're running a bunch of logic using our `contentScript.js`. However, we encounter a problem because the `background.js` tells us when the URL changes (which implies that a new video is loaded) but it does not account for the user refreshing the webpage.  Currently if the browser is refreshed the button does not show up.  To fix this we can call `newVideoLoaded();` anytime our `contentScript.js` matches "youtube.com".  The downside of this is that now if `background.js` sees it as a new video using the `onUpdated` event listener, and there's a condition that `contentScript.js` is injected then `newVideoLoaded()` will be called twice.  

This can be fixed by adding a conditional make sure that doesn't happen but we will only insert this one line of code calling the `newVideoLoaded()` because the only thing `newVideoLoaded()` function is doing is adding the Bookmark Button to the YouTube player.  There are no negative implications to calling it twice. This is due to the condition that checks if the button is already on the player but it is still not the most efficient implementation which is fine for the sake of this tutorial. With that, let's continue with the rest of the video.

##### Step Seven

Now we need to add an event listener to listen to a `click` for the Bookmark Button by using the `addEventListener()` method, listen for a click and then call a function called `addNewBookmarkEventHandler`.  We have not created this function yet so let's do that next.

```
if (!bookmarkBtnExists) {
...
     bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);
...
}
```

#### Code Objective: 
Now we need to create that `addNewBookmarkEventHandler()` function.  First we need to figure out the timestamp of the video at which point someone presses the Bookmark Button.  The timestamp is necessary in order for us to figure out what our bookmark should be saved as in storage.  We can figure out the YouTube video timestamp by accessing the .  Again, YouTube makes this pretty accessible by accessing our `youtubePlayer` variable in the console.  The `youtubePlayer` variable will have a property called "currentTime" which gives us the current time in seconds.  FYI, we will also need to create a function that converts seconds into a standard time of how it's displayed in YouTube (e.g. hours:minutes:seconds).   

excerpt from `contentScript.js`
```
const addNewBookmarkEventHandler = () => {
        const currentTime = youtubePlayer.currentTime;
        const newBookmark = {
            time: currentTime,
            desc: "Bookmark at " + getTime(currentTime),
        };
        console.log(newBookmark);

        chrome.storage.sync.set({
            [currentVideo]: JSON.stringify([...currentVideoBookmarks, newBookmark].sort((a, b) => a.time - b.time))
        });
    }
```

#### Line-by-Line Review:

##### Step One: 
We're gonna go ahead and add the function `addNewBookmarkEventHandler` and we're going to use the exact property attached to our `youtubePlayer` variable that we saw in our console which is `currentTime;` and assign it to a variable called `currentTime`.

excerpt from `contentScript.js`
```
const addNewBookmarkEventHandler = () => {
    const currentTime = youtubePlayer.currentTime;
}
```

---

##### Step Two: 
since this function is only called when a new bookmark is made so we should instantiate a new bookmark variable which is an object that has the time of the bookmark and a description. The description will be the title that's going to be displayed in the Chrome extension. The description will be dynamic and say "Bookmark at" and then the currentTime that is converted from seconds to hours:minutes:seconds using the getTime() utility function which we had ready before the tutorial started.

excerpt from `contentScript.js`
```
const addNewBookmarkEventHandler = () => {
    const currentTime = youtubePlayer.currentTime;
    const newBookmark = {
            time: currentTime,
            desc: "Bookmark at " + getTime(currentTime),
    };
    console.log(newBookmark);
}
```

---

##### Step Three: 
since the user is creating a bookmark and will want it to persist after they close the browser at this point we need to sync our extension to Chrome Storage.  This will set Chrome storage with each bookmark. So basically, each video
according to its video identification  number that we're grabbing from the URL will also map back to a set up bookmarks in Chrome Storage. 

excerpt from `contentScript.js`
```
const addNewBookmarkEventHandler = () => {
...
    console.log(newBookmark);
    chrome.storage.sync.set({
            [currentVideo]: JSON.stringify([...currentVideoBookmarks, newBookmark].sort((a, b) => a.time - b.time))
        });
}
```

So to do that, we're going to use `chrome.storage.sync`. FYI, if you're interested in this, you can look in documentation to find out what this function takes. `currentVideo` **it's important to remember that things need to be stored in JSON in Chrome Storage** so we need to use `JSON.stringify`. 

Also, we need to instantiate `currentVideoBookmarks` at the top of our file so that its in global scope within our `contentScript.js` and will store all current video bookmarks in an array. And I'm going  to spread that. So we can add a new bookmark to those set of current video  bookmarks. 

Then the last thing I want to do here is sort bookmarks by their save timestamp in our Chrome Storage. So we're going to sort by time, and this is just coming from this right here, every bookmark is going to have a time and a description. So we're going to look at that and sort accordingly.

---

#### Code Objective: 
Now before moving on to the UI we want to make this fully functional by fetching all bookmarks when a new video is loaded so that code is going to look like this. 

```
    const fetchBookmarks = () => {
        return new Promise((resolve) => {
          chrome.storage.sync.get([currentVideo], (obj) => {
            resolve(obj[currentVideo] ? JSON.parse(obj[currentVideo]) : []);
          });
        });
      };
```




#### Line-by-Line Review:

##### Step One: 
Instantiate the `fetchBookmarks` variable and assign to it an immediately invoked function expression (IIFE).

excerpt from `contentScript.js`
```
const fetchBookmarks = () => {

}
```

---

##### Step Two: 
we want to `return` a `Promise` so we can resolve it asynchronously from `chrome.storage` once we retrieve all bookmarks.

excerpt from `contentScript.js`
```
const fetchBookmarks = () => {

}
```
TLDR;

I'm going to create it at the top here. And I'm going to say const fetch bookmarks. newVideoLoaded function. And I want to return a promise. So  we can resolve this asynchronously. And within that promise, I'm going  to fetch from Chrome Storage. So I'm going to do a Chrome storage sync and we did a set before to set Chrome Storage, we're going  to get this time our current video it takes an object. And we're going to resolve to find any bookmarks when indexing using our current video. So basically look in storage to see if our current  video has any bookmarks, or if it exists in storage. That's what's happening right here. If it does exist, we're going to JSON dot parse it  because we JSON dot Stringify before, if it doesn't, what we want to do is return an empty array. And this should work.  And we're really only going to add these in two places, which will be in our new video loaded function. So we're going to make this async. And we're gonna add a fetch bookmarks. So actually, we're just going to add this to our current video bookmarks variable. And call a weight fetch bookmarks. async await is going to resolve this promise and then the second place we want to add this is to our add new bookmarks event handler. To basically handle this case, and make  sure we're always using the most up to date set of bookmarks when destructuring. So we're gonna do current video bookmarks equals the weight, veg bookmarks. And also make this async. Awesome. So for right now, we finished everything we need for our content script file. Obviously things aren't going to show in the UI and we could check that out right here. 

start again at 44:45 of https://www.youtube.com/watch?v=0n809nd4Zu4&list=WL&index=3&t=3088s
---


 

 



And as you can see, there's nothing in the UI  because everything we've been doing so far has   been manipulating the DOM right here to add  the icon. Add some logic to get us ready to  
34:29
create a UI for our extension. Let's go ahead and  start making some UI components show starting out  
34:35
with some bookmarks from clicking that addition  button in the YouTube player that we added.  
34:40
Now, the first thing we need to figure out on any  given page is if it's a YouTube video page or not,  
34:46
if it is, we're going on one of fetch any  bookmarks we may have from Chrome Storage.  
34:51
And if it's not, we'll just want to display  some messaging saying it's not a YouTube page.  
34:56
If you open the Chrome extension on a  page that is not YouTube. So to do this,  
35:01
we're going to add a utility function that's  going to allow us to decipher that logic.  
35:08
So we're actually going to grab our utility  function to find the active tab that the user is  
35:14
on through Google Chrome documentation. I'm going  to go ahead and use this example right here, which  
35:21
helps us retrieved a currently focused tab  from the Chrome documentation. And since I  
35:26
have the google chrome pieces extension over  every codeblock, whether it's in documentation   or Stack Overflow, I'm able to directly  save on pieces with this icon that shows up  
35:37
at the top right of any code block, I'm going  to go ahead and save it. And then I'm going   to go back to my VS code and refresh my pieces  tree, I can go ahead and insert this snippet,  
35:48
which is the newest one, and I'm just going  to rename this snippet to active tab Chrome.  
35:56
Amazing and pieces automatically classified this  as JavaScript, because it was able to decipher  
36:02
that from some machine learning. I'm gonna go  ahead and delete this background.js comment.  
36:09
And awesome, we now have a function that grabs  the current tab. But also, I want to make sure  
36:15
I'm exporting this function. So I'm going  to add export. And then what I want to do is  
36:21
open up the pop up.js file. And over here,  we're going to want to import that function  
36:26
at the very top. So we can use it here.  So I'm going to import Get active tab URL  
36:36
from utils dot j, s, and I actually  don't think the documentation called  
36:43
it this. So I'm going to go ahead and  change the function name, so it matches.  
36:49
So go to utils.js. Change that thought,  awesome. Now, the event we want to listen  
36:58
to when opening the pop up.js file is the DOM  content loaded event, which is right here.  
37:04
This event is a native window event that fires  when an HTML document has initially been loaded.  
addEventListener
37:10
It's essentially when we want to load all our  bookmarks and show them. So we're going to   type the following to do so what we're going  to do is grab our active tab function first.  
37:22
And we're going to look at the user's current  active tab, which we already have the function  
37:30
for from in the utiles. It's an async function.  So we're going to async await this. And then after  
37:37
that, we're going to grab the query parameters  to help us identify the video. If you remember,  
37:44
each YouTube video has a unique identifier. After  the question mark, where the query parameter,  
37:52
we're going to grab that, we're going to use a  URL search params to be able to get the unique  
37:59
identifier for each video. And to get the  unique identifier, we're going to create it  
38:09
current video variable and do URL parameters  dot get V. And this is just based off of  
38:17
what the YouTube video URLs look  like. Now, our active tab URL  
38:24
should have youtube.com/watch Because any specific  YouTube video always has this in its URL. And  
38:34
we want to make sure we're watching a YouTube  video when our Chrome Extension has any logic  
38:39
with bookmarks. And we want to make sure  this current video variable is truthy   meaning is get actually returned something  other than undefined or any falsie value.  
38:54
And then what we want to do is we want  to get any current video bookmarks from  
39:00
Chrome storage. If you remember, we're setting  Chrome storage with the current video as a key  
39:06
and then all the bookmarks as a value that is  JSON ified. And in order for us to retrieve those  
39:12
bookmarks, we need to use a Chrome Storage API  to get them. So to do that, we're going to grab  
39:19
the video bookmarks using Chrome storage sync get.  And we're going to get it with the current video  
39:26
unique identifier, which is the YouTube  videos unique identifier in the URL.  
39:34
And then, we are going to set a current video  bookmarks variable which is going to contain  
39:41
all those JSON ified current videos. And in  order for us to pass this to any function  
