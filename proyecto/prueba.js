
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
        } else if (e.key === 'Eescape') {
            closeOverlay();
        }
    });
}
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

            const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=informes.siamperu@hotmail.com&su=${encodeURIComponent(
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
// CONFIGURACIÓN DEL CHATBOT
// =============================================

/**
 * Configura la funcionalidad del chatbot
 */
function setupChatbot() {
    const chatbotIcon = document.getElementById('chatbot-icon');
    const chatbotWindow = document.getElementById('chatbot-window');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const chatMessages = document.getElementById('chatbot-messages');

    // Mostrar/ocultar ventana del chatbot
    if (chatbotIcon && chatbotWindow) {
        chatbotIcon.addEventListener('click', function () {
            chatbotWindow.classList.toggle('active');
        });
    }

    // Enviar mensaje
    if (sendButton && userInput && chatMessages) {
        function sendMessage() {
            const message = userInput.value.trim();
            if (message) {
                // Agregar mensaje del usuario
                addMessage(message, 'user');
                userInput.value = '';

                // Simular respuesta del chatbot después de un breve retraso
                setTimeout(() => {
                    const botResponse = getBotResponse(message);
                    addMessage(botResponse, 'bot');
                }, 1000);
            }
        }

        sendButton.addEventListener('click', sendMessage);
        userInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // Agregar mensaje al chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Generar respuesta del bot
    function getBotResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Palabras clave y respuestas
        const responses = [
            // Saludos y respuestas básicas
            {
                keywords: ['hola', 'hello', 'buenos', 'buenas', 'saludos', 'holis', 'holita', 'hey', 'hi'],
                response: '¡Hola! Soy el asistente virtual de SIAMsoft. ¿En qué puedo ayudarte hoy? Puedes preguntarme sobre: Gestión Tributaria y Caja, Catastro Urbano, Control de Asistencia, Trámite Documentario, Archivo Central, Vaso de Leche'
            },
            {
                keywords: ['buenos dias', 'buenos días', 'buen día', 'buenosdias', 'dia', 'día'],
                response: "Buenos días! ¿En qué módulo de SIAMsoft necesitas ayuda hoy?"
            },
            {
                keywords: ['buenas tardes', 'tardes', 'buenastardes'],
                response: "Buenas tardes! ¿Qué información necesitas sobre nuestros sistemas?"
            },
            {
                keywords: ['gracias', 'grax', 'thank', 'thanks', 'agradezco', 'aprecio'],
                response: "De nada! Estoy aquí para ayudarte con lo que necesites de SIAMsoft."
            },
            {
                keywords: ['si', 'sí', 'yes', 'afirmativo', 'correcto', 'verdad', 'cierto', 'ok', 'okay'],
                response: "Perfecto! ¿Sobre qué módulo específicamente te interesa conocer más?"
            },
            {
                keywords: ['adios', 'adiós', 'chao', 'chau', 'hasta luego', 'hasta pronto', 'bye', 'ciao'],
                response: "Hasta luego! Recuerda que SIAMsoft tiene las herramientas para transformar tu gestión municipal."
            },
            {
                keywords: ['catastro', 'catastro urbano', 'urbano', 'catastral', 'catastro urbano'],
                response: "Catastro Urbano. Esta herramienta es una maravilla para gestionar todos los predios del distrito. Usa tecnología de punta con mapas interactivos y se conecta hasta con drones para levantamientos topográficos. Características: Mapas interactivos y fotos satelitales, integración con drones para topografía, cumple normas del Consejo Nacional de Catastro, integración completa con el módulo tributario. ¿Qué aspecto del catastro te interesa?"
            },
            {
                keywords: ['precio', 'costo', 'cuanto cuesta', 'cuánto', 'inversión', 'dinero', 'pago'],
                response: "Los precios varían según las necesidades de tu municipalidad. ¿Podrías proporcionarme más detalles sobre lo que necesitas?"
            },
            {
                keywords: ['contacto', 'whatsapp', 'telefono', 'teléfono', 'correo', 'email', 'contactar'],
                response: "Puedes contactarnos al +51 996 909 051 o escribirnos a rs.siamsoft@gmail.com"
            },
            {
                keywords: ['gestion tributaria', 'gestión tributaria', 'tributaria', 'impuestos', 'tributos', 'gestión tributaria'],
                response: "Gestión Tributaria y Caja. Este módulo es súper completo. Te maneja todos los impuestos municipales: predial, alcabala, arbitrios, industria y comercio. Ventajas: Integrado con el sistema de caja, calcula automáticamente descuentos, genera recibos automáticamente, reportes en tiempo real. ¿Te interesa saber algo específico de este módulo?"
            },
            {
                keywords: ['impuesto predial', 'predial', 'impuesto municipal', 'prediales'],
                response: "Impuesto Predial. Nuestro sistema calcula automáticamente el predial según los valores catastrales, aplica descuentos por pronto pago, genera declaraciones juradas y maneja cobranza coactiva si es necesario. Beneficios: Cálculo automático, descuentos por pronto pago, fraccionamiento de deudas, integración con catastro. ¿Quieres saber sobre otro impuesto?"
            },
            {
                keywords: ['sistema de caja', 'caja', 'sistema caja', 'recaudación', 'pagos'],
                response: "Sistema de Caja. Es muy fácil de usar. Desde una sola pantalla puedes registrar pagos, emitir recibos automáticamente y llevar control de recaudación en tiempo real. Funcionalidades: Registro de pagos integrado, emisión automática de recibos, control de recaudación en tiempo real, reportes diarios automáticos. ¿Te gustaría conocer más detalles?"
            },
            {
                keywords: ['tributos municipales', 'municipales', 'municipio', 'alcabala', 'arbitrios', 'tributo'],
                response: "Tributos Municipales. Nuestro sistema maneja todos los tributos que necesitas en una municipalidad: predial, alcabala, arbitrios de limpieza y serenazgo, impuesto de industria y comercio, espectáculos públicos, y tasas administrativas. Todo centralizado en un solo lugar para mayor comodidad."
            },
            {
                keywords: ['recaudacion', 'recaudación', 'recaudar', 'recaudado'],
                response: "Recaudación. Nuestro sistema de recaudación te permite gestionar todos los pagos desde una sola plataforma, con control en tiempo real, reportes automáticos y seguimiento integral de la recaudación municipal."
            },
            {
                keywords: ['mapas catastrales', 'mapas', 'mapa', 'georeferenciados', 'georreferenciación'],
                response: "Mapas Catastrales. Tenemos un sistema de mapas súper potente donde puedes ver todos los predios georreferenciados, medir distancias, calcular áreas y superponer capas de información. Ventajas: Visualización de predios georreferenciados, mediciones precisas, planos técnicos imprimibles, integración con valores fiscales. ¿Necesitas información sobre otra función?"
            },
            {
                keywords: ['integracion catastro tributaria', 'integracion catastro', 'integración catastro', 'catastro tributaria'],
                response: "Integración Catastro-Tributaria. Esta es una de las mejores partes. Cuando actualizas un valor catastral o cambias datos de un predio, automáticamente se actualiza en tributaria para el cálculo del predial. Beneficios: Actualizaciones automáticas, elimina duplicación de trabajo, datos consistentes entre sistemas, mayor eficiencia en la gestión. ¿Te parece útil esta integración?"
            },
            {
                keywords: ['levantamiento topografico', 'levantamiento', 'topografico', 'topográfico', 'levantamiento topográfico'],
                response: "Levantamiento Topográfico. Nuestro sistema se integra con tecnología de drones y GPS para realizar levantamientos topográficos precisos, con mediciones exactas y actualización automática de la información catastral."
            },
            {
                keywords: ['valores catastrales', 'valores', 'catastral', 'valor catastral'],
                response: "Valores Catastrales. El sistema calcula automáticamente los valores catastrales según múltiples factores: ubicación, superficie, uso del suelo, antigüedad y estado de las construcciones. Estos valores se actualizan anualmente y sirven como base para el cálculo del impuesto predial."
            },
            {
                keywords: ['control asistencia', 'asistencia', 'control de asistencia', 'marcación', 'pases', 'marcar'],
                response: "Control de Asistencia. Nuestro sistema está diseñado para trabajo tanto presencial como remoto. Los empleados pueden marcar asistencia desde cualquier lugar con internet. Opciones: Biométrico, tarjetas o códigos QR, geolocalización para trabajo en campo, reportes automáticos de tardanzas y faltas, control en tiempo real. ¿Tu municipalidad trabaja en modalidad híbrida?"
            },
            {
                keywords: ['planillas', 'planilla', 'nómina', 'nomina', 'pago', 'pagos'],
                response: "Sistema de Planillas. Es súper flexible. Puedes configurarlo para CAS, 276, 728, practicantes, consultores... cualquier régimen laboral que tengas. Funcionalidades: Cálculo automático de descuentos y aportes, integración con RENIEC e IT-Register, configurable para cualquier régimen, reportes para SUNAT. ¿Qué tipo de planillas manejas?"
            },
            {
                keywords: ['trabajo remoto', 'remoto', 'trabajo en casa', 'home office', 'teletrabajo'],
                response: "Trabajo Remoto. Sí, nuestro sistema funciona perfectamente para trabajo remoto. Los empleados marcan asistencia desde cualquier lugar con internet, y puedes hacer seguimiento en tiempo real. Ventajas: Marcación desde cualquier ubicación, seguimiento en tiempo real, ideal para modalidad híbrida, reportes automáticos. ¿Tu personal trabaja desde casa?"
            },
            {
                keywords: ['regimenes laborales', 'regímenes', 'laboral', 'laborales', 'ley 276', 'ley 728', 'cas'],
                response: "Regímenes Laborales. Nuestro sistema de planillas es compatible con todos los regímenes laborales del sector público: CAS, Ley 276, Ley 728, practicantes, consultores, y cualquier otro régimen especial que utilice tu municipalidad."
            },
            {
                keywords: ['reportes sunat', 'sunat', 'reporte sunat', 'declaraciones', 'declaraciones su'],
                response: "Reportes SUNAT. El sistema genera automáticamente todos los reportes requeridos por la SUNAT, incluyendo planillas electrónicas, información para el registro de trabajadores, y toda la documentación necesaria para el cumplimiento de obligaciones tributarias laborales."
            },
            {
                keywords: ['tramite documentario', 'trámite', 'documentario', 'trámites', 'documentos', 'oficios', 'resoluciones'],
                response: "Trámite Documentario. Este módulo maneja todos los documentos oficiales: oficios, memorandos, resoluciones, ordenanzas, certificados, licencias... con plantillas predefinidas. Características: Firmas electrónicas con validez legal, PDFs con valor legal completo, agiliza procesos hasta en 80%, elimina necesidad de impresiones. ¿Te interesa la firma electrónica?"
            },
            {
                keywords: ['firma electronica', 'firma electrónica', 'firma', 'electrónica', 'firmas'],
                response: "Firma Electrónica. Sí! Y es una de las mejores características. Puedes firmar documentos electrónicamente sin necesidad de imprimir nada, con validez legal completa. Beneficios: Validez legal completa, acelera procesos significativamente, elimina traslados físicos, mayor seguridad y trazabilidad. ¿Quieres saber cómo implementarlo?"
            },
            {
                keywords: ['agilizacion procesos', 'agilización', 'procesos', 'agilizar', 'rápido', 'rapido'],
                response: "Agilización de Procesos. Según nuestra experiencia, los procesos se agilizan hasta en un 80%. Lo que antes tomaba días o semanas ahora se hace en horas. Resultados: Reducción de tiempos de 80%, eliminación de cuellos de botella, mayor productividad del personal, mejor servicio al ciudadano. ¿Imaginas lo que podrías lograr con esta eficiencia?"
            },
            {
                keywords: ['documentos oficiales', 'oficiales', 'documento', 'documento oficial'],
                response: "Documentos Oficiales. El sistema maneja todos los tipos de documentos oficiales de una municipalidad: oficios, memorandos, resoluciones de alcaldía, ordenanzas municipales, certificados, licencias de funcionamiento, y cualquier otro documento administrativo con validez legal."
            },
            {
                keywords: ['seguimiento documentario', 'seguimiento', 'documento', 'seguimiento de documentos'],
                response: "Seguimiento Documentario. Puedes hacer seguimiento en tiempo real de todos tus documentos: saber dónde está cada expediente, quién lo tiene, cuánto tiempo lleva en cada área, y cuándo se espera su resolución. Todo con alertas y notificaciones automáticas."
            },
            {
                keywords: ['archivo central', 'archivo', 'archivos', 'archivo centralizado'],
                response: "Archivo Central. Es como tener toda tu documentación en la nube, pero súper organizada. Ocupas mucho menos espacio físico y encuentras todo al instante. Ventajas: Buscador potente por cualquier palabra, controles de acceso y seguridad, backups automáticos, integración con otros módulos. ¿Te preocupa la seguridad de los documentos?"
            },
            {
                keywords: ['buscador documentos', 'buscador', 'buscar', 'búsqueda', 'busqueda'],
                response: "Buscador de Documentos. Sí, y es súper potente. Puedes buscar por cualquier palabra que aparezca en los documentos, por fechas, nombres, números de expediente... es increíblemente rápido. Funcionalidades: Búsqueda por cualquier criterio, resultados en segundos, acceso rápido a historiales, organización por categorías. ¿Manejas muchos documentos actualmente?"
            },
            {
                keywords: ['seguridad documentos', 'seguridad', 'seguro', 'protección', 'proteger'],
                response: "Seguridad de Documentos. Muy segura. Tenemos controles de acceso por usuario, registro de quién ve qué documento y cuándo, backups automáticos... tus documentos están más seguros que en archivo físico. Medidas de seguridad: Controles de acceso por usuario, registro detallado de accesos, backups automáticos, protección contra pérdidas físicas. ¿La seguridad es una prioridad para ti?"
            },
            {
                keywords: ['digitalizacion', 'digitalización', 'digitalizar', 'digital'],
                response: "Digitalización. El sistema permite digitalizar toda la documentación física, organizarla por categorías, fechas, tipos de documento, y hacerla accesible desde cualquier lugar con permisos adecuados. Esto reduce el espacio físico necesario y mejora la eficiencia en la gestión documental."
            },
            {
                keywords: ['gestion expedientes', 'gestión expedientes', 'expedientes', 'expediente', 'gestión'],
                response: "Gestión de Expedientes. Puedes gestionar expedientes completos de manera digital, con control de versiones, historial de modificaciones, y trazabilidad completa de cada documento. El sistema mantiene un registro de todas las acciones realizadas sobre cada expediente."
            },
            {
                keywords: ['vaso de leche', 'vaso leche', 'leche', 'beneficiarios', 'beneficiario'],
                response: "Programa Vaso de Leche. Este módulo te permite registrar a todas las familias beneficiarias con todos sus datos, hacer seguimiento y controlar las edades para ver quién sigue calificando. Funcionalidades: Padrón de beneficiarios integrado con RENIEC, planillas de distribución, control de entrega de insumos, reportes automáticos para MIDIS. ¿Necesitas ayuda con el padrón de beneficiarios?"
            },
            {
                keywords: ['padron beneficiarios', 'padrón beneficiarios', 'padrón', 'padron'],
                response: "Padrón de Beneficiarios. Se conecta directo con RENIEC para validar que todos los datos sean correctos - nombres, DNI, fechas de nacimiento... Así te aseguras de que no hay duplicados ni datos falsos. Ventajas: Validación automática con RENIEC, eliminación de duplicados, datos confiables y actualizados, cumplimiento de requisitos del programa. ¿Has tenido problemas con datos duplicados?"
            },
            {
                keywords: ['reportes midis', 'reportes', 'midis', 'reporte'],
                response: "Reportes para MIDIS. Sí, genera automáticamente todos los reportes que necesitas enviar al MIDIS. Los formatos están pre-configurados según lo que piden. Beneficios: Formatos pre-configurados, generación automática, cumplimiento de plazos, eliminación de errores manuales. ¿Los reportes te consumen mucho tiempo?"
            },
            {
                keywords: ['distribucion alimentos', 'distribución alimentos', 'distribución', 'alimentos', 'distribuir'],
                response: "Distribución de Alimentos. El sistema te ayuda a planificar y controlar la distribución de alimentos: desde la compra de insumos hasta la entrega a los beneficiarios, con control de inventarios, lotes, fechas de vencimiento, y entrega eficiente."
            },
            {
                keywords: ['control beneficiarios', 'control', 'beneficiarios', 'controlar'],
                response: "Control de Beneficiarios. Puedes llevar un control detallado de todos los beneficiarios: validación de requisitos, control de edades, actualización de datos, seguimiento de entregas, y detección de posibles irregularidades en el padrón."
            },
            {
                keywords: ['modulos', 'módulos', 'modulo', 'módulo', 'sistema', 'sistemas'],
                response: "Módulos SIAMsoft. Tenemos varios módulos especializados: 1. Gestión Tributaria y Caja, 2. Catastro Urbano, 3. Control de Asistencia y Planillas, 4. Trámite Documentario, 5. Archivo Central, 6. Vaso de Leche. ¿Te interesa alguno en particular?"
            },
            {
                keywords: ['beneficios', 'beneficio', 'ventajas', 'ventaja', 'ventajas'],
                response: "Beneficios de SIAMsoft. Nuestros sistemas te ayudan a: Aumentar la eficiencia hasta 80%, reducir costos operativos, mejorar el servicio al ciudadano, cumplir normas fácilmente, trabajar desde cualquier lugar. ¿Qué beneficio te interesa más?"
            },
            {
                keywords: ['implementacion', 'implementación', 'implementar', 'instalación', 'instalacion', 'instalar'],
                response: "Implementación. Cada módulo funciona independientemente, pero lo recomendable es usarlos integrados porque se potencian entre sí. Proceso: Evaluación de necesidades, implementación gradual, capacitación completa, soporte técnico permanente. ¿Quieres saber sobre costos?"
            },
            {
                keywords: ['capacitacion', 'capacitación', 'capacitar', 'capacitaciones', 'entrenamiento', 'entrenar'],
                response: "Capacitación. No es difícil aprender. Está diseñado para ser intuitivo, y te damos capacitación completa más soporte técnico permanente. Incluye: Sesiones de entrenamiento, manuales y guías, soporte continuo, actualizaciones gratuitas. ¿Tu equipo está familiarizado con sistemas similares?"
            },
            {
                keywords: ['soporte tecnico', 'soporte técnico', 'soporte', 'ayuda', 'ayudar', 'ayuda técnica'],
                response: "Soporte Técnico. Ofrecemos soporte técnico permanente para resolver cualquier duda o problema que surja. Disponibilidad: Soporte por múltiples canales, respuesta rápida, soluciones remotas y presenciales, mantenimiento preventivo. ¿Necesitas soporte inmediato?"
            },
            {
                keywords: ['costos', 'costo', 'precio', 'precios', 'inversión', 'precio', 'dinero', 'pago'],
                response: "Costos. Los costos de implementación varían según los módulos que necesites y el tamaño de tu municipalidad. La inversión se recupera rápidamente con la eficiencia que ganas. Podemos hacer una evaluación gratuita para darte un presupuesto exacto."
            },
            {
                keywords: ['tiempo implementacion', 'tiempo', 'implementacion', 'cuanto tiempo', 'duración', 'cuánto tiempo'],
                response: "Tiempo de Implementación. El tiempo de implementación depende de los módulos seleccionados y la complejidad de tu municipalidad. Normalmente, la implementación básica toma entre 2 y 4 semanas, incluyendo capacitación y migración de datos."
            },
            {
                keywords: ['personalizacion', 'personalización', 'personalizar', 'personalizado', 'personaliza'],
                response: "Personalización. Nuestros sistemas son altamente personalizables para adaptarse a las necesidades específicas de cada municipalidad. Podemos ajustar flujos de trabajo, formatos de reportes, y integrar con sistemas existentes."
            },
            {
                keywords: ['actualizaciones', 'actualizacion', 'actualización', 'actualizar', 'actualiza', 'actualizó'],
                response: "Actualizaciones. Incluimos actualizaciones gratuitas para mantener tu sistema al día con los cambios normativos y tecnológicos. Las actualizaciones se aplican automáticamente sin interrumpir tu trabajo."
            },
            {
                keywords: ['seguridad datos', 'seguridad', 'seguro', 'protección', 'proteger', 'datos'],
                response: "Seguridad de Datos. Implementamos múltiples medidas de seguridad: encriptación de datos, backups automáticos, controles de acceso, auditoría de operaciones, y cumplimiento de normativas de protección de datos."
            },
            {
                keywords: ['integracion otros sistemas', 'integracion', 'integración', 'otros sistemas', 'integrar'],
                response: "Integración con Otros Sistemas. Nuestros sistemas pueden integrarse con otras plataformas que uses actualmente: sistemas contables, plataformas de pago, sistemas de identificación, y otras herramientas municipales."
            },
            {
                keywords: ['experiencia', 'experiencias', 'experiencia', 'experto', 'expertos'],
                response: "Experiencia. Somos una empresa fundada en el año 2008 en Arequipa, con amplia experiencia en el desarrollo de software para municipalidades. Contamos con un equipo altamente capacitado en el uso de tecnologías vigentes."
            },
            {
                keywords: ['tecnologias', 'tecnologías', 'tecnología', 'tecnologia', 'tecnología', ' técnologia'],
                response: "Tecnologías. Utilizamos tecnologías modernas y robustas para el desarrollo: Python, Vue.js, JavaScript, Node.js, Angular, WinDev. Esto nos permite crear soluciones escalables, seguras y de alto rendimiento."
            },
            {
                keywords: ['garantia', 'garantía', 'garantizar', 'garantizado'],
                response: "Garantía. Ofrecemos garantía completa sobre todos nuestros productos y servicios. Incluye soporte técnico permanente, actualizaciones, y resolución de problemas en tiempos récord."
            },
            {
                keywords: ['demo', 'demostración', 'demostracion', 'demonstración', 'demonstracion', 'probar', 'prueba'],
                response: "Demo. Podemos agendar una demostración personalizada donde te mostramos el sistema en funcionamiento y resolvemos todas tus dudas. Las demos normalmente duran entre 45 y 60 minutos."
            },
            {
                keywords: ['casos exito', 'casos de éxito', 'casos exito', 'casos de exito', 'éxito', 'exito'],
                response: "Casos de Éxito. Tenemos múltiples municipalidades satisfechas usando nuestros sistemas. Podemos compartirte referencias y casos de éxito de municipalidades similares a la tuya."
            },
            {
                keywords: ['migracion datos', 'migración datos', 'migrar', 'migración', 'migrar datos', 'migrar data'],
                response: "Migración de Datos. Te ayudamos con la migración de tus datos existentes hacia nuestro sistema. Contamos con herramientas y procesos para hacer esta transición lo más suave posible."
            },
            {
                keywords: ['requisitos tecnicos', 'requisitos', 'requerimientos', 'técnicos', 'tecnico', 'tecnológicos'],
                response: "Requisitos Técnicos. Nuestros sistemas tienen requisitos técnicos modestos: conexión a internet, equipos con capacidad estándar, y navegadores modernos. No necesitas invertir en hardware costoso."
            }
        ];

        // Convertir el mensaje a minúsculas y dividir en palabras
        const userWords = lowerMessage.split(/\s+/);
        
        // Contador de coincidencias por respuesta
        const responseScores = [];
        
        // Recorremos cada respuesta y sus palabras clave
        responses.forEach(responseObj => {
            let score = 0;
            let matchedKeywords = [];
            
            // Para cada palabra clave en la respuesta
            responseObj.keywords.forEach(keyword => {
                // Verificamos si alguna palabra del usuario coincide con la palabra clave
                userWords.forEach(userWord => {
                    // Verificamos coincidencia exacta
                    if (userWord === keyword) {
                        score += 2; // Puntos por coincidencia exacta
                        matchedKeywords.push(keyword);
                    }
                    // Verificamos coincidencia parcial (palabra clave como substring de la palabra del usuario)
                    else if (userWord.includes(keyword) || keyword.includes(userWord)) {
                        score += 1; // Puntos por coincidencia parcial
                        matchedKeywords.push(keyword);
                    }
                });
            });
            
            // Si hay coincidencias, agregamos al arreglo de puntuaciones
            if (score > 0) {
                responseScores.push({
                    response: responseObj.response,
                    score: score,
                    matchedKeywords: matchedKeywords
                });
            }
        });
        
        // Si hay coincidencias, devolvemos la respuesta con mayor puntuación
        if (responseScores.length > 0) {
            responseScores.sort((a, b) => b.score - a.score);
            return responseScores[0].response;
        }
        
        // Si no hay coincidencias, devolvemos la respuesta por defecto
        return "No estoy seguro de entender. ¿Podrías reformular tu pregunta? Puedo ayudarte con: Gestión Tributaria y Caja, Catastro Urbano, Control de Asistencia, Trámite Documentario, Archivo Central, Vaso de Leche. ¿Sobre qué módulo te gustaría información?";
    }
}

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
        if (e.key === 'Eescape' && videoModal.classList.contains('active')) {
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

    // Configurar chatbot
    setupChatbot();

    // Configurar efecto de palabras cambiantes
    setupChangingWords();

    console.log('SIAMsoft - Aplicación inicializada correctamente');
}

// Inicializar la aplicación cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', initializeApp);

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
            loadingScreen.classList.add('hidden');
            
            // Remover el elemento del DOM después de que termine la animación
            setTimeout(function() {
                if (loadingScreen) {
                    loadingScreen.remove();
                }
            }, 800); // Tiempo de la transición de ocultar
        }, 2500); // Esperar 2.5 segundos antes de ocultar para mostrar completamente la animación
    });
}

// Inicializar la animación de carga cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    setupLoadingScreen();
});

