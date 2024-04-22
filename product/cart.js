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