//NB-->A popup and other extension pages can call any Chrome API because they are served from the chrome schema. For example chrome-extension://EXTENSION_ID/popup.html. <--NB
const tabs = await chrome.tabs.query({
    url: [
      "https://developer.chrome.com/docs/webstore/*",
      "https://developer.chrome.com/docs/extensions/*",
    ],
  });
//   ...

//First, the extension will sort tab names (the titles of the contained HTML pages) alphabetically. Then, when a list item is clicked, it will focus on that tab using tabs.update() and bring the window to the front using windows.update().

// Interesting JavaScript used in this code

// The Collator (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator) used to sort the tabs array by the user's preferred language.
// The template tag (https://web.dev/articles/webcomponents-template) used to define an HTML element that can be cloned instead of using document.createElement() to create each item.
// The URL constructor (https://developer.mozilla.org/en-US/docs/Web/API/URL/URL) used to create and parse URLs.
// The Spread syntax (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) used to convert the Set of elements into arguments in the append() call.
// ...
const collator = new Intl.Collator();
tabs.sort((a, b) => collator.compare(a.title, b.title));

const template = document.getElementById("li_template");
const elements = new Set();
for (const tab of tabs) {
  const element = template.content.firstElementChild.cloneNode(true);

  const title = tab.title.split("-")[0].trim();
  const pathname = new URL(tab.url).pathname.slice("/docs".length);

  element.querySelector(".title").textContent = title;
  element.querySelector(".pathname").textContent = pathname;
  element.querySelector("a").addEventListener("click", async () => {
    // need to focus window as well as the active tab
    await chrome.tabs.update(tab.id, { active: true });
    await chrome.windows.update(tab.windowId, { focused: true });
  });

  elements.add(element);
}
document.querySelector("ul").append(...elements);



// By adding the "tabGroups" permission to the manifest we can now use the TabGroups API to name the group and choose a background color.  The following code creates a button that will group all the tabs using tabs.group() and move them into the current window.
const button = document.querySelector("button");
button.addEventListener("click", async () => {
  const tabIds = tabs.map(({ id }) => id);
  const group = await chrome.tabs.group({ tabIds });
  await chrome.tabGroups.update(group, { title: "DOCS" });
});