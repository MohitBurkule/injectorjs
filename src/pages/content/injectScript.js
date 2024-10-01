export function injectScript(script) {
    const scriptElement = document.createElement('script');
    scriptElement.textContent = script;
    document.documentElement.appendChild(scriptElement);
}
