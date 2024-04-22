let products = JSON.parse(localStorage.getItem('products')) || [];
const productsList = document.getElementById('products-list');
const categories = document.querySelectorAll('.category');
window.onload = async function () {
    try {
        const response = await fetch('http://localhost:8000/products');
        const products = await response.json();
        
        console.log(products)
        function displayProducts(category) {
            productsList.innerHTML = ''; 
            
            products.forEach(product => {
                if (category === 'all' || product.category.toLowerCase() === category) {
                    const productDiv = document.createElement('div'); 
                    productDiv.classList.add('product');
                    productDiv.innerHTML = `
                    <div class="image-container">    
                    <img class="img" src="${product.image}" alt="${product.title}">
                   
                        <div class="cardBody">
                            <span>${product.title}</span>
                        </div>
                            
                        <div class="cardFooter">
                            <p class="price">R${product.price.toFixed(2)}</p> 
                           <button><a href="./viewone.html?id=${product.id}">View More</a></button>
                        </div>
                        </div> 
                        
                        
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

function searchProducts() {
    const searchProducts = document.getElementById("searching").value.toLowerCase();
    const matchingProducts = products.filter(products => 
        products.image.toLowerCase().includes(searchProducts) ||
        products.title.toLowerCase().includes(searchProducts) ||
        products.price.toLowerCase().includes(searchProducts) 
        // products.timestamp.toLowerCase().includes(searchProducts)
    );

    if (matchingProducts.length > 0) {
        displayProducts(matchingProducts);
    }
}

