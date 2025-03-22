// Array para almacenar los productos seleccionados
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

// Función para guardar el carrito en localStorage
function guardarCarritoEnLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Función para cargar el carrito desde localStorage al iniciar
function cargarCarritoDeLocalStorage() {
  const carritoGuardado = localStorage.getItem("carrito");
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
  }
}

// Función para mostrar los productos en la tabla del carrito
function mostrarCarrito() {
  const tablaCarrito = document.querySelector("#tabla-carrito tbody");
  tablaCarrito.innerHTML = ""; // Limpiar la tabla

  carrito.forEach((producto, index) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${producto.codigo}</td>
      <td>${producto.descripcion}</td>
      <td>Q${producto.precio.toFixed(2)}</td>
      <td>${producto.cantidad}</td>
      <td>
        <button onclick="aumentarCantidad(${index})">+</button>
        <button onclick="eliminarProducto(${index})">Eliminar</button>
      </td>
    `;
    tablaCarrito.appendChild(fila);
  });
}

// Función para aumentar la cantidad de un producto
function aumentarCantidad(index) {
  carrito[index].cantidad++;
  guardarCarritoEnLocalStorage();
  mostrarCarrito();
}

// Función para eliminar un producto del carrito
function eliminarProducto(index) {
  carrito.splice(index, 1);
  guardarCarritoEnLocalStorage();
  mostrarCarrito();
}

// Función para generar un PDF
function generarPDF() {
  const cliente = {
    nombre: document.getElementById("nombre").value,
    direccion: document.getElementById("direccion").value,
    referencia: document.getElementById("referencia").value,
    telefono: document.getElementById("telefono").value,
  };

  if (!cliente.nombre || !cliente.direccion || !cliente.telefono) {
    alert("Por favor, completa toda la información del cliente.");
    return;
  }

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: [80, 297], // Formato angosto
  });

  let y = 10; // Coordenada inicial en el PDF

  doc.setFontSize(12);
  doc.text("Carrito de Pedidos", 10, y); y += 10;
  doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 10, y); y += 10;
  doc.text("Información del Cliente:", 10, y); y += 10;
  doc.text(`Nombre: ${cliente.nombre}`, 10, y); y += 10;
  doc.text(`Dirección: ${cliente.direccion}`, 10, y); y += 10;
  doc.text(`Referencia: ${cliente.referencia}`, 10, y); y += 10;
  doc.text(`Teléfono: ${cliente.telefono}`, 10, y); y += 20;

  doc.text("Productos Seleccionados:", 10, y); y += 10;

  carrito.forEach(producto => {
    doc.text(`${producto.cantidad}x ${producto.descripcion} (Q${producto.precio})`, 10, y);
    y += 10;
  });

  doc.text("Gracias por tu pedido.", 10, y + 10);

  doc.save("pedido.pdf");
}

// Inicialización: cargar datos al iniciar la página
cargarCarritoDeLocalStorage();
if (document.querySelector("#tabla-carrito")) {
  mostrarCarrito();
}

