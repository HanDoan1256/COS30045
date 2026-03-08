// Simple client-side page switching + active link highlighting

document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('nav a[data-page]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = link.getAttribute('data-page');
      navigate(page + '.html');
    });
  });
});

function navigate(url) {
  window.location.href = url;
}