# MCPs e referências de design para LLMs

Curadoria a partir de anotações/tweets salvos (ago–set 2026), filtrada para o
que é relevante ao redesign do alfadev: MCPs e ferramentas que alimentam
LLMs (Claude Code, Cursor, v0, Codex) com contexto de design, e bibliotecas de
assets. Itens marcados **(não confirmado)** vieram de um handle sem acesso
direto ao tweet original — vale checar antes de depender deles.

## MCPs de design (uso direto em LLM)

### Refero Styles — styles.refero.design
Biblioteca com 2.000+ design systems "legíveis por IA", extraídos de sites de
produtos reais (Apple, Notion, Duolingo etc.): cores, tipografia, espaçamento,
componentes, e arquivos `DESIGN.md` prontos para colar no contexto de um
agente. Tem conexão via MCP para Cursor, Claude Code, v0, Lovable, ChatGPT.
Uso ideal: puxar um `DESIGN.md` de referência antes de pedir para o agente
gerar/ajustar uma seção do site.

### Mobbin MCP
Já disponível nesta sessão (`mcp__mobbin__search_flows`,
`search_screens`, `search_sections`). Busca telas, seções e fluxos reais de
apps/produtos por categoria/padrão de UI — útil para embasar decisões de
layout com exemplos reais em vez de inventar do zero.

### Hue — github.com/dominikmartn/hue
Skill open-source para Claude Code/Codex: aprende uma marca (a partir de URL,
nome ou screenshot) e converte em um design system completo — tokens de cor,
tipografia, espaçamento, componentes, modo claro/escuro, receitas de hero,
kit de ícones. Instala uma vez e toda UI gerada pelo agente passa a seguir a
marca. Instalação: `git clone https://github.com/dominikmartn/hue ~/.claude/skills/hue`.

### nothing-design-skill — github.com/dominikmartn/nothing-design-skill
Skill de Claude Code para gerar UI na linguagem visual da Nothing (monocromo,
tipográfico, industrial). Referência de skill "opinativa" de marca única —
modelo para eventualmente empacotar a linguagem visual do alfadev do mesmo
jeito.

### styleseed — github.com/bitjaru/styleseed
Motor de "design method" open-source (MIT) para Claude Code/Codex/Cursor: 23
skills de agente cobrindo julgamento de design fixo, múltiplas gramáticas
visuais, paletas semânticas, compilação de referências e verificação de UI
por evidência.

### awesome-design-skills — github.com/bergside/awesome-design-skills
Lista curada com 67 arquivos `DESIGN.md`/`SKILL.md` para ferramentas
agenticas (Claude Design, Google Stitch, Codex, Cursor). Bom ponto de partida
para varrer e escolher skills prontas em vez de escrever do zero.

### 63 design skills para Claude Code (Marie Claire Dean, via @AdhamDannaway)
Pacote de skills/comandos/plugins agenticos cobrindo o processo de design
completo — pesquisa, sistemas, UI, interação, entrega. Foco: "ensinar a IA o
que designers sabem para ela trabalhar com a gente, não por cima da gente".

### Jiro — jiro.build (via @csaba_kissi)
Biblioteca de prompts de design prontos para "vibe coding" — templates de UI
com prompts prontos para IA, pensados para economizar tempo em telas comuns.

## Assets / bibliotecas (sem MCP, mas úteis como fonte)

### Kitbitz — kitbitz.art
2.000+ ilustrações desenhadas à mão, gratuitas, estilo orgânico/sketch — bom
para contrastar com o visual mais técnico/3D do alfadev se algum momento
pedir um toque humano.

### Backgrounds Supply (kail_designs)
Coleção paga com 1.167+ backgrounds em gradiente e visuais gerados por IA.

### ascii-magic.com v2 (via kail_designs)
Gerador de arte ASCII — possível referência para o motivo "glyph" já em uso
no site (ver [[project_alfadev_creative_direction]]).

### 400 Free Design Resources — github.com/noahelhadedy/400-free-design-resources
Lista com 400+ recursos gratuitos (fontes, ícones, ilustrações, mockups, UI
kits, color tools), organizada em 30 categorias, também em CSV.

### FossFLOW (via @rammcodes)
Ferramenta open-source para diagramas isométricos 3D de arquitetura de
software — não é para o site em si, mas útil se algum dia precisar
documentar a arquitetura do projeto visualmente.

## Stack de ferramentas de IA para design (via @viktoroddy) **(não confirmado)**
Lista pessoal do autor, sem MCP envolvido — vale como inspiração de pipeline,
não como ferramenta a integrar:
- Site → Google AI Studio
- Logo → ChatGPT
- Web app → Lovable
- Prompts → motionsites.ai
- Vídeo → Higgsfield
- Build final → Claude

## ElevenLabs "X to Voice" **(não confirmado)**
App open-source que gera uma voz única a partir de um perfil do X, via Voice
Design API da ElevenLabs. Fora de escopo para o redesign visual, mas fica
registrado caso o site ganhe alguma camada de voz/áudio no futuro.

## Não recuperados
Os tweets de @bintukhalib38, @imranuxi, @neropursue, @ConjureSenun e
@r1VeN2k (2 posts) não puderam ser lidos diretamente (x.com bloqueou o
fetch) nem localizados por busca. Se ainda forem relevantes, cole aqui o
texto/screenshot do tweet para eu incorporar.
