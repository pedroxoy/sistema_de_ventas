// Array para almacenar los productos seleccionados
let carrito = [];

// Referencias a los elementos del DOM
const tablaCarrito = document.getElementById('tabla-carrito').querySelector('tbody');
const vistaPreviaBtn = document.getElementById('vistaPrevia');
const descargarPDFBtn = document.getElementById('descargarPDF');
const descargarImagenBtn = document.getElementById('descargarImagen');

// Función para agregar productos al carrito
function agregarAlCarrito(descripcion, cantidad, precio) {
  const total = cantidad * precio;
  const producto = { descripcion, cantidad, precio, total };
  carrito.push(producto);

  actualizarCarrito();
}

// Función para actualizar la tabla del carrito
function actualizarCarrito() {
  tablaCarrito.innerHTML = ""; // Limpiar la tabla antes de volver a llenarla

  carrito.forEach((producto, index) => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${producto.descripcion}</td>
      <td>${producto.cantidad}</td>
      <td>Q${producto.precio.toFixed(2)}</td>
      <td>Q${producto.total.toFixed(2)}</td>
      <td>
        <button onclick="eliminarProducto(${index})">Eliminar</button>
      </td>
    `;
    tablaCarrito.appendChild(fila);
  });
}

// Función para eliminar un producto del carrito
function eliminarProducto(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

// Función para generar la vista previa
function generarVistaPrevia() {
  const cliente = obtenerDatosCliente();
  if (!cliente) return;

  const vistaPreviaHTML = `
    <div id="vistaPreviaCotizacion">
      <h1>Carrito de Pedidos</h1>
      <h2>Información del Cliente</h2>
      <p>Nombre: ${cliente.nombre}</p>
      <p>Dirección: ${cliente.direccion}</p>
      <p>Teléfono: ${cliente.telefono}</p>
      <h2>Productos</h2>
      <ul>
        ${carrito.map(producto => `<li>${producto.cantidad}x ${producto.descripcion} - Q${producto.total.toFixed(2)}</li>`).join('')}
      </ul>
      <h3>Total: Q${carrito.reduce((acc, prod) => acc + prod.total, 0).toFixed(2)}</h3>
    </div>
  `;

  document.body.innerHTML = vistaPreviaHTML; // Reemplazar contenido temporalmente
}

// Función para obtener datos del cliente
function obtenerDatosCliente() {
  const nombre = document.getElementById('nombre').value.trim();
  const direccion = document.getElementById('direccion').value.trim();
  const telefono = document.getElementById('telefono').value.trim();

  if (!nombre || !direccion || !telefono) {
    alert("Por favor, completa todos los campos del cliente.");
    return null;
  }

  return { nombre, direccion, telefono };
}

// Descargar como PDF
descargarPDFBtn.addEventListener('click', () => {
  const elemento = document.getElementById('vistaPreviaCotizacion') || document.body;
  html2pdf().from(elemento).save('pedido.pdf');
});

// Descargar como Imagen
descargarImagenBtn.addEventListener('click', () => {
  const elemento = document.getElementById('vistaPreviaCotizacion') || document.body;
  html2canvas(elemento).then(canvas => {
    const imagen = canvas.toDataURL('image/png');
    const enlace = document.createElement('a');
    enlace.href = imagen;
    enlace.download = 'pedido.png';
    enlace.click();
  });
});

// Evento para generar la vista previa
vistaPreviaBtn.addEventListener('click', generarVistaPrevia);

