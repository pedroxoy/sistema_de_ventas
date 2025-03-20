document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    if (email === "darbyscosmetics@gmail.com" && password === "1f74a32c96") {
      alert("Acceso concedido");
      window.location.href = "admin-panel.html";
    } else {
      alert("Correo o contraseña incorrectos");
    }
  });
  