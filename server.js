const productsList = document.getElementById('products-list');

window.onload = async function () {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const products = await response.json();
      
      products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
          <img src="${product.image}" alt="${product.title}">
          <h3>${product.title}</h3>
          <p>${product.price}</p>
          <p>${product.description}</p>
        `;
        
        productsList.appendChild(productDiv);
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  