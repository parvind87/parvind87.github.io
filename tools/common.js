function loadHTML(file, elementId) {
  fetch(file)
    .then(response => response.text())
    .then(data => {
      document.getElementById(elementId).innerHTML = data;
    })
    .catch(error => console.error('Error loading HTML:', error));
}

// Load Header and Footer
loadHTML('../../includes/header.html', 'header');
loadHTML('../../includes/footer.html', 'footer');
