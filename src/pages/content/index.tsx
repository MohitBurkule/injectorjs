import { render } from "solid-js/web";
import App from "./components/Demo/app";
import { injectScript } from "./injectScript";

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const url = tabs[0].url;
  chrome.storage.local.get(url, (data) => {
    if (data[url]) {
      injectScript(data[url]);
    }
  });
});

const root = document.createElement("div");
root.id = "extension-root";
document.body.append(root);

render(App, root);
