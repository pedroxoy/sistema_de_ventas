// 🔗 Conexión a Supabase
const supabaseUrl = 'https://TU-PROYECTO.supabase.co';
const supabaseKey = 'TU-API-KEY';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// 🧩 PRODUCTOS
const formProducto = document.getElementById('form-producto');
const tablaProductos = document.getElementById('tabla-productos');

if (formProducto) {
  formProducto.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const precio = parseFloat(document.getElementById('precio').value);
    const stock = parseInt(document.getElementById('stock').value);

    await supabase.from('productos').insert([{ nombre, precio, stock }]);
    formProducto.reset();
    cargarProductos();
  });

  async function cargarProductos() {
    const { data } = await supabase.from('productos').select('*');
    tablaProductos.innerHTML = '';
    data.forEach(p => {
      tablaProductos.innerHTML += `
        <tr>
          <td>${p.nombre}</td>
          <td>$${p.precio.toFixed(2)}</td>
          <td>${p.stock}</td>
          <td><button onclick="eliminarProducto(${p.id})">Eliminar</button></td>
        </tr>`;
    });
  }

  async function eliminarProducto(id) {
    await supabase.from('productos').delete().eq('id', id);
    cargarProductos();
  }

  cargarProductos();
}

// 🧾 VENTAS
const formVenta = document.getElementById('form-venta');
const productoSelect = document.getElementById('producto-select');
const tablaVenta = document.getElementById('tabla-venta');
const totalVenta = document.getElementById('total-venta');
const finalizarVenta = document.getElementById('finalizar-venta');

let carrito = [];

if (formVenta) {
  cargarOpcionesProductos();

  formVenta.addEventListener('submit', async (e) => {
    e.preventDefault();
    const productoId = productoSelect.value;
    const cantidad = parseInt(document.getElementById('cantidad').value);

    const { data: producto } = await supabase.from('productos').select('*').eq('id', productoId).single();
    const subtotal = producto.precio * cantidad;

    carrito.push({ productoId, nombre: producto.nombre, cantidad, subtotal });
    actualizarTablaVenta();
    formVenta.reset();
  });

  function actualizarTablaVenta() {
    tablaVenta.innerHTML = '';
    let total = 0;
    carrito.forEach((item, index) => {
      total += item.subtotal;
      tablaVenta.innerHTML += `
        <tr>
          <td>${item.nombre}</td>
          <td>${item.cantidad}</td>
          <td>$${item.subtotal.toFixed(2)}</td>
          <td><button onclick="eliminarItem(${index})">Eliminar</button></td>
        </tr>`;
    });
    totalVenta.textContent = total.toFixed(2);
  }

  window.eliminarItem = function(index) {
    carrito.splice(index, 1);
    actualizarTablaVenta();
  };

  finalizarVenta.addEventListener('click', async () => {
    if (carrito.length === 0) return alert('Agrega productos a la venta');

    const total = carrito.reduce((sum, item) => sum + item.subtotal, 0);
    await supabase.from('ventas').insert([{ productos: carrito, total }]);
    carrito = [];
    actualizarTablaVenta();
    alert('Venta registrada con éxito');
  });

  async function cargarOpcionesProductos() {
    const { data } = await supabase.from('productos').select('*');
    productoSelect.innerHTML = '';
    data.forEach(p => {
      productoSelect.innerHTML += `<option value="${p.id}">${p.nombre} ($${p.precio})</option>`;
    });
  }
}

// 💰 MOVIMIENTOS
const formMovimiento = document.getElementById('form-movimiento');
const tablaMovimientos = document.getElementById('tabla-movimientos');

if (formMovimiento) {
  formMovimiento.addEventListener('submit', async (e) => {
    e.preventDefault();
    const tipo = document.getElementById('tipo').value;
    const monto = parseFloat(document.getElementById('monto').value);
    const descripcion = document.getElementById('descripcion').value;

    await supabase.from('movimientos').insert([{ tipo, monto, descripcion }]);
    formMovimiento.reset();
    cargarMovimientos();
  });

  async function cargarMovimientos() {
    const { data } = await supabase.from('movimientos').select('*').order('fecha', { ascending: false });
    tablaMovimientos.innerHTML = '';
    data.forEach(m => {
      tablaMovimientos.innerHTML += `
        <tr>
          <td>${m.tipo}</td>
          <td>$${m.monto.toFixed(2)}</td>
          <td>${m.descripcion}</td>
          <td>${new Date(m.fecha).toLocaleString()}</td>
        </tr>`;
    });
  }

  cargarMovimientos();
}
