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
<<<<<<< HEAD
                    productDiv.innerHTML = 
                    `<img class="img" src="${product.image}" alt="${product.title}">
                       
=======
                    productDiv.innerHTML = `
                    <div clss="image-container">    
                    <img class="img" src="${product.image}" alt="${product.title}">
                   
>>>>>>> feature/Xola-Feature
                        <div class="cardBody">
                            <span>${product.title}</span>
                        </div>
                            
                        <div class="cardFooter">
                            <p class="price">R${product.price.toFixed(2)}</p> 
<<<<<<< HEAD
                           <button onclick="addtocart(${product})"><a href="../product/viewone.html?id=${product.id}">View More</a></button>
                        </div>`;
                    productDiv.innerHTML = `
                        <img src="${product.image}" alt="${product.title}">
                        <h3>${product.title}</h3>
                        <p>R${product.price.toFixed(2)}</p> 
                        <button onclick="addtocart(${product})"><a href="./viewone.html?id=${product.id}">Add To Cart</a></button>
=======
                           <button><a href="./viewone.html?id=${product.id}">View More</a></button>
                        </div>
                        </div> 
                        
                        
>>>>>>> feature/Xola-Feature
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

