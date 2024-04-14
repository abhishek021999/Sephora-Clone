let right_cont = document.getElementById('right-cont');
let product;

// Function to show loading indicator
function showLoading() {
    right_cont.innerHTML = '<p class="loading-text">Loading...</p>';
}

async function fetchdata() {
    showLoading(); // Show loading indicator before fetching data
    try {
        let res = await fetch('http://makeup-api.herokuapp.com/api/v1/products.json');
        product = await res.json(); // Remove 'var' keyword to assign to global variable
        
        // Clear previous content before appending new content
        right_cont.innerHTML = '';
        renderdata(product);
    } catch (error) {
        console.error('Error fetching data:', error);
        right_cont.innerHTML = '<p>Error fetching data. Please try again later.</p>';
    }
}

// Function to save cart to local storage
function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    let cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
    console.log(cartCount)
}
// Call updateCartCount to display cart count on page load



let cart = []; // Array to store products in the cart

function handlebutton(event) {
    // Get the index of the clicked product
    let index = event.target.dataset.index;
    // Add the clicked product to the cart array
    let selectedProduct = product[index];
    cart.push(selectedProduct);
    // Optionally, you can display a confirmation message or update the UI to indicate the item has been added to the cart
    saveCartToStorage(); // Save cart to local storage
    updateCartCount(); // Update cart count display
    // console.log("Item added to cart:", selectedProduct);
    // console.log("Cart:", cart);
}

function renderdata(product) {
    product.forEach(function (ele, i) {
        let Div = document.createElement('div');
        Div.id = 'flex-col';
        let image = document.createElement('img');
        image.src = `${ele.image_link}`;
        let Name = document.createElement('p');
        Name.innerText = `Name: ${ele.name}`;
        let brand = document.createElement('p');
        brand.innerText = `Brand: ${ele.brand}`;
        let Category=document.createElement('p');
        Category.innerText=`Category: ${ele.category}`
        let price = document.createElement('b');
        price.innerText = `Price:Rs ${ele.price * 82}`;
        let Add = document.createElement('button');
        Add.innerText = 'Add to Cart';
        Add.style.backgroundColor = 'grey';
        Add.dataset.index = i;
        Add.addEventListener('click',handlebutton)
        Div.append(image, Name,Category, brand, price, Add);
        right_cont.append(Div);
    });
}

// Search Function
let SearchInput = document.querySelector('.input_div>input'); // Select the input field
function handlesearch() {
    let searchTerm = SearchInput.value.toLowerCase(); // Get the value of the input field
    let filterdata = product.filter(function (ele) {
        return ele.name.toLowerCase().includes(searchTerm);
    });
    right_cont.innerHTML = "";
    if (filterdata.length > 0) {
        renderdata(filterdata);
    } else {
        right_cont.innerHTML = '<p>No products found matching the search criteria.</p>';
    }
}
// filter
let Select = document.querySelector('#left-cont>select');

function handleselect() {
    let selectedCategory = Select.value.toLowerCase(); // Get the selected category
    console.log(selectedCategory)
    let filteredProducts;
    if (selectedCategory === "all") {
        // If "All" is selected, show all products
        filteredProducts = product;
        console.log(filteredProducts)
    } else {
        filteredProducts = product.filter(function (ele) {
           
            return ele.product_type.toLowerCase() === selectedCategory;
        });
    }
    right_cont.innerHTML=""
    // // Render the filtered products
    // console.log(filteredProducts)
    renderdata(filteredProducts);
    

}
let Sorting_price=document.querySelector('#left-cont>div>select')

function handleSorting(){
    let Sorting_value=Sorting_price.value
    let Product_data=[...product]
    if(Sorting_value==='asc'){
       Product_data.sort((a,b)=>a.price-b.price)
    }
    else if(Sorting_value==='des'){
        Product_data.sort((a,b)=>b.price-a.price)
    }
    right_cont.innerHTML=""
    renderdata(Product_data)
}
Sorting_price.addEventListener('change',handleSorting)

Select.addEventListener('change', handleselect);


SearchInput.addEventListener('input', handlesearch); // Use 'input' event for real-time search

fetchdata();


