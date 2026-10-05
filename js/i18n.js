window.Alfa = window.Alfa || {};

(function () {
  var DICT = {
    en: {
      "nav.skip": "Skip to content",
      "nav.experience": "Experience",
      "nav.projects": "Projects",
      "nav.contact": "Contact",
      "nav.brandLabel": "Back to top",

      "hero.role": "UI Platform Owner @ Donorbox",
      "hero.tagline": "I'm a frontend developer. I've been building things for the web for over 13 years, most of it in plain JavaScript.",
      "hero.impact": "These days I look after donorbox-components, the design system the Donorbox product is built with.",
      "hero.ctaExperience": "My experience",
      "hero.ctaContact": "Get in touch",

      "about.heading": "About",
      "about.body": "I'm Rafael, a frontend developer from Brazil. I've been working on the web for over a decade, most of it close to the browser. I care about how a product looks as much as how it works. At Donorbox I'm a platform owner rather than a manager in the usual sense: I set standards, build tooling, and still write the code myself. Outside work, I also make music.",
      "about.photoAlt": "Rafael Lopes working on a laptop, reading code in a terminal.",

      "experience.heading": "Experience",
      "experience.intro": "More than a decade in frontend, on quite different products. The constant is that I enjoy the details.",
      "experience.donorbox.years": "2020—Present",
      "experience.donorbox.role": "Senior Frontend Manager / UI Platform Owner",
      "experience.donorbox.body": "I look after donorbox-components end to end — architecture, component API, releases and the checks around them. I lead mostly by writing the reference implementation the product's frontend uses.",
      "experience.contabilizei.years": "2019—2020",
      "experience.contabilizei.role": "Frontend Developer",
      "experience.contabilizei.body": "Frontend work on an accounting product, inside an established codebase and delivery process.",
      "experience.heaven.years": "2013—2019",
      "experience.heaven.role": "Frontend Developer",
      "experience.heaven.body": "The longest stretch of my early career. I built web projects end to end and learned most of what I still use today.",

      "projects.heading": "Projects",
      "projects.intro": "A few things I've built outside of work, alongside donorbox-components.",
      "projects.item1.name": "Project name",
      "projects.item1.description": "One-line description of what it does and your role.",
      "projects.item1.linkLabel": "View project",
      "projects.item2.name": "Project name",
      "projects.item2.description": "One-line description of what it does and your role.",
      "projects.item2.linkLabel": "View project",
      "projects.item3.name": "Project name",
      "projects.item3.description": "One-line description of what it does and your role.",
      "projects.item3.linkLabel": "View project",

      "contact.heading": "Get in touch",
      "contact.body": "I'm always up for a conversation about frontend, design systems, or interfaces that have to last. Happy to trade notes on JavaScript, design, or anything creative too.",
      "contact.note": "LinkedIn is the quickest way to reach me. My code is on GitHub.",
      "contact.linkedinLabel": "Rafael Lopes on LinkedIn",
      "contact.githubLabel": "alfa-dev on GitHub"
    },
    pt: {
      "nav.skip": "Pular para o conteúdo",
      "nav.experience": "Experiência",
      "nav.projects": "Projetos",
      "nav.contact": "Contato",
      "nav.brandLabel": "Voltar ao topo",

      "hero.role": "UI Platform Owner @ Donorbox",
      "hero.tagline": "Sou desenvolvedor frontend. Faço coisas para a web há mais de 13 anos, a maior parte delas em JavaScript puro.",
      "hero.impact": "Hoje eu cuido do donorbox-components, o design system com que o produto da Donorbox é construído.",
      "hero.ctaExperience": "Minha experiência",
      "hero.ctaContact": "Falar comigo",

      "about.heading": "Sobre",
      "about.body": "Sou o Rafael, desenvolvedor frontend, do Brasil. Trabalho com web há mais de uma década, quase sempre bem perto do navegador. Me importo com a aparência de um produto tanto quanto com o funcionamento dele. Na Donorbox sou platform owner, não gestor no sentido comum: defino padrões, construo ferramentas e continuo escrevendo código. Fora do trabalho, também faço música.",
      "about.photoAlt": "Rafael Lopes trabalhando no notebook, lendo código em um terminal.",

      "experience.heading": "Experiência",
      "experience.intro": "Mais de uma década em frontend, em produtos bem diferentes. A constante é que eu gosto dos detalhes.",
      "experience.donorbox.years": "2020—atual",
      "experience.donorbox.role": "Senior Frontend Manager / UI Platform Owner",
      "experience.donorbox.body": "Cuido do donorbox-components de ponta a ponta — arquitetura, API dos componentes, releases e as verificações em volta deles. Lidero principalmente escrevendo a implementação de referência que o frontend do produto usa.",
      "experience.contabilizei.years": "2019—2020",
      "experience.contabilizei.role": "Desenvolvedor Frontend",
      "experience.contabilizei.body": "Trabalho de frontend em um produto de contabilidade, dentro de uma base de código e um processo de entrega já estabelecidos.",
      "experience.heaven.years": "2013—2019",
      "experience.heaven.role": "Desenvolvedor Frontend",
      "experience.heaven.body": "O período mais longo do começo da minha carreira. Construí projetos web de ponta a ponta e aprendi boa parte do que uso até hoje.",

      "projects.heading": "Projetos",
      "projects.intro": "Algumas coisas que fiz fora do trabalho, além do donorbox-components.",
      "projects.item1.name": "Nome do projeto",
      "projects.item1.description": "Descrição em uma linha do que faz e do seu papel nele.",
      "projects.item1.linkLabel": "Ver projeto",
      "projects.item2.name": "Nome do projeto",
      "projects.item2.description": "Descrição em uma linha do que faz e do seu papel nele.",
      "projects.item2.linkLabel": "Ver projeto",
      "projects.item3.name": "Nome do projeto",
      "projects.item3.description": "Descrição em uma linha do que faz e do seu papel nele.",
      "projects.item3.linkLabel": "Ver projeto",

      "contact.heading": "Falar comigo",
      "contact.body": "Estou sempre a fim de conversar sobre frontend, design systems ou interfaces que precisam durar. Também topo trocar ideia sobre JavaScript, design ou qualquer coisa criativa.",
      "contact.note": "O LinkedIn é o jeito mais rápido de me achar. Meu código fica no GitHub.",
      "contact.linkedinLabel": "Rafael Lopes no LinkedIn",
      "contact.githubLabel": "alfa-dev no GitHub"
    }
  };

  var STORAGE_KEY = "alfadev-lang";

  function applyLanguage(lang) {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var value = DICT[lang][key];
      if (value) el.textContent = value;
    });

    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      el.getAttribute("data-i18n-attr").split(",").forEach(function (pair) {
        var parts = pair.split(":");
        var attr = parts[0].trim();
        var key = parts[1].trim();
        var value = DICT[lang][key];
        if (value) el.setAttribute(attr, value);
      });
    });

    var toggle = document.getElementById("lang-toggle");
    if (toggle) {
      toggle.setAttribute("aria-pressed", lang === "pt" ? "true" : "false");
    }

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* localStorage unavailable, ignore */
    }

    window.Alfa.currentLang = lang;
    window.dispatchEvent(new CustomEvent("alfa:langchange", { detail: { lang: lang } }));
  }

  function initialLang() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "pt" || stored === "en") return stored;
    } catch (e) {
      /* ignore */
    }
    return navigator.language && navigator.language.startsWith("pt") ? "pt" : "en";
  }

  window.Alfa.t = function (key) {
    var lang = window.Alfa.currentLang || "en";
    return DICT[lang] ? DICT[lang][key] : undefined;
  };

  window.Alfa.i18n = {
    applyLanguage: applyLanguage,
    init: function () {
      applyLanguage(initialLang());
      var toggle = document.getElementById("lang-toggle");
      if (toggle) {
        toggle.addEventListener("click", function () {
          var nextLang = window.Alfa.currentLang === "pt" ? "en" : "pt";
          var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

          if (!reduceMotion && document.startViewTransition) {
            var transition = document.startViewTransition(function () { applyLanguage(nextLang); });
            transition.ready.catch(function () {});
            transition.finished.catch(function () {});
          } else {
            applyLanguage(nextLang);
          }
        });
      }
    }
  };
})();
