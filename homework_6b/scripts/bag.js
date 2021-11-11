/************
 * JavaScript for Shopping Bag Page
 * of Muddy Paws Adventure Gear
 * 
 * Currently toggles between empty and
 * non-empty page content, depending on
 * whether product has been added to bag.
*************/

var bagObj;

/*
This retrieves the JSON of Products currently in the Shopping Bag.
*/
bagObj = localStorage.getItem('localBag'); 

/*
This function will determine whether to tell the user whether the Bag is
empty or not. If not empty, it will display the table of products.
*/
document.addEventListener("DOMContentLoaded", function() {
    updateDisplay();
});

function updateDisplay() {
    var bagHeading, bagSubhead, bagSection;
    
    console.log("updating display");
    //get Bag from local storage
    bagObj = localStorage.getItem('localBag');
    bagObj = JSON.parse(bagObj);

    if (bagObj.length > 0) {
        console.log("inside bag not empty")
        console.log("bag length " + bagObj.length);

        bagHeading = document.getElementById("bag-heading");
        bagHeading.innerHTML = "Shopping Bag";

        bagSubhead = document.getElementById("bag-subheading");
        bagSubhead.style.display = "none";

        updateRows(); // loop thru bag and build tr for each
        updatePrice(); // calc subtotal, tax, shipping, and total

        //display completed table
        bagSection = document.getElementById("bag");
        bagSection.style.display = "inline-block";
    } else {
        //display "Your bag is empty" status
        console.log("inside bag empty)")
        console.log("bag length " + bagObj.length);

        bagHeading = document.getElementById("bag-heading");
        bagHeading.innerHTML = "Your bag is empty.";

        bagSubhead = document.getElementById("bag-subheading");
        bagSubhead.innerHTML = "Search gear for your next Muddy Paws adventure to fill it up!";
        bagSubhead.style.display = "block";

        bagSection = document.getElementById("bag");
        bagSection.style.display = "none";
    }
}

/*
Add remove functions once page loads
*/
document.addEventListener("DOMContentLoaded", function() {
    var removeLinks = document.getElementsByClassName("remove-item");
    for (var i = 0; i < removeLinks.length; i++) {
        removeLinks[i].addEventListener("onclick", function() {
            removeItem();
        });
    }
});

/*
Given at least one item in the Bag, create and insert table rows
*/
function updateRows() {
    var table = document.getElementById("items-table");

    //delete all old children first
    for (var i = 1; i < (table.rows.length); i++) {
        table.deleteRow(i);
    }
    
    for (var i = 0; i < bagObj.length; i++) {
        var tr = document.createElement("TR"); 
        
        //create items-td
        tr.appendChild(itemsTD(i));

        //create quant-td
        tr.appendChild(quantTD(i));

        //create price-td
        tr.appendChild(priceTD(i));

        table.appendChild(tr);
    }
}

/*
Given at least one item in the Bag, calculate and insert fees
*/
function updatePrice() {
    var subtotal = 0, taxesFees = 0, shipping = 0, total = 0;

    subtotal = calcSubtotal();
    taxesFees = (subtotal * 0.07).toFixed(2);
    shipping = (9.99).toFixed(2);
    total = parseFloat(subtotal) + parseFloat(taxesFees) + parseFloat(shipping);
    total = (total).toFixed(2);

    document.querySelector("#subtotal-amt").innerHTML = "$" + subtotal;
    document.querySelector("#taxes-fees-amt").innerHTML = "$" + taxesFees;
    document.querySelector("#shipping-amt").innerHTML = "$" + shipping;
    document.querySelector("#total-amt").innerHTML = "$" + total;
}

/*
loops through bag to retrieve subtotals and quantity to calculate a 
grand subtotal of items in the cart.
*/
function calcSubtotal() {
    var runningSub = 0;
    for (var i = 0; i < bagObj.length; i++) {
        var pricePer = bagObj[i].price.replace(/\$/g, '');
        var quant = bagObj[i].quantity;

        runningSub = runningSub + (pricePer * quant);
    }
    return runningSub.toFixed(2);
}

/*
Returns items TD to append to TR
*/
function itemsTD(i) {
    var td = document.createElement("TD"); 
    var colorClass;

    switch(bagObj[i].color) {
        case "Strawberry":
            colorClass = "strawb";
            break;
        case "Blackberry":
            colorClass = "blackb";
            break;
        case "Crazyberry":
            colorClass = "crazyb";
            break;
        case "Fire Orange":
            colorClass = "fireorange";  
            break;         
    }

    td.innerHTML = '<div class="row item-details">' +
                        '<div class="col-25 thumbnail">' +
                            '<img src="./assets/images/dog-harness.jpg"' +
                                'alt="A large and small dog, both with pink harnesses"' +
                                'width="100%" height="auto"' +
                            '/>' +
                        '</div>' +
                        '<div class="col-75 item-descript">' + 
                            '<p><a href="./dog-harness.html">Dog Harness</a></p>'+
                            '<p>Size: ' + capitalize(bagObj[i].size) + '</p>' +
                            '<p>Color: ' + bagObj[i].color +
                                ' <span class="color-icon ' + colorClass + ' active-color"></span>' + 
                            '</p>' +
                            '<p><a class="remove-item ' + i + '" onclick="removeItem(' + i + ')">Remove</a>' +
                            '</p>' +
                        '</div>' +
                    '</div>';

    td.classList.add("items-td");

    return td;
}

/*
Returns quantity TD to append to TR
*/
function quantTD(i) {
    var td = document.createElement("TD"); 

    td.classList.add("quant-td");

    //create label for quantity
    const quantLabel = document.createElement("label");
    quantLabel.setAttribute("id", "quant-label");
    quantLabel.setAttribute("for", "quantity");
    var quantText = document.createTextNode("Quantity:");
    quantLabel.appendChild(quantText);

    //create input for quantity
    const quantInput = document.createElement("input");
    quantInput.setAttribute("id", "quantity");
    quantInput.setAttribute("type", "number");
    quantInput.setAttribute("step", "1");
    quantInput.setAttribute("value", bagObj[i].quantity);
    quantInput.setAttribute("min", "0");
    quantInput.setAttribute("max", "10");    

    //create div for delivery
    const delivDiv = document.createElement("div");
    
    const delivInput = document.createElement("input");
    delivInput.setAttribute("type", "radio");
    delivInput.setAttribute("id", "delivery");
    delivInput.setAttribute("name", "deliv-or-pickup");
    delivInput.setAttribute("value", "delivery");
    delivDiv.appendChild(delivInput);

    const delivLabel = document.createElement("label");
    delivLabel.setAttribute("for", "delivery");
    var delivText = document.createTextNode("Ship to address");
    delivLabel.appendChild(delivText);
    delivDiv.appendChild(delivLabel);

    //create div for shipping
    const pickupDiv = document.createElement("div");

    const pickupInput = document.createElement("input");
    pickupInput.setAttribute("type", "radio");
    pickupInput.setAttribute("id", "pickup");
    pickupInput.setAttribute("name", "deliv-or-pickup");
    pickupInput.setAttribute("value", "delivery");
    pickupDiv.appendChild(pickupInput);

    const pickupLabel = document.createElement("label");
    pickupLabel.setAttribute("for", "pickup");
    var pickupText = document.createTextNode("Pick up at store – Free");
    pickupLabel.appendChild(pickupText);
    pickupDiv.appendChild(pickupLabel);

    //append the above four
    td.appendChild(quantLabel);
    td.appendChild(quantInput);
    td.appendChild(delivDiv);
    td.appendChild(pickupDiv);

    return td;
}

/*
Returns price TD to append to TR
*/
function priceTD(i) {
    var td = document.createElement("TD"); 

    //attach class to td element
    td.classList.add("price-td");

    //create h4 node
    const priceNode = document.createElement("h4");

    //put total price into the h4 node
    var objPrice = bagObj[i].price.replace(/\$/g, ''); //make into number
    var calcPrice = objPrice * bagObj[i].quantity
    calcPrice = document.createTextNode("$" + calcPrice);
    priceNode.appendChild(calcPrice);

    //create per-price node
    const per = document.createElement("p");
    per.setAttribute("id", "per-price");
    const node = document.createTextNode("(" + bagObj[i].price + " each)");
    per.appendChild(node);

    //add Nodes to td
    td.appendChild(priceNode);
    td.appendChild(per);

    return td;
}

/*
Clear bag and update display 
*/
function clearBag() {
    bagObj = localStorage.getItem('localBag');
    bagObj = JSON.parse(bagObj);

    bagObj = [];

    updateBagIcon(bagObj.length);


    bagObj = JSON.stringify(bagObj);
    localStorage.setItem('localBag', bagObj);

    updateDisplay();

}

/*
Remove item of particular from Bag and update display
*/
function removeItem(index) {
    console.log("index: " + index);
    bagObj = localStorage.getItem('localBag');
    bagObj = JSON.parse(bagObj);

    bagObj.splice(index, 1);

    console.log("bag length after splice: " + bagObj.length);

    updateBagIcon(bagObj.length);

    bagObj = JSON.stringify(bagObj);
    localStorage.setItem('localBag', bagObj);

    var table = document.getElementById("items-table");
    table.deleteRow(index);

    updateDisplay();
}

/*
Helper function to capitalize string
*/
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}