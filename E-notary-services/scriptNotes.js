
//OVERVIEW: In summary, the script waits for the user to click a button, and upon clicking, it opens a side panel in the context of the currently active tab, displaying the content from 'sidepanel-tab.html'. This functionality is typically part of a Chrome extension that aims to enhance user interaction by providing additional information or controls in a side panel.

//Step One: Query the Active Tab
// this uses the `chrome.tabs.query` method to find the currently active tab in the last focused window.
const [tab] = await chrome.tabs.query({

    //`active: true` ensures that only the active tab in each window is considered.
    active: true,
  
    //`lastFocusedWindow: true` restricts the search to the last window that was focused.
    lastFocusedWindow: true
  });
  
  // The result is an array of tabs, but since only one tab is expected (the active tab in the focused window), array destructuring is used to get the first element of the array directly (`const [tab] = ...`).
  
  //Step Two: Retrieve the Tab ID
  const tabId = tab.id;
  //this extracts the ID of the active tab and stores it in the variable `tabId`.
  
  // State variable to track the side panel status
  let isSidePanelOpen = false;
  
  //Step Three: Get the Button Element and Add Event Listener
  const button = document.getElementById('openSidePanel'); //this line retrieves the button element from the DOM using its ID ('openSidePanel').
  button.addEventListener('click', async () => {//An event listener is added to this button to respond to click events.
  
    if (!isSidePanelOpen) {//Open the side panelz
  
      //Step Four: Event Listener Functionality
      //Inside the event listener, when the button is clicked, the following actions are performed
      await chrome.sidePanel.open({ tabId });//This line uses the chrome.sidePanel.open method to open the side panel associated with the current tab (tabId).
  
      await chrome.sidePanel.setOptions({//This line sets options for the side panel of the current tab. It specifies the path to the HTML file ('sidepanel-tab.html') that should be displayed in the side panel and ensures that the side panel is enabled (enabled: true).
        tabId,
        path: 'sidepanel-tab.html',
        enabled: true
      });
      isSidePanelOpen = true; // Update the state
      button.textContent = 'Close Side Panel'; // Update button text
    } else {
      // Close the side panel
      await chrome.sidePanel.close({ tabId });
      isSidePanelOpen = false; // Update the state
      button.textContent = 'Open Side Panel'; // Update button text
    }
  });