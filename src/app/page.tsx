"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState, useSyncExternalStore } from "react";
import { DEFAULT_BOOKING_PATH, getBookingCtaHref } from "../lib/booking";

export const CONTACT_EMAIL = "contato@10xai.us";
export const DEFAULT_BOOKING_URL = DEFAULT_BOOKING_PATH;
export const languages = [
  { code: "en", label: "EN" },
  { code: "pt", label: "PT-BR" },
  { code: "es", label: "ES" },
] as const;
type Language = (typeof languages)[number]["code"];
export const localeByLanguage = {
  en: "en-US",
  pt: "pt-BR",
  es: "es-419",
} as const;

export const siteCopy = {
  en: {
    nav: ["Why 10XAI", "Systems", "Markets", "ROI", "FAQ", "Contact"],
    headerCta: "Schedule a Call",
    heroEyebrow: "For SMBs in Latin America, the United States, and Canada",
    heroTitle: "Make your company feel faster where customers and teams notice first.",
    heroBody: "10XAI designs and launches AI operating systems for onboarding, sales, marketing, service, booking, and bid qualification so ambitious SMBs stop discussing AI in theory and start operating like the sharper version of themselves.",
    heroPills: ["Implementation, rollout, and adoption", "Built for founder-led and operator-led teams", "Fast visible wins without enterprise drag"],
    primaryCta: "Schedule a call",
    secondaryCta: "Choose your first system",
    promiseLabel: "What changes first",
    promise: "Start with the workflow creating the most drag today, then turn it into a practical system your team can use every day.",
    visualLabel: "Corporate vision made operational",
    visualTag: "Nike x Apple energy",
    visualItems: ["The onboarding academy your team has wanted for years, finally live", "A sales operating system that tells reps what to do next and writes the follow-up", "A marketing and service layer that makes the company feel sharper immediately"],
    visualNote: "Small teams do not need more AI noise. They need the first operating system that changes how buyers, employees, and managers experience the company.",
    signals: [["1 priority", "Focus first on the workflow creating the most visible drag."], ["2-4 weeks", "Typical window for the first visible workflow improvement."], ["1 aligned team", "Launch faster when the owner and the team using the workflow are aligned."]],
    differenceEyebrow: "Why 10XAI",
    differenceTitle: "The companies that operationalize first do not just save time. They change how the market experiences them.",
    differenceBody: "Faster follow-up feels like better service. Better prep feels like stronger leadership. Consistent campaigns feel like a bigger company.",
    differenceItems: [["Business systems, not AI theater", "We design the exact operational layer the company has been postponing and make it work in the real day-to-day business."], ["Built for SMB speed", "The buyer is usually not missing tools. They are missing clarity, rollout discipline, and a partner who can move at the speed of a small or mid-sized business."], ["Adoption is part of delivery", "A workflow is only valuable when the team actually uses it. 10XAI bakes rollout, enablement, and practical team behavior into the engagement."]],
    systemsEyebrow: "Use-case storytelling",
    systemsTitle: "Show buyers the system they should stop postponing.",
    systemsBody: "Choose the workflow that will create the clearest operational win first.",
    systemsCta: "Talk to us about this system",
    systems: [
      { name: "LMS onboarding and training system", audience: "HR, enablement, operations", trigger: "Training is repeated manually and knowledge lives across folders, decks, and people.", story: "Turn SOPs, onboarding notes, videos, and manager explanations into a structured learning engine.", outcome: "New hires ramp faster and the business finally operates with a real onboarding academy.", urgency: "Every delayed month keeps expensive managers trapped in repeated explanations.", bullets: ["Role-based learning journeys", "AI summaries and reinforcement", "A cleaner LMS experience"] },
      { name: "AI sales playbook plus operating CRM", audience: "Founders, sales leaders, revenue teams", trigger: "The CRM records activity, but it does not guide the next best action.", story: "Build a commercial operating system with next-best actions, AI prep, cleaner account context, and faster follow-up.", outcome: "Reps work with more confidence and the pipeline becomes cleaner and faster.", urgency: "Weak follow-up and messy pipeline behavior compound quietly into lost revenue.", bullets: ["Playbook aligned to your real motion", "AI recommendations for meetings", "Export-ready follow-up drafts"] },
      { name: "Marketing automation with autonomous agents", audience: "Marketing teams, founders, growth leaders", trigger: "The brand needs more consistent execution, but campaigns still depend on too much manual coordination.", story: "Build a marketing operating layer that plans calendars, drafts copy, generates media, and publishes across channels.", outcome: "The brand shows up with more discipline and the company looks bigger and sharper in the market.", urgency: "When competitors publish with more consistency, they borrow attention and trust that should have been yours.", bullets: ["Content maps and campaign cadences", "AI-generated media assets", "Approvals and automated publishing"] },
      { name: "RFP intelligence and bid qualification agent", audience: "B2B teams, tenders, enterprise sellers", trigger: "The team spends too much time interpreting RFPs manually and chasing poor-fit opportunities.", story: "Compare requirements against your offer, score alignment, and sharpen the narrative before resources get burned.", outcome: "Your team qualifies faster and becomes more strategic about where to compete.", urgency: "The later the team realizes the fit is weak, the more time, morale, and margin disappear into the wrong opportunities.", bullets: ["Fit scoring", "Gap analysis", "Bid / no-bid recommendations"] },
      { name: "Automated booking and customer service", audience: "Service businesses, healthcare operators, front-desk teams", trigger: "Revenue slips between inquiries, booking, reminders, cancellations, and repetitive service questions.", story: "Build a customer-facing booking and service layer that keeps schedules full and reduces front-desk overload.", outcome: "More appointments get booked and the staff can focus on customers instead of repetitive coordination work.", urgency: "Slow booking and weak reminder systems create visible revenue leakage and a weaker customer experience.", bullets: ["Booking and reminders", "Customer FAQ support", "Operational workflows for the front desk"] }
    ],
    marketsEyebrow: "Audience fit",
    marketsTitle: "Built for ambitious SMBs across Brazil, the US, Canada, and high-opportunity Latin American markets.",
    marketsBody: "10XAI is strongest for founder-led and operator-led companies already feeling drag in onboarding, sales, marketing, service, or booking.",
    markets: [["Brazil", "Founder-led and operator-led SMBs that need faster sales follow-up, cleaner onboarding, and more scalable service execution."], ["United States", "Lean companies that care about measurable leverage, revenue discipline, and practical AI systems that go live."], ["Canada + Spanish-speaking LATAM", "Structured, growth-minded teams that want better follow-through and stronger operating maturity."]],
    fit: [["Best fit", ["15 to 500 employees", "Founder-led or operator-led teams", "Visible friction in sales, onboarding, marketing, service, or booking"]], ["What they usually want", ["A first system that changes how the company feels within weeks", "Implementation plus rollout", "Business outcomes leadership can explain clearly"]], ["Not the right fit", ["Generic AI education only", "No internal owner for rollout", "Committee-heavy projects where speed does not matter"]]],
    exampleEyebrow: "Regional examples",
    exampleTitle: "Show real small and mid-sized businesses the market already understands.",
    exampleBody: "These public companies help the buyer see the kind of team 10XAI is built for. The goal is market clarity, not inflated client signaling.",
    exampleDisclaimer: "These companies are shown as market-fit examples based on their public positioning. They are not presented as current 10XAI clients.",
    exampleCompanies: [
      { name: "Dental Depot", region: "United States", niche: "Multi-location dental group", reason: "Doctor-owned dental offices across Oklahoma and nearby communities make this a strong fit for booking, reminders, and front-desk AI.", url: "https://dentaldepot.net/" },
      { name: "The Small Marketing Agency", region: "United States", niche: "Small marketing and PR firm", reason: "Built around startups and the SMB market, which makes it a natural fit for campaign operations, lead handling, and content workflows.", url: "https://www.smallmarketingagency.com/" },
      { name: "Contsimples", region: "Brazil", niche: "Online accounting office", reason: "Its platform-led model for MEIs and Simples Nacional companies is a strong fit for onboarding, document ops, and service automation.", url: "https://www.contsimples.com.br/" },
      { name: "Contabiliza Brasil", region: "Brazil", niche: "Accounting and advisory office", reason: "A service-heavy firm combining technology with personalized support, ideal for back-office automation and faster client response.", url: "https://contabilizabrasil.com.br/" },
      { name: "PyeM Mensajeria y Paqueteria", region: "Mexico", niche: "Logistics SMB", reason: "Its tailored shipping operation and client platform make it a strong fit for operational dashboards, exception handling, and service workflows.", url: "https://www.pyem.com.mx/" },
      { name: "MIMARCA", region: "Colombia", niche: "Brand strategy and marketing studio for PYMES", reason: "Its focus on PYMES across Colombia and other markets makes it a natural fit for marketing automation, lead routing, and proposal workflows.", url: "https://mimarca.com.co/nosotros/" }
    ],
    companyCta: "Visit company site",
    reviewEyebrow: "Customer outcomes",
    reviewTitle: "What buyers want to improve first.",
    reviewBody: "The strongest conversations usually begin with one workflow that is slowing the team down or weakening the customer experience.",
    reviewDisclaimer: "Verified public client reviews can be added here as they become available.",
    reviewLabel: "Priority outcome",
    reviewStatus: "Common request",
    reviewCards: [
      { region: "United States", title: "Sales or operations buyer", outcome: "Highlight faster follow-up, cleaner CRM behavior, and clearer next steps for a lean team." },
      { region: "Brazil", title: "Founder or operator", outcome: "Highlight less onboarding chaos, faster service response, and one operating rhythm for the team." },
      { region: "Spanish-speaking LATAM", title: "Growth or service leader", outcome: "Highlight sharper execution, faster coordination, and a better client experience without enterprise overhead." }
    ],
    roiEyebrow: "Business impact",
    roiTitle: "Turn urgency into economics and economics into a booked call.",
    roiBody: "Help the buyer quantify the drag they already feel so the first system becomes easier to justify internally.",
    roiLabels: ["People doing the work", "Repetitive hours per person per week", "Blended hourly cost", "Automatable share", "Monthly value recovered", "90-day business impact", "Estimated payback", "Recommended first system"],
    paybackUnit: "wks",
    faqEyebrow: "FAQ",
    faqTitle: "The objections worth answering before the meeting",
    faq: [["How fast can the first system go live?", "Most qualified projects can produce a visible workflow shift in 2 to 4 weeks. Broader rollouts often land over 30 to 90 days."], ["Do we need to replace our current tools?", "Usually no. The fastest wins often come from making your existing stack smarter, more connected, and easier to operate."], ["Is this only for larger companies?", "No. The strongest fit is often a small or mid-sized business that already feels process pain and wants implementation instead of another strategy deck."], ["Why should we book now?", "Because delay is not neutral. Slow onboarding, weak follow-up, fragmented marketing, missed bids, and manual service drag keep compounding until they become the way the market experiences the company."]],
    contactEyebrow: "Next step",
    contactTitle: "Tell us which workflow is slowing the business down most right now.",
    contactBody: "We will focus the first conversation on the process creating the clearest operational and customer-facing friction.",
    contactActions: ["Open calendar", "Send email", "Write on WhatsApp"],
    contactNote: "If possible, include the person who owns the workflow and the person who uses it every day.",
    formTitle: "Send a qualified brief",
    formBody: "Tell us which business system your company should stop postponing and we will shape the first conversation around that operating problem.",
    formLabels: ["Name", "Company", "Work email", "Which business system should your company stop postponing?", "Prepare email draft"],
    footerLine: "10XAI builds business-oriented AI operating systems for fast-moving SMBs.",
    footerRegion: "Sao Paulo + Miami",
    mobileActions: ["Book call", "Email"]
  },
  pt: {
    nav: ["Por que 10XAI", "Sistemas", "Mercados", "ROI", "FAQ", "Contato"],
    headerCta: "Agendar Chamada",
    heroEyebrow: "Para PMEs da America Latina, Estados Unidos e Canada",
    heroTitle: "Faca sua empresa parecer mais rapida onde clientes e equipes percebem primeiro.",
    heroBody: "A 10XAI desenha e implementa sistemas operacionais de IA para onboarding, vendas, marketing, atendimento, agendamento e qualificacao de propostas para que PMEs ambiciosas deixem a transformacao na teoria e passem a operar como a versao mais forte de si mesmas.",
    heroPills: ["Implementacao, rollout e adocao", "Feito para empresas lideradas por fundadores e operadores", "Ganhos visiveis rapidamente sem peso corporativo"],
    primaryCta: "Agendar chamada",
    secondaryCta: "Escolher o primeiro sistema",
    promiseLabel: "O que muda primeiro",
    promise: "Comece pelo fluxo que gera mais atrito hoje e transforme isso em um sistema pratico que o time consiga usar todos os dias.",
    visualLabel: "Visao corporativa colocada em operacao",
    visualTag: "Energia Nike x Apple",
    visualItems: ["A academia de onboarding que sua equipe queria ha anos, finalmente no ar", "Um sistema comercial que diz ao vendedor o que fazer em seguida e ainda escreve o follow-up", "Uma camada de marketing e atendimento que deixa a empresa mais forte imediatamente"],
    visualNote: "Pequenas equipes nao precisam de mais barulho sobre IA. Precisam do primeiro sistema operacional que muda como clientes, colaboradores e gestores vivenciam a empresa.",
    signals: [["1 prioridade", "Comece pelo fluxo que gera o atrito mais visivel."], ["2-4 semanas", "Janela tipica para a primeira melhoria visivel no fluxo."], ["1 time alinhado", "A implantacao anda mais rapido quando owner e equipe estao alinhados."]],
    differenceEyebrow: "Por que 10XAI",
    differenceTitle: "As empresas que operacionalizam primeiro nao apenas economizam tempo. Elas mudam como o mercado as percebe.",
    differenceBody: "Um follow-up mais rapido parece melhor atendimento. Um preparo melhor parece lideranca mais forte. Campanhas consistentes fazem a empresa parecer maior.",
    differenceItems: [["Sistemas de negocio, nao teatro de IA", "A 10XAI nao vende ideias abstratas de automacao. Ela desenha a camada operacional que a empresa vinha adiando e coloca isso para funcionar no dia a dia."], ["Feita para a velocidade da PME", "O comprador geralmente nao precisa de mais ferramentas. Precisa de clareza, disciplina de rollout e um parceiro que ande no ritmo de uma empresa pequena ou media."], ["Adocao faz parte da entrega", "Um fluxo so gera valor quando o time realmente usa. A 10XAI inclui rollout, enablement e comportamento operacional na entrega."]],
    systemsEyebrow: "Storytelling por caso de uso",
    systemsTitle: "Mostre o sistema que o comprador precisa parar de adiar.",
    systemsBody: "Escolha o fluxo que pode gerar o ganho operacional mais claro primeiro.",
    systemsCta: "Falar com a 10XAI sobre este sistema",
    systems: [
      { name: "Sistema de onboarding e treinamento em LMS", audience: "RH, enablement, operacoes", trigger: "O treinamento ainda e repetido manualmente e o conhecimento vive em pastas, decks e pessoas.", story: "Transforme SOPs, materiais de onboarding, videos e explicacoes de gestores em um motor estruturado de aprendizado.", outcome: "Novos colaboradores rampam mais rapido e a empresa finalmente opera com uma academia real de onboarding.", urgency: "Cada mes de atraso mantem lideres caros presos em explicacoes repetidas.", bullets: ["Jornadas por funcao", "Resumos e reforco com IA", "Experiencia de LMS mais clara"] },
      { name: "Playbook comercial com CRM operacional e IA", audience: "Fundadores, lideres de vendas, times de receita", trigger: "O CRM registra atividade, mas nao orienta a proxima melhor acao.", story: "Construa um sistema comercial com proximos passos, preparo com IA, contexto mais limpo de contas e follow-up mais rapido.", outcome: "O time vende com mais confianca e o pipeline ganha mais disciplina.", urgency: "Follow-up fraco e pipeline desorganizado se acumulam em perda de receita.", bullets: ["Playbook alinhado ao motion real", "Recomendacoes de IA para reunioes", "Rascunhos de follow-up prontos"] },
      { name: "Automacao de marketing com agentes autonomos", audience: "Marketing, fundadores, growth", trigger: "A marca precisa de execucao mais consistente, mas as campanhas ainda dependem de muita coordenacao manual.", story: "Crie uma camada operacional de marketing que planeja calendarios, escreve copy, gera midia e publica em varios canais.", outcome: "A marca aparece com mais disciplina e a empresa passa a parecer maior e mais preparada no mercado.", urgency: "Quando concorrentes publicam com mais consistencia, eles capturam atencao e confianca que poderiam ser suas.", bullets: ["Mapas de conteudo e cadencias", "Ativos de midia gerados por IA", "Aprovacoes e publicacao automatizada"] },
      { name: "Agente de inteligencia para RFP e qualificacao de propostas", audience: "Times B2B, licitacoes, vendas enterprise", trigger: "O time gasta tempo demais interpretando RFPs manualmente e perseguindo oportunidades ruins.", story: "Compare requisitos com a oferta, pontue aderencia e fortalece a narrativa antes de gastar recursos.", outcome: "O time qualifica mais rapido e se torna mais estrategico sobre onde competir.", urgency: "Quanto mais tarde a equipe percebe que o fit e fraco, mais tempo, moral e margem desaparecem nas oportunidades erradas.", bullets: ["Pontuacao de aderencia", "Analise de gaps", "Recomendacao de seguir ou nao"] },
      { name: "Agendamento automatizado e atendimento", audience: "Empresas de servicos, operadores de saude, recepcao", trigger: "A receita escapa entre contatos, agendamentos, lembretes, cancelamentos e perguntas repetitivas.", story: "Crie uma camada de agendamento e atendimento que mantem a agenda cheia e reduz a sobrecarga da recepcao.", outcome: "Mais agendamentos acontecem e a equipe foca em clientes em vez de coordenacao repetitiva.", urgency: "Agendamento lento e lembretes fracos geram vazamento visivel de receita e pior experiencia do cliente.", bullets: ["Agendamento e lembretes", "Suporte para perguntas frequentes", "Fluxos operacionais para a recepcao"] }
    ],
    marketsEyebrow: "Perfil ideal",
    marketsTitle: "Feita para PMEs ambiciosas do Brasil, EUA, Canada e mercados prioritarios da America Latina.",
    marketsBody: "A 10XAI funciona melhor para empresas lideradas por fundadores e operadores que ja sentem atrito em onboarding, vendas, marketing, atendimento ou agendamento.",
    markets: [["Brasil", "PMEs lideradas por fundadores e operadores que precisam de follow-up mais rapido, onboarding mais limpo e execucao mais escalavel."], ["Estados Unidos", "Empresas enxutas que se importam com alavancagem mensuravel, disciplina comercial e sistemas de IA que entram em operacao de verdade."], ["Canada + LATAM hispanica", "Times estruturados e orientados a crescimento que querem mais consistencia e mais maturidade operacional."]],
    fit: [["Perfil ideal", ["15 a 500 colaboradores", "Times liderados por fundadores ou operadores", "Atrito visivel em vendas, onboarding, marketing, atendimento ou agendamento"]], ["O que normalmente buscam", ["Um primeiro sistema que mude a percepcao da empresa em semanas", "Implementacao com rollout", "Resultados que a lideranca consiga explicar com clareza"]], ["Nao e o melhor encaixe", ["Educacao generica sobre IA", "Sem dono interno para rollout", "Projetos em que velocidade nao importa"]]],
    exampleEyebrow: "Exemplos regionais",
    exampleTitle: "Mostre empresas pequenas e medias reais que o mercado ja reconhece.",
    exampleBody: "Estas empresas publicas ajudam o comprador a enxergar para quem a 10XAI foi feita. O objetivo aqui e clareza de mercado, nao inflar prova social.",
    exampleDisclaimer: "Estas empresas aparecem como exemplos de perfil de mercado com base em seu posicionamento publico. Nao sao apresentadas como clientes atuais da 10XAI.",
    exampleCompanies: [
      { name: "Dental Depot", region: "Estados Unidos", niche: "Grupo odontologico com varias unidades", reason: "Clinicas odontologicas doctor-owned em Oklahoma e arredores, um encaixe forte para agendamento, lembretes e IA para recepcao.", url: "https://dentaldepot.net/" },
      { name: "The Small Marketing Agency", region: "Estados Unidos", niche: "Pequena agencia de marketing e PR", reason: "Foi criada para startups e mercado SMB, o que a torna um encaixe natural para operacao de campanhas, leads e fluxos de conteudo.", url: "https://www.smallmarketingagency.com/" },
      { name: "Contsimples", region: "Brasil", niche: "Escritorio de contabilidade online", reason: "Seu modelo com plataforma para MEIs e empresas do Simples Nacional combina bem com onboarding, operacao documental e automacao de atendimento.", url: "https://www.contsimples.com.br/" },
      { name: "Contabiliza Brasil", region: "Brasil", niche: "Escritorio contabil e consultivo", reason: "Um negocio de servicos que combina tecnologia com suporte proximo, ideal para automacao de back-office e resposta mais rapida ao cliente.", url: "https://contabilizabrasil.com.br/" },
      { name: "PyeM Mensajeria y Paqueteria", region: "Mexico", niche: "PME de logistica", reason: "Sua operacao de entregas sob medida e a plataforma para clientes criam um encaixe forte para dashboards operacionais, tratamento de excecoes e fluxos de atendimento.", url: "https://www.pyem.com.mx/" },
      { name: "MIMARCA", region: "Colombia", niche: "Estudio de estrategia de marca e marketing para PYMES", reason: "Seu foco em PYMES na Colombia e em outros mercados a torna um encaixe natural para automacao de marketing, roteamento de leads e fluxos de propostas.", url: "https://mimarca.com.co/nosotros/" }
    ],
    companyCta: "Visitar site da empresa",
    reviewEyebrow: "Resultados buscados",
    reviewTitle: "O que os compradores querem melhorar primeiro.",
    reviewBody: "As melhores conversas comecam com um fluxo que esta atrasando o time ou enfraquecendo a experiencia do cliente.",
    reviewDisclaimer: "Reviews publicas verificadas de clientes podem entrar aqui quando estiverem disponiveis.",
    reviewLabel: "Resultado prioritario",
    reviewStatus: "Pedido comum",
    reviewCards: [
      { region: "Estados Unidos", title: "Comprador de vendas ou operacoes", outcome: "Destacar follow-up mais rapido, CRM mais limpo e proximos passos mais claros para um time enxuto." },
      { region: "Brasil", title: "Founder ou operador", outcome: "Destacar menos caos no onboarding, resposta de atendimento mais rapida e um ritmo operacional unico para o time." },
      { region: "LATAM hispanica", title: "Lider de growth ou atendimento", outcome: "Destacar execucao mais forte, coordenacao mais rapida e melhor experiencia do cliente sem peso corporativo." }
    ],
    roiEyebrow: "Impacto no negocio",
    roiTitle: "Transforme urgencia em economia e economia em reuniao agendada.",
    roiBody: "Ajude o comprador a quantificar o atrito que ele ja sente hoje para facilitar a decisao do primeiro sistema.",
    roiLabels: ["Pessoas executando o trabalho", "Horas repetitivas por pessoa por semana", "Custo medio por hora", "Parcela automatizavel", "Valor mensal recuperado", "Impacto em 90 dias", "Payback estimado", "Primeiro sistema recomendado"],
    paybackUnit: "sem",
    faqEyebrow: "FAQ",
    faqTitle: "As objecoes que vale responder antes da reuniao",
    faq: [["Em quanto tempo o primeiro sistema entra no ar?", "Projetos qualificados costumam gerar uma mudanca visivel no fluxo em 2 a 4 semanas. Rollouts maiores tendem a acontecer em 30 a 90 dias."], ["Precisamos trocar nossas ferramentas?", "Geralmente nao. Os ganhos mais rapidos costumam vir de tornar a stack atual mais inteligente, conectada e facil de operar."], ["Isso e so para empresas maiores?", "Nao. O melhor encaixe costuma ser uma empresa pequena ou media que ja sente dor de processo e quer implementacao, nao mais um deck estrategico."], ["Por que devemos agendar agora?", "Porque atraso nao e neutro. Onboarding lento, follow-up fraco, marketing fragmentado e atendimento manual continuam se acumulando ate virarem a forma como o mercado percebe a empresa."]],
    contactEyebrow: "Proximo passo",
    contactTitle: "Conte qual fluxo esta atrasando mais o negocio hoje.",
    contactBody: "Vamos focar a primeira conversa no processo que esta criando o atrito operacional e de experiencia mais claro.",
    contactActions: ["Abrir calendario", "Enviar email", "Falar no WhatsApp"],
    contactNote: "Se puder, inclua quem responde pelo fluxo e quem usa esse processo todos os dias.",
    formTitle: "Enviar briefing qualificado",
    formBody: "Conte qual sistema sua empresa precisa parar de adiar e moldaremos a primeira conversa em torno desse problema operacional.",
    formLabels: ["Nome", "Empresa", "Email corporativo", "Qual sistema de negocio sua empresa precisa parar de adiar?", "Preparar rascunho de email"],
    footerLine: "A 10XAI constroi sistemas operacionais de IA para PMEs com ambicao e velocidade.",
    footerRegion: "Sao Paulo + Miami",
    mobileActions: ["Agendar", "Email"]
  },
  es: {
    nav: ["Por que 10XAI", "Sistemas", "Mercados", "ROI", "FAQ", "Contacto"],
    headerCta: "Agendar Llamada",
    heroEyebrow: "Para pymes de America Latina, Estados Unidos y Canada",
    heroTitle: "Haz que tu empresa se sienta mas rapida donde clientes y equipos lo notan primero.",
    heroBody: "10XAI disena e implementa sistemas operativos de IA para onboarding, ventas, marketing, servicio, agendamiento y calificacion de propuestas para que las pymes ambiciosas dejen la transformacion en teoria y empiecen a operar como la version mas fuerte de si mismas.",
    heroPills: ["Implementacion, rollout y adopcion", "Pensado para equipos liderados por founders y operadores", "Resultados visibles rapido sin peso corporativo"],
    primaryCta: "Agendar llamada",
    secondaryCta: "Elegir el primer sistema",
    promiseLabel: "Lo que cambia primero",
    promise: "Empieza por el flujo que hoy genera mas friccion y conviertelo en un sistema practico que el equipo pueda usar todos los dias.",
    visualLabel: "Vision corporativa convertida en operacion",
    visualTag: "Energia Nike x Apple",
    visualItems: ["La academia de onboarding que tu equipo queria desde hace anos, por fin activa", "Un sistema comercial que le dice al vendedor que hacer despues y redacta el follow-up", "Una capa de marketing y servicio que fortalece la percepcion de la empresa de inmediato"],
    visualNote: "Los equipos pequenos no necesitan mas ruido sobre IA. Necesitan el primer sistema operativo que cambie como clientes, colaboradores y lideres viven la empresa.",
    signals: [["1 prioridad", "Empieza por el flujo que genera la friccion mas visible."], ["2-4 semanas", "Ventana tipica para la primera mejora visible en el flujo."], ["1 equipo alineado", "La implementacion avanza mejor cuando owner y equipo estan alineados."]],
    differenceEyebrow: "Por que 10XAI",
    differenceTitle: "Las empresas que operacionalizan primero no solo ahorran tiempo. Cambian como el mercado las percibe.",
    differenceBody: "Un follow-up mas rapido se siente como mejor servicio. Una mejor preparacion se siente como liderazgo mas fuerte. Campanas consistentes hacen que la empresa parezca mas grande.",
    differenceItems: [["Sistemas de negocio, no teatro de IA", "10XAI no vende ideas abstractas de automatizacion. Disena la capa operativa que la empresa viene postergando y la pone a funcionar en el dia a dia."], ["Hecho para la velocidad de una pyme", "El comprador normalmente no necesita mas herramientas. Necesita claridad, disciplina de rollout y un partner que se mueva al ritmo de una empresa pequena o mediana."], ["La adopcion es parte de la entrega", "Un flujo solo genera valor cuando el equipo realmente lo usa. 10XAI incorpora rollout, enablement y comportamiento operativo dentro de la entrega."]],
    systemsEyebrow: "Storytelling por casos de uso",
    systemsTitle: "Muestra el sistema que el comprador debe dejar de postergar.",
    systemsBody: "Elige el flujo que pueda generar la mejora operativa mas clara primero.",
    systemsCta: "Hablar con 10XAI sobre este sistema",
    systems: [
      { name: "Sistema LMS de onboarding y capacitacion", audience: "RRHH, enablement, operaciones", trigger: "La capacitacion sigue siendo manual y el conocimiento vive entre carpetas, decks y personas.", story: "Convierte SOPs, notas de onboarding, videos y explicaciones de managers en un motor estructurado de aprendizaje.", outcome: "Los nuevos ingresos rampan mas rapido y la empresa finalmente opera con una academia real de onboarding.", urgency: "Cada mes de retraso mantiene a lideres costosos atrapados en explicaciones repetidas.", bullets: ["Recorridos por rol", "Resumenes y refuerzo con IA", "Una experiencia LMS mas clara"] },
      { name: "Playbook comercial con CRM operativo e IA", audience: "Founders, lideres de ventas, equipos de revenue", trigger: "El CRM registra actividad, pero no orienta la siguiente mejor accion.", story: "Construye un sistema comercial con proximos pasos, preparacion con IA, contexto mas limpio y follow-up mas rapido.", outcome: "El equipo vende con mas confianza y el pipeline gana mas disciplina.", urgency: "El follow-up debil y el pipeline desordenado se acumulan en perdida de ingresos.", bullets: ["Playbook alineado al motion real", "Recomendaciones de IA para reuniones", "Borradores listos para follow-up"] },
      { name: "Automatizacion de marketing con agentes autonomos", audience: "Marketing, founders, growth", trigger: "La marca necesita ejecucion mas consistente, pero las campanas siguen dependiendo de demasiada coordinacion manual.", story: "Crea una capa operativa de marketing que planifica calendarios, redacta copy, genera medios y publica en varios canales.", outcome: "La marca aparece con mas disciplina y la empresa empieza a parecer mas grande y mejor preparada en el mercado.", urgency: "Cuando los competidores publican con mas consistencia, capturan atencion y confianza que podrian ser tuyas.", bullets: ["Mapas de contenido y cadencias", "Activos generados con IA", "Aprobaciones y publicacion automatizada"] },
      { name: "Agente de inteligencia para RFP y calificacion de propuestas", audience: "Equipos B2B, licitaciones, ventas enterprise", trigger: "El equipo dedica demasiado tiempo a interpretar RFPs manualmente y perseguir oportunidades de bajo fit.", story: "Compara requisitos con la oferta, puntua alineacion y fortalece la narrativa antes de gastar recursos.", outcome: "El equipo califica mas rapido y se vuelve mas estrategico sobre donde competir.", urgency: "Cuanto mas tarde el equipo descubre que el fit es debil, mas tiempo, moral y margen desaparecen en oportunidades equivocadas.", bullets: ["Puntuacion de fit", "Analisis de gaps", "Recomendacion de seguir o no"] },
      { name: "Agendamiento automatizado y servicio para clinicas dentales", audience: "Clinicas dentales, operadores de salud, front desk", trigger: "Los ingresos se escapan entre consultas, agendamiento, recordatorios, cancelaciones y preguntas repetitivas.", story: "Crea una capa de agendamiento y servicio que mantiene los sillones ocupados y reduce la sobrecarga del front desk.", outcome: "Se agendan mas citas y el equipo puede enfocarse en pacientes en lugar de coordinacion repetitiva.", urgency: "Un agendamiento lento y recordatorios debiles generan fuga visible de ingresos y peor experiencia del paciente.", bullets: ["Agendamiento y recordatorios", "Soporte FAQ", "Flujos operativos para el front desk"] }
    ],
    marketsEyebrow: "Perfil ideal",
    marketsTitle: "Pensado para pymes ambiciosas de Brasil, Estados Unidos, Canada y mercados prioritarios de America Latina.",
    marketsBody: "10XAI funciona mejor para empresas lideradas por founders y operadores que ya sienten friccion en onboarding, ventas, marketing, servicio o agendamiento.",
    markets: [["Brasil", "Pymes lideradas por founders y operadores que necesitan follow-up mas rapido, onboarding mas ordenado y ejecucion mas escalable."], ["Estados Unidos", "Empresas ligeras que valoran apalancamiento medible, disciplina comercial y sistemas de IA que realmente se ponen en marcha."], ["Canada + LATAM hispanohablante", "Equipos estructurados y orientados a crecimiento que quieren mayor consistencia y madurez operativa."]],
    fit: [["Perfil ideal", ["15 a 500 colaboradores", "Equipos liderados por founders u operadores", "Friccion visible en ventas, onboarding, marketing, servicio o agendamiento"]], ["Lo que normalmente buscan", ["Un primer sistema que cambie como se siente la empresa en semanas", "Implementacion con rollout", "Resultados que el liderazgo pueda explicar con claridad"]], ["No es el mejor fit", ["Educacion generica sobre IA", "Sin owner interno para rollout", "Proyectos donde la velocidad importa menos que el comite"]]],
    exampleEyebrow: "Ejemplos regionales",
    exampleTitle: "Muestra empresas pequenas y medianas reales que el mercado ya reconoce.",
    exampleBody: "Estas empresas publicas ayudan al comprador a visualizar para que tipo de negocio esta hecha 10XAI. El objetivo es claridad de mercado, no inflar senales de clientes.",
    exampleDisclaimer: "Estas empresas se muestran como ejemplos de encaje de mercado segun su posicionamiento publico. No se presentan como clientes actuales de 10XAI.",
    exampleCompanies: [
      { name: "Dental Depot", region: "Estados Unidos", niche: "Grupo dental con varias sedes", reason: "Sus clinicas doctor-owned en Oklahoma y zonas cercanas lo convierten en un gran fit para agendamiento, recordatorios e IA para front desk.", url: "https://dentaldepot.net/" },
      { name: "The Small Marketing Agency", region: "Estados Unidos", niche: "Pequena agencia de marketing y PR", reason: "Nacio para startups y el mercado SMB, por lo que encaja muy bien con operaciones de campanas, manejo de leads y flujos de contenido.", url: "https://www.smallmarketingagency.com/" },
      { name: "Contsimples", region: "Brasil", niche: "Despacho contable online", reason: "Su modelo con plataforma para MEIs y empresas del Simples Nacional encaja muy bien con onboarding, operaciones documentales y automatizacion de servicio.", url: "https://www.contsimples.com.br/" },
      { name: "Contabiliza Brasil", region: "Brasil", niche: "Despacho contable y consultivo", reason: "Es un negocio de servicios que combina tecnologia con soporte cercano, ideal para automatizacion de back-office y respuestas mas rapidas al cliente.", url: "https://contabilizabrasil.com.br/" },
      { name: "PyeM Mensajeria y Paqueteria", region: "Mexico", niche: "Pyme logistica", reason: "Su operacion de envios a medida y su plataforma para clientes generan un gran fit para tableros operativos, manejo de excepciones y flujos de servicio.", url: "https://www.pyem.com.mx/" },
      { name: "MIMARCA", region: "Colombia", niche: "Estudio de estrategia de marca y marketing para PYMES", reason: "Su foco en PYMES de Colombia y otros mercados la vuelve un fit natural para automatizacion de marketing, ruteo de leads y flujos de propuestas.", url: "https://mimarca.com.co/nosotros/" }
    ],
    companyCta: "Visitar sitio de la empresa",
    reviewEyebrow: "Resultados buscados",
    reviewTitle: "Lo que los compradores quieren mejorar primero.",
    reviewBody: "Las conversaciones mas valiosas suelen comenzar con un flujo que esta frenando al equipo o debilitando la experiencia del cliente.",
    reviewDisclaimer: "Las reviews publicas verificadas de clientes pueden agregarse aqui cuando esten disponibles.",
    reviewLabel: "Resultado prioritario",
    reviewStatus: "Solicitud comun",
    reviewCards: [
      { region: "Estados Unidos", title: "Comprador de ventas u operaciones", outcome: "Destacar follow-up mas rapido, CRM mas limpio y siguientes pasos mas claros para un equipo ligero." },
      { region: "Brasil", title: "Founder u operador", outcome: "Destacar menos caos en onboarding, respuesta de servicio mas rapida y un solo ritmo operativo para el equipo." },
      { region: "LATAM hispanohablante", title: "Lider de growth o servicio", outcome: "Destacar ejecucion mas fuerte, coordinacion mas rapida y mejor experiencia del cliente sin peso corporativo." }
    ],
    roiEyebrow: "Impacto en el negocio",
    roiTitle: "Convierte urgencia en economia y economia en una reunion agendada.",
    roiBody: "Ayuda al comprador a cuantificar la friccion que ya siente para facilitar la decision del primer sistema.",
    roiLabels: ["Personas haciendo el trabajo", "Horas repetitivas por persona por semana", "Costo medio por hora", "Porcentaje automatizable", "Valor mensual recuperado", "Impacto en 90 dias", "Payback estimado", "Primer sistema recomendado"],
    paybackUnit: "sem",
    faqEyebrow: "FAQ",
    faqTitle: "Las objeciones que conviene responder antes de la reunion",
    faq: [["Que tan rapido puede salir el primer sistema?", "Los proyectos calificados suelen producir un cambio visible en el flujo en 2 a 4 semanas. Los rollouts mas amplios suelen ocurrir en 30 a 90 dias."], ["Necesitamos cambiar nuestras herramientas?", "Normalmente no. Los resultados mas rapidos suelen venir de hacer mas inteligente, conectada y facil de operar la stack actual."], ["Esto es solo para empresas grandes?", "No. El mejor fit suele ser una empresa pequena o mediana que ya siente dolor de proceso y quiere implementacion, no otro deck estrategico."], ["Por que deberiamos agendar ahora?", "Porque el retraso no es neutral. Un onboarding lento, follow-up debil, marketing fragmentado y servicio manual siguen acumulandose hasta convertirse en la forma en que el mercado percibe a la empresa."]],
    contactEyebrow: "Siguiente paso",
    contactTitle: "Cuentanos que flujo esta frenando mas al negocio ahora mismo.",
    contactBody: "Enfocaremos la primera conversacion en el proceso que esta generando la friccion operativa y de experiencia mas visible.",
    contactActions: ["Abrir calendario", "Enviar email", "Escribir por WhatsApp"],
    contactNote: "Si es posible, incluye a quien lidera el flujo y a quien lo usa todos los dias.",
    formTitle: "Enviar briefing calificado",
    formBody: "Cuentanos que sistema tu empresa debe dejar de postergar y enfocaremos la primera conversacion en ese problema operativo.",
    formLabels: ["Nombre", "Empresa", "Email corporativo", "Que sistema de negocio debe dejar de postergar tu empresa?", "Preparar borrador de email"],
    footerLine: "10XAI construye sistemas operativos de IA para pymes veloces y ambiciosas.",
    footerRegion: "Sao Paulo + Miami",
    mobileActions: ["Agendar", "Email"]
  }
} as const;

export function detectInitialLanguage(): Language {
  if (typeof window === "undefined") return "en";
  try {
    const stored = window.localStorage.getItem("10xai-language");
    if (stored === "en" || stored === "pt" || stored === "es") return stored;
  } catch {
    // Ignore storage access issues and fall back to browser locale.
  }
  const browser = window.navigator.language?.toLowerCase?.() ?? "en";
  if (browser.startsWith("pt")) return "pt";
  if (browser.startsWith("es")) return "es";
  return "en";
}

function getDocumentLanguage(language: Language) {
  return language === "pt" ? "pt-BR" : language;
}

function syncDocumentLanguage(language: Language) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = getDocumentLanguage(language);
}

function persistLanguage(language: Language) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem("10xai-language", language);
  } catch {
    // Ignore storage access issues in restricted browsing environments.
  }
  syncDocumentLanguage(language);
}

function subscribeToLanguageSnapshot() {
  return () => {};
}

function getServerLanguageSnapshot(): Language {
  return "en";
}

export function buildBriefEmail(params: {
  language: Language;
  name: string;
  company: string;
  email: string;
  challenge: string;
  monthlyRecovered: number;
  recommendedSystem: string;
}) {
  const { language, name, company, email, challenge, monthlyRecovered, recommendedSystem } = params;
  const t = siteCopy[language];
  const locale = localeByLanguage[language];
  const body = [
    t.formLabels[0],
    name,
    "",
    t.formLabels[1],
    company,
    "",
    t.formLabels[2],
    email,
    "",
    t.formLabels[3],
    challenge,
    "",
    t.roiLabels[4],
    `$${monthlyRecovered.toLocaleString(locale)}`,
    "",
    t.roiLabels[7],
    recommendedSystem,
  ].join("\n");
  const subject = `10XAI brief from ${company || name || "website visitor"}`;
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function SectionIntro({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return <div className="max-w-3xl"><span className="eyebrow"><span className="brand-dot" />{eyebrow}</span><h2 className="display-title mt-6 text-3xl font-semibold tracking-tight text-[var(--paper)] sm:text-4xl lg:text-5xl">{title}</h2>{body ? <p className="section-copy mt-5 text-lg leading-8">{body}</p> : null}</div>;
}

export default function Home() {
  const detectedLanguage = useSyncExternalStore(
    subscribeToLanguageSnapshot,
    detectInitialLanguage,
    getServerLanguageSnapshot,
  );
  const [languageOverride, setLanguageOverride] = useState<Language | null>(null);
  const language = languageOverride ?? detectedLanguage;
  const [selectedSystemIndex, setSelectedSystemIndex] = useState(1);
  const [people, setPeople] = useState(6);
  const [hoursPerWeek, setHoursPerWeek] = useState(5);
  const [hourlyRate, setHourlyRate] = useState(35);
  const [automationShare, setAutomationShare] = useState(40);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [challenge, setChallenge] = useState("");
  const bookingUrl = getBookingCtaHref();
  const whatsappUrl = process.env.NEXT_PUBLIC_WHATSAPP_URL || `mailto:${CONTACT_EMAIL}`;

  useEffect(() => {
    syncDocumentLanguage(language);
  }, [language]);
  const t = siteCopy[language];
  const numberLocale = localeByLanguage[language];
  const selectedSystem = t.systems[Math.min(selectedSystemIndex, t.systems.length - 1)];
  const monthlyRecovered = Math.round(people * hoursPerWeek * 4.33 * hourlyRate * (automationShare / 100));
  const quarterlyImpact = monthlyRecovered * 3;
  const paybackWeeks = monthlyRecovered > 0 ? (7500 / monthlyRecovered) * 4.33 : 0;
  const recommendedSystem = monthlyRecovered < 4000 ? t.systems[0].name : monthlyRecovered < 12000 ? t.systems[1].name : t.systems[2].name;

  function handleBriefSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.location.assign(buildBriefEmail({
      language,
      name,
      company,
      email,
      challenge,
      monthlyRecovered,
      recommendedSystem,
    }));
  }

  return (
    <main className="noise-overlay min-h-screen overflow-x-hidden">
      <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[rgba(7,14,28,0.78)] backdrop-blur-xl"><div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8"><a href="#top" className="flex items-center gap-3"><Image src="/brand/10xai-logo.png" alt="10XAI" width={118} height={28} className="h-7 w-auto" priority /></a><div className="hidden items-center gap-6 lg:flex">{t.nav.map((label, index) => { const ids = ["#difference", "#systems", "#markets", "#roi", "#faq", "#contact"]; return <a key={ids[index]} href={ids[index]} className="text-sm text-[var(--muted)] hover:text-[var(--paper)]">{label}</a>; })}</div><div className="flex items-center gap-3"><div className="language-toggle hidden sm:flex">{languages.map((item) => <button key={item.code} type="button" onClick={() => { setLanguageOverride(item.code); persistLanguage(item.code); }} className={`language-chip ${language === item.code ? "language-chip-active" : ""}`}>{item.label}</button>)}</div><a href={bookingUrl} className="hidden rounded-full border border-[var(--brand)] bg-[var(--brand)] px-4 py-2 text-sm font-medium text-[var(--background)] shadow-[0_0_24px_var(--brand-glow)] hover:-translate-y-0.5 sm:inline-flex">{t.headerCta}</a></div></div></header>
      <section id="top" className="hero-shell relative mx-auto max-w-7xl px-5 pb-18 pt-12 sm:px-8 lg:pb-24 lg:pt-18">
        <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div className="relative z-10">
            <span className="eyebrow"><span className="brand-dot" />{t.heroEyebrow}</span>
            <h1 className="display-title mt-8 max-w-5xl text-5xl font-semibold tracking-[-0.05em] text-[var(--paper)] sm:text-6xl lg:text-7xl">{t.heroTitle}</h1>
            <p className="section-copy mt-7 max-w-2xl text-lg leading-8 sm:text-xl">{t.heroBody}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {t.heroPills.map((pill) => <span key={pill} className="rounded-full border border-[var(--line)] bg-white/4 px-3 py-2 text-sm text-[var(--muted)]">{pill}</span>)}
            </div>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a href={bookingUrl} className="inline-flex items-center justify-center rounded-full bg-[var(--brand)] px-6 py-3.5 text-base font-medium text-[var(--background)] hover:-translate-y-0.5">{t.primaryCta}</a>
              <a href="#systems" className="inline-flex items-center justify-center rounded-full border border-[var(--line-strong)] px-6 py-3.5 text-base font-medium text-[var(--paper)] hover:border-[var(--brand)]">{t.secondaryCta}</a>
            </div>
            <div className="mt-14 max-w-3xl border-l border-[var(--brand)] pl-5">
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--muted)]">{t.promiseLabel}</p>
              <p className="mt-4 text-2xl leading-9 text-[var(--paper)] sm:text-3xl">{t.promise}</p>
            </div>
          </div>
          <div className="hero-visual panel-strong ambient-ring relative rounded-[2rem] p-4 sm:p-6 lg:p-7">
            <div className="float-orb float-orb-left motion-float" />
            <div className="float-orb float-orb-right motion-drift" />
            <div className="logo-stage relative overflow-hidden rounded-[1.6rem] p-4 sm:p-5">
              <Image
                src="/brand/hero-ai.png"
                alt="AI-powered business workflows visualized in a premium interface"
                width={1280}
                height={768}
                className="hero-shot motion-drift h-[420px] w-full rounded-[1.3rem] object-cover object-center sm:h-[500px]"
                sizes="(max-width: 1024px) 100vw, 48vw"
                priority
              />
              <div className="image-scrim" />
              <div className="glass-badge reveal-up absolute left-4 top-4 sm:left-6 sm:top-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--brand)]">{t.visualLabel}</p>
                <p className="mt-2 text-sm text-[var(--paper)]/88">{t.visualTag}</p>
              </div>
              <div className="glass-badge reveal-up absolute right-4 top-4 max-w-[220px] sm:right-6 sm:top-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">{t.signals[0][0]}</p>
                <p className="mt-2 text-sm leading-6 text-[var(--paper)]/88">{t.signals[0][1]}</p>
              </div>
              <div className="glass-badge reveal-up absolute bottom-4 left-4 max-w-[240px] sm:bottom-6 sm:left-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">{t.visualItems[0]}</p>
              </div>
              <div className="glass-badge reveal-up absolute bottom-4 right-4 max-w-[220px] sm:bottom-6 sm:right-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">{t.signals[1][0]}</p>
                <p className="mt-2 text-sm leading-6 text-[var(--paper)]/88">{t.signals[1][1]}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {t.signals.map(([value, label]) => <div key={value} className="hero-stat rounded-[1.5rem] px-5 py-5"><p className="text-2xl font-semibold tracking-tight text-[var(--paper)]">{value}</p><p className="mt-2 text-sm leading-6 text-[var(--muted)]">{label}</p></div>)}
        </div>
      </section>
      <section id="difference" className="mx-auto max-w-7xl px-5 py-18 sm:px-8 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <SectionIntro eyebrow={t.differenceEyebrow} title={t.differenceTitle} body={t.differenceBody} />
          <div className="visual-mosaic">
            <figure className="image-card image-card-tall panel-strong motion-float">
              <Image
                src="/brand/hero-ai.png"
                alt="A visual representation of AI workflows accelerating business operations"
                width={1200}
                height={900}
                className="h-full w-full object-cover object-[center_32%]"
                sizes="(max-width: 767px) 100vw, 42vw"
              />
              <div className="image-scrim" />
            </figure>
            <article className="panel image-card p-5">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--brand)]">{t.visualItems[1]}</p>
              <p className="section-copy mt-4 text-sm leading-6">{t.visualNote}</p>
            </article>
            <article className="panel image-card p-5">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--brand)]">{t.signals[2][0]}</p>
              <p className="mt-3 text-xl font-medium text-[var(--paper)]">{t.signals[2][1]}</p>
            </article>
          </div>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">{t.differenceItems.map(([title, body], index) => <article key={title} className="panel rounded-[1.75rem] p-7"><p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--brand)]">{String(index + 1).padStart(2, "0")}</p><h3 className="mt-4 text-2xl font-medium text-[var(--paper)]">{title}</h3><p className="section-copy mt-4 leading-7">{body}</p></article>)}</div>
      </section>
      <section id="systems" className="mx-auto max-w-7xl px-5 py-18 sm:px-8 lg:py-24"><SectionIntro eyebrow={t.systemsEyebrow} title={t.systemsTitle} body={t.systemsBody} /><div className="mt-10 grid gap-6 lg:grid-cols-[0.42fr_0.58fr] lg:items-start"><div className="space-y-3">{t.systems.map((item, index) => <button key={item.name} type="button" onClick={() => setSelectedSystemIndex(index)} className={`system-selector w-full rounded-[1.5rem] px-5 py-5 text-left ${selectedSystemIndex === index ? "system-selector-active" : ""}`}><span className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--brand)]">{item.audience}</span><h3 className="mt-3 text-xl font-medium text-[var(--paper)]">{item.name}</h3><p className="mt-3 text-sm leading-6 text-[var(--muted)]">{item.trigger}</p></button>)}</div><article className="system-stage rounded-[2rem] p-6 sm:p-8"><div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]"><div><p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--brand)]">{selectedSystem.audience}</p><h3 className="mt-4 text-3xl font-medium tracking-tight text-[var(--paper)] sm:text-4xl">{selectedSystem.name}</h3><p className="section-copy mt-5 text-lg leading-8">{selectedSystem.story}</p><p className="mt-5 text-lg leading-8 text-[var(--paper)]/90">{selectedSystem.outcome}</p></div><div className="system-panel rounded-[1.6rem] p-5"><figure className="image-card mb-5 overflow-hidden rounded-[1.2rem]"><Image src="/brand/hero-ai.png" alt="AI workflow interface showing operational intelligence" width={1200} height={900} className="h-[210px] w-full object-cover object-[center_42%]" sizes="(max-width: 1024px) 100vw, 28vw" /></figure><p className="mt-1 text-base leading-7 text-[var(--paper)]/90">{selectedSystem.urgency}</p><div className="mt-6 space-y-3">{selectedSystem.bullets.map((bullet) => <div key={bullet} className="flex gap-3 rounded-[1.2rem] border border-[var(--line)] bg-white/3 p-4"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--brand)]" /><p className="text-sm leading-6 text-[var(--muted)]">{bullet}</p></div>)}</div><a href={bookingUrl} className="mt-6 inline-flex rounded-full bg-[var(--brand)] px-5 py-3 text-sm font-medium text-[var(--background)] hover:-translate-y-0.5">{t.systemsCta}</a></div></div></article></div></section>
      <section id="markets" className="mx-auto max-w-7xl px-5 py-18 sm:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionIntro eyebrow={t.marketsEyebrow} title={t.marketsTitle} body={t.marketsBody} />
          <div className="space-y-5">
            <div className="grid gap-5 md:grid-cols-3">
              {t.markets.map(([title, body], index) => (
                <article key={title} className="panel rounded-[1.75rem] p-6">
                  <p className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--brand)]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 text-2xl font-medium text-[var(--paper)]">{title}</h3>
                  <p className="section-copy mt-4 leading-7">{body}</p>
                </article>
              ))}
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {t.fit.map(([title, bullets]) => (
                <article key={title} className="panel rounded-[1.75rem] p-6">
                  <h3 className="text-xl font-medium text-[var(--paper)]">{title}</h3>
                  <ul className="mt-5 space-y-3">
                    {bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-[var(--muted)]">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--brand)]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-18 sm:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionIntro eyebrow={t.exampleEyebrow} title={t.exampleTitle} body={t.exampleBody} />
          <div className="space-y-5">
            <div className="grid gap-4 md:grid-cols-3">
              <figure className="image-card panel overflow-hidden"><Image src="/brand/hero-ai.png" alt="Operational AI image crop for sales and growth workflows" width={900} height={900} className="h-[180px] w-full object-cover object-[left_center]" /></figure>
              <figure className="image-card panel overflow-hidden"><Image src="/brand/hero-ai.png" alt="Operational AI image crop for onboarding and team enablement" width={900} height={900} className="h-[180px] w-full object-cover object-center" /></figure>
              <figure className="image-card panel overflow-hidden"><Image src="/brand/hero-ai.png" alt="Operational AI image crop for service and booking workflows" width={900} height={900} className="h-[180px] w-full object-cover object-[right_center]" /></figure>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {t.exampleCompanies.map((company) => (
                <article key={company.name} className="panel rounded-[1.75rem] p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--brand)]">{company.region}</p>
                      <h3 className="mt-3 text-2xl font-medium text-[var(--paper)]">{company.name}</h3>
                    </div>
                    <span className="rounded-full border border-[var(--line)] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
                      {company.niche}
                    </span>
                  </div>
                  <p className="section-copy mt-5 leading-7">{company.reason}</p>
                  <a
                    href={company.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex text-sm font-medium text-[var(--brand)] hover:text-[var(--paper)]"
                  >
                    {t.companyCta}
                  </a>
                </article>
              ))}
            </div>
            <div className="rounded-[1.5rem] border border-[rgba(23,208,239,0.35)] bg-[var(--brand-soft)] p-5 text-sm leading-7 text-[var(--paper)]/88">
              {t.exampleDisclaimer}
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-18 sm:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionIntro eyebrow={t.reviewEyebrow} title={t.reviewTitle} body={t.reviewBody} />
          <div className="space-y-5">
            <div className="grid gap-5 md:grid-cols-3">
              {t.reviewCards.map((card) => (
                <article key={card.region} className="panel-strong rounded-[1.75rem] p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--brand)]">{t.reviewLabel}</p>
                      <h3 className="mt-3 text-xl font-medium text-[var(--paper)]">{card.region}</h3>
                    </div>
                    <span className="rounded-full border border-[var(--line)] bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
                      {t.reviewStatus}
                    </span>
                  </div>
                  <div className="mt-5 flex items-center gap-3">
                    <div className="review-avatar" />
                    <div className="text-sm text-[var(--brand)]">
                      <span className="font-semibold">5.0</span>
                      <span className="ml-3 inline-flex gap-1 align-middle">
                        {[0, 1, 2, 3, 4].map((dot) => (
                          <span key={dot} className="inline-block h-2 w-2 rounded-full bg-[var(--brand)]" />
                        ))}
                      </span>
                    </div>
                  </div>
                  <p className="mt-5 text-base font-medium text-[var(--paper)]">{card.title}</p>
                  <p className="section-copy mt-3 leading-7">{card.outcome}</p>
                </article>
              ))}
            </div>
            <div className="rounded-[1.5rem] border border-[var(--line-strong)] bg-[rgba(7,14,28,0.6)] p-5 text-sm leading-7 text-[var(--muted)]">
              {t.reviewDisclaimer}
            </div>
          </div>
        </div>
      </section>
      <section id="roi" className="mx-auto max-w-7xl px-5 py-18 sm:px-8 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionIntro eyebrow={t.roiEyebrow} title={t.roiTitle} body={t.roiBody} />
          <div className="panel-strong rounded-[2rem] p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm text-[var(--muted)]">{t.roiLabels[0]}</span>
                <input type="range" min={1} max={40} value={people} onChange={(event) => setPeople(Number(event.target.value))} className="w-full accent-[var(--brand)]" />
                <span className="mt-2 block text-lg text-[var(--paper)]">{people}</span>
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-[var(--muted)]">{t.roiLabels[1]}</span>
                <input type="range" min={1} max={20} value={hoursPerWeek} onChange={(event) => setHoursPerWeek(Number(event.target.value))} className="w-full accent-[var(--brand)]" />
                <span className="mt-2 block text-lg text-[var(--paper)]">{hoursPerWeek}</span>
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-[var(--muted)]">{t.roiLabels[2]}</span>
                <input type="range" min={15} max={150} value={hourlyRate} onChange={(event) => setHourlyRate(Number(event.target.value))} className="w-full accent-[var(--brand)]" />
                <span className="mt-2 block text-lg text-[var(--paper)]">${hourlyRate}</span>
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-[var(--muted)]">{t.roiLabels[3]}</span>
                <input type="range" min={10} max={90} value={automationShare} onChange={(event) => setAutomationShare(Number(event.target.value))} className="w-full accent-[var(--brand)]" />
                <span className="mt-2 block text-lg text-[var(--paper)]">{automationShare}%</span>
              </label>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.5rem] border border-[var(--line)] bg-[rgba(6,12,22,0.35)] p-5">
                <p className="text-sm text-[var(--muted)]">{t.roiLabels[4]}</p>
                <p className="mt-4 text-3xl font-semibold text-[var(--paper)]">${monthlyRecovered.toLocaleString(numberLocale)}</p>
              </div>
              <div className="rounded-[1.5rem] border border-[var(--line)] bg-[rgba(6,12,22,0.35)] p-5">
                <p className="text-sm text-[var(--muted)]">{t.roiLabels[5]}</p>
                <p className="mt-4 text-3xl font-semibold text-[var(--paper)]">${quarterlyImpact.toLocaleString(numberLocale)}</p>
              </div>
              <div className="rounded-[1.5rem] border border-[var(--line)] bg-[rgba(6,12,22,0.35)] p-5">
                <p className="text-sm text-[var(--muted)]">{t.roiLabels[6]}</p>
                <p className="mt-4 text-3xl font-semibold text-[var(--paper)]">
                  {paybackWeeks > 0 ? `${paybackWeeks.toFixed(1)} ${t.paybackUnit}` : "--"}
                </p>
              </div>
            </div>
            <div className="mt-5 rounded-[1.5rem] border border-[var(--brand)] bg-[var(--brand-soft)] p-5">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--muted)]">{t.roiLabels[7]}</p>
              <p className="mt-3 text-2xl font-medium text-[var(--paper)]">{recommendedSystem}</p>
            </div>
          </div>
        </div>
      </section>
      <section id="faq" className="mx-auto max-w-7xl px-5 py-18 sm:px-8 lg:py-24"><SectionIntro eyebrow={t.faqEyebrow} title={t.faqTitle} /><div className="mt-10 grid gap-5 lg:grid-cols-2">{t.faq.map(([question, answer]) => <article key={question} className="panel rounded-[1.75rem] p-7"><h3 className="text-xl font-medium text-[var(--paper)]">{question}</h3><p className="section-copy mt-4 leading-7">{answer}</p></article>)}</div></section>
      <section id="contact" className="mx-auto max-w-7xl px-5 py-18 sm:px-8 lg:py-24"><div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]"><SectionIntro eyebrow={t.contactEyebrow} title={t.contactTitle} body={t.contactBody} /><div className="grid gap-5"><div className="panel-strong rounded-[2rem] p-6 sm:p-8"><div className="grid gap-4 sm:grid-cols-3"><a href={bookingUrl} className="rounded-[1.5rem] border border-[var(--brand)] bg-[var(--brand)] px-4 py-5 text-center font-medium text-[var(--background)] hover:-translate-y-0.5">{t.contactActions[0]}</a><a href={`mailto:${CONTACT_EMAIL}`} className="rounded-[1.5rem] border border-[var(--line-strong)] px-4 py-5 text-center font-medium text-[var(--paper)] hover:border-[var(--brand)]">{t.contactActions[1]}</a><a href={whatsappUrl} className="rounded-[1.5rem] border border-[var(--line-strong)] px-4 py-5 text-center font-medium text-[var(--paper)] hover:border-[var(--brand)]">{t.contactActions[2]}</a></div><p className="section-copy mt-5 text-sm">{t.contactNote}</p></div><form onSubmit={handleBriefSubmit} className="panel rounded-[2rem] p-6 sm:p-8"><h3 className="text-2xl font-medium text-[var(--paper)]">{t.formTitle}</h3><p className="section-copy mt-3 text-sm leading-6">{t.formBody}</p><div className="mt-6 grid gap-4 sm:grid-cols-2"><label className="block"><span className="mb-2 block text-sm text-[var(--muted)]">{t.formLabels[0]}</span><input required value={name} onChange={(event) => setName(event.target.value)} className="w-full rounded-2xl border border-[var(--line)] bg-[rgba(7,14,28,0.44)] px-4 py-3 text-[var(--paper)] outline-none focus:border-[var(--brand)]" /></label><label className="block"><span className="mb-2 block text-sm text-[var(--muted)]">{t.formLabels[1]}</span><input required value={company} onChange={(event) => setCompany(event.target.value)} className="w-full rounded-2xl border border-[var(--line)] bg-[rgba(7,14,28,0.44)] px-4 py-3 text-[var(--paper)] outline-none focus:border-[var(--brand)]" /></label><label className="block sm:col-span-2"><span className="mb-2 block text-sm text-[var(--muted)]">{t.formLabels[2]}</span><input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-2xl border border-[var(--line)] bg-[rgba(7,14,28,0.44)] px-4 py-3 text-[var(--paper)] outline-none focus:border-[var(--brand)]" /></label><label className="block sm:col-span-2"><span className="mb-2 block text-sm text-[var(--muted)]">{t.formLabels[3]}</span><textarea required rows={5} value={challenge} onChange={(event) => setChallenge(event.target.value)} className="w-full rounded-2xl border border-[var(--line)] bg-[rgba(7,14,28,0.44)] px-4 py-3 text-[var(--paper)] outline-none focus:border-[var(--brand)]" /></label></div><button type="submit" className="mt-6 inline-flex rounded-full bg-[var(--paper)] px-6 py-3 font-medium text-[var(--background)] hover:-translate-y-0.5">{t.formLabels[4]}</button></form></div></div></section>
      <footer className="border-t border-[var(--line)] px-5 py-8 text-sm text-[var(--muted)] sm:px-8"><div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><p>{t.footerLine}</p><p>{CONTACT_EMAIL} | {t.footerRegion}</p></div></footer>
      <div className="sticky-cta fixed inset-x-0 bottom-0 z-50 p-3 lg:hidden"><div className="mx-auto grid max-w-3xl grid-cols-2 gap-3"><a href={bookingUrl} className="rounded-full bg-[var(--brand)] px-4 py-3 text-center text-sm font-medium text-[var(--background)]">{t.mobileActions[0]}</a><a href={`mailto:${CONTACT_EMAIL}`} className="rounded-full border border-[var(--line-strong)] px-4 py-3 text-center text-sm font-medium text-[var(--paper)]">{t.mobileActions[1]}</a></div></div>
    </main>
  );
}
