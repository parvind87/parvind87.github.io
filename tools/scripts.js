// Function to load external HTML files
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
// Image Resizer
document.getElementById('resize-button').addEventListener('click', () => {
  const file = document.getElementById('image-upload').files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        const canvas = document.getElementById('image-canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 300; // Resize to 300px width
        canvas.height = (img.height / img.width) * 300;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const downloadLink = document.getElementById('download-link');
        downloadLink.href = canvas.toDataURL('image/png');
        downloadLink.style.display = 'block';
      };
    };
    reader.readAsDataURL(file);
  }
});

// Geolocation Tools
document.getElementById('get-city-button').addEventListener('click', async () => {
  const lat = document.getElementById('latitude').value;
  const lon = document.getElementById('longitude').value;
  if (lat && lon) {
    const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}`);
    const data = await response.json();
    document.getElementById('city-result').textContent = `City: ${data.city}`;
  }
});

document.getElementById('get-latlon-button').addEventListener('click', async () => {
  const address = document.getElementById('address').value;
  if (address) {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${address}`);
    const data = await response.json();
    if (data.length > 0) {
      document.getElementById('latlon-result').textContent = `Lat: ${data[0].lat}, Lon: ${data[0].lon}`;
    }
  }
});

// Countdown
document.getElementById('start-countdown').addEventListener('click', () => {
  const endDate = new Date(document.getElementById('countdown-date').value).getTime();
  const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = endDate - now;
    if (distance <= 0) {
      clearInterval(timer);
      document.getElementById('countdown-timer').textContent = 'Countdown Over!';
    } else {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      document.getElementById('countdown-timer').textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
  }, 1000);
});

// Timer
document.getElementById('start-timer').addEventListener('click', () => {
  const seconds = parseInt(document.getElementById('timer-input').value);
  let remaining = seconds;
  const timer = setInterval(() => {
    if (remaining <= 0) {
      clearInterval(timer);
      document.getElementById('timer-display').textContent = 'Time\'s up!';
    } else {
      document.getElementById('timer-display').textContent = `${remaining}s`;
      remaining--;
    }
  }, 1000);
});

// Color Picker
document.getElementById('color-input').addEventListener('input', () => {
  const color = document.getElementById('color-input').value;
  document.getElementById('color-value').textContent = color;
});

// Calculator
const calcInput = document.getElementById('calc-input');
const buttons = document.querySelectorAll('.calc-buttons button');
buttons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.textContent === '=') {
      calcInput.value = eval(calcInput.value);
    } else if (button.textContent === 'C') {
      calcInput.value = '';
    } else {
      calcInput.value += button.textContent;
    }
  });
});

// Currency Converter
document.getElementById('convert-button').addEventListener('click', async () => {
  const amount = document.getElementById('amount').value;
  const from = document.getElementById('from-currency').value;
  const to = document.getElementById('to-currency').value;
  if (amount && from && to) {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
    const data = await response.json();
    const rate = data.rates[to];
    document.getElementById('conversion-result').textContent = `${amount} ${from} = ${(amount * rate).toFixed(2)} ${to}`;
  }
});

// Stopwatch
let stopwatchInterval;
let stopwatchTime = 0;

function formatTime(milliseconds) {
  const hours = Math.floor(milliseconds / 3600000);
  const minutes = Math.floor((milliseconds % 3600000) / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

document.getElementById('start-stopwatch').addEventListener('click', () => {
  if (!stopwatchInterval) {
    stopwatchInterval = setInterval(() => {
      stopwatchTime += 1000;
      document.getElementById('stopwatch-display').textContent = formatTime(stopwatchTime);
    }, 1000);
  }
});

document.getElementById('stop-stopwatch').addEventListener('click', () => {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
});

document.getElementById('reset-stopwatch').addEventListener('click', () => {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
  stopwatchTime = 0;
  document.getElementById('stopwatch-display').textContent = formatTime(stopwatchTime);
});
