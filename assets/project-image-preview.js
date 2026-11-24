const imageLinks = document.querySelectorAll('#images-title + .project-media-grid a');
const imageDialog = document.createElement('dialog');
imageDialog.className = 'project-image-dialog';
imageDialog.setAttribute('aria-label', 'Enlarged project image');
imageDialog.innerHTML = `
  <div class="preview-modal-content">
    <button class="preview-modal-close" type="button" aria-label="Close image preview" autofocus>×</button>
    <img alt="">
  </div>
`;
document.body.append(imageDialog);

const enlargedImage = imageDialog.querySelector('img');
const closeImagePreview = imageDialog.querySelector('button');
let imageOpener;

imageLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    if (typeof imageDialog.showModal !== 'function') return;

    event.preventDefault();
    imageOpener = link;
    enlargedImage.alt = link.querySelector('img').alt;
    enlargedImage.src = link.href;
    imageDialog.showModal();
    document.body.classList.add('modal-open');
  });
});

closeImagePreview.addEventListener('click', () => imageDialog.close());
imageDialog.addEventListener('click', (event) => {
  if (event.target === imageDialog) imageDialog.close();
});
imageDialog.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  enlargedImage.removeAttribute('src');
  imageOpener?.focus({preventScroll:true});
});
