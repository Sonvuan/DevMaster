let cart = [
    { id: 1, title: "Giường châu Âu", image: "img/giuong-ngu-chau-Au-hoang-gia.jpg", price: 22999000, qty: 1 },
    { id: 2, title: "Cầu thang", image: "img/mau-cau-thang.jpeg", price: 30999000, qty: 1 }
];

function renderCart() {
    let cartContainer = $("#cart");
    cartContainer.empty();
    cart.forEach((item) => {
        let subtotal = item.price * item.qty;
        let productHtml = `
        <div class="row cart-item d-flex align-items-center mb-3" data-id="${item.id}">
            <div class="col-lg-8 d-flex align-items-center">
                <img src="${item.image}" alt="Sản phẩm" style="width: 100px; height: auto;">
                <div class="ms-3 flex-grow-1">
                    <h5 class="mb-1">${item.title}</h5>
                    <p class="text-muted">Giá: <span>${item.price.toLocaleString()}</span> VND</p>
                    <div class="d-flex align-items-center">
                        <button class="btn btn-outline-secondary btn-sm minus">-</button>
                            <input type="number" class="form-control qty mx-2" value="${item.qty}" min="1" style="width: 60px; text-align: center;">
                        <button class="btn btn-outline-secondary btn-sm plus">+</button>
                    </div>
                    <p class="mt-2">Thành tiền: <span class="subtotal">${subtotal.toLocaleString()}</span> VND</p>
                </div>
                <div class="ms-3">
                    <button class="btn btn-danger btn-sm btn-remove">Xóa</button>
                    <button class="btn btn-primary btn-sm btn-update">Cập nhật</button>
                </div>
            </div>
        </div>
        `;
        cartContainer.append(productHtml);
    });
    updateTotal();
}

function updateTotal() {
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.qty;
    });
    $("#total, #grand-total").text(total.toLocaleString());
}

$(document).ready(function() {
    renderCart();

    // Giảm số lượng
    $(document).on("click", ".minus", function() {
        let index = $(this).closest(".cart-item").index();
        if (cart[index].qty > 1) {
            cart[index].qty--;
            renderCart();
        }
    });

    // Tăng số lượng
    $(document).on("click", ".plus", function() {
        let index = $(this).closest(".cart-item").index();
        cart[index].qty++;
        renderCart();
    });

    // Cập nhật số lượng khi nhập số
    $(document).on("input", ".qty", function() {
        let index = $(this).closest(".cart-item").index();
        let newQty = parseInt($(this).val());
        if (newQty > 0 && newQty <= 99999) { // Đảm bảo giới hạn hợp lý, nhưng không giới hạn nhỏ như 9
            cart[index].qty = newQty;
            updateTotal(); // Chỉ cập nhật tổng mà không render lại toàn bộ
        }
    });

    // Xóa sản phẩm
    $(document).on("click", ".btn-remove", function() {
        let index = $(this).closest(".cart-item").index();
        cart.splice(index, 1);
        renderCart();
    });

    // Nút Cập nhật
    $(document).on("click", ".btn-update", function() {
        let index = $(this).closest(".cart-item").index();
        let newQty = parseInt($(this).closest(".cart-item").find(".qty").val());
        if (newQty > 0) {
            cart[index].qty = newQty;
            renderCart();
        }
    });
});