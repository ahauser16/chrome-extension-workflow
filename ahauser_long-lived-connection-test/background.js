
//I. Listening for Connections
chrome.runtime.onConnect.addListener((port) => {//<-- line A 
  console.log("Connection established with content script"); // Log when a connection is established


  //II. Establishing the Connection
  console.assert(port.name === "meetConnection");//<-- line B 

  //III. Communication
  port.onMessage.addListener((msg) => {//<-- line C 
    console.log("Message received from content script:", msg); // Log received messages

    if (msg.greeting === "hello") {
      console.log("Received hello from content script");
      port.postMessage({ greeting: "hi there!" });
    }
  });

});
