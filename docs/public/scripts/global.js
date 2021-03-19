//**Product object constructor*/ 
function Product(displayName, code, image, imgAlt, description, price ){
    this.displayName = displayName;
    this.code = code;
    this.image = image;
    this.imgAlt = imgAlt;
    this.description = description;
    this.price = price;
}

//** Products for sale / available */
let productsAvailable = [];

//** Cart array */
let cartArr = [];
let cartItemCount = cartArr.length;