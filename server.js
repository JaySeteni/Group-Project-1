const productsList = document.getElementById('products-list');
const categories = document.querySelectorAll('.category');

window.onload = async function () {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        
        
        function displayProducts(category) {
            productsList.innerHTML = ''; 
            
            products.forEach(product => {
                if (category === 'all' || product.category.toLowerCase() === category) {
                    const productDiv = document.createElement('div'); 
                    productDiv.classList.add('product');
                    productDiv.innerHTML = `
                        <img src="${product.image}" alt="${product.title}">
                        <h3>${product.title}</h3>
                        <p>R${product.price.toFixed(2)}</p> 
                        <button>Add To Cart</button>
                    `;
                    
                    productsList.appendChild(productDiv);
                }
            });
        }
        
        // Event listener for category click
        categories.forEach(category => {
            category.addEventListener('click', () => {
                const selectedCategory = category.dataset.category;
                displayProducts(selectedCategory);
            });
        });
        
        // Display all products initially
        displayProducts('all');
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
