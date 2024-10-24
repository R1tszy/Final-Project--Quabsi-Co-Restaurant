let cartItems = {};
let totalPrice = 0;

document.addEventListener('DOMContentLoaded', function() {
const menuItems = document.querySelectorAll('.menu-item button');
const shoppingBagIcon = document.querySelector('.shopping-bag');
const shoppingCart = document.querySelector('.shopping-cart');
const shoppingCartItemsContainer = shoppingCart.querySelector('.shopping-cart-items');
const totalPriceElement = shoppingCart.querySelector('.total-price');
const makeOrderButton = shoppingCart.querySelector('.make-order');
const cancelOrder = shoppingCart.querySelector('.cancel-order');

// bag icon count
function updateShoppingBagNotification() {
  const cartItemCount = Object.keys(cartItems).length;
  shoppingBagIcon.querySelector('.notification').textContent = cartItemCount > 0 ? cartItemCount : '';
}

// Function to add item to cart
function addToCart(item) {
  const itemName = item.closest('.menu-item').querySelector('h3').textContent;
  const itemPrice = parseFloat(item.closest('.menu-item').querySelector('h4').textContent.replace('₱', ''));

  
  if (cartItems[itemName]) {
    cartItems[itemName].quantity++;  
  } else {
    // mag add ng item sa cart
    cartItems[itemName] = { quantity: 1, price: itemPrice };
  }

  updateShoppingCart();  
  updateShoppingBagNotification();  
}

// Function to update the shopping cart content
function updateShoppingCart() {
  shoppingCartItemsContainer.innerHTML = '';
  totalPrice = 0;

  for (const itemName in cartItems) {
    const item = cartItems[itemName];
    const itemElement = document.createElement('div');
    itemElement.classList.add('cart-item');
    itemElement.innerHTML = `
      <p>${itemName}</p>
      <div class="quantity-control">
        <button class="decrease" data-item="${itemName}">-</button>
        <span class="quantity">${item.quantity}</span>
        <button class="increase" data-item="${itemName}">+</button>
      </div>
      <p class="price">₱${(item.price * item.quantity)}</p>
    `;
    shoppingCartItemsContainer.appendChild(itemElement);
    totalPrice += item.price * item.quantity;
  }

  totalPriceElement.textContent = `Total: ₱${totalPrice}`;
}

// Function to update the shopping bag notification
function updateShoppingBagNotification() {
  const notificationElement = document.querySelector('.notification');
  const totalItems = Object.values(cartItems).reduce((total, item) => total + item.quantity, 0);
  notificationElement.textContent = totalItems;  // Display total quantity of items
  notificationElement.style.display = totalItems > 0 ? 'block' : 'none';  // Show or hide the notification
}
// Event listener for "Add to Cart" buttons
menuItems.forEach(item => {
  item.addEventListener('click', () => {
    addToCart(item);
  });
});

// Event listener for quantity control buttons
shoppingCartItemsContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('decrease')) {
    const itemName = event.target.dataset.item;
    if (cartItems[itemName].quantity > 1) {
      cartItems[itemName].quantity--;
    } else {
      delete cartItems[itemName];
    }
  } else if (event.target.classList.contains('increase')) {
    const itemName = event.target.dataset.item;
    cartItems[itemName].quantity++;
  }

  updateShoppingCart();
  updateShoppingBagNotification();
});

// Event listener for shopping bag icon
shoppingBagIcon.addEventListener('click', () => {
  shoppingCart.style.display = shoppingCart.style.display === 'none' ? 'block' : 'none';
});


// Event listener for "Make an Order" button
makeOrderButton.addEventListener('click', () => {
  // Handle order submission (e.g., send data to server)
  // You can use fetch() or other methods to send cart data
  // to your backend server for processing.
  const orderConfirmation = document.createElement('div');
  orderConfirmation.classList.add('order-confirmation');
  orderConfirmation.innerHTML = `
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAzhJREFUSEvFls9rE1EQx7/EpON9gdV8eAPEOrBH1Cb1Cpa0Wp201IEEVQQhYp4s6IHPfgPqIjiQURPKogHFUVFa5ukBkvBH5gNrSII6kEQQdFiLM1Lm+zIxrYkdTdu0oBz3Dfz/czsm3nvEf6T0X/ioiyw58nqVZR1bQFzhgX6x9TE21ILKAmsPG5cCjddBah1GigssrR/tD3+xWkCjsHV0bXzxjkzCGCRjfgnCWqAFv/pBF4U7AsHdjDhEICgE7E8nx5mvpQOJR7YxdmClbD/JIhOlAic5k4npBY/baVhCZ6o9O7MoBPRzK0ylHg6XcsSrEQCLwE0VwJMwKOUpm9zCs4CEJUAA/guNX3+v8G3VnqUOkUC5c24RbIZOZ6sQsf7dP5awa/2xRoWc8YdAbC8jGqTAD4DWGER+8ZtZIIjbUNfJ9cKwErY/wJEa8uBCkFbOCO+sci+ArDAQiMmNX3rX2BfeE0LkzFQFpQ5OBpKmEAo4cA+EK5b6RiE1WOqPmSuTVXsiwSOMnDeDszAYQJtAHhPns8IGaSm2uIvzG+zo43NBosogBorHWZ0pUP6xQKwNxLoIuCCZQDxubSaOIZbu1y+uo93GLwdQIqIgyk18cyM8fU1bmBD9ACotk3eCuzrbVrHgp/bBF2Rqn4QBEb3Mq8yq/ouIE5JLZ7bGqXXvwmCugHMKbZVQlDTaDCuF1T8Z3+KNtd1qeqdOXieKWF/EEQPzfCi/UHol6q+2bKrfb3NS1hknwBYZiNyQw7Xd2L3bfOAgTcaaCfGfQCeYlAChlzjrI50JL5ZgnMfY62KkkmmigjdlMP1e721HzpIwDzP3f+YBEOOJ2cXPUAmBZRI4BeAKltBQj8YLQBcDsYvKTW9drqfzSXhHwDIFK6E9UlNVx2BPZHG7QLiXiWoYFZlKNHnCJxrnEjgDAHHZwIn0PGUFj9rpVH86RP172SmIwA2lpIAge4bxJfTqm4eKJbm+LFX07N+7pgr/RrAQhutT56s159sf/bDSZKOwaZYbs5d2WtgTN0yE5AwieyBVHDQvBYdWUngScXcg95wB2EYY3C7Yumtr945ouU5lQUuFVJyc1UCYKfxG6KFFS6h3V+IAAAAAElFTkSuQmCC"/>
    <p>Your order has been successfully processed.</p>
  `;
  document.body.appendChild(orderConfirmation);
  setTimeout(() => {
    orderConfirmation.remove();
  }, 3000);

  cartItems = {};
  updateShoppingCart();
  updateShoppingBagNotification();
  shoppingCart.style.display = 'none';
});


// Event listener for Cancel Order button
document.querySelector('.cancel-order').addEventListener('click', () => {

  cartItems = {};
  totalPrice = 0; 

  updateShoppingCart();
  updateShoppingBagNotification();

  shoppingCart.style.display = 'none'; 
});


// Event listener for "Close" button
cancelOrder.addEventListener('click', () => {
  shoppingCart.style.display = 'none';
});

// Function to initialize the shopping cart
function initializeShoppingCart() {
  // You can load cart items from local storage or server here
  // For example:
  // cartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
  updateShoppingCart();
  updateShoppingBagNotification();
}

initializeShoppingCart();
});

function togglePopup() {
var errorpopup = document.getElementById('errorpop');
var popup = document.getElementById('myPopup');

if (Object.keys(cartItems).length === 0){
  errorpopup.classList.toggle('showw');  
  popup.classList.remove('show');      

}else{
  popup.classList.toggle('show');      
  errorpopup.classList.remove('showw');  
}

}
function hidePopup() {
var popup = document.getElementById('myPopup');
var errorpopup = document.getElementById('errorpop');

errorpopup.classList.remove('showw');
popup.classList.remove('show');
}
