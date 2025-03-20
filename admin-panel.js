document.getElementById("add-product-form").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const nombre = document.getElementById("nombre").value;
    const precio = document.getElementById("precio").value;
  
    const productoDiv = document.createElement("div");
    productoDiv.innerHTML = `<h3>${nombre}</h3><p>Precio: Q${precio}</p>`;
    document.getElementById("productos").appendChild(productoDiv);
  
    document.getElementById("add-product-form").reset();
  });
  