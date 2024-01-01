async function sayHello(){
    //this queries the active tab and returns the active tab's "tabId"
    let [tab] = await chrome.tabs.query({active: true});


    chrome.scripting.executeScript({
        target: {tabId: tab.id },
        func: () => {
            alert('Hello from my extension!');
        }
    })
}

document.getElementById("myButton").addEventListener("click", sayHello);