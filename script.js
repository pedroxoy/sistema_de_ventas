// Manejo de preguntas
document.getElementById("form-dudas").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const pregunta = document.getElementById("pregunta").value;
    const nuevaPregunta = document.createElement("li");
    nuevaPregunta.textContent = `Cliente: ${pregunta}`;
  
    const listaRespuestas = document.getElementById("respuestas").querySelector("ul");
    listaRespuestas.appendChild(nuevaPregunta);
  
    document.getElementById("form-dudas").reset();
  });
  