document.getElementById('settings-button').addEventListener('click', function() {
    chrome.tabs.create({ url: 'pages/settings/settings.html' });
});