document.addEventListener('DOMContentLoaded', function () {
  const imageInput = document.getElementById('image-input');
  const imageElement = document.getElementById('image');
  const cropBox = document.getElementById('crop-box');
  const rotateLeftButton = document.getElementById('rotate-left');
  const rotateRightButton = document.getElementById('rotate-right');
  const cropButton = document.getElementById('crop-button');
  const resetButton = document.getElementById('reset-button');
  const downloadButton = document.getElementById('download-button');
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  let image = null;
  let rotation = 0;
  let originalImageSrc = null;

  // Load image when file is selected
  imageInput.addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        imageElement.src = event.target.result;
        originalImageSrc = event.target.result; // Save original image
        image = new Image();
        image.src = event.target.result;
        image.onload = function () {
          canvas.width = image.width;
          canvas.height = image.height;
          ctx.drawImage(image, 0, 0);
        };
      };
      reader.readAsDataURL(file);
    }
  });

  // Rotate image left
  rotateLeftButton.addEventListener('click', function () {
    rotation -= 90;
    applyRotation();
  });

  // Rotate image right
  rotateRightButton.addEventListener('click', function () {
    rotation += 90;
    applyRotation();
  });

  // Apply rotation to the image
  function applyRotation() {
    if (image) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.drawImage(image, -image.width / 2, -image.height / 2);
      ctx.restore();
      imageElement.src = canvas.toDataURL();
    }
  }

  // Crop the image
  cropButton.addEventListener('click', function () {
    if (image) {
      const cropBoxRect = cropBox.getBoundingClientRect();
      const imageRect = imageElement.getBoundingClientRect();

      const scaleX = image.width / imageRect.width;
      const scaleY = image.height / imageRect.height;

      const cropX = (cropBoxRect.left - imageRect.left) * scaleX;
      const cropY = (cropBoxRect.top - imageRect.top) * scaleY;
      const cropWidth = cropBoxRect.width * scaleX;
      const cropHeight = cropBoxRect.height * scaleY;

      const croppedCanvas = document.createElement('canvas');
      croppedCanvas.width = cropWidth;
      croppedCanvas.height = cropHeight;
      const croppedCtx = croppedCanvas.getContext('2d');

      croppedCtx.drawImage(
        image,
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight
      );

      imageElement.src = croppedCanvas.toDataURL();
      image = new Image();
      image.src = croppedCanvas.toDataURL();
    }
  });

  // Reset the image to its original state
  resetButton.addEventListener('click', function () {
    if (originalImageSrc) {
      imageElement.src = originalImageSrc;
      image = new Image();
      image.src = originalImageSrc;
      rotation = 0;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0);
    }
  });

  // Download the cropped and rotated image
  downloadButton.addEventListener('click', function () {
    if (image) {
      const link = document.createElement('a');
      link.download = 'cropped-image.png';
      link.href = imageElement.src;
      link.click();
    }
  });

  // Make the crop box draggable
  let isDragging = false;
  let offsetX, offsetY;

  cropBox.addEventListener('mousedown', function (e) {
    isDragging = true;
    offsetX = e.clientX - cropBox.getBoundingClientRect().left;
    offsetY = e.clientY - cropBox.getBoundingClientRect().top;
  });

  document.addEventListener('mousemove', function (e) {
    if (isDragging) {
      const containerRect = document.querySelector('.image-container').getBoundingClientRect();
      const newLeft = e.clientX - offsetX - containerRect.left;
      const newTop = e.clientY - offsetY - containerRect.top;

      // Ensure the crop box stays within the container
      const maxLeft = containerRect.width - cropBox.offsetWidth;
      const maxTop = containerRect.height - cropBox.offsetHeight;

      cropBox.style.left = `${Math.max(0, Math.min(newLeft, maxLeft))}px`;
      cropBox.style.top = `${Math.max(0, Math.min(newTop, maxTop))}px`;
    }
  });

  document.addEventListener('mouseup', function () {
    isDragging = false;
  });
});
