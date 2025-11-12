// =============================================
// CONFIGURACIÓN DEL CARRUSEL DE IMÁGENES
// =============================================
function setupMunicipalitiesCarousel() {
    const carousel = document.getElementById('carousel');
    const indicatorsContainer = document.getElementById('indicators');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const overlay = document.getElementById('overlay');
    const overlayImg = document.getElementById('overlay-img');
    const closeBtn = document.getElementById('close-btn');

    // Array con imágenes de municipalidades
    const images = [
        'img/AZANGARO.png',
        'img/CASTILLA.png',
        'img/CAYLLOMA.png',
        'img/CERRO AZUL.png',
        'img/EL COLLAO ILAVE.png',
        'img/SULLANA.png',
        'img/PAITA.png',
    ];

    const totalItems = images.length;
    let currentIndex = 0;
    let autoSlideInterval;

    // Crear elementos del carrusel
    function createCarouselItems() {
        carousel.innerHTML = '';
        indicatorsContainer.innerHTML = '';

        // Crear elementos de carrusel
        for (let i = 0; i < totalItems; i++) {
            const item = document.createElement('div');
            item.className = 'carousel-item';

            const img = document.createElement('img');
            img.src = images[i];
            img.alt = `Municipalidad ${i + 1}`;
            img.className = 'carousel-img';

            item.appendChild(img);
            carousel.appendChild(item);

            // Crear indicadores
            const indicator = document.createElement('div');
            indicator.className = 'indicator';
            if (i === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => {
                stopAutoSlide();
                goToSlide(i);
                startAutoSlide();
            });
            indicatorsContainer.appendChild(indicator);
        }

        updateCarousel();
    }

    // Función para actualizar el carrusel
    function updateCarousel() {
        const items = document.querySelectorAll('.carousel-item');
        const indicators = document.querySelectorAll('.indicator');

        items.forEach((item, index) => {
            // Calcular la posición relativa al índice actual
            let position = index - currentIndex;

            // Ajustar para el efecto de carrusel infinito
            if (position < -totalItems / 2) position += totalItems;
            if (position > totalItems / 2) position -= totalItems;

            // Aplicar transformaciones según la posición
            if (position === 0) {
                // Elemento central
                item.style.transform = 'translateX(-50%) scale(1)';
                item.style.opacity = '1';
                item.style.zIndex = '5';
                item.style.filter = 'blur(0)';
                item.classList.add('active');
            } else if (position === -1 || position === 1) {
                // Elementos adyacentes
                const translateX = position * 300;
                item.style.transform = `translateX(calc(-50% + ${translateX}px)) scale(0.9)`;
                item.style.opacity = '0.8';
                item.style.zIndex = '4';
                item.style.filter = 'blur(1px)';
                item.classList.remove('active');
            } else if (position === -2 || position === 2) {
                // Elementos más lejanos
                const translateX = position * 300;
                item.style.transform = `translateX(calc(-50% + ${translateX}px)) scale(0.85)`;
                item.style.opacity = '0.6';
                item.style.zIndex = '3';
                item.style.filter = 'blur(2px)';
                item.classList.remove('active');
            } else {
                // Elementos fuera de vista
                item.style.transform = 'translateX(calc(-50% + 800px)) scale(0.8)';
                item.style.opacity = '0';
                item.style.zIndex = '2';
                item.style.filter = 'blur(3px)';
                item.classList.remove('active');
            }
        });

        // Actualizar indicadores
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    // Función para ir a un slide específico
    function goToSlide(index) {
        currentIndex = index;
        if (currentIndex < 0) currentIndex = totalItems - 1;
        if (currentIndex >= totalItems) currentIndex = 0;
        updateCarousel();
    }

    // Función para abrir imagen en overlay
    function openOverlay(imgSrc) {
        overlayImg.src = imgSrc;
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Función para cerrar overlay
    function closeOverlay() {
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Función para avanzar al siguiente slide
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    // Función para retroceder al slide anterior
    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    // Función para iniciar la transición automática
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 3000); // Cambiar cada 3 segundos
    }

    // Función para detener la transición automática
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Event listeners para botones de navegación
    nextButton.addEventListener('click', function () {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });

    prevButton.addEventListener('click', function () {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });

    // Event listeners para las imágenes
    carousel.addEventListener('click', function (e) {
        const item = e.target.closest('.carousel-item');
        if (item) {
            const imgSrc = item.querySelector('img').src;
            openOverlay(imgSrc);
        }
    });

    // Event listener para cerrar overlay
    closeBtn.addEventListener('click', closeOverlay);

    // Cerrar overlay al hacer clic fuera de la imagen
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) {
            closeOverlay();
        }
    });

    // Pausar auto slide al pasar el ratón por encima
    carousel.addEventListener('mouseenter', stopAutoSlide);

    // Reanudar auto slide al quitar el ratón
    carousel.addEventListener('mouseleave', startAutoSlide);

    // Inicializar el carrusel y comenzar la transición automática
    createCarouselItems();
    startAutoSlide();

    // Navegación con teclado
    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        } else if (e.key === 'ArrowLeft') {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        } else if (e.key === 'Escape') {
            closeOverlay();
        }
    });
}

// =============================================
// FUNCIÓN PARA ENVIAR FORMULARIO A GMAIL
// =============================================
function enviarAGmail(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const municipalidad = document.getElementById("municipalidad").value;
    const asuntoSelect = document.getElementById("asunto");
    const asunto = asuntoSelect.options[asuntoSelect.selectedIndex].text;
    const mensaje = document.getElementById("mensaje").value;

    const cuerpo =
        `Nombre: ${nombre}\n` +
        `Correo: ${correo}\n` +
        `Municipalidad: ${municipalidad}\n` +
        `Asunto: ${asunto}\n\n` +
        `Mensaje:\n${mensaje}`;

    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=rs.siamsoft@gmail.com&su=${encodeURIComponent(
        asunto
    )}&body=${encodeURIComponent(cuerpo)}`;

    window.open(gmailLink, "_blank");
}

// =============================================
// CONFIGURACIÓN DEL CARRUSEL 3D INFINITO
// =============================================

/**
 * Configura el carrusel de Transformación Digital
 * Crea un carrusel 3D con efecto infinito y controles de navegación
 */
function setupSlider() {
    const track = document.querySelector('.slider-track');
    const items = document.querySelectorAll('.slider-item');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');

    let currentIndex = 0;
    let isAnimating = false;
    let autoSlideInterval;
    const totalItems = items.length;
    const radius = 350; // Radio del carrusel 3D (ajustable)

    // Función para actualizar el carrusel 3D
    function updateSlider() {
        if (isAnimating) return;
        isAnimating = true;

        items.forEach((item, index) => {
            // Calcular la posición relativa al índice actual
            let position = index - currentIndex;

            // Ajustar para el efecto de carrusel infinito
            if (position < -Math.floor(totalItems / 2)) position += totalItems;
            if (position > Math.floor(totalItems / 2)) position -= totalItems;

            // Calcular ángulo y posición 3D
            const angle = (position * 360) / totalItems;
            const z = radius * Math.cos((angle * Math.PI) / 180);
            const x = radius * Math.sin((angle * Math.PI) / 180);

            // Aplicar transformaciones 3D
            item.style.transform = `
                translateX(${x}px) 
                translateZ(${z}px) 
                rotateY(${-angle}deg)
                scale(${1 - Math.abs(position) * 0.1})
            `;

            // Ajustar opacidad y z-index
            item.style.opacity = `${1 - Math.abs(position) * 0.3}`;
            item.style.zIndex = totalItems - Math.abs(position);

            // Añadir/sacar clase active
            if (position === 0) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }

            // Añadir transición suave
            item.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });

        // Actualizar dots
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
                dot.style.transform = 'scale(1.3)';
            } else {
                dot.classList.remove('active');
                dot.style.transform = 'scale(1)';
            }
            dot.style.transition = 'all 0.3s ease';
        });

        // Permitir nueva animación después de que termine la actual
        setTimeout(() => {
            isAnimating = false;
        }, 800);
    }

    // Función para navegar a un slide específico
    function goToSlide(index, direction = null) {
        if (isAnimating) return;

        const oldIndex = currentIndex;
        currentIndex = index;

        // Ajustar para carrusel infinito
        if (currentIndex < 0) currentIndex = totalItems - 1;
        if (currentIndex >= totalItems) currentIndex = 0;

        // Aplicar clase de animación direccional
        if (direction === 'next') {
            track.classList.add('sliding-next');
            setTimeout(() => track.classList.remove('sliding-next'), 800);
        } else if (direction === 'prev') {
            track.classList.add('sliding-prev');
            setTimeout(() => track.classList.remove('sliding-prev'), 800);
        }

        updateSlider();
    }

    // Función para avanzar al siguiente slide
    function nextSlide() {
        goToSlide(currentIndex + 1, 'next');
    }

    // Función para retroceder al slide anterior
    function prevSlide() {
        goToSlide(currentIndex - 1, 'prev');
    }

    // Función para iniciar la transición automática
    function startAutoSlide() {
        stopAutoSlide();
        autoSlideInterval = setInterval(nextSlide, 4000); // Cambiar cada 4 segundos
    }

    // Función para detener la transición automática
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Event listeners para botones
    prevBtn.addEventListener('click', function () {
        stopAutoSlide();
        this.classList.add('button-pressed');
        setTimeout(() => this.classList.remove('button-pressed'), 300);
        prevSlide();
        startAutoSlide();
    });

    nextBtn.addEventListener('click', function () {
        stopAutoSlide();
        this.classList.add('button-pressed');
        setTimeout(() => this.classList.remove('button-pressed'), 300);
        nextSlide();
        startAutoSlide();
    });

    // Event listeners para dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (isAnimating) return;
            stopAutoSlide();
            const direction = index > currentIndex ? 'next' : 'prev';
            goToSlide(index, direction);
            startAutoSlide();
        });
    });

    // Touch events para móviles
    let startX = 0;
    let startTime = 0;

    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startTime = Date.now();
        stopAutoSlide();
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        if (!startX) return;

        const endX = e.changedTouches[0].clientX;
        const endTime = Date.now();
        const diff = startX - endX;
        const timeDiff = endTime - startTime;
        const swipeThreshold = 50;
        const velocityThreshold = 0.3; // px/ms

        // Detectar swipe rápido o largo
        if (Math.abs(diff) > swipeThreshold ||
            (timeDiff > 0 && Math.abs(diff / timeDiff) > velocityThreshold)) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }

        startAutoSlide();
        startX = 0;
    }, { passive: true });

    // Pausar auto slide al pasar el ratón por encima
    track.addEventListener('mouseenter', stopAutoSlide);
    track.addEventListener('mouseleave', startAutoSlide);

    // Recalcular en redimensionamiento
    window.addEventListener('resize', () => {
        stopAutoSlide();
        updateSlider();
        startAutoSlide();
    });

    // Navegación con teclado
    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        } else if (e.key === 'ArrowLeft') {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        } else if (e.key >= '1' && e.key <= String(totalItems)) {
            stopAutoSlide();
            goToSlide(parseInt(e.key) - 1);
            startAutoSlide();
        }
    });

    // Inicializar carrusel y comenzar la transición automática
    updateSlider();
    startAutoSlide();
}

// =============================================
// CONFIGURACIÓN DEL MODAL DE VIDEOS
// =============================================

/**
 * Configura el modal de videos
 */
function setupVideoModal() {
    const videoModal = document.getElementById('videoModal');
    const modalIframe = document.getElementById('modalIframe');
    const closeModal = document.getElementById('closeModal');
    const videoRectangles = document.querySelectorAll('.video-rectangle');
    const videoLabels = document.querySelectorAll('.video-label');

    // Función para extraer el ID de YouTube desde la URL del iframe
    function extractYouTubeId(iframeElement) {
        try {
            const iframeSrc = iframeElement.querySelector('iframe').src;
            // Busca el patrón /embed/ seguido del ID
            const match = iframeSrc.match(/\/embed\/([a-zA-Z0-9_-]+)/);
            return match ? match[1] : null;
        } catch (error) {
            console.error("Error extrayendo ID de YouTube:", error);
            return null;
        }
    }

    // Función para abrir el modal con el video
    function openVideoModal(videoId) {
        if (!videoId) {
            console.error("No se pudo obtener el ID del video");
            return;
        }

        // Configurar el iframe con autoplay
        modalIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Función para cerrar el modal
    function closeVideoModal() {
        videoModal.classList.remove('active');
        // Pausar el video al cerrar el modal
        modalIframe.src = '';
        document.body.style.overflow = 'auto';
    }

    // Event listeners para los rectángulos de video
    videoRectangles.forEach(rectangle => {
        rectangle.addEventListener('click', function () {
            const videoId = extractYouTubeId(this);
            openVideoModal(videoId);
        });
    });

    // Event listeners para los botones de video
    videoLabels.forEach(label => {
        label.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevenir que se active el evento del rectangle

            // Encontrar el rectangle de video correspondiente
            const videoItem = this.closest('.video-item');
            const videoRectangle = videoItem.querySelector('.video-rectangle');
            const videoId = extractYouTubeId(videoRectangle);

            openVideoModal(videoId);
        });
    });

    // Event listener para cerrar el modal
    closeModal.addEventListener('click', closeVideoModal);

    // Cerrar modal al hacer clic fuera del contenido
    videoModal.addEventListener('click', function (e) {
        if (e.target === videoModal) {
            closeVideoModal();
        }
    });

    // Cerrar modal con la tecla Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeVideoModal();
        }
    });
}

// =============================================
// EFECTO DE PALABRAS CAMBIANTES - HERO SECTION
// =============================================

/**
 * Configura el efecto de palabras cambiantes en el hero section
 */
function setupChangingWords() {
    // Palabras para la animación
    const words = [
        "CREATIVIDAD",
        "IMAGINACIÓN",
        "INNOVACIÓN",
        "MENTALIDAD"
    ];

    // Configuración
    const wordIds = ['word1', 'word2', 'word3', 'word4'];
    const animationDelay = 80; // ms entre letras
    const wordDelay = 3000; // ms entre palabras
    let currentWordIndex = 0;
    let animationInterval;

    // Inicializar palabras
    function initializeWords() {
        words.forEach((word, index) => {
            const wordElement = document.getElementById(wordIds[index]);
            if (!wordElement) return;

            // Crear letras
            for (let i = 0; i < word.length; i++) {
                const letterSpan = document.createElement('span');
                letterSpan.className = 'letter';
                letterSpan.textContent = word[i];
                letterSpan.style.transitionDelay = `${i * animationDelay}ms`;
                wordElement.appendChild(letterSpan);
            }
        });

        // Mostrar la primera palabra
        showWord(0);
    }

    // Mostrar una palabra específica
    function showWord(index) {
        // Ocultar todas las palabras
        wordIds.forEach(id => {
            const wordElement = document.getElementById(id);
            if (!wordElement) return;

            wordElement.classList.remove('active');

            // Ocultar todas las letras
            const letters = wordElement.querySelectorAll('.letter');
            letters.forEach(letter => {
                letter.classList.remove('active');
            });
        });

        // Actualizar índice actual
        currentWordIndex = index;

        // Mostrar la palabra seleccionada
        const currentWordElement = document.getElementById(wordIds[index]);
        if (!currentWordElement) return;

        currentWordElement.classList.add('active');

        // Animar letras secuencialmente
        const letters = currentWordElement.querySelectorAll('.letter');
        letters.forEach((letter, i) => {
            setTimeout(() => {
                letter.classList.add('active');
            }, i * animationDelay);
        });
    }

    // Avanzar a la siguiente palabra
    function nextWord() {
        let nextIndex = currentWordIndex + 1;
        if (nextIndex >= words.length) {
            nextIndex = 0;
        }

        showWord(nextIndex);
    }

    // Iniciar la animación automática
    function startAnimation() {
        animationInterval = setInterval(nextWord, wordDelay);
    }

    // Inicializar
    if (document.getElementById('word1')) {
        initializeWords();
        startAnimation();
    }
}

// =============================================
// ANIMACIÓN DE CARGA - MOSTRAR Y OCULTAR
// =============================================

/**
 * Función para manejar la animación de carga
 */
function setupLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Ocultar la pantalla de carga después de cierto tiempo o cuando se haya cargado todo
    window.addEventListener('load', function() {
        // Agregar una pequeña demora para que la animación se vea completamente
        setTimeout(function() {
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
            }
            
            // Remover el elemento del DOM después de que termine la animación
            setTimeout(function() {
                if (loadingScreen && loadingScreen.parentNode) {
                    loadingScreen.remove();
                }
            }, 800); // Tiempo de la transición de ocultar
        }, 500); // Esperar 2.5 segundos antes de ocultar para mostrar completamente la animación
    });
}

// =============================================
// EFECTO DE DESPEGUE Y VIDRIO EN NAVBAR
// =============================================
function setupNavbarScrollEffect() {
  const navbar = document.querySelector('.navbar');
  let isScrolled = false;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 15 && !isScrolled) {
      navbar.classList.add('scrolled');
      isScrolled = true;
    } else if (currentScroll <= 15 && isScrolled) {
      navbar.classList.remove('scrolled');
      isScrolled = false;
    }
  });
}


// =============================================
// INICIALIZACIÓN PRINCIPAL
// =============================================

/**
 * Función principal que inicializa todos los componentes cuando el DOM está listo
 */
function initializeApp() {
    // Configurar carrusel de municipalidades
    setupMunicipalitiesCarousel();

    // Configurar slider de transformación digital
    setupSlider();

    // Configurar modal de videos
    setupVideoModal();

    // Configurar efecto de palabras cambiantes
    setupChangingWords();

    // Configurar animación de carga
    setupLoadingScreen();

    // configurar animacion del navbar 
    setupNavbarScrollEffect();


    console.log('SIAMsoft - Aplicación inicializada correctamente');
}

// Inicializar la aplicación cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', initializeApp);