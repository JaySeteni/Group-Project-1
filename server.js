let products = JSON.parse(localStorage.getItem('products')) || [];
const productsList = document.getElementById('products-list');
const categories = document.querySelectorAll('.category');
let currentSortPrice = 'A'; 
let sortedProducts = []; 
let count = document.querySelector('.cartCount')
let cartlist = localStorage.getItem("Cart") ? JSON.parse(localStorage.getItem("Cart")) : []
count.innerHTML = cartlist.length


window.onload = async function () {
    
    try {
        const response = await fetch('http://localhost:8000/products');
        products = await response.json();
        
        // Initialize sortedProducts with unsorted products
        sortedProducts = [...products];
        
        displayProducts('all');
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

function displayProducts(category) {
    productsList.innerHTML = ''; 
   
    const filteredProducts = sortedProducts.filter(product => category === 'all' || product.category.toLowerCase() === category);
    
    filteredProducts.forEach(product => {
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
            </div>`;
        
        productsList.appendChild(productDiv);
    });
}

function sortProducts() {
    if (currentSortPrice === 'A') {
        sortedProducts.sort((a, b) => a.price - b.price);
    } else {
        sortedProducts.sort((a, b) => b.price - a.price);
    }
    
    displayProducts('all'); 
}

function sortPrice() {
    const sortValue = document.getElementById("sortPrice").value;
    currentSortPrice = sortValue;
    sortProducts();
}

function sortTitle() {
    sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    displayProducts('all'); 
}

function displaySearchResults(products) {
    const searchResultsContainer = document.getElementById('search-results');
    searchResultsContainer.innerHTML = ''; 

    products.forEach(product => {
        const productDiv = document.createElement('div'); 
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <div style="height:200px;" class="image-container product">    
                <img style="height:70px; width:70px; class="img" src="${product.image}" alt="${product.title}">
                <div style="margin-top: 0;" class="cardBody">
                    <span style="margin-top: 0;">${product.title}</span>
                </div>
                <div style="margin: 1px;" class="cardFooter">
                    <p  class="price">R${product.price.toFixed(2)}</p> 
                    <button style="height: 30px;"><a href="./viewone.html?id=${product.id}">View More</a></button>
                </div>
            </div>`;
        
        searchResultsContainer.appendChild(productDiv);
    });
}

function searchProducts() {
    const searchInput = document.getElementById("searching").value.trim().toLowerCase();
    if (searchInput === "") {
        clearSidebar(); 
        displayProducts('all'); 
        return;
    }
    const matchingProducts = sortedProducts.filter(product => 
        product.image.toLowerCase().includes(searchInput) ||
        product.title.toLowerCase().includes(searchInput) ||
        product.price.toString().toLowerCase().includes(searchInput) 
    );
    displaySearchResults(matchingProducts); 
}

function clearSidebar() {
    const productElements = document.querySelectorAll('.sidebar .product');
    productElements.forEach(element => {
        element.remove(); 
    });
}



categories.forEach(category => {
    category.addEventListener('click', () => {
        const selectedCategory = category.dataset.category;
        displayProducts(selectedCategory);
    });
});
