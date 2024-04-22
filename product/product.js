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
    item['qty'] = 1
    let productExist = cartlist.
    
    console.log(productExist)
    if(productExist){
        for( i=0; i<= cartlist.length; i++){
            item['qty'] += 1
            item.price = item.price + item.price
            cartlist.push(item)
        }
        console.log(item)
    }else{
        cartlist.push(item)
        console.log(cartlist)
    }

    
}


