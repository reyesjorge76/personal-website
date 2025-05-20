document.addEventListener("DOMContentLoaded", function () {
  cart = JSON.parse(localStorage.getItem("cart")) || []; // Reload saved cart
  updateCart();
});

let cart = JSON.parse(localStorage.getItem("cart")) || []; // Load cart or initialize empty

function addToCart(itemName, price, modifier) {
  let item = { name: itemName, price: parseFloat(price), modifier };
  cart.push(item);

  localStorage.setItem("cart", JSON.stringify(cart)); // Store cart persistently
  console.log("Cart saved:", localStorage.getItem("cart")); // Debugging check
  updateCart();
}

function updateCart() {
  let cartContainer = document.getElementById("cart-items");
  let totalContainer = document.getElementById("cart-total");
  let cartCount = document.getElementById("cart-count");

  if (!cartContainer || !totalContainer) return; // Prevent errors on pages without cart

  cartContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    cartContainer.innerHTML += `
            <li>${item.name} (${item.modifier}) - $${item.price.toFixed(2)}
                <button class="btn btn-danger btn-sm" onclick="removeItem(${index})">Remove</button>
            </li>`;
  });

  totalContainer.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;

  if (cartCount) {
    // Prevents null error
    cartCount.innerText = `(${cart.length})`;
  }
}

function removeItem(index) {
  cart.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart)); // Update stored cart
  updateCart(); // Refresh display
}

// Make removeItem globally accessible for inline onclick handlers
window.removeItem = removeItem;

// Removed duplicate cart declaration and duplicate addToCart function
