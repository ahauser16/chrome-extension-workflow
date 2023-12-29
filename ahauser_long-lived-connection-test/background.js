
//I. Listening for Connections
chrome.runtime.onConnect.addListener((port) => {//<-- line A 

  //II. Establishing the Connection
  console.assert(port.name === "meetConnection");//<-- line B 

  //III. Communication
  port.onMessage.addListener((msg) => {//<-- line C 
    if (msg.greeting === "hello") {
      console.log("Received hello from content script");
      port.postMessage({ greeting: "hi there!" });
    }
  });

});
