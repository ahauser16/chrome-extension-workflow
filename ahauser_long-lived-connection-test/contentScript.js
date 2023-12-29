

const port = chrome.runtime.connect({ name: "meetConnection" });//<--Line A

port.postMessage({ greeting: "hello" });//<--Line B

port.onMessage.addListener((msg) => {//<--Line C
  console.log("Message received from background script:", msg); // Log received messages

  if (msg.greeting === "hi there!") {//<--Line D
    console.log("Received 'hi there!' from background script");
    // Example interaction: Change the background color of the Google Meet page
    document.body.style.backgroundColor = 'lightblue';
  }
});
