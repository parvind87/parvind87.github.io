// script.js
const imageInput = document.getElementById('image-input');
const uploadedImage = document.getElementById('uploaded-image');
const extractBtn = document.getElementById('extract-btn');
const extractedText = document.getElementById('extracted-text');

// Load image when file is selected
imageInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      uploadedImage.src = e.target.result;
      uploadedImage.style.display = 'block';
      extractBtn.disabled = false;
    };
    reader.readAsDataURL(file);
  }
});

// Extract text from image
extractBtn.addEventListener('click', async () => {
  if (!uploadedImage.src) return;

  extractBtn.disabled = true;
  extractedText.textContent = 'Extracting text...';

  try {
    const result = await Tesseract.recognize(
      uploadedImage.src,
      'eng', // Language (English)
      {
        logger: (m) => console.log(m), // Log progress
      }
    );

    extractedText.textContent = result.data.text;
  } catch (error) {
    extractedText.textContent = 'Error extracting text. Please try again.';
    console.error(error);
  } finally {
    extractBtn.disabled = false;
  }
});
