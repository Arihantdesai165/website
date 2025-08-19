// script.js
const cart = [];
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeCart = document.getElementById('close-cart');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');

document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', e => {
        const product = e.target.closest('.product');
        const name = product.dataset.name;
        const price = parseInt(product.dataset.price);

        const existing = cart.find(item => item.name === name);
        if(existing) {
            existing.qty += 1;
        } else {
            cart.push({name, price, qty: 1});
        }
        updateCart();
    });
});

cartBtn.addEventListener('click', () => {
    cartModal.classList.remove('hidden');
    renderCart();
});
closeCart.addEventListener('click', () => {
    cartModal.classList.add('hidden');
});

function updateCart() {
    cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
    renderCart();
}
function renderCart() {
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} x${item.qty} - ₹${item.price*item.qty}`;
        cartItems.appendChild(li);
        total += item.price * item.qty;
    });
    cartTotal.textContent = total;
}

updateCart();
