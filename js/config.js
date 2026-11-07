// Datos de la clínica. Todo lo que se edite aquí se actualiza en la página.
// Si un dato todavía no se tiene, déjalo vacío ("").
// Los números van solo con dígitos e incluyen el 503. Ejemplo: "50370000000"

const CLINICA = {
  whatsapp: "50360160708",
  telefono: "",
  mensajeWhatsApp: "Hola, quisiera información sobre los servicios de la Clínica Dental Dr. Alegría.",

  direccion: "",
  referencia: "",
  // Ejemplo: [{ dias: "Lunes a viernes", horas: "8:00 a. m. a 5:00 p. m." }]
  horarios: [],

  // Enlace de Google Maps de la clínica (Compartir > Copiar enlace)
  mapsUrl: "",
  // Mapa para insertar (Compartir > Insertar un mapa > copiar solo lo que va en src="...")
  mapsEmbedUrl: "",

  redes: {
    facebook: "",
    instagram: "",
    tiktok: ""
  },

  // Solo testimonios reales y con permiso del paciente.
  // Ejemplo: [{ texto: "...", autor: "María G." }]
  testimonios: []
};
