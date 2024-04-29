document.addEventListener('DOMContentLoaded', function() {
    // Checkboxes
    let Activator = document.getElementById('a0x00521');
    if (Activator) {
        // Set current state in popup
        chrome.storage.sync.get(['MasterSwitch'], function(data) {
            handler(data);
        });

        function handler(data) {
            chrome.tabs.query({active: true, currentWindow: true}, function () {
                Activator.checked = data.MasterSwitch;
            });
        }

        // Update settings values
        Activator.addEventListener('change', function() {
            chrome.storage.sync.set({MasterSwitch: this.checked});
            refreshScript();
        })
    }
});

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