// Datos de la clínica. Todo lo que se edite aquí se actualiza en la página.
// Si un dato todavía no se tiene, déjalo vacío ("").
// Los números van solo con dígitos e incluyen el 503. Ejemplo: "50370000000"

const CLINICA = {
  whatsapp: "50360160708",
  telefono: "",
  mensajeWhatsApp: "Hola, quisiera información sobre los servicios de la Clínica Dental Dr. Alegría.",

  direccion: "Colonia Vista Hermosa, F#3, Guazapa, San Salvador",
  referencia: "",
  // Ejemplo: [{ dias: "Lunes a viernes", horas: "8:00 a. m. a 5:00 p. m." }]
  horarios: [],

  // Enlace de Google Maps de la clínica (Compartir > Copiar enlace)
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Clinica%20Dental%20General%20Dr.%20Francisco%20Alegr%C3%ADa%2C%20Guazapa",
  // Mapa para insertar (Compartir > Insertar un mapa > copiar solo lo que va en src="...")
  mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15493.745693129755!2d-89.17851836600755!3d13.872833216432149!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f633fdfd88bd097%3A0x7f5073435931a7df!2sClinica%20Dental%20General%20Dr.%20Francisco%20Alegr%C3%ADa!5e0!3m2!1ses-419!2ssv!4v1794072892502!5m2!1ses-419!2ssv",

  redes: {
    facebook: "",
    instagram: "",
    tiktok: ""
  },

  // Solo testimonios reales y con permiso del paciente.
  // Ejemplo: [{ texto: "...", autor: "María G." }]
  testimonios: []
};
