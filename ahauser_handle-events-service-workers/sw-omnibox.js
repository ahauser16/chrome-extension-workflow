console.log("sw-omnibox.js")

// Save default API suggestions:
// Service workers do not have direct access to the window object and therefore cannot use [window.localStorage()][mdn-local-storage] to store values. 

//Also, service workers are short-lived execution environments; they get terminated repeatedly throughout a user's browser session, which makes them incompatible with global variables. 

//Instead, we use [chrome.storage.local][api-storage-local] which stores data on the local machine.

//for more info on how to persist data without using global variables: https://developer.chrome.com/docs/extensions/develop/concepts/service-workers/lifecycle#persist-data

chrome.runtime.onInstalled.addListener(({ reason }) => {
    if (reason === 'install') {
        chrome.storage.local.set({
            apiSuggestions: ['tabs', 'storage', 'scripting']
        });
    }
});



// https://developer.chrome.com/docs/extensions/get-started/tutorial/service-worker-events#step-5

//All event listeners need to be statically registered in the global scope of the service worker. In other words, event listeners should not be nested in async functions. This way Chrome can ensure that all event handlers are restored in case of a service worker reboot.  To accomplish this in this example, we are going to use the chrome.omnibox API, but first we must declare the omnibox keyword trigger in the manifest.

//Now, let's register the omnibox event listeners at the top level of the script. When the user enters the omnibox keyword (api) in the address bar followed by tab or space, Chrome will display a list of suggestions based on the keywords in storage. The onInputChanged() event, which takes the current user input and a suggestResult object, is responsible for populating these suggestions.

const URL_CHROME_EXTENSIONS_DOC =
    'https://developer.chrome.com/docs/extensions/reference/';
const NUMBER_OF_PREVIOUS_SEARCHES = 4;

// Displays the suggestions after user starts typing
chrome.omnibox.onInputChanged.addListener(async (input, suggest) => {
    await chrome.omnibox.setDefaultSuggestion({
        description: 'Enter a Chrome API or choose from past searches'
    });
    const { apiSuggestions } = await chrome.storage.local.get('apiSuggestions');
    const suggestions = apiSuggestions.map((api) => {
        return { content: api, description: `Open chrome.${api} API` };
    });
    suggest(suggestions);
});

//After the user selects a suggestion, onInputEntered() will open the corresponding Chrome API reference page.

// Open the reference page of the chosen API
chrome.omnibox.onInputEntered.addListener((input) => {
    chrome.tabs.create({ url: URL_CHROME_EXTENSIONS_DOC + input });
    // Save the latest keyword
    updateHistory(input);
});

//The updateHistory() function takes the omnibox input and saves it to storage.local. This way the most recent search term can be used later as an omnibox suggestion.

async function updateHistory(input) {
  const { apiSuggestions } = await chrome.storage.local.get('apiSuggestions');
  apiSuggestions.unshift(input);
  apiSuggestions.splice(NUMBER_OF_PREVIOUS_SEARCHES);
  return chrome.storage.local.set({ apiSuggestions });
}