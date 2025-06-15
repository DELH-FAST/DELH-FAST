// main.js - Delh Fast

document.addEventListener('DOMContentLoaded', () => {
  const productList = document.getElementById('product-list');

  // Sample product array (can be replaced with fetched data)
  const products = [];

  if (products.length === 0) {
    productList.innerHTML = "<p>No products available. Please check back later.</p>";
    return;
  }

  products.forEach(product => {
    const div = document.createElement('div');
    div.className = "product-card";
    div.innerHTML = `
      <img src="\${product.image}" alt="\${product.name}" />
      <h3>\${product.name}</h3>
      <p>\${product.price}</p>
      <button>Add to Cart</button>
    `;
    productList.appendChild(div);
  });
});
