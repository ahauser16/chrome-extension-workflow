let googleMeetControlBar = document.querySelector('div.fJsklc.nulMpf.Didmac.G03iKb');
let googleMeetControlBar_Left = document.querySelector('div.lefKC');
let googleMeetUserName = document.querySelector('div.Djiqwe.sqgFe');

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

.Djiqwe.sqgFe {
    position: relative;
    overflow: visible;
}

.logoAboveUserName {
    position: absolute;
    top: -100px; 
    left: 50%; 
    transform: translateX(-50%);
    width: 50px;
    height: 50px;
}

.myBanner{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 25px;
    background-color: cyan;
    z-index: 1000;
}

`;
document.head.appendChild(style);

if (document.body) {
    document.body.style.border = '3px solid cyan';
    let myBanner = document.createElement('div');
    myBanner.className = 'myBanner';
    document.body.appendChild(myBanner);

    // START FROM HERE
    // let svgns = "http://www.w3.org/2000/svg";
    // let svg = document.createElementNS(svgns, 'svg');
    // svg.setAttributeNS(null, 'width', '100');
    // svg.setAttributeNS(null, 'height', '100');

    // let triangle = document.createElementNS(svgns, 'polygon');
    // triangle.setAttributeNS(null, 'points', '0,0 100,0 0,100');
    // triangle.setAttributeNS(null, 'style', 'fill:cyan');

    // svg.appendChild(triangle);
    // document.body.appendChild(svg);

} else {
    console.log('Google Meet body not found');
}

if (googleMeetControlBar) {
    googleMeetControlBar.style.border = '3px solid red';
} else {
    console.log('Google Meet controls container not found');
}

if (googleMeetUserName) {
    googleMeetUserName.style.border = '1.5px solid green';
    let logoAboveUserName = document.createElement('img');
    logoAboveUserName.className = 'logoAboveUserName';
    logoAboveUserName.src = 'ahauser_long-lived-connection-test/assets/NYS-flag-icon-48.png';
    googleMeetUserName.appendChild(logoAboveUserName);
} else {
    console.log('Google Meet user name not found');
}

if (googleMeetControlBar_Left) {
    googleMeetControlBar_Left.style.border = '3px solid blue';

    let myControlBar = document.createElement('div');
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
let googleMeetControlBar = document.querySelector('div.fJsklc.nulMpf.Didmac.G03iKb');
let googleMeetControlBar_Left = document.querySelector('div.lefKC');
let googleMeetUserName = document.querySelector('div.Djiqwe.sqgFe');

let myControlBarContainer = document.querySelector('div.myControlBarContainer');
let fileUpload = document.querySelector('input.fileUpload');
let plusOneButton = document.querySelector('button.plusOne');
let minusOneButton = document.querySelector('button.minusOne');
let pTag = document.querySelector('p.countDisplay');
let sendDataButton = document.querySelector('button.sendData');
let logoAboveUserName = document.querySelector('div.logoAboveUserName');
let myBanner = document.createElement('div');

if (myControlBarContainer) {
    myControlBarContainer.remove();
    fileUpload.remove();
    plusOneButton.remove();
    minusOneButton.remove();
    pTag.remove();
    sendDataButton.remove();
    logoAboveUserName.remove();
    myBanner.remove();
    googleMeetUserName.style.border = '';
    googleMeetControlBar.style.border = '';
    googleMeetControlBar_Left.style.border = '';
} else {
    console.log('Control Bar not found');
}

///////////////////////////////////
let googleMeetControlBar = document.querySelector('div.fJsklc.nulMpf.Didmac.G03iKb');
let googleMeetControlBar_Left = document.querySelector('div.lefKC');
let googleMeetUserName = document.querySelector('div.Djiqwe.sqgFe');
googleMeetUserName.style.border = '';
googleMeetControlBar.style.border = '';
googleMeetControlBar_Left.style.border = '';
/////////////////////////////////////

let myBanner = document.querySelector('.myBanner');
if (myBanner) {
    document.body.removeChild(myBanner);
} else {
    console.log('myBanner not found');
}

let myTriangle = document.querySelector('.myTriangle');
if (myTriangle) {
    document.body.removeChild(myTriangle);
} else {
    console.log('myTriangle not found');
}

///////////////////////////////////////////