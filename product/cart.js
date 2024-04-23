let cartlist = localStorage.getItem("Cart") ? JSON.parse(localStorage.getItem("Cart")) : []
let totalAm = Number(localStorage.getItem('TotalAmount')) || 0

let container = document.querySelector('.product')
let cartItems = document.querySelector('.items')
let totalAmount = document.querySelector('.tot')
let cartCount  = document.querySelector('.cartCount')

let load = async ()=>{
    cartCount.innerHTML = cartlist.length
    totalAmount.innerHTML=totalAm.toFixed(2)
    cartItems.innerHTML = ""

     cartlist.forEach((item, x)=>{
        cartItems.innerHTML +=`<div class="image-container">    
            <img class="img" src="${item.image}" alt="${item.title}">
            <div class="cardBody">
                <span class="title">${item.title}</span>  
            </div>
            <div class="cardFooter">
            <span class = "del_item"><i class="fa-solid fa-trash fa-lg border border-primary" style="color: #0a121e;"></i></span>
            <p class="price">R${item.price}</p> 
            <span class = "decr_item" onclick="decrement(${x})"><i class="fa-solid fa-minus fa-lg" style="color: #040911;"></i></span>
            <span class="quantity">${item.qty}</span>
            <span class= " incr_item" onclick = 'increment(${x})'><i class="fa-solid fa-plus fa-lg" style="color: #050b15;"></i></span>
                
            </div>
        </div>`;
            })
}

load();

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
// removeProduct(index,e) {
//     console.log(this.items[index].qty)
//     this.items.splice(index, 1);
//     this.Total();
//     localStorage.setItem('for', JSON.stringify(this.items))
//   }



