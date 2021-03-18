var today = new Date();
console.log("Last refresh was at:    " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds());
//!Remembet to double check that elements are not deleted from cart when people switch between pages.

//**Initialize bootstrap popovers */
//TODO: Temporarily commented out until I get around to making sure this works.
// var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
// var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
//   return new bootstrap.Popover(popoverTriggerEl)
// })

// function cartDisplay(){
//     let cartProduct = document.createElement("div");
//     cartProduct.setAttribute("class",  "bg-primary");
//     console.log(this);
//     // document.querySelector(cart-btn).appendChild(cartProduct);
// }

// var cartButtonElement = document.getElementById('cart-btn')
// var cartPopover = new bootstrap.Popover(cartButtonElement, {
//     html: true,
//     template: '<div class="popover cust-card cust-font" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header bg-secondary text-light"></h3><div class="popover-body" id="cartPopoverBody"></div></div>',
//     title: 'Productos Seleccionados',
//     content: function(){
//         if(cartArr.length === 0){
//             return 'Tu carrito esta vacio.';
//         } else {
//             // Construct this part better.
//             let productNameArr = [];
//             cartDisplay();
//             cartArr.forEach(element => productNameArr.push(element.displayName))
//             console.log(productNameArr);
//             return productNameArr;
//         }}
// })





//**Creates new productCard */
//? Would there be a benefit to making each part of createProductCard its own function?
function createProductCard(product){
    //! Remember to add the id to the appropriate div in the shop.
    let productCard = document.createElement("div");
    document.getElementById("product-container").appendChild(productCard);
        productCard.setAttribute("class", "card col-sm-4 m-1 cust-card");
        productCard.setAttribute("id", product.code);
    // TODO: Remember to correctly style the cards. Use style object properties instead of .setAttribute
        // productCard.setAttribute("style", "width: 100px; height: 150px");
    //**Add product image inside the card. */   
        let productImage = new Image();
        productImage.src = product.image;
        document.getElementById(product.code).appendChild(productImage);
        productImage.setAttribute("class", "card-img-top");
        productImage.setAttribute("source", product.Image); 
        productImage.setAttribute("alt", product.imgAlt);
    //**Add body div inside the card */
    let productCardContent = document.createElement ("div")
    document.getElementById(product.code).appendChild(productCardContent);
        productCardContent.setAttribute("class", "card-body");
        productCardContent.setAttribute("id", product.code + "-content");
    //**Add content inside body div */
    let cardContentHeader = document.createElement ("h5");
    document.getElementById(product.code + "-content").appendChild(cardContentHeader);
        cardContentHeader.setAttribute("class","card-title");
        cardContentHeader.innerText = name;
    let cardContentText = document.createElement ("p");
    document.getElementById(product.code + "-content").appendChild(cardContentText);
        cardContentText.setAttribute("class","card-text"); 
        cardContentText.innerText = product.description;
    let cardContentPrice = document.createElement ("h6");
    document.getElementById(product.code + "-content").appendChild(cardContentPrice);
        cardContentPrice.setAttribute("class","mb-2");
        //TODO: Automatize dollar sign?
        cardContentPrice.innerText = product.price;
    let cardContentAddButton = document.createElement ("a");
    document.getElementById(product.code + "-content").appendChild(cardContentAddButton);
        cardContentAddButton.setAttribute("href", "#");
        cardContentAddButton.setAttribute("class","btn btn-primary add-btn");
        cardContentAddButton.setAttribute("id", product.code + "-add-btn")
        cardContentAddButton.innerText = "Agregar?";
}

//**Function to push new product to productsAvailable and create productCard */
function addNewProduct(name, code, img, imgAlt, desc, price){
    //Create new product object.
    let newProduct = new Product(name, code, img, imgAlt ,desc, price);
    //add that object to 'available'
    //! 'available' will temporarily be initilized in global.js and stored in custom.js until I look into serverside stuff
    productsAvailable.push(newProduct);
    //create product card to go in the shop.
    createProductCard(newProduct);
}

//!Temporarily initialized products here, until I look into serverside things.
addNewProduct("Bed", "bed-christmas-1", "./images/christmas-bed-vertical.jpg", "Bed Picture" , "A very comfortable bed for your dog.", "$45");
addNewProduct("Shampoo", "shampoo-1", "./images/BowiePic1-43AR.jpg", "Shampoo Picture" , "A great shampoo.", "$5");
addNewProduct("Cream", "cream-1","./images/ave-bed1.jpg", "Cream Picture", "A great cream", "$5");
addNewProduct("Balsamo Humectante","balsamo-humectante", "./images/ave-bed1.jpg", "Foto de la crema", "Una crema humectante", "$5");

function cartBadgeCounter(){   
    //! Wont really be functional until cartArr is stored serverside 
    if (cartArr.length == 0){
        document.querySelector("#cart-badge").hidden = true;
    } else {
        document.querySelector("#cart-badge").innerText = cartArr.length; 
    }

};

//**add to cart function*/
;(function(){
    //**EventListener*/
    document.addEventListener('click', function(event){
        //** If click on add-btn then identify the product id */
        if (event.target.matches('.add-btn')){
            let selectedProduct;
            const productId = event.target.parentElement.parentElement.id;
            //**Identify product object based on id/code */
            productsAvailable.forEach(element => 
                {if(element.code == productId){
                    selectedProduct = element
                }}
            )
            //** Add product to cart array. */
            cartArr.push(selectedProduct)
            //console.log(cartArr);
            //** Alternative to the above before saving cartArr serverside: add to localStorage. */
            //! localStorage is a temporary solution until I look into serverside stuff
            let productName = selectedProduct.name;
            window.localStorage.setItem(productId, undefined);
            //!Unsure why I can't get it to take selectedProduct.name as a str, but since this is a temp solution, I just won't deal with that atm.
            //**For now use window.localStorage.key(index); to loop through the keys when access is necessary.*/
            
            //**Update badge counter. */
            cartBadgeCounter();

            
        }
    })
})();

