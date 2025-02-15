document.getElementById('beautify-btn').addEventListener('click', beautifyHTML);
document.getElementById('copy-btn').addEventListener('click', copyToClipboard);

function beautifyHTML() {
  const input = document.getElementById('html-input').value;
  const indentStyle = document.getElementById('indent-style').value;
  const beautifiedHTML = formatHTML(input, indentStyle);
  const outputElement = document.getElementById('html-output');

  // Update the output with beautified HTML
  outputElement.textContent = beautifiedHTML;

  // Highlight syntax using Prism.js
  Prism.highlightElement(outputElement);
}

function formatHTML(html, indentStyle) {
  // Remove extra whitespace and trim the input
  html = html.trim().replace(/\s+/g, ' ');

  // Use a temporary div to parse the HTML
  const div = document.createElement('div');
  div.innerHTML = html;

  // Recursively format the HTML with proper indentation
  return formatElement(div, 0, indentStyle);
}

function formatElement(element, indentLevel, indentStyle) {
  let result = '';
  const indent = indentStyle === 'tabs' ? '\t'.repeat(indentLevel) : '  '.repeat(indentLevel);

  // Handle text nodes
  if (element.nodeType === Node.TEXT_NODE) {
    const text = element.textContent.trim();
    if (text) {
      result += `${indent}${text}\n`;
    }
    return result;
  }

  // Handle element nodes
  const tagName = element.tagName.toLowerCase();
  result += `${indent}<${tagName}`;

  // Add attributes
  for (const attr of element.attributes) {
    result += ` ${attr.name}="${attr.value}"`;
  }

  // Handle self-closing tags
  if (!element.childNodes.length && !['div', 'span', 'p', 'section'].includes(tagName)) {
    result += ' />\n';
    return result;
  }

  result += '>\n';

  // Recursively format child nodes
  for (const child of element.childNodes) {
    result += formatElement(child, indentLevel + 1, indentStyle);
  }

  // Close the tag
  result += `${indent}</${tagName}>\n`;
  return result;
}

function copyToClipboard() {
  const outputElement = document.getElementById('html-output');
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
