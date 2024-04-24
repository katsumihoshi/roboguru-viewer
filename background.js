chrome.runtime.onInstalled.addListener(onInstalledListener);

// Set storage variables
function onInstalledListener() {
    chrome.storage.sync.get(['MasterSwitch'], function(data) {
        handleStorageData(data);
    });
}

// Handle chrome.storage.sync data
function handleStorageData(data) {
    setDefaultIfNull(data, 'MasterSwitch', true);
}

// Set default value if the data is null
function setDefaultIfNull(data, key, defaultValue) {
    if (data[key] == null) {
        let defaultObject = {};
        defaultObject[key] = defaultValue;
        chrome.storage.sync.set(defaultObject);
    }
}

function refreshScript() {
    chrome.tabs.query({url: "https://roboguru.ruangguru.com/"}, function(tabs) {
        if (tabs.length !== 0) tabs.forEach(function(tab) {
            chrome.scripting.executeScript({
                target: {tabId: tab.id, allFrames: true},
                files: ['/loader.js'],
            });
        });
    });
}