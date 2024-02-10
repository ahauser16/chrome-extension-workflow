// Store CSS data in the "local" storage area.
const storage = chrome.storage.local;

// Get at the DOM controls used in the sample.
const resetButton = document.querySelector('button.reset');
const submitButton = document.querySelector('button.submit');
const textarea = document.querySelector('textarea');

// Load any CSS that may have previously been saved.
loadChanges();

submitButton.addEventListener('click', saveChanges);
resetButton.addEventListener('click', reset);

async function saveChanges() {
  // Get the current CSS snippet from the form.
  const cssCode = textarea.value;
  // Check that there's some code there.
  if (!cssCode) {
    message('Error: No CSS specified');
    return;
  }
  // Save it using the Chrome extension storage API.
  await storage.set({ css: cssCode });
  message('Settings saved');
}

function loadChanges() {
  storage.get('css', function (items) {
    // To avoid checking items.css we could specify storage.get({css: ''}) to
    // return a default value of '' if there is no css value yet.
    if (items.css) {
      textarea.value = items.css;
      message('Loaded saved CSS.');
    }
  });
}

async function reset() {
  // Remove the saved value from storage. storage.clear would achieve the same
  // thing.
  await storage.remove('css');
  message('Reset stored CSS');
  // Refresh the text area.
  textarea.value = '';
}

let messageClearTimer;
function message(msg) {
  clearTimeout(messageClearTimer);
  const message = document.querySelector('.message');
  message.innerText = msg;
  messageClearTimer = setTimeout(function () {
    message.innerText = '';
  }, 3000);
}
//////////
function loadChanges() {
  storage.get(['userData'], function (items) {
      const userData = items['userData'];

      let messages = []; // Array to store the messages

      if (userData) {
          const principalContactInfo = userData['principal-contact-info'];

          if (principalContactInfo) {
              if (principalContactInfo.princFirstNameStorage) {
                  princFirstNameField.value = principalContactInfo.princFirstNameStorage;
                  messages.push('Loaded saved user first name.');
              }

              if (principalContactInfo.princLastNameStorage) {
                  princLastNameField.value = principalContactInfo.princLastNameStorage;
                  messages.push('Loaded saved user last name.');
              }

              if (principalContactInfo.princEmailStorage) {
                  princEmailField.value = principalContactInfo.princEmailStorage;
                  messages.push('Loaded saved user email.');
              }

              if (principalContactInfo.princPhoneStorage) {
                  princPhoneField.value = principalContactInfo.princPhoneStorage;
                  messages.push('Loaded saved user phone number.');
              }
          }
      }

      showLoadMessages(messages.join(' '));
  });
}