// Global Variables
let cartlist = localStorage.getItem("Cart") ? JSON.parse(localStorage.getItem("Cart")) : []
let db_productsq;

console.log(cartlist)
let container = document.querySelector('.product')



window.addEventListener('DOMContentLoaded', async ()=>{
    try {
        const productId = window.location.search.substring(4);
        const data = await fetch(`http://localhost:8000/products/${productId}`)
        let db_products = await fetch(`http://localhost:8000/products/`)
        const allItemsFormated = await db_products.json()

        db_productsq = allItemsFormated
        const item = await  data.json()
        let product = {
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
        }
    
        container.innerHTML =
         `
         <div class="flex">
            <div class="flex1">
                <div class="product-image">
                    <img src="${item.image}" 
                    alt="${item.title}" />
                </div>
            </div>
            <div class="flex2">
                <p class="product-name">
                ${item.title}
                </p>
                <div class="detail">
                    R ${item.price}
                </div>

                <div class="cartButton">
                        <button class="heart"> <i class="fa-regular fa-heart"></i></button>
                        
                        <button class="cart" onclick= 'addtoCart(${item.id})'> add to cart</button>
                </div>
                <p class="description">
                ${item.description}
                </p>
                <div class="rating">
                    <label class="rating-rate">
                    ${item.rating.rate}
                    <i class="fa-solid fa-star"></i>
                    </label>
                    <label class="rating-count">
                        reviews(${item.rating.count})
                    </label>
                </div>
            </div>
        </div>`
      

    } catch (error) {
        console.error("Could not get item", error)
    }
})

let  addtoCart = async (prod)=>{
     console.log("hghghg", prod)
  
   
    let item =  await db_productsq.filter( (elem, i) => {
            
        return elem.id == prod
    })


    newItem = item.pop() 

    console.log(newItem)
    
    let itemExists =  cartlist.some((elem) => {
       
         return elem.id == newItem.id
        
    });

    console.log("item", itemExists);
        
    

    if (itemExists) {
                    cartlist.forEach(cartItem => {
                        if (cartItem.id === newItem.id) {
                            cartItem.price += newItem.price;
                            cartItem.qty += 1;
                        }
            });
            localStorage.setItem('Cart',JSON.stringify(cartlist))
    } else {
            cartlist.push({ ...newItem, qty: 1 });
            localStorage.setItem('Cart',JSON.stringify(cartlist))
            }
            
    
console.log(cartlist);
    
}






