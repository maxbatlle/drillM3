const carrito = [];
let verificadoEdad = false; // Para preguntar una vez si es mayor de 18 años

// Mostrar tabla de productos
const productosElement = document.getElementById('productos');

// Crear la tabla y el encabezado
let table = document.createElement('table');
table.className = 'table table-striped'; // Bootstrap classes for styling
let thead = document.createElement('thead');
let tbody = document.createElement('tbody');

// Crear los encabezados de la tabla
const headers = ['Producto', 'Precio', 'Acciones'];
const headerRow = document.createElement('tr');
headers.forEach(header => {
    const th = document.createElement('th');
    th.textContent = header;
    th.scope = 'col'; // For accessibility
    headerRow.appendChild(th);
});
thead.appendChild(headerRow);
table.appendChild(thead);

// Agregar filas para cada producto
productos.forEach(producto => {
    const row = document.createElement('tr');

    // Columna de nombre del producto
    const nombreCell = document.createElement('td');
    nombreCell.textContent = producto.nombre;
    row.appendChild(nombreCell);

    // Columna de precio
    const precioCell = document.createElement('td');
    precioCell.textContent = `$${producto.precio}`;
    row.appendChild(precioCell);

    // Columna de acciones (botón para agregar al carrito)
    const accionesCell = document.createElement('td');
    const button = document.createElement('button');
    button.textContent = "Agregar";
    button.className = 'btn btn-success'; // Bootstrap button class
    button.onclick = () => agregarAlCarrito(producto);
    accionesCell.appendChild(button);
    row.appendChild(accionesCell);

    // Agregar la fila a la tabla
    tbody.appendChild(row);
});

table.appendChild(tbody);
productosElement.appendChild(table);

// Función para agregar productos al carrito
function agregarAlCarrito(producto) {
    if (producto.alcohol && !verificadoEdad) {
        const esMayorDeEdad = confirm("¿Eres mayor de 18 años?");
        if (!esMayorDeEdad) {
            alert("No puedes comprar productos alcohólicos.");
            return;
        }
        verificadoEdad = true;
    }

    const productoEnCarrito = carrito.find(p => p.nombre === producto.nombre);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    mostrarCarrito();
}

// Función para mostrar el carrito en una tabla
function mostrarCarrito() {
    const carritoElement = document.getElementById('carrito');
    carritoElement.innerHTML = ""; // Limpiar el carrito actual

    // Crear la tabla y el encabezado
    let table = document.createElement('table');
    table.className = 'table table-striped'; // Bootstrap classes for styling
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    // Crear los encabezados de la tabla
    const headers = ['Producto', 'Precio', 'Cantidad', 'Subtotal', 'Acciones'];
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        th.scope = 'col'; // For accessibility
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Agregar filas para cada producto en el carrito
    carrito.forEach((producto, index) => {
        const row = document.createElement('tr');

        // Columna de nombre del producto
        const nombreCell = document.createElement('td');
        nombreCell.textContent = producto.nombre;
        row.appendChild(nombreCell);

        // Columna de precio
        const precioCell = document.createElement('td');
        precioCell.textContent = `$${producto.precio}`;
        row.appendChild(precioCell);

        // Columna de cantidad
        const cantidadCell = document.createElement('td');
        cantidadCell.textContent = producto.cantidad;
        row.appendChild(cantidadCell);

        // Columna de subtotal
        const subtotalCell = document.createElement('td');
        subtotalCell.textContent = `$${producto.precio * producto.cantidad}`;
        row.appendChild(subtotalCell);

        // Columna de acciones (botón para remover del carrito)
        const accionesCell = document.createElement('td');
        const removeButton = document.createElement('button');
        removeButton.textContent = "Eliminar";
        removeButton.className = 'btn btn-danger'; // Bootstrap button class
        removeButton.onclick = () => eliminarDelCarrito(index); // Use the index to identify which item to remove
        accionesCell.appendChild(removeButton);
        row.appendChild(accionesCell);

        // Agregar la fila a la tabla
        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    carritoElement.appendChild(table);

    // Agregar botón para limpiar el carrito
    const clearButton = document.createElement('button');
    clearButton.textContent = "Limpiar Carrito";
    clearButton.className = 'btn btn-warning'; // Bootstrap button class
    clearButton.onclick = limpiarCarrito; // Function to clear the cart
    carritoElement.appendChild(clearButton);
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1); // Remove item at the index
    mostrarCarrito(); // Refresh the cart display
}

// Función para limpiar el carrito
function limpiarCarrito() {
    carrito.length = 0; // Clear the cart
    mostrarCarrito(); // Refresh the cart display
}

// Finalizar la compra
document.getElementById('finalizar').onclick = function() {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
    } else {
        const total = carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
        alert(`Compra finalizada. Total a pagar: $${total}`);
        carrito.length = 0; // Limpiar el carrito
        mostrarCarrito();
    }
};
