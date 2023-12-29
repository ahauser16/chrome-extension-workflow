

const port = chrome.runtime.connect({ name: "meetConnection" });//<--Line A

port.postMessage({ greeting: "hello" });//<--Line B

port.onMessage.addListener((msg) => {//<--Line C
  if (msg.greeting === "hi there!") {//<--Line D
    console.log("Received greeting from background script");
    // Additional logic here
  }
});
