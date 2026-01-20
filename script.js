const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if(bar) {
  bar.addEventListener('click', () => {
    nav.classList.add('active');
  })
};

if(close) {
  close.addEventListener('click', () => {
    nav.classList.remove('active');
  })
};
/* =========================
   CART COUNT + ADD TO CART
   ========================= */

// Get cart from localStorage
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// Save cart to localStorage
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// Update cart number badge
function updateCartCount() {
  const cart = getCart();
  let count = 0;

  cart.forEach(item => {
    count += Number(item.qty);
  });

  const badge = document.getElementById("cart-count");
  if (badge) {
    badge.innerText = count;
    badge.style.display = count > 0 ? "inline-block" : "none";
  }
}

/* ===== ADD TO CART FUNCTION ===== */
function addToCart(product) {
  const cart = getCart();

  // Check if same product & size already exists
  const index = cart.findIndex(
    item => item.id === product.id && item.size === product.size
  );

  if (index > -1) {
    cart[index].qty += product.qty;
  } else {
    cart.push(product);
  }

  saveCart(cart);
}

/* ===== BUTTON CLICK EVENT ===== */
document.addEventListener("DOMContentLoaded", function () {
  updateCartCount();

  const addBtn = document.getElementById("addToCartBtn");
  if (addBtn) {
    addBtn.addEventListener("click", function () {
      const product = {
        id: "f1", // unique product id
        name: "Men's Fashion T-Shirt",
        price: 2499,
        img: "./img/products/f1.jpg",
        size: document.querySelector("select").value || "M",
        qty: Number(document.querySelector("input[type='number']").value) || 1
      };
      addToCart(product);
      alert("Product added to cart!");
    });
  }
});
