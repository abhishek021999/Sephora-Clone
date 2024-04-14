let Table=document.querySelector('#Table table tbody')
console.log(Table)
let main_table=document.getElementById('Table')

function loadCartFromStorage() {
    let storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        
       renderUI(cart)
        
       // Update cart count display
    }
}

function updateCartCount() {
    let cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
    console.log(cartCount)
}

// Function to remove item from cart
function removeItemFromCart(index) {
    cart.splice(index, 1);
    renderUI(cart)
    saveCartToStorage(); // Save updated cart to local storage
    updateCartCount(); // Update cart count display
    updateTotal(); // Update total price display
  
    // updateCartCount(); // Update cart count display
    // Optionally, update the UI to reflect the removal of the item
}

function updateTotal() {
    let total = 0;
    cart.forEach(item => {
        total += item.price * 82; // Assuming 'price' is the price of each item
    });
    document.getElementById('total').innerText=`Total Price: Rs ${TotalPrice}`
}
function renderUI(cart) {
    // Clear the table before rendering new data
    
    
    Table.innerHTML = '';
    let TotalPrice=0

    cart.forEach(function (item, index) {
        let createRow = document.createElement('tr');
        let createCol1 = document.createElement('td');
        createCol1.innerText = index + 1;

        // Assuming 'image' is a property of each item in the cart
        let createCol2 = document.createElement('td');
        let image = document.createElement('img');
        image.src =`${item.image_link}`
       
        image.style.width = '50px';
        image.style.height = '50px';  // Adjust image width as needed
        createCol2.appendChild(image);
        let createCol3=document.createElement('td')
        createCol3.innerText=`${item.price*82}`
        let createCol4=document.createElement('td')
        createCol4.innerText='Remove🗑'
        createCol4.addEventListener('click',function(){
            removeItemFromCart(index)
        })
        createRow.append(createCol1, createCol2,createCol3,createCol4);
        TotalPrice += item.price * 82;
        main_table.append(total)
        Table.appendChild(createRow);
        
       
    });
    document.getElementById('total').innerText=`Total Price: Rs ${TotalPrice}`
   
}
function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

loadCartFromStorage()
updateTotal()