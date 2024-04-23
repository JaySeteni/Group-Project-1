let cartlist = localStorage.getItem("Cart") ? JSON.parse(localStorage.getItem("Cart")) : []
let totalAm = localStorage.getItem('Total') || 0

let container = document.querySelector('.product')
let cartItems = document.querySelector('.items')
let totalAmount = document.querySelector('.tot')

let load = async ()=>{
    
    totalAmount.innerHTML=totalAm
    cartItems.innerHTML = ""

     cartlist.forEach((item, x)=>{
        cartItems.innerHTML +=`<div class="image-container">    
            <img class="img" src="${item.image}" alt="${item.title}">
            <div class="cardBody">
                <span class="title">${item.title}</span>
                <span class="desc">${item.description}</span>
                
            </div>
            <div class="cardFooter">
                <p class="price">R${item.price.toFixed(2)}</p> 
                <span class="desc">${item.qty}</span>
                <span class = "decr_item"><i class="fa-solid fa-minus fa-lg" style="color: #040911;"></i></span>
                <span class= " incr_item" onclick = 'increment(${x})'><i class="fa-solid fa-plus fa-lg" style="color: #050b15;"></i></span>
                <span class = "del_item"><i class="fa-solid fa-trash fa-lg" style="color: #0a121e;"></i></span>
                
            </div>
        </div>`;
            })
}

load();

let increment = (i)=>{
    console.log(cartlist[i])

    cartlist[i].qty +=1
    
    localStorage.setItem('Cart', JSON.stringify(cartlist))
    console.log(cartlist)
    tot()
    load()
   
}

let decrement = (i)=>{
    console.log(cartlist[i])
    if(cartlist[i].qty > 1){
        cartlist[i].qty -=1
       localStorage.setItem('Cart', JSON.stringify(cartlist))
        console.log(cartlist) 
        tot()
        load()
    }
    
    
    
}
let tot = ()=>{
    
    cartlist.forEach((item) => {
      totalAm += (item.price * item.qty)
      totalAmount.innerHTML=totalAmount
      console.log(totalAm)
      localStorage.setItem('Total',JSON.stringify(totalAm))
        
    })
}
// removeProduct(index,e) {
//     console.log(this.items[index].qty)

//     this.cartService.cartItemcount.next(this.cartService.cartItemcount.value - this.items[index].qty)
//     this.items.splice(index, 1);
//     this.Total();
//     localStorage.setItem('for', JSON.stringify(this.items))
//   }



