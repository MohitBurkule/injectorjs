import { render } from "solid-js/web";
import App from "./components/Demo/app";
import { injectScript } from "./injectScript";

const url = window.location.href;
chrome.storage.local.get(url, (data) => {
  if (data[url]) {
    injectScript(data[url]);
  }
});

const root = document.createElement("div");
root.id = "extension-root";
document.body.append(root);

render(App, root);
