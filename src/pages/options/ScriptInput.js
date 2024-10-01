document.getElementById('save-script').addEventListener('click', () => {
    const script = document.getElementById('script-input').value;
    const url = window.location.href; // Get the current URL
    chrome.storage.local.set({ [url]: script }, () => {
        alert('Script saved for ' + url);
    });
});

document.getElementById('backup-scripts').addEventListener('click', () => {
    chrome.storage.local.get(null, (items) => {
        const blob = new Blob([JSON.stringify(items)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'backup.json';
        a.click();
        URL.revokeObjectURL(url);
    });
});

document.getElementById('restore-scripts').addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = event => {
            const scripts = JSON.parse(event.target.result);
            chrome.storage.local.set(scripts, () => {
                alert('Scripts restored');
            });
        };
        reader.readAsText(file);
    };
    input.click();
});

// Load saved scripts
const url = window.location.href;
chrome.storage.local.get(url, (data) => {
    if (data[url]) {
        document.getElementById('script-input').value = data[url];
    }
});

chrome.storage.local.get(null, (items) => {
    const scriptList = document.getElementById('script-list');
    for (const [key, value] of Object.entries(items)) {
        const li = document.createElement('li');
        li.textContent = `${key}: ${value}`;
        scriptList.appendChild(li);
    }
});
