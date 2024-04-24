let cartlist = localStorage.getItem("Cart") ? JSON.parse(localStorage.getItem("Cart")) : []
let totalAm = Number(localStorage.getItem('TotalAmount')) || 0

let container = document.querySelector('.product')
let cartItems = document.querySelector('.items')
let totalAmount = document.querySelector('.tot')
let cartCount  = document.querySelector('.cartCount')
const savedListKey = "savedList";

const checkoutButton = document.getElementById("checkoutButton");


let load = async ()=>{
    cartCount.innerHTML = cartlist.length
    totalAmount.innerHTML=totalAm.toFixed(2)
    cartItems.innerHTML = ""

     cartlist.forEach((item, x)=>{
        cartItems.innerHTML +=`<div class="image-container shopping-cart"> 
        <div class="item">   
        <span class="del_item" onclick="del_item(${x})"><i class="fa-solid fa-trash fa-xl border " style="color: #0a121e;"></i></span>
        <div class="image">   
        <img class="img" src="${item.image}" alt="${item.title}">
        </div>   
        <div class="cardBody">
            <span class="title">${item.title}</span>  
         </div>
         <div class="cardFooter">
            <span class = "decr_item" onclick="decrement(${x})"><i class="fa-solid fa-minus fa-lg" style="color: #040911;"></i></span>
            <span class="quantity">${item.qty}</span>
            <span class= " incr_item" onclick = 'increment(${x})'><i class="fa-solid fa-plus fa-lg" style="color: #050b15;"></i></span>
        </div>
            <div class="price">R${item.price.toFixed(2)}</div> 
        </div>
       </div>`;
         
            })
}

load();

let del_item = (i) => {
    cartlist.splice(i, 1);
    localStorage.setItem('Cart', JSON.stringify(cartlist));
    tot();
    load();
}


let increment = (i)=>{

    cartlist[i].qty +=1
    
    localStorage.setItem('Cart', JSON.stringify(cartlist))
    tot()
    load()
   
}

let decrement = (i)=>{
    if(cartlist[i].qty > 1){
        cartlist[i].qty -=1
       localStorage.setItem('Cart', JSON.stringify(cartlist))
       
        tot()
        load()
    }
    
    
    
}
let tot = ()=>{
        totalAm = 0

        if (!Array.isArray(cartlist)) {
            throw new Error("cartItems must be an array");
          }
        let total = 0;

        for (const item of cartlist) {
           
            totalAm += item.price * item.qty;
        }
          
       
        localStorage.setItem('TotalAmount', JSON.stringify(totalAm))
        return totalAm;
          
}

const updateCheckoutButtonState = () => {
    if (cartlist.length > 0) {
        checkoutButton.classList.add('enabled');
        checkoutButton.removeAttribute("disabled");
    } else {
        checkoutButton.classList.remove('enabled');
        checkoutButton.setAttribute("disabled", "disabled");
    }
};

// FAVOURITE//


const renderFavorites = () => {
    const favoritesContainer = document.querySelector('.favorites-container');
    favoritesContainer.innerHTML = '';

    let savedList = JSON.parse(localStorage.getItem(savedListKey)) || [];

    savedList.forEach(item => {
        const favoriteItemHTML = `
            <div class="favorite-item">
                <img src="${item.image}" alt="${item.title}" />
                <p class="favorite-title">${item.title}</p>
                <p class="favorite-price">$${item.price}</p>
                <button class="remove-favorite" onclick="removeFavorite('${item.id}')">Remove</button>
            </div>
        `;
        favoritesContainer.innerHTML += favoriteItemHTML;
    });
};

window.addEventListener('DOMContentLoaded', () => {
    renderFavorites();
});

const removeFavorite = (itemId) => {
    let savedList = JSON.parse(localStorage.getItem(savedListKey)) || [];

    console.log("Before removal:", savedList);

    savedList = savedList.filter(item => item.id !== itemId);

    console.log("After removal:", savedList);

    localStorage.setItem(savedListKey, JSON.stringify(savedList));

    renderFavorites();
};