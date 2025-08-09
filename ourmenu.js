let foodItems =[];

async function fetchFoodItems(){
    try{
        const response = await fetch('foodItems.json');
        if(!response.ok){
            throw new Error("Network response was not ok");
        }

        foodItems = await response.json();
        populateMenu(foodItems);
        


    }catch(error){
        console.error("Error fetching food items:", error);
    }
}


function populateMenu(foodItems){
    const categories= {
        'bestSellers':[],
        'trending':[],
        'starter':[],
        'beverages':[],
        'main-course':[],
    }
    foodItems.forEach(item=>{
        if(item.best_seller === "yes"){
            categories['bestSellers'].push(item);
        }

        if(item.trending ==="yes"){
            categories['trending'].push(item);
        }

        //put in appropriate catogaey
        let cat = item.category.toLowerCase().replace(" ","-");

        categories[cat].push(item);


    });
    for(const category in categories){
        const categoryContainer = document.getElementById(category);

        const innerHTML = categories[category].map(item=> createMenuItem(item)).join("");
        categoryContainer.querySelector(".ourmenu-items").innerHTML = innerHTML;
    }
}

function createMenuItem(item){
    const html = `
    <div class="ourmenu-card">
            <img
              src="${item.imageurl}"
              alt="${item.title}"
            />
            <div class="menu-card-content">
              <h4>${item.title}</h4>
              <p>${item.description}</p>
              <span
                >Price: <strike class="strike-price">Rs.${item.actual_price}</strike> Rs.${item.selling_price}
              </span>
            </div>
            <div onclick = "addtoCart('${item.id}', '${item.selling_price}', '${item.title}', '${item.imageurl}')" class="add-to-cart-btn">
            
            <button onclick="addToCart('Pizza', 200)" class="cta-button">Add to Cart</button>
            </div>
          </div>`;
          return html;
        //   <button class="cta-button">Add to Cart</button>
}


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

fetchFoodItems();

// Search functionality

function searchItems(query){
    const searchContainer = document.getElementById('search-items').querySelector('.ourmenu-items');
    searchContainer.innerHTML = "";
    if(query.length < 2){
        return;
    }

    const filteredItems = foodItems.filter(item=> 
        item.title.toLowerCase().includes(query.toLowerCase())
    );

    if(filteredItems.length === 0){
        searchContainer.innerHTML = "<p> No items found</p>";
    }
    else{
        const searchHTML = filteredItems.map(items => createMenuItem(items)).join("");
        searchContainer.innerHTML = searchHTML;
    }
}
let searchTimeout = null;
document.querySelector(".search-input").addEventListener("input", (event)=>{
    const query = event.target.value;
    //searchItems(query);
    if(query){
        if(searchTimeout)clearTimeout(searchTimeout);

        searchTimeout = setTimeout(()=>{
            searchItems(query);
        }, 1000);
    }
});
