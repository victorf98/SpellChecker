const https = require('https');

function getCorrection(text) {
    try {
        return fetch('https://api.languagetoolplus.com/v2/check', {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: new URLSearchParams({
                'text': text,
                'language': 'auto',
                'enabledOnly': 'false'
            })
        })
            .then(response => response.json())
            .catch(error => console.error(error));;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getCorrection
}
