# CADEIA COMPLETA DE PROCESSOS: CADA ETAPA HUMANA/MANUAL = CANDIDATA À AUTOMAÇÃO

> Revisado em 24/09/2026: números conferidos em fonte oficial. Os dados usados na apresentação estão em lp-apresentacao/src/lib/dados-oficiais.ts. Itens marcados como (não confirmado) não devem ser usados sem nova checagem.

### Raio-X operacional do setor — do poço ao bico de abastecimento
*Princípio do cliente: tudo que for etapa humana e manual na cadeia completa de processos dessas empresas é passível de automação. Este mapa identifica cada uma, o que já existe de referência e o ganho provável.*

---

## ELO 1 — EXPLORAÇÃO & PRODUÇÃO (upstream)

| Processo | Estado hoje | Automação com IA | Referência | Ganho |
|---|---|---|---|---|
| Interpretação sísmica | Geofísico analisa manualmente (semanas) | Visão computacional sobre dados sísmicos | BP: -90% do tempo (não confirmado) | Velocidade de decisão exploratória |
| Seleção de reservatórios | Estudo manual de especialistas | ML sobre dados de reservatório | Petrobras (em uso — Agência eixos, 07/11/2024) | +4% produção (BP; não confirmado) |
| Perfuração | Operadores ajustam manualmente | Perfuração automatizada guiada por IA | Exxon, SLB | Menos horas-sonda |
| Manutenção de plataformas | Inspeção programada por calendário | Sensores + manutenção preditiva | Shell com C3 AI: mais de 13.000 equipamentos (release da C3 AI, 04/06/2026) | "Centenas de milhões de dólares", segundo a C3 AI (fornecedor); "US$ 2 bilhões por ano (Shell)": não confirmado |
| Segurança | Análise humana de incidentes | Análise preditiva de acidentes | Chevron | 12 acidentes evitados (não confirmado) |
| Emissões/ESG | Relatórios manuais, medição esparsa | Monitoramento contínuo | TotalEnergies | -47% metano (não confirmado) |
| Análise de água/injeção | Amostragem manual | Sensores contínuos + IA | SLB | Menor parada |

## ELO 2 — TRADING, IMPORTAÇÃO & ABASTECIMENTO

| Processo | Estado hoje | Automação com IA | Referência | Ganho |
|---|---|---|---|---|
| Formação de preço de compra | Mesa comercial analisa Brent/câmbio manualmente | Copiloto de preço com dados de mercado em tempo real | Exxon (trading) | Decisão em minutos, não dias |
| Contratos de compra/venda | Jurídico redige e revisa | IA de contratos (revisão, risco, cláusulas) | Braskem (contratos com IA; não confirmado) | Dias→horas |
| Afretamento/logística marítima | Planner contrata navios manualmente | IA prevê consumo e agenda afretamento | **Vibra (VEJA, 05/08/2026): previsão de demanda; importação de diesel com até 45 dias de lead time** | Capital de giro otimizado |
| Importação (clearance) | Despachante + planilhas | Automação de docs de importação | Prática B2B | Custo de demurrage menor |
| Hedging | Mesa financeira manual | Modelos de hedge assistidos por IA | Petrobras (modelos de IA para o planejamento da dívida — Agência eixos, 07/11/2024) | Menos exposição a Brent |

## ELO 3 — REFINO

| Processo | Estado hoje | Automação com IA | Referência | Ganho |
|---|---|---|---|---|
| Planejamento de produção | Planners montam campanhas | Otimização de campanhas com IA | Nenhum caso confirmado (os cerca de US$ 9,7 bilhões da ExxonMobil são economias estruturais de custo da empresa inteira desde 2019, não ganho de IA) | — |
| Operação de unidades | Operadores em painel 24/7 | Copiloto de operação + APC avançado | Acelen (modernização) | Top-3 AL em eficiência (não confirmado) |
| Qualidade em linha | Laboratório manual (amostras) | Espectroscopia + visão computacional | Prática industrial | Menos refugo |
| Manutenção | Programada por calendário | Predição de falha | Shell (-40% falhas; não confirmado) | -20% custo de manutenção (não confirmado) |
| Gestão de energia | Leitura manual de consumo | Otimização energética com IA | Braskem | "R$ 460 milhões por ano": não confirmado |

## ELO 4 — LOGÍSTICA, ARMAZENAGEM & DISTRIBUIÇÃO PRIMÁRIA

| Processo | Estado hoje | Automação com IA | Referência | Ganho |
|---|---|---|---|---|
| Planejamento de abastecimento | Planners distribuem lotes por região | ML de demanda regional | Vibra (IRIS, IA transversal) | R$ 900 milhões a menos em estoque (Vibra; VEJA, 05/08/2026) |
| Roteirização de cargas | Rotas manuais por experiência | Otimização de rotas | Benchmark (blog) | -24% custo, -50% erros (não confirmado) |
| Gestão de frota terceirizada | Contratos + telefone | Telemetria + score de transportador | Prática B2B | Menos atrasos |
| Pilflagem/antifurto | Auditoria esporádica | Sensores + IA de detecção | Operação Carbono Oculto (28/08/2025; Receita Federal e MPSP/Gaeco, com a PF) contra o crime organizado no setor | Perdas diretas evitadas |
| Terminais e fill rate | Conferência manual | Automação de docas + visão | Prática industrial | Throughput maior |

## ELO 5 — DISTRIBUIÇÃO & REVENDA (B2B) — O ELO DA PETROBAHIA

| Processo | Estado hoje | Automação com IA | Referência | Ganho |
|---|---|---|---|---|
| Cotação para revenda | Telefone/WhatsApp, dias de ida e volta | Portal B2B com preço instantâneo | Vibra (IA B2B) | Ciclo de venda menor |
| Pedido e estoque do cliente | Revenda liga pedindo | Portal com pedido automático + previsão | Benchmark | Menos produto seco |
| Crédito | Análise manual de cadastro (dias) | Scoring automático em minutos | Crédito pré-aprovado formalizado | Inadimplência menor |
| Precificação por região | Comercial decide na experiência | Copiloto com Brent/câmbio/concorrência | Nenhum caso público confirmado (o ML da Petrobras prevê vendas e, segundo a estatal, não influencia a definição de preços — Agência eixos, 07/11/2024) | +0,5 a 1,5% margem (estimativa interna, não confirmado) |
| Prospecção de postos | Visitador de porta em porta | Agente de IA gera listas qualificadas | 61,61% dos postos do Nordeste são bandeira branca (ANP, 24/09/2026) | Funil 3-5x mais barato (não confirmado) |
| Gestão da rede | Relatórios mensais em planilha | Dashboard de volumes/margem por posto | Vibra (câmeras IA) | Decisão em tempo real |
| Renovação de contratos | Lembretes manuais | Agentes de renovação com alerta | Prática B2B | Zero churn silencioso |

## ELO 6 — VAREJO (POSTO DE COMBUSTÍVEL)

| Processo | Estado hoje | Automação com IA | Referência | Ganho |
|---|---|---|---|---|
| Preço na bomba | Dono ajusta na experiência | Reprecificação automática por concorrência local | Vibra (IA no posto) | Recupera 0,5-2 p.p. (não confirmado) |
| Fluxo de veículos | Observação informal | Câmeras + IA para padrões de consumo | **Vibra (Bloomberg Línea)** | Vende mais no horário certo |
| Conveniência | Mix fixo, gestão manual | Precificação e mix com IA | Benchmark de varejo | Conveniência = margem |
| Antifraude | Fiel Qualidade esporádico | Análise venda×estoque×adulteração | Operações contra crime | Margem protegida |
| Fidelização | Cartão de papel | Programa de dados (tipo Premmia) | Vibra: Premmia ("20 mi fidelizados": não confirmado) | Retenção + dados |
| Bico/atendimento | Fila e moeda | Pagamento automático, app de bico | Prática varejo | Throughput do bico |

## ELO 7 — FISCAL, FINANCEIRO, COMPLIANCE & BACK-OFFICE

| Processo | Estado hoje | Automação com IA | Referência | Ganho |
|---|---|---|---|---|
| Apuração ICMS/PIS/Cofins multi-estado | Contadores com planilhas (ICMS da gasolina e do diesel já é monofásico por litro: R$ 1,57/L e R$ 1,17/L desde 01/01/2026 — Conv. ICMS 112/25 e 113/25; "150 páginas de regras": não confirmado) | Automação + IA generativa | **Petrobras: US$ 120 milhões em 3 semanas** (número do release do fornecedor Automation Anywhere, 07/03/2024; não confirmado) | Impostos em 3 dias (segundo o fornecedor; não confirmado) |
| Transição CBS/IBS (a partir de 2027) | Preparação manual | Pipeline de automação da reforma | LC 214/2025: CBS por litro substitui PIS/Cofins nos combustíveis em 01/01/2027; IBS de 0,1% em 2027–28; IBS por litro a partir de 2029; transição até 2033 (EC 132/2023 é a emenda constitucional; não existe "Lei 132/2023") | Quem automatizar primeiro ganha |
| Nota fiscal / conciliação | Digitação e conferência humanas | OCR + agentes de conciliação | Prática B2B | Custo administrativo menor |
| Contas a receber | Cobrança por telefone | Agente de cobrança com IA | Petrobras (Lê-AI, rastreio de bens de devedores — Agência Petrobras, 07/08/2024) | Inadimplência menor |
| Compliance ANP (Fiel Qualidade, RenovaBio) | Preparação manual de relatórios | RAG + relatórios automáticos | RenovaBio 2025: 37 distribuidoras abaixo de 100% da meta (19 com 0%) e 4 sem percentual por liminar (ANP, 14/07/2026) | Sanções evitadas (descumprir a meta é crime ambiental — Lei 15.082/2024) |
| Contratos e jurídico | Revisão humana completa | IA de contratos | Braskem (não confirmado) | Dias→horas |
| RH/folha/escala | Processos manuais | Automação de RH | Benchmark | Custo G&A menor |

## ELO 8 — PESSOAS & CULTURA

| Processo | Estado hoje | Automação com IA | Referência | Ganho |
|---|---|---|---|---|
| Copilotos internos | Consulta a especialistas | Chat corporativo com RAG | ChatPetrobras (mais de 100 mil trabalhadores — Agência Petrobras, 05/12/2023) | Onboarding mais rápido |
| Treinamento | Aulas presenciais | Trilha adaptativa com IA | Benchmark | Escala |
| Recrutamento | Screening manual | Triage com IA | Benchmark | Tempo de contratação |

---

## METODOLOGIA: COMO ABRIR O OPERACIONAL DESSAS EMPRESAS (para encontrar o que elas não enxergam)

1. **Mapa de valor cronometrado (2 semanas)** — sentar com operação e medir: quantas horas humanas por processo, por semana, por base. Toda etapa >4h/semana é candidata.
2. **Inventário de dados dormindo** — NF-e de 5 anos, telemetria de frota, extratos bancários, notas de venda dos postos, câmeras, CRM implícito no WhatsApp. Dado que existe e ninguém usa = ganho imediato.
3. **Matriz impacto × facilidade** — cada processo humano: custo humano anual vs. esforço de automação. Priorizar top-quadrante.
4. **Piloto de 2 semanas** — 1 processo, 1 base, prova de ROI antes de contratar mais.
5. **Escala em agentes** — do copiloto (humano aprova) ao agente (autônomo com guardrails OWASP).

## ONDE NINGUÉM ESTÁ OLHANDO (white space — oportunidades invisíveis)

1. **WhatsApp como CRM invisível** — todo o histórico de cotações dos revendedores está em chats; minerável hoje.
2. **NF-e como sensor de demanda** — notas fiscais em tempo real revelam demanda por município antes do fechamento mensal.
3. **Agenda dos vendedores** — rotas de visitação feitas à mão; otimizável como roteirização logística.
4. **Preço de conveniência** — gerido à mão enquanto o combustível tem foco total.
5. **Crédito em tempo real** — aprovação manual de limite enquanto o pedido espera.
6. **Renovação de contratos de postos** — ninguém tem sistema de alerta; churn acontece silenciosamente.
7. **Furto interno (lavração)** — inconsistências compra×venda×tanque detectáveis com IA simples.
8. **Turnover de motoristas** — previsão de saída com dados de jornada (frota própria e terceirizada).
9. **Contratos de afretamento/prazo** — renovações deixadas para a última hora, sem otimização.
10. **Relatórios da ANP** — montados manualmente todo mês; na apuração de 2025, 37 distribuidoras ficaram abaixo de 100% da meta do RenovaBio (19 com 0%) (ANP, 14/07/2026).
