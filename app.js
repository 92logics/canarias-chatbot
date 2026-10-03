(function () {
  "use strict";

  var REFUSAL = "Este prototipo solo puede repetir datos del anuncio público SER/2026/0000145362. No atiende situaciones personales, no recoge datos y no es un canal de ayuda. No responde a nada que no figure en ese anuncio.";

  var FACTS = [
    {
      test: /objeto|contrato|chatbot|plataforma|que es|qué es|de que trata|de qué trata/,
      answer: "El objeto publicado es un servicio consistente en el desarrollo de un chatbot para la futura plataforma inteligente de apoyo, formación y orientación contra la violencia de género de la Viceconsejería de Justicia y Seguridad."
    },
    {
      test: /organo|órgano|quien contrata|quién contrata|buyer|expediente|archivo|viceconsejer/,
      answer: "Órgano de contratación: Viceconsejería de Justicia (Consejería de Administraciones Públicas, Justicia y Seguridad, Comunidad Autónoma de Canarias). Expediente: SER/2026/0000145362. Identificador publicado del órgano: 21123600156120."
    },
    {
      test: /plazo|fecha|deadline|oferta|presenta|cuando|cuándo|hasta/,
      answer: "El anuncio fija el fin de presentación de ofertas el 11/10/2026 a las 23:59, hora de España (UTC+2). En Asia/Karachi (PKT, UTC+5) es el 12/10/2026 a las 02:59. La presentación es electrónica. Estado del expediente en la plataforma: Publicada. El plazo de ejecución publicado es de 3 meses y la validez de la oferta publicada es de 2 meses."
    },
    {
      test: /presupuesto|importe|euros|valor|precio|budget/,
      answer: "Presupuesto base de licitación sin impuestos: 50.696,26 EUR. Valor estimado del contrato: 50.696,26 EUR. El anuncio indica que no hay financiación con fondos de la UE."
    },
    {
      test: /alcance|incluye|mantenimiento|nube|incidencia|contenido|datos/,
      answer: "La descripción publicada dice que el contrato incluirá el mantenimiento correctivo, la gestión de incidencias, la revisión y adecuación de contenidos, y el despliegue y operación del servicio en infraestructura de nube pública segura, garantizando la continuidad del servicio y el cumplimiento de los requisitos de protección de datos. Este prototipo no añade funciones que el anuncio no describa."
    },
    {
      test: /criterio|adjudic|puntos|peso|ens|presencial/,
      answer: "El anuncio de licitación publica estos criterios objetivos y pesos: oferta económica, 60; certificaciones con proveedores de nube, 10; Esquema Nacional de Seguridad (categoría básica, media o alta), 10; compromiso de presencialidad mínima exigida en el PPT para reuniones excepcionales, 5. Este prototipo no interpreta la fórmula ni completa pesos que el anuncio no detalle."
    },
    {
      test: /contacto|correo|email|tel[eé]fono|fax/,
      answer: "El anuncio publica como contacto de la Viceconsejería de Justicia el correo jreyare@gobiernodecanarias.org y el teléfono +34 928117943 (fax +34 928307596). No consta en el anuncio un correo de empresa licitadora."
    },
    {
      test: /procedimiento|cpv|lugar|canarias|tipo/,
      answer: "Procedimiento abierto simplificado, tramitación ordinaria, contrato de servicios, CPV 72200000 (servicios de programación de software y de consultoría). Lugar de ejecución: España, Canarias."
    },
    {
      test: /subcontrat/,
      answer: "El anuncio exige, en la cláusula 14.1 del PCAP, indicar si se prevé subcontratar los servidores o los servicios asociados, y el nombre o el perfil empresarial de quienes harían el tratamiento de datos. Este prototipo no valora si una oferta cumple esa cláusula."
    },
    {
      test: /fuente|enlace|url|anuncio|donde|dónde/,
      answer: "Fuente: Plataforma de Contratación del Sector Público, anuncio publicado el 27/09/2026. Enlace: https://contrataciondelestado.es/wps/poc?uri=deeplink:detalle_licitacion&idEvl=HwVwWi7Qwge7JOCXkOhcDg%3D%3D"
    }
  ];

  var PERSONAL = /me pegan|me pega|mi pareja|mi marido|mi novio|tengo miedo|ayuda(me| me)?|socorro|maltrat|denuncia|me amenaza|violencia sobre|estoy en peligro|emergencia|no s[eé] qu[eé] hacer|v[ií]ctima soy|me ha|me han/;

  var log = document.getElementById("log");
  var form = document.getElementById("ask");
  var field = document.getElementById("q");

  function add(who, text, kind) {
    var item = document.createElement("div");
    item.className = "msg " + kind;
    var label = document.createElement("div");
    label.className = "who";
    label.textContent = who;
    var body = document.createElement("p");
    body.textContent = text;
    item.appendChild(label);
    item.appendChild(body);
    log.appendChild(item);
    log.scrollTop = log.scrollHeight;
  }

  function answer(question) {
    var q = question.trim();
    add("Consulta", q, "user");
    if (!q) {
      add("Prototipo", REFUSAL, "bot refuse");
      return;
    }
    if (PERSONAL.test(q.toLowerCase())) {
      add("Prototipo", REFUSAL, "bot refuse");
      return;
    }
    var lower = q.toLowerCase();
    for (var i = 0; i < FACTS.length; i++) {
      if (FACTS[i].test.test(lower)) {
        add("Prototipo", FACTS[i].answer, "bot");
        return;
      }
    }
    add("Prototipo", REFUSAL, "bot refuse");
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    answer(field.value);
    field.value = "";
  });

  Array.prototype.forEach.call(document.querySelectorAll("[data-q]"), function (button) {
    button.addEventListener("click", function () {
      answer(button.getAttribute("data-q"));
    });
  });

  add("Prototipo", "Puedo repetir solo datos del anuncio SER/2026/0000145362. No soy un sistema de la Viceconsejería ni un servicio de atención.", "bot");
})();
