import { render } from "solid-js/web";
import App from "./components/Demo/app";
import { injectScript } from "./injectScript"; // Import the inject function

const url = window.location.href;
chrome.storage.local.get(url, (data) => {
    if (data[url]) {
        injectScript(data[url]); // Inject the saved script
    }
});

const root = document.createElement("div");
root.id = "extension-root";
document.body.append(root);

render(App, root);
