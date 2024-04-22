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
         `
        console.log(item)

    } catch (error) {
        console.error("Could not get item", error)
    }
}