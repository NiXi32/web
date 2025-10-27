document.addEventListener('DOMContentLoaded', function () {
    // Elementos del DOM
    const icon = document.getElementById('chatbot-icon');
    const window = document.getElementById('chatbot-window');
    const messagesContainer = document.getElementById('chatbot-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    // Mostrar/ocultar ventana
    icon.addEventListener('click', function () {
        window.classList.toggle('visible');
    });

    // Palabras clave y respuestas
    const responses = [
        // Saludos y respuestas básicas
        {
            keywords: ['hola', 'hello', 'buenos', 'buenas', 'saludos', 'holis', 'holita', 'hey', 'hi'],
            response: "Hola! Soy el asistente virtual de SIAMsoft. ¿En qué puedo ayudarte hoy? Puedes preguntarme sobre: Gestión Tributaria y Caja, Catastro Urbano, Control de Asistencia, Trámite Documentario, Archivo Central, Vaso de Leche"
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

        // Gestión Tributaria y Caja
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

        // Catastro Urbano
        {
            keywords: ['catastro urbano', 'catastro', 'urbano', 'catastral', 'catastro urbano'],
            response: "Catastro Urbano. Esta herramienta es una maravilla para gestionar todos los predios del distrito. Usa tecnología de punta con mapas interactivos y se conecta hasta con drones para levantamientos topográficos. Características: Mapas interactivos y fotos satelitales, integración con drones para topografía, cumple normas del Consejo Nacional de Catastro, integración completa con el módulo tributario. ¿Qué aspecto del catastro te interesa?"
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

        // Control de Asistencia y Planillas
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

        // Trámite Documentario
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

        // Archivo Central
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

        // Vaso de Leche
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

        // Preguntas generales
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

    // Añadir mensaje al chat
    function addMessage(text, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
        messageDiv.textContent = text;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Función para encontrar la mejor respuesta
    function findBestResponse(userMessage) {
        // Convertir el mensaje a minúsculas y dividir en palabras
        const userWords = userMessage.toLowerCase().split(/\s+/);
        
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

    // Manejar envío de mensajes
    function handleSendMessage() {
        const userText = userInput.value.trim();
        if (!userText) return;

        addMessage(userText, true);
        userInput.value = '';

        setTimeout(() => {
            const botText = findBestResponse(userText);
            addMessage(botText, false);
        }, 500);
    }

    // Eventos
    sendButton.addEventListener('click', handleSendMessage);
    userInput.addEventListener('keypress', (e) => e.key === 'Enter' && handleSendMessage());

    // Mensaje inicial (solo primera vez)
    let firstOpen = true;
    icon.addEventListener('click', () => {
        if (firstOpen) {
            setTimeout(() => {
                addMessage("¡Hola! Pregúntame sobre trámites catastrales. Ejemplo: '¿Cómo pagar el predial?'", false);
            }, 300);
            firstOpen = false;
        }
    }, { once: true });
});

