// Ocultar el contenedor de preguntas al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("pregunta").style.display = "none";
});
    
// Manejo del contador de recargas en localStorage
if (localStorage.getItem("contadorRecargas")) {
    localStorage.setItem("contadorRecargas", Number(localStorage.getItem("contadorRecargas")) + 1);
} else {
    localStorage.setItem("contadorRecargas", 1);
}

// Mostrar en pantalla
document.addEventListener("DOMContentLoaded", () => {
    let contadorElemento = document.getElementById("contadorRecargasTexto");
    if (contadorElemento) {
        contadorElemento.textContent = "La página se ha recargado " + localStorage.getItem("contadorRecargas") + " veces.";
    }
});

const preguntas = [
    { pregunta: "¿Qué significa IoT?", opciones: ["Internet of Things", "Intelligence of Technology", "Input Output Tech"], correcta: 0 },
    { pregunta: "¿Cuál es un beneficio del Big Data?", opciones: ["Mayor privacidad", "Mejor toma de decisiones", "Menos almacenamiento"], correcta: 1 },
    { pregunta: "¿Cuál es uno de los principales beneficios del Big Data en las empresas?", opciones: ["Aumentar el consumo de energía sin mejorar la eficiencia.", "Permite tomar decisiones basadas en análisis de datos.", "Hace que los datos sean más difíciles de interpretar."], correcta: 1 },
    { pregunta: "¿Cuál es un riesgo importante del IoT?", opciones: ["Aumento de la seguridad de los datos en todas las redes.", "Posible vulnerabilidad a ciberataques y robo de información.", "Reducción en la cantidad de dispositivos conectados en el mundo."], correcta: 1 },
    { pregunta: "¿Cuál es una ventaja de la automatización en la industria?", opciones: ["Aumentar la eficiencia y reducir los errores humanos.", "Hace que todos los trabajadores sean reemplazados de inmediato.", "Provoca que las fábricas produzcan más fallas en los productos."], correcta: 0 },
    { pregunta: "¿Cuál es una diferencia entre el aprendizaje supervisado y el no supervisado?", opciones: ["En el supervisado, el modelo aprende con datos etiquetados, mientras que en el no supervisado, encuentra patrones sin etiquetas.", "El aprendizaje supervisado nunca necesita datos para entrenarse.", "En el aprendizaje no supervisado, siempre hay un humano dando instrucciones en tiempo real."], correcta: 0 },
    { pregunta: "¿Cómo pueden los sesgos en los algoritmos de Machine Learning afectar las decisiones?", opciones: ["Pueden generar resultados injustos o discriminatorios.", "Siempre mejoran la precisión de las predicciones.", "No tienen ningún impacto en la toma de decisiones."], correcta: 0 },
    { pregunta: "¿Podría la automatización robótica reemplazar completamente a los trabajadores humanos?", opciones: ["No, porque hay tareas creativas y de toma de decisiones que las máquinas no pueden hacer.", "Sí, en todos los sectores y profesiones.", "Sí, pero solo si los robots pueden sentir emociones."], correcta: 0 },
    { pregunta: "¿Cómo está evolucionando la IA en el campo de la medicina?", opciones: ["Ayuda en el diagnóstico de enfermedades analizando grandes volúmenes de datos.", "Reemplazar completamente a los médicos en todas las especialidades.", "No tiene aplicaciones en la medicina."], correcta: 0 },
    { pregunta: "¿Cuál es un riesgo ético de la inteligencia artificial superinteligente?", opciones: ["Puede tomar decisiones sin supervisión humana, afectando la seguridad y el control.", "No tiene ningún impacto en la sociedad.", "No representa ningún riesgo porque la IA nunca superará a los humanos."], correcta: 0 }
];

let nodos = [];
let nodoSeleccionado = null;
let vidas = 5;
let protegidos = 0;
let hackeados = 0;

let preguntaIndex = 0; // Contador para las preguntas

function crearNodos() {
    let juego = document.getElementById("juego");
    for (let i = 0; i < 10; i++) {
        let nodo = document.createElement("div");
        nodo.classList.add("nodo", "vulnerable");
        nodo.textContent = "Nodo " + (i + 1);
        nodo.onclick = () => mostrarPregunta(i);
        juego.appendChild(nodo);
        nodos.push(nodo);
    }
}

function mostrarPregunta(index) {
    if (vidas <= 0 || nodos[index].classList.contains("protegido")) return;
    nodoSeleccionado = index;

    // Verifica si ya hemos mostrado todas las preguntas
    if (preguntaIndex >= preguntas.length) {
        document.getElementById("mensaje").textContent = "¡Has respondido todas las preguntas!";
        return;
    }

    // Usar la pregunta en el índice actual
    let pregunta = preguntas[preguntaIndex];
    document.getElementById("textoPregunta").textContent = pregunta.pregunta;

    let botones = document.querySelectorAll("#pregunta button");
    botones.forEach((boton, i) => {
        boton.textContent = pregunta.opciones[i];
        boton.onclick = () => verificarRespuesta(i, pregunta.correcta);
    });

    document.getElementById("pregunta").style.display = "block";
    document.getElementById("mensaje").textContent = "";

    // Incrementar el índice para la siguiente pregunta
    preguntaIndex++;
}

function verificarRespuesta(respuesta, correcta) {
    if (vidas <= 0) return;

    let nodo = nodos[nodoSeleccionado];

    if (respuesta === correcta) {
        nodo.classList.remove("vulnerable");
        nodo.classList.add("protegido");
        document.getElementById("mensaje").innerHTML = "✅ ¡Bien hecho! El nodo está protegido.";
        document.getElementById("mensaje").style.color = "green";
        protegidos++;
    } else {
        vidas--;
        nodo.classList.remove("vulnerable");
        nodo.classList.add("hackeado");
        document.getElementById("vidas").textContent = vidas;
        document.getElementById("mensaje").innerHTML = "❌ Respuesta incorrecta. El nodo ha sido hackeado.";
        document.getElementById("mensaje").style.color = "red";
        hackeados++;
    }

    document.getElementById("pregunta").style.display = "none";
    verificarFinJuego();
}

function verificarFinJuego() {
    if (vidas === 0 || protegidos + hackeados === nodos.length) {
        let mensajeFinal = `🎉 ¡Juego terminado! Has salvado ${protegidos} nodos y perdido ${hackeados}.`;
        document.getElementById("resultadoFinal").textContent = mensajeFinal;
        document.getElementById("mensaje").textContent = "";
        nodos.forEach(nodo => nodo.onclick = null);
    }
}

crearNodos();
