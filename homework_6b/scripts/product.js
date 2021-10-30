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
Toggles active color based on what icon the user clicks.
*/
function activateColor(color) {
    color = "." + color;
    var activateColor = document.querySelector(color);

    var deactivColor = document.querySelector(".active-color");

    activateColor.classList.add("active-color");
    deactivColor.classList.remove("active-color");

    updateDisplay();
}

/*
Update display when quantity is changed
*/
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("quantity").addEventListener("input", function() {
        console.log("it changed");
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
    console.log('price: ' + price);

    //get quantity
    var prodQuantity = getQuantity();

    var pluralizer;
    if (prodQuantity > 1 || prodQuantity == 0) {
        pluralizer = 's';
    } else {
        pluralizer = '';
    }

    var subtotal = (price * prodQuantity).toFixed(2); //calculate and truncate
    console.log("subtotal is " + subtotal);

    summaryText.innerHTML = '' +
        '<p>Subtotal: $' + subtotal + '</p>' +
        '<p> for ' + prodQuantity + ' ' + prodColor + 
        ' item' + pluralizer + ' in size ' + prodSize;
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

/*
Helper function to capitalize string
*/
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}