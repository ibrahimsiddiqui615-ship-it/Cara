const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
  bar.addEventListener('click', () => {
    nav.classList.add('active');
  })
};

if (close) {
  close.addEventListener('click', () => {
    nav.classList.remove('active');
  })
};

// Cart functionality
window.cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to add product to cart
function addToCart(productId, quantity = 1) {
  const product = products.find(p => p.id == productId);
  if (!product) return;

  const cartItem = {
    id: product.id,
    name: product.name,
    price: product.price,
    quantity: quantity,
    image: product.image
  };

  const existing = window.cart.find(item => item.id === cartItem.id);

  if (existing) {
    existing.quantity += cartItem.quantity;
  } else {
    window.cart.push(cartItem);
  }

  localStorage.setItem("cart", JSON.stringify(window.cart));
  updateCartCount();
  alert("Added to cart");
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

// Single product add to cart
const addToCartBtn = document.querySelector(".normal");
if (addToCartBtn) {
  addToCartBtn.addEventListener("click", () => {
    const productId = addToCartBtn.getAttribute("data-id");
    const qtyInput = document.querySelector(".single-pro-details input[type='number']");
    const quantity = qtyInput ? parseInt(qtyInput.value) : 1;
    addToCart(productId, quantity);
  });
}

// Featured products add to cart
const addCartButtons = document.querySelectorAll(".add-to-cart");
addCartButtons.forEach(button => {
  button.addEventListener("click", event => {
    event.preventDefault();
    const productDiv = event.target.closest(".pro");
    const productId = productDiv.getAttribute("data-id");
    addToCart(productId, 1);
  });
});

// Initialize cart count on page load
updateCartCount();
