// document.addEventListener("DOMContentLoaded", function () {
//     const cartContainer = document.getElementById("cart-items");
//     const totalContainer = document.getElementById("cart-total");
//     let cart = JSON.parse(localStorage.getItem("cart")) || [];

//     function renderCart() {
//         cartContainer.innerHTML = "";
//         if (cart.length === 0) {
//             cartContainer.innerHTML = "<p>Your cart is empty. Explore our menu to add items</p>";
//             totalContainer.textContent = "";
//             return;
//         }

//         let totalPrice = 0;
//         cart.forEach((item, index) => {
//             const itemTotal = item.price * item.quantity;
//             totalPrice += itemTotal;

//             const div = document.createElement("div");
//             div.classList.add("cart-item");
//             div.innerHTML = `
//                 <h3>${item.title}</h3>
//                 <p>Price: ₹${item.price}</p>
//                 <p>Quantity: 
//                     <button class="decrease" data-index="${index}">-</button>
//                     ${item.quantity}
//                     <button class="increase" data-index="${index}">+</button>
//                 </p>
//                 <p>Total: ₹${itemTotal}</p>
//             `;
//             cartContainer.appendChild(div);
//         });

//         totalContainer.textContent = "Grand Total: ₹" + totalPrice;
//     }

//     cartContainer.addEventListener("click", function (e) {
//         if (e.target.classList.contains("increase")) {
//             const index = e.target.dataset.index;
//             cart[index].quantity += 1;
//         } else if (e.target.classList.contains("decrease")) {
//             const index = e.target.dataset.index;
//             if (cart[index].quantity > 1) {
//                 cart[index].quantity -= 1;
//             } else {
//                 cart.splice(index, 1);
//             }
//         }
//         localStorage.setItem("cart", JSON.stringify(cart));
//         renderCart();
//     });

//     renderCart();
// });


// document.addEventListener("DOMContentLoaded", function () {
//     const cartContainer = document.getElementById("cart-container");
//     let cart = JSON.parse(localStorage.getItem("cart")) || [];

//     if (cart.length === 0) {
//         cartContainer.innerHTML = `<p>Your cart is empty. Explore our <a href="ourmenu.html">menu</a> setion.</p>`;
//         return;
//     }

//     let tableHTML = `
//         <table id="cartTable">
//             <thead>
//                 <tr>
//                     <th>Item</th>
//                     <th>Price</th>
//                     <th>Quantity</th>
//                     <th>Total</th>
//                 </tr>
//             </thead>
//             <tbody>
//     `;

//     let grandTotal = 0;
//     cart.forEach(item => {
//         let itemTotal = item.price * item.quantity;
//         grandTotal += itemTotal;
//         tableHTML += `
//             <tr>
//                 <td>${item.title}</td>
//                 <td>₹${item.price}</td>
//                 <td>
//                     <button onclick="updateQuantity('${item.id}', -1)">-</button>
//                     ${item.quantity}
//                     <button onclick="updateQuantity('${item.id}', 1)">+</button>
//                 </td>
//                 <td>₹${itemTotal}</td>
//             </tr>
//         `;
//     });

//     tableHTML += `
//             </tbody>
//             <tfoot>
//                 <tr>
//                     <td colspan="3"><strong>Grand Total</strong></td>
//                     <td><strong>₹${grandTotal}</strong></td>
//                 </tr>
//             </tfoot>
//         </table>
//     `;

//     cartContainer.innerHTML = tableHTML;
// });

// function updateQuantity(itemId, change) {
//     let cart = JSON.parse(localStorage.getItem("cart")) || [];
//     const index = cart.findIndex(item => item.id === itemId);

//     if (index > -1) {
//         cart[index].quantity += change;
//         if (cart[index].quantity <= 0) {
//             cart.splice(index, 1);
//         }
//     }

//     localStorage.setItem("cart", JSON.stringify(cart));
//     location.reload(); // refresh to update table
//}


document.addEventListener("DOMContentLoaded", function() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-container");

    if (cart.length === 0) {
        cartContainer.innerHTML = `<p>Your cart is empty. Explore our <a href="ourmenu.html">menu</a> setion.</p>`;
        return;
    }

    let tableHTML = `
        <table id="cartTable">
            <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
            </tr>
    `;

    let grandTotal = 0;

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        grandTotal += itemTotal;

        tableHTML += `
            <tr>
                <td>${item.title}</td>
                <td>
                    <button onclick="updateQuantity(${index}, -1)">-</button>
                    ${item.quantity}
                    <button onclick="updateQuantity(${index}, 1)">+</button>
                </td>
                <td>₹${item.price}</td>
                <td>₹${itemTotal}</td>
            </tr>
        `;
    });

    tableHTML += `
        <tr>
            <td colspan="3" align="right"><strong>Grand Total</strong></td>
            <td><strong>₹${grandTotal}</strong></td>
        </tr>
        </table>
        <br>
        <div id="btn">
        <button id="checkoutBtn">Checkout</button>
        </div>
    `;

    cartContainer.innerHTML = tableHTML;

    document.getElementById("checkoutBtn").addEventListener("click", function() {
        alert("Order placed");
        localStorage.setItem("orderDetails", JSON.stringify(cart));
        localStorage.removeItem("cart");
        window.location.href = "order.html";
    });
});

function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}
