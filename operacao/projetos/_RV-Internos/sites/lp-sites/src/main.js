/* ==========================================================================
   LP Sites — Real Vision 360
   Toda configuração vive nas constantes abaixo. Nenhuma chave sensível aqui.
   ========================================================================== */

/* WhatsApp de contato da Real Vision. Se ficar vazio (""), os botões de
   WhatsApp não renderizam. Nunca apontam pra "#". */
const WHATSAPP_NUMERO = "5511912931924";

const WHATSAPP_TEXTOS = {
  nav: "Olá! Vim pela página de sites da Real Vision e quero falar sobre um site pro meu negócio.",
  hero: "Olá! Quero o diagnóstico gratuito do meu site.",
  form: "Olá! Vim pela página de sites da Real Vision e prefiro falar por aqui.",
  sticky: "Olá! Vim pela página de sites da Real Vision e quero falar sobre um site pro meu negócio.",
};

/* Endpoint da Edge Function de captura de lead (Supabase).
   Enquanto estiver vazio (""), o formulário monta uma mensagem de WhatsApp
   com os dados preenchidos, em vez de falhar em silêncio.
   ATENÇÃO: o CORS da função é travado por domínio. Trocar o domínio desta
   página sem atualizar a lista de origens quebra o envio sem aviso. */
const LEAD_ENDPOINT = "";

/* Tag da campanha gravada junto com o lead. */
const LEAD_TAG = "lp-sites";

/* PostHog cookieless. Sem token, não inicializa e a página funciona igual. */
const POSTHOG_TOKEN = import.meta.env?.VITE_POSTHOG_PROJECT_TOKEN || "";
const POSTHOG_HOST = import.meta.env?.VITE_POSTHOG_HOST || "https://us.i.posthog.com";

/* ------------------------------------------------------------- analytics -- */

let track = () => {};

async function initAnalytics() {
  if (!POSTHOG_TOKEN) return;
  try {
    const { default: posthog } = await import("posthog-js");
    posthog.init(POSTHOG_TOKEN, {
      api_host: POSTHOG_HOST,
      persistence: "memory", // sem cookie, sem localStorage, sem banner de consentimento
      capture_pageview: true,
    });
    track = (evento, props) => posthog.capture(evento, props);
  } catch (e) {
    console.warn("PostHog não inicializado:", e);
  }
}

/* -------------------------------------------------------------- whatsapp -- */

function linkWhatsApp(texto) {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`;
}

function montarBotoesWhatsApp() {
  const botoes = document.querySelectorAll(".js-wa");

  if (!WHATSAPP_NUMERO) {
    // Degradação sem link morto: some com o botão em vez de apontar pra "#"
    botoes.forEach((b) => b.remove());
    return;
  }

  botoes.forEach((botao) => {
    const origem = botao.dataset.wa || "nav";
    botao.href = linkWhatsApp(WHATSAPP_TEXTOS[origem] || WHATSAPP_TEXTOS.nav);
    botao.target = "_blank";
    botao.rel = "noopener noreferrer";
    botao.addEventListener("click", () => track("whatsapp_click", { origem }));
  });
}

/* ------------------------------------------------------------ formulário -- */

function montarFormulario() {
  const form = document.getElementById("form-lead");
  const status = document.getElementById("form-status");
  if (!form || !status) return;

  const dizer = (texto, classe) => {
    status.textContent = texto;
    status.className = `form__status ${classe}`;
  };

  form.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const dados = Object.fromEntries(new FormData(form).entries());

    if (dados.botcheck) return; // honeypot preenchido, é bot
    if (!form.reportValidity()) return;

    const payload = {
      nome: dados.nome,
      negocio: dados.negocio,
      email: dados.email,
      whatsapp: dados.whatsapp,
      tem_site: dados.tem_site,
      mensagem: dados.mensagem,
      consentimento: dados.consentimento === "on",
      tag: LEAD_TAG,
      botcheck: "",
    };

    track("form_submit", { tem_site: payload.tem_site, optin: payload.consentimento });

    // Sem endpoint configurado: manda pelo WhatsApp com os dados preenchidos.
    if (!LEAD_ENDPOINT) {
      if (!WHATSAPP_NUMERO) {
        dizer("Envio indisponível no momento. Escreva para realvisionmaps360@gmail.com.", "is-err");
        return;
      }
      const resumo = [
        "Pedido de diagnóstico gratuito (página de sites)",
        `Nome: ${payload.nome}`,
        `Negócio: ${payload.negocio}`,
        `Email: ${payload.email}`,
        `WhatsApp: ${payload.whatsapp}`,
        `Já tem site: ${payload.tem_site}`,
        "",
        payload.mensagem,
      ].join("\n");
      window.open(linkWhatsApp(resumo), "_blank", "noopener");
      dizer("Abrimos o WhatsApp com seus dados. É só enviar a mensagem.", "is-ok");
      return;
    }

    const botao = form.querySelector('button[type="submit"]');
    botao.disabled = true;
    dizer("Enviando...", "");

    try {
      const resposta = await fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);

      form.reset();
      dizer("Recebido. Respondo em até um dia útil pelo WhatsApp ou email.", "is-ok");
      if (payload.consentimento) track("newsletter_optin", { origem: "lp-sites" });
    } catch (erro) {
      console.error(erro);
      dizer("Não consegui enviar agora. Me chama no WhatsApp que resolvo na hora.", "is-err");
    } finally {
      botao.disabled = false;
    }
  });
}

/* ------------------------------------------------------------------ FAQ --- */

function montarFaq() {
  document.querySelectorAll(".faq details").forEach((item) => {
    item.addEventListener("toggle", () => {
      if (item.open) track("faq_open", { pergunta: item.querySelector("summary")?.textContent?.trim() });
    });
  });
}

/* ------------------------------------------------------------------ init -- */

initAnalytics();
montarBotoesWhatsApp();
montarFormulario();
montarFaq();
