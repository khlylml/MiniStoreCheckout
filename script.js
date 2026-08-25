function calculateItemAmount(price, quantity) {
    return price * quantity;
}

function calculateDiscount(subtotal) {
    let discount = 0;

    if (subtotal >= 5000) {
        discount = subtotal * 0.10;
    } else if (subtotal >= 3000) {
        discount = subtotal * 0.07;
    } else if (subtotal >= 1000) {
        discount = subtotal * 0.05;
    } else {
        discount = 0;
    }

    return discount;
}

function getDeliveryFee(option) {
    let deliveryFee = 0;

    switch (option) {
        case "1":
            deliveryFee = 0;
            break;
        case "2":
            deliveryFee = 80;
            break;
        case "3":
            deliveryFee = 150;
            break;
        default:
            deliveryFee = 0;
    }

    return deliveryFee;
}

const productCount = document.querySelector("#productCount");
const productsContainer = document.querySelector("#productsContainer");
const calculateButton = document.querySelector("#calculateBtn");
const validationMessage = document.querySelector("#validationMessage");
const orderSummary = document.querySelector("#orderSummary");

productCount.addEventListener("input", function () {
    const numberOfProducts = Number(productCount.value);

    productsContainer.innerHTML = "";

    if (numberOfProducts > 0) {
        for (let i = 0; i < numberOfProducts; i++) {
            const productDiv = document.createElement("div");

            productDiv.innerHTML = `
                <h3>Product ${i + 1}</h3>

                <label for="productName-${i}">Product Name</label>
                <input type="text" id="productName-${i}">

                <br><br>

                <label for="productPrice-${i}">Price</label>
                <input type="number" id="productPrice-${i}" min="0" step="0.01">

                <br><br>

                <label for="productQuantity-${i}">Quantity</label>
                <input type="number" id="productQuantity-${i}" min="1">

                <br><br>
            `;

            productsContainer.appendChild(productDiv);
        }
    }
});

calculateButton.addEventListener("click", function () {
    const customerName = document.querySelector("#customerName").value.trim();
    const numberOfProducts = Number(productCount.value);
    const deliveryOption = document.querySelector("#deliveryOption").value;

    validationMessage.textContent = "";
    orderSummary.innerHTML = "";

    if (customerName === "") {
        validationMessage.textContent = "Please enter the Customer Name.";
        return;
    }

    if (!Number.isFinite(numberOfProducts) || numberOfProducts <= 0) {
        validationMessage.textContent =
            "Please enter a valid positive Number of Products.";
        return;
    }

    let subtotal = 0;
    let productDetails = "";

    for (let i = 0; i < numberOfProducts; i++) {
        const productName =
            document.querySelector(`#productName-${i}`).value.trim();

        const price =
            Number(document.querySelector(`#productPrice-${i}`).value);

        const quantity =
            Number(document.querySelector(`#productQuantity-${i}`).value);

        if (productName === "") {
            validationMessage.textContent =
                "Please enter the Product Name for Product " + (i + 1) + ".";
            return;
        }

        if (!Number.isFinite(price) || price <= 0) {
            validationMessage.textContent =
                "Please enter a valid positive Price for Product " + (i + 1) + ".";
            return;
        }

        if (!Number.isFinite(quantity) || quantity <= 0) {
            validationMessage.textContent =
                "Please enter a valid positive Quantity for Product " + (i + 1) + ".";
            return;
        }

        const itemAmount = calculateItemAmount(price, quantity);
        subtotal += itemAmount;

        productDetails += `
            <p>
                <strong>${i + 1}. ${productName}</strong><br>
                Price: ₱${price.toFixed(2)}<br>
                Quantity: ${quantity}<br>
                Amount: ₱${itemAmount.toFixed(2)}
            </p>
        `;
    }

    const discount = calculateDiscount(subtotal);

    let discountRate = 0;

    if (subtotal >= 5000) {
        discountRate = 10;
    } else if (subtotal >= 3000) {
        discountRate = 7;
    } else if (subtotal >= 1000) {
        discountRate = 5;
    } else {
        discountRate = 0;
    }

    const deliveryFee = getDeliveryFee(deliveryOption);

    let deliveryType = "";

    switch (deliveryOption) {
        case "1":
            deliveryType = "Store Pickup";
            break;
        case "2":
            deliveryType = "Standard Delivery";
            break;
        case "3":
            deliveryType = "Express Delivery";
            break;
        default:
            deliveryType = "Unknown";
    }

    const finalAmount = subtotal - discount + deliveryFee;

    orderSummary.innerHTML = `
        <h2>ORDER SUMMARY</h2>

        <p><strong>Customer:</strong> ${customerName}</p>

        ${productDetails}

        <p><strong>Subtotal:</strong> ₱${subtotal.toFixed(2)}</p>
        <p><strong>Discount Rate:</strong> ${discountRate}%</p>
        <p><strong>Discount Amount:</strong> ₱${discount.toFixed(2)}</p>
        <p><strong>Delivery Option:</strong> ${deliveryType}</p>
        <p><strong>Delivery Fee:</strong> ₱${deliveryFee.toFixed(2)}</p>
        <p><strong>Final Amount:</strong> ₱${finalAmount.toFixed(2)}</p>
    `;
});
