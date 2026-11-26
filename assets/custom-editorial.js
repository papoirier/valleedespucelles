document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main');
  if (!main || !main.innerHTML.includes('[EMAIL]')) return;

  const user = 'info';
  const domain = 'valleedespucelles.com';
  const addr = `${user}@${domain}`;

  main.innerHTML = main.innerHTML.replace(
    /\[EMAIL\]/g,
    `<a href="mailto:${addr}">${addr}</a>`
  );
});
