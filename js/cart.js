// Cart management functions for cart.html

window.cart = window.cart || JSON.parse(localStorage.getItem("cart")) || [];

// Function to render cart items
function renderCart() {
  const tbody = document.querySelector("#cart tbody");
  if (!tbody) return;

  tbody.innerHTML = "";

  if (window.cart.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align: center;">Your cart is empty</td></tr>';
    updateCartTotal();
    return;
  }

  window.cart.forEach((item, index) => {
    const subtotal = item.price * item.quantity;
    const row = `
      <tr>
        <td><i class='bx bx-x-circle' style="cursor: pointer;" onclick="removeFromCart(${index})"></i></td>
        <td><img src="${item.image}" alt="${item.name}"></td>
        <td>${item.name}</td>
        <td>₹${item.price}</td>
        <td><input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)"></td>
        <td>₹${subtotal}</td>
      </tr>
    `;
    tbody.innerHTML += row;
  });

  updateCartTotal();
}

// Function to remove item from cart
function removeFromCart(index) {
  window.cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(window.cart));
  renderCart();
  updateCartCount();
}

// Function to update quantity
function updateQuantity(index, newQuantity) {
  const qty = parseInt(newQuantity);
  if (qty > 0) {
    window.cart[index].quantity = qty;
    localStorage.setItem("cart", JSON.stringify(window.cart));
    renderCart();
  }
}

// Function to update cart total
function updateCartTotal() {
  const subtotalElement = document.querySelector("#subtotal table tr:nth-child(1) td:nth-child(2)");
  const totalElement = document.querySelector("#subtotal table tr:nth-child(3) td:nth-child(2)");

  if (!subtotalElement || !totalElement) return;

  const subtotal = window.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 0 : 0; // Free shipping
  const total = subtotal + shipping;

  subtotalElement.textContent = `₹${subtotal}`;
  totalElement.textContent = `₹${total}`;
}

// Function to update cart count in navbar
function updateCartCount() {
  const totalQuantity = window.cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountElement = document.getElementById("cart-count");
  if (cartCountElement) {
    cartCountElement.innerText = totalQuantity;
  }
  // Also update mobile cart count if exists
  const mobileCartCount = document.querySelector(".cart-count");
  if (mobileCartCount) {
    mobileCartCount.innerText = totalQuantity;
  }
}

// Initialize cart on page load
document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  updateCartCount();
});
