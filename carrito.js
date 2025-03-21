// Array para guardar los productos seleccionados
let carrito = [];

// Función para agregar productos al carrito
function agregarAlCarrito(codigo, descripcion, precio) {
  const productoExistente = carrito.find(producto => producto.codigo === codigo);
  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    carrito.push({ codigo, descripcion, precio, cantidad: 1 });
  }
  alert("Producto agregado al carrito");
  guardarCarritoEnLocalStorage();
}

// Función para mostrar los productos en el carrito
function mostrarCarrito() {
  const tablaCarrito = document.querySelector("#tabla-carrito tbody");
  tablaCarrito.innerHTML = ""; // Limpiar la tabla
  carrito.forEach((producto, index) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${producto.codigo}</td>
      <td>${producto.descripcion}</td>
      <td>Q${producto.precio}</td>
      <td>${producto.cantidad}</td>
      <td><button onclick="eliminarProducto(${index})">Eliminar</button></td>
    `;
    tablaCarrito.appendChild(fila);
  });
}

// Función para eliminar un producto del carrito
function eliminarProducto(index) {
  carrito.splice(index, 1); // Eliminar el producto del array
  guardarCarritoEnLocalStorage();
  mostrarCarrito();
}

// Guardar el carrito en localStorage
function guardarCarritoEnLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Cargar el carrito desde localStorage
function cargarCarritoDeLocalStorage() {
  const carritoGuardado = localStorage.getItem("carrito");
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
  }
}

// Función para generar un PDF
function generarPDF() {
  const doc = new jsPDF();
  let contenido = "Carrito de Pedidos\n\n";
  contenido += "Fecha: " + new Date().toLocaleDateString() + "\n\n";
  contenido += "Productos:\n";

  carrito.forEach(producto => {
    contenido += `${producto.cantidad}x ${producto.descripcion} (Q${producto.precio})\n`;
  });

  contenido += "\nGracias por tu pedido.";
  doc.text(contenido, 10, 10);
  doc.save("pedido.pdf");
}

// Inicializar la página
cargarCarritoDeLocalStorage();
if (window.location.pathname.includes("carrito.html")) {
  mostrarCarrito();
}

