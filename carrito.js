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
  mostrarCarrito();
}

// Función para mostrar el carrito (puedes integrarla a otra página si lo necesitas)
function mostrarCarrito() {
  console.log("Carrito actual:", carrito);
}

// Función para generar un PDF con los datos del cliente y los productos
function generarPDF() {
  const cliente = {
    nombre: document.getElementById("nombre").value,
    apellido: document.getElementById("apellido").value,
    direccion: document.getElementById("direccion").value,
    telefono: document.getElementById("telefono").value,
    correo: document.getElementById("correo").value,
  };

  let contenido = `
    Pedido Número: ${Math.floor(Math.random() * 100000)}
    Fecha: ${new Date().toLocaleDateString()}
    
    Cliente:
    Nombre: ${cliente.nombre} ${cliente.apellido}
    Dirección: ${cliente.direccion}
    Teléfono: ${cliente.telefono}
    Correo: ${cliente.correo}
    
    Productos:
  `;
  carrito.forEach(producto => {
    contenido += `${producto.cantidad}x ${producto.descripcion} (Q${producto.precio})\n`;
  });

  contenido += `\nGracias por tu pedido.`;

  // Crear PDF con jsPDF (https://parall.ax/products/jspdf)
  const doc = new jsPDF();
  doc.text(contenido, 10, 10);
  doc.save("pedido.pdf");
}
