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

