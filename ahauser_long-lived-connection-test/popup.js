//Step 3= request the meeting ID from the background.js (meetingIdAcquisition)

document.addEventListener('DOMContentLoaded', () => {
  chrome.runtime.sendMessage({ type: "GET_MEETING_ID" }, response => {
    document.getElementById('meetingIdDisplay').textContent = response.meetingId || "No active meeting";
  });
});



document.getElementById('documentInput').addEventListener('change', function () {
  const fileList = document.getElementById('fileList');
  fileList.innerHTML = ''; // Clear existing list items

  for (const file of this.files) {
    const listItem = document.createElement('li');
    listItem.textContent = file.name;
    fileList.appendChild(listItem);
  }
});


//In this code, when the user clicks the "Upload" button, each selected file is read as a Data URL (base64 encoded string) using `FileReader`. Once all files are read, they are stored in `chrome.storage.local` under the key `'uploadedFiles'`.

// Note: This approach is suitable for small to moderately sized files. If you're dealing with very large files, you might need to consider alternative storage strategies, as storing large files in `chrome.storage.local` can quickly consume your available quota.
document.getElementById('uploadButton').addEventListener('click', function () {
  const fileInput = document.getElementById('documentInput');
  const files = fileInput.files;

  if (files.length === 0) {
    console.log('No files selected.');
    alert('Please select files to upload.');
    return;
  }

  console.log(`Uploading ${files.length} file(s)...`);


  const fileData = {};
  for (const file of files) {
    const reader = new FileReader();
    reader.onload = function (e) {
      fileData[file.name] = e.target.result;
      console.log(`File read: ${file.name}`);

      if (Object.keys(fileData).length === files.length) {
        chrome.storage.local.set({ 'uploadedFiles': fileData }, function () {
          if (chrome.runtime.lastError) {
            console.error('Error saving files:', chrome.runtime.lastError.message);
          } else {
            console.log('Files saved locally.');
          }
        });
      }
    };
    reader.onerror = function (e) {
      console.error(`Error reading file ${file.name}:`, e.target.error);
    };
    reader.readAsDataURL(file);
  }
});
