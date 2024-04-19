let cartlist = []
window.onload = async ()=>{
    try {
        const productId = window.location.search.substring(4);
        const data = await fetch(`http://localhost:8000/products/${productId}`)
        const item = await  data.json()

        console.log(item)

    } catch (error) {
        console.error("Could not get item", error)
    }
}

function addtocart(item) {
    let productExist = cartlist.includes(item)

    if(productExist){
        for( i=0; i<= cartlist.length; i++){
            item.price = item.price + item.price
            cartlist.push(item)
        }
        console.log(item)
    }else{
        cartlist.push(item)
        console.log(item)
    }

    
}

addtocart({
    id: "7",
    title: "White Gold Plated Princess",
    price: 9.99,
    description: "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
    rating: {
        rate: 3,
        count: 400
    }
})


// jay

const productContainer = document.querySelector("#product-container")
const spinner = document.querySelector('#loading')
async function 
fetchAndDisplaySingleProduct(){
    spinner.computedStyleMap.display = 'inline-block';
    const productId = new URLSearchParams
    (window.location.search).get("id");
    const response = await fetch(
    `https://fakestoreapi.com/products/${productId}`
    );
    const product = await response.json();
    console.log(product, productId);
    displayProduct(product);
}

function displayProduct(product){
    spinner.computedStyleMap.display = 'none';
    productContainer.innerHTML = `  
    <div class="product-image">
        <img src=${product.image} 
        alt=${product.title} />
    </div>
    <p class="product-name">
        ${product.title}    
    </p>
    <p class="product-description">
     ${product.description}
    </p>
    <div class="detail">
        ${product.price}
    </div>
</div>`
}
fetchAndDisplaySingleProduct();