// Global Variables
let savedList = JSON.parse(localStorage.getItem('savedList')) || [];
let cartlist = localStorage.getItem("Cart") ? JSON.parse(localStorage.getItem("Cart")) : []
let db_productsq;
let count = document.querySelector('.cartCount')
count.innerHTML = cartlist.length
let totalAm = Number(localStorage.getItem('TotalAmount')) || 0

let container = document.querySelector('.product')
let favs = document.querySelector('.favs')
let forfavs;


window.addEventListener('DOMContentLoaded', async ()=>{

    forfavs = JSON.parse(localStorage.getItem(savedListKey)) || [];
    favs.innerHTML = forfavs.length
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
                        <button class="heart" onclick='saveForLaterButton(${item.id})'> <i class="fa fa-heart"></i></button>
                        
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
            alert("Item has been to cart succefully")
            localStorage.setItem('Cart',JSON.stringify(cartlist))
    } else {
            cartlist.push({ ...newItem, qty: 1 });
            localStorage.setItem('Cart',JSON.stringify(cartlist))
            alert("Item has been to cart succefully")
            }
            
    
console.log(cartlist);
count.innerHTML = cartlist.length
    tot()
}

let tot = ()=>{
    totalAm = 0

    if (!Array.isArray(cartlist)) {
        throw new Error("cartItems must be an array");
      }
    let total = 0;

    for (const item of cartlist) {
       
        totalAm += item.price;
    }
      
   
    localStorage.setItem('TotalAmount', JSON.stringify(totalAm))
    return totalAm;
      
}

const savedListKey = "savedList"; 

let saveForLaterButton =  async (item_id) => {

  let item =  await db_productsq.filter( (elem, i) => {
            
    return elem.id == item_id
})

    newItem = item.pop() 


    let isProductSaved =  savedList.some((elem) => {
       
        return elem.id == newItem.id
       
   });

  if (!isProductSaved) {
    
    savedList.push(newItem);
    localStorage.setItem(savedListKey, JSON.stringify(savedList));
    
    alert("Product saved for later!");
  } else {
    alert("Product already saved!");
  }
  forfavs = await JSON.parse(localStorage.getItem(savedListKey)) || [];
  console.log(forfavs)
  favs.innerHTML = forfavs.length
}




