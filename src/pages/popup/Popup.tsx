import { createSignal, onMount } from "solid-js";
import "@src/styles/index.css";
import styles from "./Popup.module.css";

const Popup = () => {
  const [script, setScript] = createSignal("");
  const [scripts, setScripts] = createSignal<{ [key: string]: string }>({});

  const saveScript = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const url = tabs[0].url;
      chrome.storage.local.set({ [url]: script() }, () => {
        alert(`Script saved for ${url}`);
        loadScripts();
      });
    });
  };

  const loadScripts = () => {
    chrome.storage.local.get(null, (items) => {
      setScripts(items);
    });
  };

  const backupScripts = () => {
    chrome.storage.local.get(null, (items) => {
      const blob = new Blob([JSON.stringify(items)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "backup.json";
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  const restoreScripts = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const scripts = JSON.parse(e.target?.result as string);
        chrome.storage.local.set(scripts, () => {
          alert("Scripts restored");
          loadScripts();
        });
      };
      reader.readAsText(file);
    }
  };

  onMount(() => {
    loadScripts();
  });

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <h1>Inject JavaScript</h1>
        <textarea
          rows="10"
          cols="50"
          placeholder="Enter your JavaScript code here..."
          value={script()}
          onInput={(e) => setScript(e.currentTarget.value)}
        ></textarea>
        <button type="button" onClick={saveScript}>Save Script</button>
        <button type="button" onClick={backupScripts}>Backup Scripts</button>
        <input type="file" accept=".json" onChange={restoreScripts} />
        <h2>Saved Scripts</h2>
        <ul>
          {Object.entries(scripts()).map(([key, value]) => (
            <li>
              <strong>{key}:</strong> {value}
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
};

export default Popup;
