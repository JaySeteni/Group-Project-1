let cartlist = []

let container = document.querySelector('.product')



window.onload = async ()=>{
    try {
        const productId = window.location.search.substring(4);
        const data = await fetch(`http://localhost:8000/products/${productId}`)
        const item = await  data.json()

        console.log(item)
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
                        <button class="cart" onclick="addtocart(${item.item})"> add to cart</button>
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
        console.log(item)

    } catch (error) {
        console.error("Could not get item", error)
    }
}

// function addtocart(item) {
//     item['qty'] = 1
//     let productExist = cartlist.includes(item)

//     console.log(productExist);

//     if(productExist){
//         for( i=0; i<= cartlist.length; i++){
//             item.price = item.price + item.price
//             cartlist.push(item)
//         }
//         console.log(item)
//     }else{
//         cartlist.push(item)
//         console.log(item)
//     }

//     console.log(cartlist)
    
// }

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

let btn = document.querySelector('.cart')
let addtocart =  (item)=>{
        console.log(item)
        item['qty'] = 1
        let productExist = cartlist.includes(item)
    
        console.log(productExist);
    
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
    
        console.log(cartlist)
        
   
}
