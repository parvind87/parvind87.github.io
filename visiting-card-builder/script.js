document.getElementById('template').addEventListener('change', function() {
  loadTemplate(this.value);
});

// Load the selected template
function loadTemplate(template) {
  fetch(`templates/${template}.html`)
    .then(response => response.text())
    .then(html => {
      document.getElementById('card-preview').innerHTML = html;
      updateCard(); // Update the card after loading the template
    });
}

// Automatically update the card when any input changes
document.querySelectorAll('.form input').forEach(input => {
  input.addEventListener('input', updateCard);
});

// Update the card with the latest data
function updateCard() {
  const title = document.getElementById('title').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const address = document.getElementById('address').value;
  const website = document.getElementById('website').value;
  const logo = document.getElementById('logo').files[0];

  const card = document.getElementById('card-preview');

  if (title) card.querySelector('.title').innerText = title;
  if (email) card.querySelector('.email').innerText = `Email: ${email}`;
  if (phone) card.querySelector('.phone').innerText = `Phone: ${phone}`;
  if (address) card.querySelector('.address').innerText = `Address: ${address}`;
  if (website) card.querySelector('.website').innerText = `Website: ${website}`;

  if (logo) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = card.querySelector('.logo');
      img.src = e.target.result;
      img.style.maxWidth = '100px'; // Resize logo to fit
      img.style.maxHeight = '100px';
    };
    reader.readAsDataURL(logo);
  }
}

// Save the card as an image
function saveCard() {
  const card = document.getElementById('card-preview');
  html2canvas(card).then(canvas => {
    const link = document.createElement('a');
    link.download = 'visiting-card.png';
    link.href = canvas.toDataURL();
    link.click();
  });
}

// Initial load of the first template
loadTemplate('template1');
