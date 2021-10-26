/************
 * JavaScript for general functionality
 * of Muddy Paws Adventure Gear
 * 
 * Currently updates Bag icon with number
 * of items in the Shopping Bag.
*************/

// Each Product made corresponds to a row in the user's shopping bag.
function Product(prodName, prodColor, prodSize, pricePerProd, prodQuantity) {
    this.name = prodName;
    this.color = prodColor;
    this.size = prodSize;
    this.price = pricePerProd;
    this.quantity = prodQuantity;
}

var bagObj;
var numItems;
var iconNum;

/*
This retrieves the JSON of Products currently in the Shopping Bag.
*/
bagObj = localStorage.getItem('localBag'); 

/*
This initializess an empty Bag JSON in localStorage if it does not already exist.
*/
if (!bagObj) {
    var emptyBag = []; //empty JSON
    emptyBag = JSON.stringify(emptyBag);
    localStorage.setItem('localBag', emptyBag);
}

/*
This updates the number in the bag icon to reflect the number of items in the Shopping Bag
after the page has been loaded.
*/
document.addEventListener("DOMContentLoaded", function() {
    //get Bag from local storage
    bagObj = localStorage.getItem('localBag');
    bagObj = JSON.parse(bagObj);

    //bagObj = [];

    //insert into bag-quantity on the page
    numItems = bagObj.length;

    updateBagIcon(numItems);

    // bagObj = JSON.stringify(bagObj);
    // localStorage.setItem('localBag', bagObj);
});

function updateBagIcon(numItems) {
    document.getElementById('bag-quantity').innerHTML = numItems;

    //adjust styling so numbers fit in the bag icon
    if (numItems === 0) {
        document.getElementById('bag-quantity').style.right = "9px";
    } else if (numItems >= 10) {
        document.getElementById('bag-quantity').style.fontSize = "7pt";
        document.getElementById('bag-quantity').style.right = "8px";
    } else {
        document.getElementById('bag-quantity').style.right = "11px";
        document.getElementById('bag-quantity').style.fontSize = "8pt";
    }
}


/*
On click of the Add to Bag button on the Product Detail page, this function uses the
current product and selections to create a new Product and add to the bag Obj.
*/
function addToBag() {
    bagObj = localStorage.getItem('localBag');
    bagObj = JSON.parse(bagObj);

    var newProd = createProduct();

    bagObj.push(newProd);

    updateBagIcon(bagObj.length);

    bagObj = JSON.stringify(bagObj);

    localStorage.setItem('localBag', bagObj);
}

/*
Called by addToBag on Product Detail page. Populates Product object with settings
from the current Product Detail form.
*/
function createProduct() {
    //get name of product
    var prodName = document.getElementById('product-name').innerHTML;

    //get selected color
    var prodColor = getColor();

    //get selected size
    var prodSize = getSize();

    //get price per product
    var pricePerProd = getPricePer();

    //get quantity
    var prodQuantity = getQuantity();

    return newProd = new Product(prodName, prodColor, prodSize, pricePerProd, prodQuantity);
}

/*
Finds color icon with the active-color class and returns the color of this
active-color icon.
*/
function getColor() {
    var chosenColor = document.querySelector(".active-color");
    var colorClasses = chosenColor.className;
    switch(colorClasses) {
        case "color-icon strawb active-color":
            return "Strawberry";
        case "color-icon blackb active-color":
            return "Blackberry";
        case "color-icon crazyb active-color":
            return "Crazyberry";
        case "color-icon fireorange active-color":
            return "Fire Orange";           
    }
}

/*
Gets chosen size of product from selection menu
*/
function getSize() {
    var selectSize = document.getElementById('size-menu');
    return selectSize.options[selectSize.selectedIndex].value;
}

/*
Gets price of the product from the HTML
*/
function getPricePer() {
    return document.querySelector('.pricing').innerHTML;
}

/*
Gets chosen quantity of item from the number input field.
*/
function getQuantity() {
    return document.getElementById("quantity").value;

}