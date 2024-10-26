document.getElementById('productForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Formun varsayılan davranışını engelle

    const name = document.getElementById('name').value;
    const price = Number(document.getElementById('price').value);
    const description = document.getElementById('description').value;

    const response = await fetch('http://127.0.0.1:4943/?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, price, description })
    });

    if (response.ok) {
        alert('Ürün başarıyla eklendi!');
        loadProducts();
    } else {
        alert('Bir hata oluştu.');
    }
});

async function loadProducts() {
    const response = await fetch('http://127.0.0.1:4943/?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai');
    const products = await response.json();

    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    products.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `${product.name} - ${product.price} TL - ${product.description}`;
        productList.appendChild(li);
    });
}

// Sayfa yüklendiğinde ürünleri yükle
window.onload = loadProducts;
