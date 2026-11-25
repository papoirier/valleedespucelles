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

// Afficher/masquer le header sur l'accueil selon l'état du panier
const syncHomeHeaderWithCart = (itemCount) => {
  if (typeof itemCount !== 'number') return;
  if (!document.body.classList.contains('template-index')) return;
  document.documentElement.classList.toggle('hide-home-header', itemCount === 0);
};

document.addEventListener('cart:update', (event) => {
  const count = event.detail?.resource?.item_count ?? event.detail?.item_count;
  if (typeof count === 'number') {
    syncHomeHeaderWithCart(count);
  } else {
    fetch('/cart.js')
      .then((res) => res.json())
      .then((cart) => syncHomeHeaderWithCart(cart.item_count))
      .catch(() => {});
  }
});

const originalFetch = window.fetch;
window.fetch = async (...args) => {
  const response = await originalFetch(...args);
  const url = typeof args[0] === 'string' ? args[0] : args[0]?.url || '';
  if (url.includes('/cart/')) {
    response
      .clone()
      .json()
      .then((data) => {
        if (typeof data.item_count === 'number') {
          syncHomeHeaderWithCart(data.item_count);
        }
      })
      .catch(() => {});
  }
  return response;
};
