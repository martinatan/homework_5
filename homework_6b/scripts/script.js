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
This initializes an empty Bag JSON in localStorage if it does not already exist.
*/
if (!bagObj) {
    var emptyBag = []; //empty JSON
    emptyBag = JSON.stringify(emptyBag);
    localStorage.setItem('localBag', emptyBag);
}

/*
On page load, this updates the number in the bag icon to reflect
the number of items in the Shopping Bag.
*/
document.addEventListener("DOMContentLoaded", function() {
    //get Bag from local storage
    bagObj = localStorage.getItem('localBag');
    bagObj = JSON.parse(bagObj);

    //empty Bag contents for debugging
    //bagObj = [];

    //insert into bag-quantity on the page
    numItems = bagObj.length;

    updateBagIcon(numItems);

    bagObj = JSON.stringify(bagObj);
    localStorage.setItem('localBag', bagObj);
});

/*
updateBagIcon: Takes in number of items from event listener and
updates number displayed in the Bag icon accordingly.
*/
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