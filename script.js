window.onload = function () {
    // Variables

    // Añadir las tres imágenes del directorio "img" al array IMAGENES.
    const IMAGENES = ["img/img1.jpg", "img/img2.jpg", "img/img3.jpg"];

    const TIEMPO_INTERVALO_MILESIMAS_SEG = 1000;

    // posición actual guarda el indice de la imágen que se está mostrando (del array IMAGENES)
    let posicionActual = 0;

    // variables con los elementos del DOM HTML, aplicar el selector necesario.
    let $botonRetroceder = document.getElementById('retroceder')
    let $botonAvanzar = document.getElementById('avanzar')
    let $imagen = document.getElementById('imagen')
    let $botonPlay = document.getElementById('play')
    let $botonStop = document.getElementById('stop')

    // Identificador del proceso que se ejecuta con setInterval().
    let intervalo = null

    // Funciones

    /**
     * Funcion que cambia la foto en la siguiente posicion
     */
    function pasarFoto() {
        // se incrementa el indice (posicionActual)
        posicionActual = (posicionActual + 1) % IMAGENES.length
        // ...y se muestra la imagen que toca.
        renderizarImagen()
    }

    /**
     * Funcion que cambia la foto en la anterior posicion
     */
    function retrocederFoto() {
        // se incrementa el indice (posicionActual)
        posicionActual = (posicionActual - 1 + IMAGENES.length) % IMAGENES.length
        renderizarImagen()
    }

    /**
     * Funcion que actualiza la imagen de imagen dependiendo de posicionActual
     */
    function renderizarImagen() {
        $imagen.style.backgroundImage = `url(${IMAGENES[posicionActual]})`;
    }

    /**
     * Activa el autoplay de la imagen
     */
    function playIntervalo() {
        // Documentación de la función setInterval: https://developer.mozilla.org/en-US/docs/Web/API/setInterval
        // Mediante la función setInterval() se ejecuta la función pasarFoto cada TIEMPO_INTERVALO_MILESIMAS_SEG.
        intervalo = setInterval(() => {
            pasarFoto()
        }, TIEMPO_INTERVALO_MILESIMAS_SEG)

        // Desactivamos los botones de control necesarios. Utilizando setAttribute y removeAttribute.
        $botonPlay.setAttribute('disabled', '')
        $botonStop.removeAttribute('disabled')
    }

    /**
     * Para el autoplay de la imagen
     */
    function stopIntervalo() {
        // Desactivar la ejecución de intervalo.
        clearInterval(intervalo)
        intervalo = null
        // Activamos los botones de control. Utilizando setAttribute y removeAttribute.
        $botonPlay.removeAttribute('disabled')
        $botonStop.setAttribute('disabled', '')
    }

    // Eventos
    // Añadimos los evenntos necesarios para cada boton. Mediante addEventListener.
    $botonRetroceder.addEventListener('click', () => {
        retrocederFoto()
    })
    $botonAvanzar.addEventListener('click', () => {
        pasarFoto()
    })
    $botonPlay.addEventListener('click', () => {
        playIntervalo()
    })
    $botonStop.addEventListener('click', () => {
        stopIntervalo()
    })
    const p = document.getElementById('text')
    p.style.position = 'absolute'
    $imagen.addEventListener('mousemove', e => {
        p.style.left = `${e.clientX}px`
        p.style.top = `${e.clientY}px`
    })
    // Iniciar
    for(const img of IMAGENES){
        const i = document.createElement('img')
        i.src = img
        i.style.display = 'none'
        document.body.appendChild(i)
    }
    renderizarImagen();
}
