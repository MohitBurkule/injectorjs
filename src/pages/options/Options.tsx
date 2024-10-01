import { createSignal, onMount } from "solid-js";
import "@src/styles/index.css";
import styles from "./Options.module.css";

const Options = () => {
  const [scripts, setScripts] = createSignal<{ [key: string]: string }>({});

  const loadScripts = () => {
    chrome.storage.local.get(null, (items) => {
      setScripts(items);
    });
  };

  const deleteScript = (url: string) => {
    chrome.storage.local.remove(url, () => {
      loadScripts();
    });
  };

  onMount(() => {
    loadScripts();
  });

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <h1>Manage Scripts</h1>
        <ul>
          {Object.entries(scripts()).map(([key, value]) => (
            <li>
              <strong>{key}:</strong> {value}
              <button onClick={() => deleteScript(key)}>Delete</button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
};

export default Options;
