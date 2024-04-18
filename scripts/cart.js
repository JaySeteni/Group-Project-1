//Script is for the cart page

let cartlist = []
window.onload()
// GET  /products - This retrieves a list of all resource entities of products.
 async function getProducts(){
    const response = await fetch('http://localhost:3000/products');
    const products = await response.json();

    cartlist.push(products)

    viewList(products)

    console.log(products)
}

// GET  /product - This retrieves a single from products.
async function getProduct(){
    let id = window.ur
}
getProducts()

function addtocart(item) {
    cartlist.push(item)
}

function viewList(list){
    let items = document.querySelector('ul')
    let item = ""
    list.forEach(element => {
        items.innerHTML =+ `<li>${element.title}</li>`
    });
    
}
