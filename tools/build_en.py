#!/usr/bin/env python3
"""Generate the English page (en/index.html) from the Portuguese source (index.html).

index.html is the single source of truth. Every translatable element carries one of:
  data-i18n="key"       -> text content replaced
  data-i18n-html="key"  -> inner HTML replaced
  data-i18n-aria="key"  -> aria-label replaced
  data-i18n-ph="key"    -> placeholder replaced
with the English strings in i18n/en.json. Run after any change to index.html:

    python3 tools/build_en.py
"""
import html
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "index.html"
OUT = ROOT / "en" / "index.html"
EN = json.loads((ROOT / "i18n" / "en.json").read_text(encoding="utf-8"))

SITE = "https://alfadev.com.br/"

HEAD = {
    "title": "Alfa Dev · Custom software, mobile apps and AI applied to your business",
    "description": "Custom software: web systems, mobile apps, embedded solutions, automations, applied artificial intelligence (AI), brand activation games for trade shows and events, and payment integrations (Pix, cards, bank slips) for small businesses and complex operations. Working remotely with clients in Brazil and worldwide.",
    "og_title": "Alfa Dev · Custom software, built to last",
    "og_description": "From small businesses to complex operations: custom web systems, mobile apps, embedded solutions, automations, applied AI, event games and payment integrations.",
}

# Portuguese strings inside the JSON-LD blocks -> English
LD = {
    "Agência de software especializada em sistemas web, aplicativos, sistemas embarcados, automação de processos e integração de pagamentos, com infraestrutura em nuvem e IA aplicada quando faz sentido. Atendimento remoto para pequenos negócios e operações complexas no Brasil e no exterior.":
        "Software agency specialized in web systems, mobile apps, embedded systems, process automation and payment integrations, with cloud infrastructure and AI applied where it makes sense. Working remotely with small businesses and complex operations in Brazil and worldwide.",
    "Brasil": "Brazil",
    "Mundo": "Worldwide",
    "Chatbots e agentes de IA para atendimento": "AI chatbots and agents for customer service",
    "Leitura e extração de dados de documentos com IA": "AI document reading and data extraction",
    "Testes A/B, landing pages e SEO técnico": "A/B testing, landing pages and technical SEO",
    "Agentes de IA": "AI agents",
    "Modelos de linguagem (LLM)": "Large language models (LLM)",
    "Testes A/B": "A/B testing",
    "Jogos interativos para ativação de marca em feiras, exposições e eventos": "Interactive brand activation games for trade shows, exhibitions and events",
    "Jogos para ativação de marca": "Brand activation games",
    "Totens interativos para eventos": "Interactive event kiosks",
    "Captação de leads em feiras": "Trade show lead capture",
    "SEO técnico": "Technical SEO",
    "Serviços": "Services",
    "Desenvolvimento de sistemas web sob medida": "Custom web system development",
    "Integração de inteligência artificial": "Artificial intelligence integration",
    "Desenvolvimento de aplicativos iOS e Android": "iOS and Android app development",
    "Sistemas embarcados e IoT": "Embedded systems and IoT",
    "Integração de pagamentos: Pix, cartão, boleto e assinaturas": "Payment integrations: Pix, cards, bank slips and subscriptions",
    "Infraestrutura em nuvem, filas e aplicações em tempo real": "Cloud infrastructure, queues and real-time applications",
    "Automação de tarefas e processos": "Task and process automation",
    "Desenvolvimento de software sob medida": "Custom software development",
    "Sistemas web": "Web systems",
    "Aplicativos iOS e Android": "iOS and Android apps",
    "Automação de processos": "Process automation",
    "Integração de pagamentos": "Payment integrations",
    "Pagamentos recorrentes": "Recurring payments",
    "Computação em nuvem": "Cloud computing",
    "Aplicações em tempo real": "Real-time applications",
    "Filas e mensageria": "Queues and messaging",
    "Armazenamento de dados": "Data storage",
    "APIs e integrações": "APIs and integrations",
    "Autenticação": "Authentication",
    "Inteligência artificial aplicada": "Applied artificial intelligence",
}


def fail(msg):
    sys.exit("build_en: " + msg)


def tr(key):
    if key not in EN:
        fail(f"missing English string for '{key}' in i18n/en.json")
    return EN[key]


def swap_inner(s, attr, render):
    """Replace the inner content of every element carrying attr="key"."""
    pat = re.compile(r'(<(\w+)\b[^>]*\b' + attr + r'="([^"]+)"[^>]*>)(.*?)(</\2>)', re.S)
    return pat.sub(lambda m: m.group(1) + render(m.group(3)) + m.group(5), s)


def swap_attr(s, marker, target):
    """Replace target="..." on every tag that carries marker="key"."""
    def fix(m):
        tag, key = m.group(0), m.group(1)
        val = html.escape(tr(key), quote=True)
        if re.search(r'\b' + target + r'="', tag):
            return re.sub(r'\b' + target + r'="[^"]*"', f'{target}="{val}"', tag)
        return tag[:-1] + f' {target}="{val}">'
    return re.sub(r'<[^>]*\b' + marker + r'="([^"]+)"[^>]*>', fix, s)


def main():
    s = SRC.read_text(encoding="utf-8")

    # content
    s = swap_inner(s, "data-i18n", lambda k: html.escape(tr(k), quote=False))
    s = swap_inner(s, "data-i18n-html", tr)
    s = swap_attr(s, "data-i18n-aria", "aria-label")
    s = swap_attr(s, "data-i18n-ph", "placeholder")

    # document language + head
    s = s.replace('<html lang="pt-BR">', '<html lang="en">', 1)
    s = re.sub(r"<title>.*?</title>", f"<title>{HEAD['title']}</title>", s, count=1)
    s = re.sub(r'(<meta name="description" content=")[^"]*', r"\g<1>" + HEAD["description"], s, count=1)
    s = s.replace(f'<link rel="canonical" href="{SITE}">', f'<link rel="canonical" href="{SITE}en/">', 1)
    s = re.sub(r'(<meta property="og:title" content=")[^"]*', r"\g<1>" + HEAD["og_title"], s, count=1)
    s = re.sub(r'(<meta name="twitter:title" content=")[^"]*', r"\g<1>" + HEAD["og_title"], s, count=1)
    s = re.sub(r'(<meta property="og:description" content=")[^"]*', r"\g<1>" + HEAD["og_description"], s, count=1)
    s = re.sub(r'(<meta name="twitter:description" content=")[^"]*', r"\g<1>" + HEAD["og_description"], s, count=1)
    s = s.replace(f'<meta property="og:url" content="{SITE}">', f'<meta property="og:url" content="{SITE}en/">', 1)
    s = s.replace('<meta property="og:locale" content="pt_BR">\n<meta property="og:locale:alternate" content="en_US">',
                  '<meta property="og:locale" content="en_US">\n<meta property="og:locale:alternate" content="pt_BR">', 1)
    s = s.replace('<a class="skip" href="#conteudo">Pular para o conteúdo</a>', '<a class="skip" href="#conteudo">Skip to content</a>', 1)

    # structured data
    def ld(m):
        data = json.loads(m.group(2))
        if data.get("@type") == "FAQPage":
            data["mainEntity"] = [
                {"@type": "Question", "name": tr(f"faq.q{i}"),
                 "acceptedAnswer": {"@type": "Answer", "text": tr(f"faq.a{i}")}}
                for i in faq_order(s)
            ]
        else:
            data = json.loads(translate_ld(json.dumps(data, ensure_ascii=False)))
            data["knowsLanguage"] = ["en", "pt-BR"]
        return m.group(1) + json.dumps(data, ensure_ascii=False, indent=2) + m.group(3)
    s = re.sub(r'(<script type="application/ld\+json">)\s*(.*?)\s*(</script>)', ld, s, flags=re.S)

    # one level deeper: relative paths and the language switcher
    s = s.replace('src="assets/', 'src="../assets/').replace('href="assets/', 'href="../assets/')
    s = s.replace('href="demos/', 'href="../demos/')
    s = s.replace('<a href="./" hreflang="pt-BR" lang="pt-BR" aria-current="page">PT</a>',
                  '<a href="../" hreflang="pt-BR" lang="pt-BR">PT</a>', 1)
    s = s.replace('<a href="en/" hreflang="en" lang="en">EN</a>',
                  '<a href="./" hreflang="en" lang="en" aria-current="page">EN</a>', 1)

    # sanity: nothing Portuguese-only left in the obvious places
    for needle in ['lang="pt-BR">\n<head>', 'Pular para o conteúdo']:
        if needle in s:
            fail(f"leftover Portuguese marker: {needle!r}")

    OUT.parent.mkdir(exist_ok=True)
    OUT.write_text(s, encoding="utf-8")
    print(f"build_en: wrote {OUT.relative_to(ROOT)} ({len(s) // 1024} KB)")


def faq_order(s):
    return [int(n) for n in re.findall(r'data-i18n="faq\.q(\d+)"', s)]


def translate_ld(text):
    for pt, en in sorted(LD.items(), key=lambda kv: -len(kv[0])):
        text = text.replace(json.dumps(pt, ensure_ascii=False), json.dumps(en, ensure_ascii=False))
    return text


if __name__ == "__main__":
    main()
