require('./widget.scss')

var Wix = require('Wix')
var $ = require('jquery')

Wix.addEventListener(Wix.Events.SETTINGS_UPDATED, onSettingsUpdate);
// You can get the style params programmatically, un-comment the following snippet to see how it works:
/*Wix.Styles.getStyleParams(style => {
 console.log(style);
 });*/

// You can also get the style every time it changes, try this:
/*Wix.addEventListener(Wix.Events.STYLE_PARAMS_CHANGE, style => {
 console.log(style);
 });*/

function onSettingsUpdate(update) {
    update = stringify(update);
    $('.sample-settings-title').show();
    $('.json').html(update);
    updateCompHeight();
}

function updateCompHeight(height) {
    const desiredHeight = height || document.documentElement.scrollHeight;
    Wix.setHeight(desiredHeight);
}

function stringify(input) {
    try {
        return JSON.stringify(input, null, 4);
    } catch (err) {
        return input;
    }
}

$(document).ready(() => {
  $('.navtohome').click(() => {
    Wix.getSiteMap(pages => {
      Wix.navigateToPage(pages[0].pageId.substring(1));
    });
    console.log('navigated');
  });
});

// const websiteName = 'Dogiz.com';
const proofCertificateUrl = "https://portal.nextinsurance.com/certificates/live-certificate/a904576e8d917bddda63d949c15b13ac"
const verifyCertificateApi = 'https://portal.nextinsurance.com/api/certificates/live-certificate?liveCertificateId=';

window.onload = function() {
    init();
    function initElements(){
        // document.querySelector('#businessName').textContent = websiteName;
        document.querySelector('#certificateProof').href = proofCertificateUrl;
    }
    function getCertificateId() {
        return proofCertificateUrl.split('live-certificate/')[1];
    }
    function getDateTimeNow(){
        const now = new Date();
        const offsetMs = now.getTimezoneOffset() * 60 * 1000;
        const dateLocal = new Date(now.getTime() - offsetMs);
        const str = dateLocal.toISOString().slice(0, 10).replace(/-/g, "/").replace("T", " ");
        return str;
    }
    function verifyCertificate(){
        const certificateId = getCertificateId();
        const verifyCertificateApiFull = `${verifyCertificateApi}${certificateId}`;
        document.querySelector('#verifiedTimestamp').textContent = getDateTimeNow();

        // fetch(verifyCertificateApiFull)
        //     .then(data => {
        //         console.log('data: ', data)
        //         if (data.status === 200){
        //             document.querySelector('#verifiedTimestamp').textContent = getDateTimeNow();
        //             document.querySelector('#banner').setAttribute("class", "ni-banner");
        //         }else{
        //             throw new Error('GET_LIVE_CERTIFICATES_NOT_FOUND');
        //         }
        //     }).catch(error => {
        //     console.log('error: ', error);
        // });
    }
    function init() {
        verifyCertificate();
        initElements();
    }
}
