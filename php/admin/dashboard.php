<?php
require_once("auth.php");
requireAdminLogin();

if (isset($_GET["logout"])) {
    logoutAdmin();
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - FashionLink</title>
    <link rel="stylesheet" href="../../style.css">
    <style>
        body {
            background-color: #f4f4f4;
            padding: 20px;
        }
        .dashboard-container {
            max-width: 1200px;
            margin: 0 auto;
            background-color: #fff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .dashboard-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            border-bottom: 1px solid #eee;
            padding-bottom: 20px;
        }
        .dashboard-header h1 {
            margin: 0;
            color: #333;
        }
        .logout-btn {
            background-color: #dc3545;
            color: #fff;
            border: none;
            padding: 8px 15px;
            cursor: pointer;
            border-radius: 5px;
            text-decoration: none;
            transition: background-color 0.3s ease;
        }
        .logout-btn:hover {
            background-color: #c82333;
        }
        .product-form {
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
        }
        .product-form h2 {
            margin-top: 0;
            color: #333;
        }
        .form-group {
            margin-bottom: 20px;
        }
        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: bold;
        }
        .form-group input[type="text"],
        .form-group input[type="number"],
        .form-group select,
        .form-group textarea {
            width: calc(100% - 20px);
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 1em;
        }
        .form-group textarea {
            resize: vertical;
            min-height: 80px;
        }
        .form-buttons {
            display: flex;
            gap: 10px;
        }
        .btn {
            padding: 10px 15px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1em;
            transition: background-color 0.3s ease;
        }
        .btn-primary {
            background-color: #007bff;
            color: #fff;
        }
        .btn-primary:hover {
            background-color: #0056b3;
        }
        .btn-success {
            background-color: #28a745;
            color: #fff;
        }
        .btn-success:hover {
            background-color: #218838;
        }
        .btn-warning {
            background-color: #ffc107;
            color: #212529;
        }
        .btn-warning:hover {
            background-color: #e0a800;
        }
        .btn-danger {
            background-color: #dc3545;
            color: #fff;
        }
        .btn-danger:hover {
            background-color: #c82333;
        }
        .products-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        .products-table th,
        .products-table td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
        }
        .products-table th {
            background-color: #f8f9fa;
            font-weight: bold;
        }
        .products-table img {
            width: 60px;
            height: 60px;
            object-fit: cover;
            border-radius: 4px;
        }
        .message {
            padding: 10px;
            margin-bottom: 20px;
            border-radius: 5px;
        }
        .message.success {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        .message.error {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
    </style>
</head>
<body>
    <div class="dashboard-container">
        <div class="dashboard-header">
            <h1>Panel Administrativo - FashionLink</h1>
            <a href="../../index.html" class="btn logout-btn" style="margin-right: 10px; background-color: #6c757d;">Volver a la Tienda</a>
            <a href="?logout=1" class="logout-btn">Cerrar Sesión</a>
        </div>

        <div id="message-container"></div>

        <div class="product-form">
            <h2>Agregar/Editar Producto</h2>
            <form id="product-form">
                <input type="hidden" id="product-id" name="product_id">
                
                <div class="form-group">
                    <label for="product-name">Nombre del Producto:</label>
                    <input type="text" id="product-name" name="name" required>
                </div>

                <div class="form-group">
                    <label for="product-description">Descripción:</label>
                    <textarea id="product-description" name="description"></textarea>
                </div>

                <div class="form-group">
                    <label for="product-price">Precio:</label>
                    <input type="number" id="product-price" name="price" step="0.01" min="0" required>
                </div>

                <div class="form-group">
                    <label for="product-category">Categoría:</label>
                    <select id="product-category" name="category" required>
                        <option value="">Seleccionar categoría</option>
                        <option value="Camisas">Camisas</option>
                        <option value="Pantalones">Pantalones</option>
                        <option value="Vestidos">Vestidos</option>
                        <option value="Chaquetas">Chaquetas</option>
                        <option value="Zapatos">Zapatos</option>
                        <option value="Accesorios">Accesorios</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="product-image">URL de la Imagen:</label>
                    <input type="text" id="product-image" name="image_url" required>
                </div>

                <div class="form-group">
                    <label for="product-stock">Stock:</label>
                    <input type="number" id="product-stock" name="stock" min="0" value="1" required>
                </div>

                <div class="form-buttons">
                    <button type="submit" class="btn btn-success">Guardar Producto</button>
                    <button type="button" class="btn btn-warning" onclick="clearForm()">Limpiar Formulario</button>
                </div>
            </form>
        </div>

        <div class="products-list">
            <h2>Lista de Productos</h2>
            <table class="products-table" id="products-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Categoría</th>
                        <th>Stock</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="products-tbody">
                    <!-- Products will be loaded here -->
                </tbody>
            </table>
        </div>
    </div>

    <script>
        let products = [];

        // Load products on page load
        document.addEventListener("DOMContentLoaded", () => {
            loadProducts();
        });

        // Load products from server
        async function loadProducts() {
            try {
                const response = await fetch("../../php/get_products.php");
                products = await response.json();
                renderProductsTable();
            } catch (error) {
                console.error("Error loading products:", error);
                showMessage("Error al cargar productos.", "error");
            }
        }

        // Render products table
        function renderProductsTable() {
            const tbody = document.getElementById("products-tbody");
            tbody.innerHTML = "";

            products.forEach(product => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${product.id}</td>
                    <td><img src="${product.image_url}" alt="${product.name}" onerror="this.src=\'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAyMEg0MFY0MEgyMFYyMFoiIGZpbGw9IiNEMUQ1REIiLz4KPC9zdmc+\'"></td>
                    <td>${product.name}</td>
                    <td>$${parseFloat(product.price).toFixed(2)}</td>
                    <td>${product.category}</td>
                    <td>${product.stock}</td>
                    <td>
                        <button class="btn btn-primary" onclick="editProduct(${product.id})">Editar</button>
                        <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        }

        // Handle form submission
        document.getElementById("product-form").addEventListener("submit", async (e) => {
            e.preventDefault();
            
            const formData = new FormData(e.target);
            const productData = Object.fromEntries(formData.entries());
            
            try {
                const response = await fetch("manage_products.php", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        action: productData.product_id ? "update" : "create",
                        product: productData
                    })
                });
                
                const result = await response.json();
                
                if (result.success) {
                    showMessage(result.message, "success");
                    clearForm();
                    loadProducts();
                } else {
                    showMessage(result.message, "error");
                }
            } catch (error) {
                console.error("Error saving product:", error);
                showMessage("Error al guardar el producto.", "error");
            }
        });

        // Edit product
        function editProduct(productId) {
            const product = products.find(p => p.id == productId);
            if (product) {
                document.getElementById("product-id").value = product.id;
                document.getElementById("product-name").value = product.name;
                document.getElementById("product-description").value = product.description || "";
                document.getElementById("product-price").value = product.price;
                document.getElementById("product-category").value = product.category;
                document.getElementById("product-image").value = product.image_url;
                document.getElementById("product-stock").value = product.stock;
            }
        }

        // Delete product
        async function deleteProduct(productId) {
            if (!confirm("¿Estás seguro de que quieres eliminar este producto?")) {
                return;
            }

            try {
                const response = await fetch("manage_products.php", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        action: "delete",
                        product_id: productId
                    })
                });
                
                const result = await response.json();
                
                if (result.success) {
                    showMessage(result.message, "success");
                    loadProducts();
                } else {
                    showMessage(result.message, "error");
                }
            } catch (error) {
                console.error("Error deleting product:", error);
                showMessage("Error al eliminar el producto.", "error");
            }
        }

        // Clear form
        function clearForm() {
            document.getElementById("product-form").reset();
            document.getElementById("product-id").value = "";
        }

        // Show message
        function showMessage(message, type) {
            const container = document.getElementById("message-container");
            container.innerHTML = `<div class="message ${type}">${message}</div>`;
            setTimeout(() => {
                container.innerHTML = "";
            }, 5000);
        }
    </script>
</body>
</html>