let myControlBar;
let googleMeetControlBar = document.querySelector('div.fJsklc.nulMpf.Didmac.G03iKb');
let googleMeetControlBar_Left = document.querySelector('div.lefKC');
let googleMeetUserName = document.querySelector('div.dwSJ2e');


let style = document.createElement('style');
style.textContent = `
.P9KVBf .uaILN:not(:disabled) {
    background-color: rgb(60,64,67);
    color: #fff;
}

.tWDL4c, .tWDL4c .VfPpkd-Jh9lGc {
    border-radius: 100px;
}

.P9KVBf .eT1oJ {
    z-index: 0;
}

.P9KVBf .uaILN {
    border-width: 0;
    width: 2.5rem;
    height: 2.5rem;
    padding: calc(1.25rem - 12px);
}

.fontSizeIcon{
    font-size: 1.25rem;
}

.pTagSpacer{
    margin-left: .125rem;
    margin-right: .125rem;
    border: 1px solid pink;
}

.myControlBarContainer{
    display: flex;
    align-self: right;
    border: 1px solid pink;
    margin-right: 0px;
    margin-left: auto;
}

.fileUpload{
    border: 1px solid pink;
    width: 150px;
    cursor: pointer;
}

.plusOne, .minusOne, .fileUpload, .sendData{
    cursor: pointer;
}

.logoAboveUserName{
    background-color: pink;
    width: 50px;
    height: 50px;
}

`;
document.head.appendChild(style);

if (googleMeetControlBar) {
    googleMeetControlBar.style.border = '3px solid red';
} else {
    console.log('Google Meet controls container not found');
}


if (googleMeetUserName) {
    googleMeetUserName.style.border = '1.5px solid green';
    logoAboveUserName = document.createElement('div');
    logoAboveUserName.className = 'logoAboveUserName';
    googleMeetUserName.append(logoAboveUserName);
} else {
    console.log('Google Meet user name not found');
}

if (googleMeetControlBar_Left) {
    googleMeetControlBar_Left.style.border = '3px solid blue';

    myControlBar = document.createElement('div');
    myControlBar.className = 'myControlBarContainer';
    googleMeetControlBar_Left.appendChild(myControlBar);

    let fileUpload = document.createElement('input');
    fileUpload.type = 'file';
    fileUpload.className = 'fileUpload';
    myControlBar.appendChild(fileUpload);

    let plusOneButton = document.createElement('button');
    plusOneButton.textContent = '+';
    plusOneButton.className = 'plusOne P9KVBf uaILN tWDL4c fontSizeIcon';
    myControlBar.appendChild(plusOneButton);

    let minusOneButton = document.createElement('button');
    minusOneButton.textContent = '-';
    minusOneButton.className = 'minusOne P9KVBf uaILN tWDL4c fontSizeIcon';
    myControlBar.appendChild(minusOneButton);

    let pTag = document.createElement('p');
    pTag.className = 'countDisplay pTagSpacer';
    let count = 10;
    pTag.textContent = count;
    myControlBar.appendChild(pTag);

    let sendDataButton = document.createElement('button');
    sendDataButton.textContent = "\u2192";
    sendDataButton.className = 'sendData P9KVBf uaILN tWDL4c fontSizeIcon';
    myControlBar.appendChild(sendDataButton);

    plusOneButton.addEventListener('click', function () {
        count++;
        pTag.textContent = count;
    });

    minusOneButton.addEventListener('click', function () {
        count--;
        pTag.textContent = count;
    });
} else {
    console.log('Google Meet controls container not found');
}


// removing a div from a live session below the control bar
let myControlBarContainer = document.querySelector('div.myControlBarContainer');
let fileUpload = document.querySelector('input.fileUpload');
let plusOneButton = document.querySelector('button.plusOne');
let minusOneButton = document.querySelector('button.minusOne');
let pTag = document.querySelector('p.countDisplay');
let sendDataButton = document.querySelector('button.sendData');
if (myControlBarContainer) {
    myControlBarContainer.remove();
    fileUpload.remove();
    plusOneButton.remove();
    minusOneButton.remove();
    pTag.remove();
    sendDataButton.remove();
} else {
    console.log('Control Bar not found');
}



// ahauser_long-lived-connection-test/assets/NYS-flag-icon-48.png
// reference to name displayed in Google Meet session:
<div class="dwSJ2e">Arthur Hauser</div>




//reference to the whole control bar:
#ow3 > div.T4LgNb > div > div: nth - child(20) > div.crqnQb > div.fJsklc.nulMpf.Didmac.G03iKb

//reference to the left control bar:
#ow3 > div.T4LgNb > div > div: nth - child(20) > div.crqnQb > div.fJsklc.nulMpf.Didmac.G03iKb > div > div > div.lefKC

    //button background color
    .P9KVBf.uaILN: not(: disabled) {
    background - color: rgb(60, 64, 67);
}

//button icon color
.P9KVBf.uaILN: not(: disabled) {
    color: #fff;
}

//button border radius
.tWDL4c, .tWDL4c.VfPpkd - Jh9lGc {
    border - radius: 100px;
}


//button z-index rule
.P9KVBf.eT1oJ {
    z - index: 0;
}