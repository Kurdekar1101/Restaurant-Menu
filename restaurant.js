let foodItems = [];

async function fetchFoodItems() {
    try {
        const response = await fetch('foodItems.json');
        if (!response.ok) throw new Error("Network error");

        foodItems = await response.json();

        // Call reusable function
        renderItems("bestSellerItems", item => item.best_seller === "yes", 4);
        renderItems("trendingItems", item => item.trending === "yes", 4);
        renderItems("mainCourseItems", item => item.category === "main course", 4);
        renderItems("starterItems", item => item.category === "starter", 4);
        renderItems("beveragesItems", item => item.category === "beverages", 4);

    } catch (error) {
        console.error(error);
    }
}

function renderItems(containerId, filterCondition, limit) {

    const container = document.getElementById(containerId);

    const filteredItems = foodItems
        .filter(filterCondition)
        .slice(0, limit);

    const html = filteredItems.map(item => `
        <div class="menu-card">
            <img src="${item.imageurl}" alt="${item.title}">
            <div class="menu-card-content">
                <h4>${item.title}</h4>
                <p>${item.description}</p>
                <span>
                    Price:
                    <strike class="strike-price">Rs.${item.actual_price}</strike>
                    Rs.${item.selling_price}
                </span>
            </div>
            <div onclick = "addtoCart('${item.id}', '${item.selling_price}', '${item.title}', '${item.imageurl}')" class="add-to-cart-btn">
            
            <button class="cta-button">Add to Cart</button>
            </div>
        </div>
    `).join("");

    container.innerHTML = html;
}

fetchFoodItems();

function addtoCart(itemId, itemPrice, itemTitle, itemImageUrl) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemIndex = cart.findIndex(item => item.id === itemId);

    if (itemIndex > -1) {
        cart[itemIndex].quantity += 1;
    } else {
        cart.push({
            id: itemId,
            price: itemPrice,
            title: itemTitle,
            imageUrl: itemImageUrl,
            quantity: 1
        });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(itemTitle + " added to cart!");
}