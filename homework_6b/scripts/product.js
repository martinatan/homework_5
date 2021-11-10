/************
 * JavaScript for Product Detail pages
 * of Muddy Paws Adventure Gear
 * 
 * Currently updates Product Detail view
 * as the user selects different choices
 * of size, color, quantity on the page.
*************/

/*
Updates displays to default settings of HTML page
*/
document.addEventListener("DOMContentLoaded", function() {
    updateDisplay();
});

/*
Update display when quantity is changed
*/
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("quantity").addEventListener("input", function() {
        displaySelection();
    });
});


/*
Update Display function: updates image and summary above the Add to Bag
button, depending on what the user has selected.
*/
function updateDisplay() {
    updateImage();
    displaySelection();
}

/*
Toggle active color based on what icon the user clicks.
*/
var colorIcons = document.getElementsByClassName("color-icon");
for (var i = 0; i < colorIcons.length; i++) {
    colorIcons[i].addEventListener('click', activateColor);
}

/*
activateColor, added by above event listener
*/
function activateColor(color) {
    color = "." + color; //get class
    var activateColor = document.querySelector(color);

    var deactivColor = document.querySelector(".active-color");

    deactivColor.classList.remove("active-color");
    activateColor.classList.add("active-color");

    updateDisplay();
}

/*
Did not finish this function, but it would somehow change my highlighted image
to match the color of the item chosen. How to make this apply to all products?
*/
function updateImage() {
    var color = getColor();
    var imageHighlight = document.querySelector(".image-highlight");
    switch(color) {
        case "Strawberry":
            var imgSrc = imageHighlight.getElementsByTagName("img")[0].src;
            //console.log("imgSrc: " + imgSrc);
            break;
        case "Blackberry":
            var imgSrc = imageHighlight.getElementsByTagName("img")[0].src;
            //console.log("imgSrc: " + imgSrc);
            break;
        case "Crazyberry":
            var imgSrc = imageHighlight.getElementsByTagName("img")[0].src;
            //console.log("imgSrc: " + imgSrc);
            break;
        case "Fire Orange":
            var imgSrc = imageHighlight.getElementsByTagName("img")[0].src;
            //console.log("imgSrc: " + imgSrc);
            break;
    }
}

/*
Changes display on Product page of what item is being added to Bag
*/
function displaySelection() {
    var summaryText = document.getElementById("selection-summary");

    //get selected color
    var prodColor = getColor();

    //get selected size
    var prodSize = getSize();
    prodSize = capitalize(prodSize);

    //get price per product
    var pricePerProd = getPricePer();

    price = pricePerProd.replace(/\$/g, ''); //make into a number;
    //console.log('price: ' + price);

    //get quantity
    var prodQuantity = getQuantity();

    var pluralizer;
    if (prodQuantity > 1 || prodQuantity == 0) {
        pluralizer = 's';
    } else {
        pluralizer = '';
    }

    var subtotal = (price * prodQuantity).toFixed(2); //calculate and truncate

    summaryText.innerHTML = '' +
        '<p>Subtotal: $' + subtotal + '</p>' +
        '<p> for ' + prodQuantity + ' ' + prodColor + 
        ' item' + pluralizer + ' in size ' + prodSize;
}

/*
On click of the Add to Bag button on the Product Detail page, this function uses the
current product and selections to create a new Product and add to the bag Obj.
*/
function addToBag() {
    bagObj = localStorage.getItem("localBag");
    bagObj = JSON.parse(bagObj);

    var newProd = createProduct();

    console.log("isDuplicate value: " + isDuplicate(newProd));

    if (isDuplicate(newProd)) { // update existing row in Bag
        updateItemInBag(newProd);
    } else { // add new row in Bag
        addNewItem(newProd);
    }
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
Checks if the Product passed in is a duplicate (in size and color)
of any of the Products already in the bag.
returns bool
*/
function isDuplicate(product) {
    var isDupe = false;

    var bagObj = localStorage.getItem("localBag");
    bagObj = JSON.parse(bagObj);

    for (var i = 0; i < bagObj.length; i++) {
        // console.log("product color: " + bagObj[i].color);
        // console.log("new color: " + product.color);
        // console.log("product size: " + bagObj[i].size);
        // console.log("new color: " + product.size);

        if (bagObj[i].color === product.color && 
            bagObj[i].size === product.size) {
            isDupe = true;
            return isDupe;
        } else {
            isDupe = false;
        }
    }
    return isDupe;
}

/*
Takes a product and updates the quantity of that added product
in the Bag, based on what quantity is already in the bag.
*/
function updateItemInBag(product) {

    var bagObj = localStorage.getItem("localBag");
    bagObj = JSON.parse(bagObj);

    for (var i = 0; i < bagObj.length; i++) {
        if (bagObj[i].color === product.color &&
            bagObj[i].size === product.size) {
            //console.log("found the matching index");

            var bagQuant = parseInt(bagObj[i].quantity);
            var addQuant = parseInt(product.quantity);
            //console.log("addQuant = " + addQuant);

            bagObj[i].quantity = bagQuant + addQuant;
            //console.log("new quant = " + bagObj[i].quantity);
        }
    }
    bagObj = JSON.stringify(bagObj);   
    localStorage.setItem("localBag", bagObj);
}

function addNewItem(product) {
    // add to bag, update Bag in localStorage
    var bagObj = localStorage.getItem("localBag");
    bagObj = JSON.parse(bagObj);

    bagObj.push(product);

    updateBagIcon(bagObj.length);

    bagObj = JSON.stringify(bagObj);   
    localStorage.setItem("localBag", bagObj);
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
Helper function to capitalize string
*/
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}