(function () {
  const datos = typeof CLINICA !== "undefined" ? CLINICA : {};

  const soloNumeros = (valor) => String(valor || "").replace(/\D/g, "");
  const whatsapp = soloNumeros(datos.whatsapp);
  const telefono = soloNumeros(datos.telefono);

  // 50370000000 -> +503 7000-0000
  function formatearNumero(numero) {
    if (numero.length === 11 && numero.startsWith("503")) {
      return "+503 " + numero.slice(3, 7) + "-" + numero.slice(7);
    }
    return "+" + numero;
  }

  function linkWhatsApp(mensaje) {
    return "https://wa.me/" + whatsapp + "?text=" + encodeURIComponent(mensaje || datos.mensajeWhatsApp || "");
  }

  function abrirEnNuevaPestana(enlace) {
    enlace.target = "_blank";
    enlace.rel = "noopener";
  }

  // Botones de WhatsApp y teléfono. Sin número configurado se quedan
  // apuntando a la sección de contacto.
  if (whatsapp) {
    document.querySelectorAll("[data-wa]").forEach((enlace) => {
      enlace.href = linkWhatsApp();
      abrirEnNuevaPestana(enlace);
    });

    document.querySelectorAll("[data-wa-servicio]").forEach((enlace) => {
      const servicio = enlace.closest("[data-servicio]").dataset.servicio;
      enlace.href = linkWhatsApp("Hola, quisiera información sobre " + servicio + ".");
      abrirEnNuevaPestana(enlace);
    });
  }

  if (telefono) {
    document.querySelectorAll("[data-tel]").forEach((enlace) => {
      enlace.href = "tel:+" + telefono;
    });
  }

  // Datos de la sección de ubicación
  const campos = {
    direccion: datos.direccion,
    referencia: datos.referencia,
    horarios: (datos.horarios || []).map((h) => h.dias + ", " + h.horas).join(" / "),
    telefono: telefono ? formatearNumero(telefono) : "",
    whatsapp: whatsapp ? formatearNumero(whatsapp) : ""
  };

  document.querySelectorAll("[data-field]").forEach((elemento) => {
    const valor = campos[elemento.dataset.field];
    if (!valor) {
      elemento.classList.add("placeholder");
      return;
    }
    elemento.textContent = valor;
  });

  if (campos.horarios) {
    document.querySelector('[data-faq="horarios"]').textContent = "Nuestro horario es: " + campos.horarios + ".";
  }

  // Mapa
  if (datos.mapsEmbedUrl) {
    const mapa = document.getElementById("mapa");
    mapa.src = datos.mapsEmbedUrl;
    mapa.title = "Ubicación de Clínica Dental Dr. Alegría";
  }
  if (datos.mapsUrl) {
    document.getElementById("btn-mapa").href = datos.mapsUrl;
  }

  // Menú en celulares
  const header = document.getElementById("header");
  const menu = document.getElementById("menu");
  const botonMenu = document.getElementById("menu-btn");

  function cerrarMenu() {
    menu.classList.remove("open");
    botonMenu.setAttribute("aria-expanded", "false");
    botonMenu.setAttribute("aria-label", "Abrir menú");
  }

  botonMenu.addEventListener("click", () => {
    const abierto = menu.classList.toggle("open");
    botonMenu.setAttribute("aria-expanded", abierto);
    botonMenu.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
  });

  menu.querySelectorAll("a").forEach((enlace) => enlace.addEventListener("click", cerrarMenu));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("open")) {
      cerrarMenu();
      botonMenu.focus();
    }
  });

  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 10);
  }, { passive: true });

  // Marca en el menú la sección que se está viendo
  const enlacesMenu = menu.querySelectorAll("ul a");
  const observadorSecciones = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      enlacesMenu.forEach((enlace) => {
        enlace.classList.toggle("active", enlace.getAttribute("href") === "#" + entrada.target.id);
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  ["inicio", "servicios", "nosotros", "preguntas", "contacto"].forEach((id) => {
    observadorSecciones.observe(document.getElementById(id));
  });

  // Preguntas frecuentes
  const preguntas = document.querySelectorAll(".faq-item button");

  preguntas.forEach((boton, i) => {
    boton.addEventListener("click", () => {
      const abrir = boton.getAttribute("aria-expanded") === "false";
      preguntas.forEach((otro) => {
        otro.setAttribute("aria-expanded", "false");
        document.getElementById(otro.getAttribute("aria-controls")).hidden = true;
      });
      boton.setAttribute("aria-expanded", abrir);
      document.getElementById(boton.getAttribute("aria-controls")).hidden = !abrir;
    });

    boton.addEventListener("keydown", (e) => {
      let siguiente;
      if (e.key === "ArrowDown") siguiente = preguntas[(i + 1) % preguntas.length];
      if (e.key === "ArrowUp") siguiente = preguntas[(i - 1 + preguntas.length) % preguntas.length];
      if (siguiente) {
        e.preventDefault();
        siguiente.focus();
      }
    });
  });

  // Testimonios (solo si hay)
  if (datos.testimonios && datos.testimonios.length) {
    const lista = document.getElementById("testimonios-lista");
    datos.testimonios.forEach((t) => {
      const figura = document.createElement("figure");
      figura.className = "testimonial";
      const cita = document.createElement("blockquote");
      cita.textContent = "“" + t.texto + "”";
      const autor = document.createElement("figcaption");
      autor.textContent = t.autor;
      figura.append(cita, autor);
      lista.appendChild(figura);
    });
    document.getElementById("testimonios").hidden = false;
  }

  // Pie de página
  document.getElementById("anio").textContent = new Date().getFullYear();

  const redes = Object.entries(datos.redes || {}).filter(([, url]) => url);
  if (redes.length) {
    const bloque = document.getElementById("redes");
    redes.forEach(([red, url]) => {
      const item = document.createElement("li");
      item.innerHTML = '<a target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#i-' + red + '"/></svg></a>';
      item.firstChild.href = url;
      item.firstChild.setAttribute("aria-label", red.charAt(0).toUpperCase() + red.slice(1));
      bloque.querySelector("ul").appendChild(item);
    });
    bloque.hidden = false;
  }

  const contactoFooter = document.getElementById("footer-contacto");
  if (telefono) {
    contactoFooter.insertAdjacentHTML("beforeend",
      '<li><svg class="icon" aria-hidden="true"><use href="#i-phone"/></svg> <a href="tel:+' + telefono + '">' + formatearNumero(telefono) + "</a></li>");
  }

  // Aviso de privacidad
  const aviso = document.getElementById("privacidad");
  document.getElementById("abrir-privacidad").addEventListener("click", () => aviso.showModal());
  aviso.addEventListener("click", (e) => {
    if (e.target === aviso) aviso.close();
  });

  // El botón flotante se esconde en la sección de contacto y el pie
  const botonFlotante = document.querySelector(".wa-float");
  const zonasVisibles = new Set();
  const observadorFlotante = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => (e.isIntersecting ? zonasVisibles.add(e.target) : zonasVisibles.delete(e.target)));
    botonFlotante.classList.toggle("hide", zonasVisibles.size > 0);
  });
  observadorFlotante.observe(document.getElementById("contacto"));
  observadorFlotante.observe(document.querySelector(".footer"));

  // Aparición suave de algunos bloques
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const bloques = document.querySelectorAll(".section-head, .service, .more-services, .about > *, .why-list li, .location > *, .faq > *");
    const observadorFade = new IntersectionObserver((entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visible");
          observadorFade.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.1 });

    bloques.forEach((bloque) => {
      bloque.classList.add("fade");
      observadorFade.observe(bloque);
    });
  }
})();
