function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const container = document.getElementById('cart-container');
    let total = 0;
    container.innerHTML = '';

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <div class="cart-empty-img"><img src="cart-empty.png"></div>
                <button id="continue-btn" class="btn">Continue Shopping</button>
            </div>`;
        
        $('#continue-btn').show().on('click', function () {
            window.location.href = 'homepage.html';
        });

        $('#total-price').text('');
        updateCartCount();
        return;
    }

    cart.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.classList.add('cart-item');
        itemEl.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h5>${item.name}</h5>
                <p>Price: ₹${item.price}</p>
                <div class="cart-quantity-controls">
                    <button class="cart-sub" data-id="${item.id}">−</button>
                    <span class="cart-quantity" data-id="${item.id}">${item.quantity}</span>
                    <button class="cart-add" data-id="${item.id}">+</button>
                </div>
            </div>
        `;
        total += item.price * item.quantity;
        container.appendChild(itemEl);
    });

    document.getElementById('total-price').innerText = `Total: ₹${total}`;
    updateCartCount();

    document.querySelectorAll('.cart-add').forEach(button => {
        button.addEventListener('click', function () {
            const id = this.dataset.id;
            updateCartQuantity(id, 1);
        });
    });

    document.querySelectorAll('.cart-sub').forEach(button => {
        button.addEventListener('click', function () {
            const id = this.dataset.id;
            updateCartQuantity(id, -1);
        });
    });
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    $('.cart-count').text(count);
}

function updateCartQuantity(productId, quantityChange) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productIndex = cart.findIndex(item => item.id === productId);

    if (productIndex !== -1) {
        cart[productIndex].quantity += quantityChange;

        if (cart[productIndex].quantity <= 0) {
            cart.splice(productIndex, 1);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart(); 
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderCart();
    updateCartCount();
});
