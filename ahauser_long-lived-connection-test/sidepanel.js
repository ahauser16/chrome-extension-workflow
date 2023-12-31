//SidepanelButtonInPopup-Step 3(b)___3(a)=sidepanel.html--> 

//for instance, you can retrieve and display the files stored in chrome.storage.local:
document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get(['uploadedFiles'], (result) => {
      if (result.uploadedFiles) {
        const fileListElement = document.getElementById('fileList');
        Object.keys(result.uploadedFiles).forEach(fileName => {
          const fileItem = document.createElement('div');
          fileItem.textContent = fileName;
          fileListElement.appendChild(fileItem);
        });
      }
    });
  });
  