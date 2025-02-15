document.getElementById('beautify-btn').addEventListener('click', beautifyJSON);
document.getElementById('minify-btn').addEventListener('click', minifyJSON);
document.getElementById('copy-btn').addEventListener('click', copyToClipboard);
document.getElementById('indent-style').addEventListener('change', beautifyJSON);
document.getElementById('dark-mode').addEventListener('change', toggleDarkMode);

function beautifyJSON() {
  const input = document.getElementById('json-input').value;
  try {
    // Parse the input as JSON
    const parsedJSON = JSON.parse(input);
    const indentStyle = document.getElementById('indent-style').value;
    const indent = indentStyle === 'tabs' ? '\t' : ' '.repeat(Number(indentStyle));

    // Beautify the JSON with the selected indentation
    const beautifiedJSON = JSON.stringify(parsedJSON, null, indent);
    const outputElement = document.getElementById('json-output');

    // Update the output with beautified JSON
    outputElement.textContent = beautifiedJSON;

    // Highlight syntax using Prism.js
    Prism.highlightElement(outputElement);

    // Remove invalid class if present
    document.getElementById('json-input').classList.remove('invalid');
  } catch (error) {
    // Highlight input field as invalid
    document.getElementById('json-input').classList.add('invalid');
    alert('Invalid JSON! Please check your input.');
  }
}

function minifyJSON() {
  const input = document.getElementById('json-input').value;
  try {
    // Parse the input as JSON
    const parsedJSON = JSON.parse(input);
    // Minify the JSON (remove all whitespace)
    const minifiedJSON = JSON.stringify(parsedJSON);
    const outputElement = document.getElementById('json-output');

    // Update the output with minified JSON
    outputElement.textContent = minifiedJSON;

    // Highlight syntax using Prism.js
    Prism.highlightElement(outputElement);

    // Remove invalid class if present
    document.getElementById('json-input').classList.remove('invalid');
  } catch (error) {
    // Highlight input field as invalid
    document.getElementById('json-input').classList.add('invalid');
    alert('Invalid JSON! Please check your input.');
  }
}

function copyToClipboard() {
  const outputElement = document.getElementById('json-output');
  const text = outputElement.textContent;

  // Use the modern Clipboard API if available
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    }).catch(() => {
      alert('Failed to copy text.');
    });
  } else {
    // Fallback to the older execCommand method
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        alert('Copied to clipboard!');
      } else {
        alert('Failed to copy text.');
      }
    } catch (err) {
      alert('Failed to copy text.');
    }
    document.body.removeChild(textarea);
  }
}

function toggleDarkMode() {
  const darkModeToggle = document.getElementById('dark-mode');
  const prismDarkTheme = document.getElementById('prism-dark-theme');
  document.body.classList.toggle('dark-mode', darkModeToggle.checked);
  prismDarkTheme.disabled = !darkModeToggle.checked;
}
