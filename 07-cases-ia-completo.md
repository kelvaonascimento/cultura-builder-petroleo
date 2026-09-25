# CASES DE IA NO SETOR PETRÓLEO & COMBUSTÍVEIS — DOSSIÊ COMPLETO

> Revisado em 24/09/2026: números conferidos em fonte oficial. Os dados usados na apresentação estão em lp-apresentacao/src/lib/dados-oficiais.ts. Itens marcados como (não confirmado) não devem ser usados sem nova checagem.

### Quem usa, o que usa, quanto ganhou, e o que isso prova para o pitch
*Compilado set/2026. Cada caso com: empresa, setor/elo da cadeia, o que faz, como funciona, números de eficiência, fonte e grau de confiança.*
*Graus: OFICIAL (documento/portal do governo ou da empresa auditado) · IMPRENSA MAJOR (declarado pela empresa a veículo grande) · FORNECEDOR (PR de vendor) · ESPECIALISTA (blog/consultoria) · ESTIMATIVA (modelagem nossa).*

---

## 1. O CONTEXTO: O SETOR JÁ ENTROU NA ERA DA IA (em números)

| Indicador | Valor | Fonte | Grau |
|---|---|---|---|
| Empresas industriais brasileiras usando IA | 16,9% (2022) → **41,9% (2024)** | IBGE (Agência de Notícias IBGE, 24/09/2025), citado pela Bahia Econômica (13/08/2026) | **OFICIAL** |
| Indústrias nos EUA usando IA | 46% (UK 29%; China 94%) — não confirmado | MHP Management (Grupo Porsche), via Bahia Econômica | IMPRENSA |
| Mercado global de IA em O&G | Cerca de US$ 7,6 bilhões (2025) → **cerca de US$ 25,2 bilhões (2034)** — não confirmado | derekwilson.ai compilando pesquisas de mercado (relatório primário não identificado) | ESPECIALISTA |
| Investimento em PD&I do setor de petróleo | **Cerca de R$ 34 bilhões em 27 anos** (cláusula da ANP, inclui IA e automação avançada) — não confirmado na ANP | IBP citando ANP | OFICIAL-SETORIAL |
| Petrobras investiu em tecnologia+IA | **Cerca de US$ 250 milhões no 1T26** (manchete; destinação exata do valor: não confirmado) | BNamericas (14/05/2026) | IMPRENSA MAJOR |
| Matriz ONU/IEA: transição + digitalização | IA é vetora das 3 agendas (custo, descarbonização, eficiência) | Valor (18/08/2026), Época Negócios (20/08/2026) | IMPRENSA MAJOR |

**Tradução:** IA no setor deixou de ser teste piloto e virou padrão competitivo. Segundo o IBGE, 41,9% das empresas industriais pesquisadas usavam IA em 2024. Entre as 46 maiores do setor, esta pesquisa encontrou casos públicos de IA só para parte delas — a contagem não é reprodutível e ausência de caso público não prova que a empresa não use IA (não confirmado).

---

## 2. CASES BRASILEIROS COMPLETOS

---

### 2.1 VIBRA ENERGIA — O CASO MAIS RICO DO BRASIL (distribuição/varejo B2C+B2B)

**Perfil:** ex-BR Distribuidora. Maior distribuidora do país: receita de R$ 189.075.000.000,00 em 2025 (CVM, DFP 2025); 29.263.944 m³ vendidos em 2025, 21,30% de gasolina C + diesel B + etanol hidratado (ANP); 6.869 postos com a bandeira (ANP, cadastro de 24/09/2026). "14 terminais, 60+ bases" e "maior comprador logístico de combustível do Brasil": não confirmado.

**Declarado oficialmente:** Relato Integrado 2024 (documento de RI, GRI), entre as "principais oportunidades" (p. 12): *"diferenciação e liderança tecnológica por meio da adoção antecipada de soluções como inteligência artificial e plataformas digitais (...) o aumento da eficiência operacional e a redução de custos com automação"*. Parcerias declaradas: Microsoft, Google, AWS, Salesforce + startups (Bloomberg Línea, 16/07/2026). Infra: InterSystems IRIS Advanced (janeiro/2026 — TI Inside/Petronotícias).

#### O caso detalhado (VEJA Radar Econômico, 05/08/2026 — entrevista a Daniel Drumond, VP de Operações):

**a) Previsão de demanda (o cérebro)**
- **135 modelos de gêmeos digitais** que reproduzem virtualmente toda a cadeia de suprimentos
- **+ 96 modelos preditivos** rodando em produção
- Processam: safras agrícolas, atividade industrial, projeções do PIB, consumo regional, contratos comerciais novos
- **Margem de erro das previsões: abaixo de 2%** — desempenho **20% superior** ao sistema anterior
- Método: todo mês roda centenas de modelos matemáticos e escolhe o mais preciso para calibrar o seguinte (auto-seleção contínua)
- Projeto começou há ~2,5 anos
- Citação-chave: **"Não tem como fazer na mão, não tem como fazer no Excel"** (Drumond)

**b) Estoques: R$ 900 milhões liberados**
- IA define quanto de cada produto armazenar em cada base
- **R$ 900 milhões que ficavam imobilizados em estoques foram liberados** (Época Negócios 04/2025 confirmou; VEJA deu o detalhe operacional)
- "A gente não perdeu nível de serviço" (Drumond) — capital parado sem ruptura de abastecimento

**c) Importação de diesel (aplicação crítica)**
- Contratação de navios + chegada ao porto: **até 45 dias de lead time**
- Previsão antecipada permite contratar frete/importação com margem (VEJA, 05/08/2026; a atribuição ao Valor de 13/08/2026 não foi confirmada)

**d) Logística de distribuição**
- IA avalia **mais de 10.000 variáveis** para organizar o transporte entre bases e clientes
- Otimização de rotas: **-11% de veículos necessários** para as mesmas entregas
- **Ganhos de dezenas de milhões de reais em fretes**
- (-24% no custo logístico da cadeia desde 2021, atribuído ao Valor de 13/08/2026: não confirmado)

**e) Segurança da frota (-67% acidentes)**
- Toda frota de entrega operando com câmeras + IA embarcada
- Detecta: sinais de sono, ausência de cinto, desvio de faixa, obstáculos nos pontos cegos
- Motorista não corrige → alerta automático para a torre de controle
- **Redução de 67% no índice de acidentes**

**f) Varejo B2C**
- IA + câmeras nos postos ("posto do futuro") — Bloomberg Línea/Consumidor Moderno/LIDE (06/2026)
- Premmia: programa de fidelidade ("20 mi+ fidelizados", Exame INSIGHT, 09/08/2026: não confirmado); TI Inside (25/05/2026): estratégia "IA First" com orquestração de dados para eficiência do fidelidade
- Vibra B2B: IA para proximity com clientes corporativos (Valor, 10/07/2026)

**g) Próxima fronteira: Torre de Controle Agêntica Autônoma**
- Agentes de IA monitorando estoques, cargas e rotas de forma coordenada e autônoma
- Humanos passam a supervisão e decisões críticas
- Citação: "A inteligência artificial transforma radicalmente a nossa eficiência" (Drumond)

**Elo da cadeia:** 3 (refino/trading) + 4 (logística) + 5 (distribuição) + 6 (varejo) + 7 (back-office)
**Tipo de ganho:** capital liberado (R$ 900 milhões) + custo evitado (fretes, acidentes) + precisão operacional (98% demanda, <2% erro)
**Grau:** IMPRENSA MAJOR (declarado pela empresa) + OFICIAL (Relato Integrado)

---

### 2.2 PETROBRAS — O CASE MAIOR DA AMÉRICA LATINA (upstream/refino/corporativo)

**Perfil:** receita de R$ 497.549.000.000,00 em 2025 (CVM, DFP 2025). 10 das 17 refinarias do país, com 78,6% da capacidade (ANP, Anuário 2026). "~90% da produção nacional", "2,21 mi bbl/d" e "líder de Exame MM 2025": não confirmado. Cerca de US$ 250 milhões investidos no 1T26 (manchete da BNamericas, 14/05/2026: "Petrobras amplia tecnologia e IA após investir US$ 250 mi no 1T26"; destinação exata: não confirmado).

#### Iniciativas oficiais (Agência Petrobras — canal de notícias oficial da empresa):

| Iniciativa | Data oficial | O que faz | Resultado declarado |
|---|---|---|---|
| **ChatPetrobras** | 05/12/2023 | Copiloto de IA generativa (parceria Microsoft, Azure OpenAI) sobre base de conhecimento interna | Apoio a **mais de 100 mil trabalhadores**; resposta com citação da fonte |
| **Lê-AI** | 07/08/2024 | IA que rastreia patrimônio de devedores e apoia investigações de enriquecimento ilícito | Inédita; recuperação de bens — recuperação monetária direta |
| **Smart Tocha** | 2021 (parceria PUC-Rio) | IA monitora queima de flare e faz ajuste automático | Redução de queima desnecessária → economia + descarbonização |
| **Projeto Cortex** | 09/2025 (nossaenergia.petrobras.com.br) | IA generativa + recuperação de informação para engenharia | Acelera documentos técnicos |
| **Supercomputador Tatu** | 22/03/2023 | HPC para exploração (sísmica, geofísica) | Base computacional para ML |
| **Supercomputador Harpia** | 2024-25 | Sucessor do Tatu; classificação do top500 | Sísmica pré-sal em escala |
| **IA em segurança offshore** | 2019-2024 | Câmeras + IA em plataformas (Agência Brasil) | Redução de acidentes |
| **Manutenção preditiva de plataformas** | Valor, 21/03/2025 | IA para acelerar manutenção | Menos parada de produção |
| **Wisdom (integridade de poços)** | Investidor10, 03/02/2025 | IA para exploração/avaliação no pré-sal | Apreciação de reservas |
| **Monitoramento remoto de plataformas** | Petronotícias 2022; Agência Brasil 2021 | Telemetria integral das plataformas de Campos | OPEX e segurança |

#### O case fiscal (o mais relevante para o pitch PETROBAHIA) — não confirmado:

- **US$ 120 milhões economizados em 3 semanas** com automação fiscal + IA generativa (release do fornecedor Automation Anywhere, 07/03/2024 — FORNECEDOR/PR; replicado por TI Inside, 30/10/2024). Não confirmado pela Petrobras; no próprio release, o CIO fala em "dezenas de milhões de dólares"
- Contexto: PIS/Cofins, base de cálculo, isenções regionais. ("150 páginas de regras por período": não confirmado. Hoje o ICMS da gasolina e do diesel é monofásico por litro: R$ 1,57/L e R$ 1,17/L desde 01/01/2026 — Conv. ICMS 112/25 e 113/25)
- Resultado declarado pelo fornecedor: apuração de impostos em **3 dias (1ª vez em 15 anos)**. "+40% de eficiência": não confirmado
- **"Mais de US$ 1 bilhão" por ano** é expectativa do fornecedor para outros processos, não resultado

#### O case de previsão financeira:
- ML de previsão de receita: **+51% de precisão** nas estimativas de vendas (Agência eixos, 07/11/2024). "Segundo fontes", reduziria o erro médio em cerca de R$ 400 milhões numa receita semanal média de cerca de R$ 9 bilhões — é redução do erro de previsão, não economia, e os R$ 9 bilhões são a receita semanal, não oscilação (não confirmado). A estatal diz que a ferramenta não influencia a definição de preços de derivados
- A Petrobras também começou a desenvolver modelos de IA para o planejamento da dívida (Agência eixos, 07/11/2024)

**Elo da cadeia:** 1 (E&P) + 3 (refino) + 7 (fiscal/back-office)
**Grau:** OFICIAL (Agência) para as iniciativas; FORNECEDOR, não confirmado, para os US$ 120 milhões; ESPECIALISTA (Agência eixos, conferido) para os +51%

---

### 2.3 RAÍZEN — A CONVERGÊNCIA AGRONEGÓCIO + COMBUSTÍVEIS

**Perfil:** Shell/Cosan. 3ª distribuidora em volume em 2025: 22.262.678 m³, 16,20% (ANP). Receita da safra 25/26 (abr–mar): R$ 225.849.347.000,00 (CVM). 4.759 postos com a bandeira (ANP, cadastro de 24/09/2026). "Maior produtora de etanol do mundo (26 unidades)": não confirmado. Hub de inovação Pulse desde 2017 (oficial). Contexto: pediu recuperação extrajudicial em 11/03/2026 (dívidas de aproximadamente R$ 65,1 bilhões, valor aproximado segundo o próprio fato relevante); plano homologado em 30/07/2026.

**O case:**
- **R$ 230 milhões de redução de custos** com IA otimizando operações, com foco em transporte, acumulados desde 2021 (Estadão, 08/04/2024 — número declarado pela empresa ao jornal)
- IA na logística de etanol/açúcar: roteirização, janelas de carga, frota multimodal
- IA no agronegócio (blog oficial, 05/2026): previsão de safra, rendimento de moagem, gestão de fornecedores de cana
- Pulse hub: inovação contínua desde 2017 ("~50 startups": não confirmado)

**Elo da cadeia:** 2 (trading) + 3 (industrial usineiro) + 4 (logística)
**Grau:** IMPRENSA MAJOR (declarado) + SITE OFICIAL
**Nuance:** a recuperação da Raízen é extrajudicial (pedida em 11/03/2026; plano homologado em 30/07/2026), não judicial. Os R$ 230 milhões são acumulados, não por ano. Não usar a situação financeira de um prospect como argumento de venda.

---

### 2.4 BRASKEM — PETROQUÍMICA (o elo industrial do setor)

**Perfil:** maior petroquímica da América Latina. Polo Industrial de Camaçari (BA). Receita 2025: R$ 70.717.000.000,00 (CVM). Contexto: pediu recuperação extrajudicial em 24/08/2026.

**O case completo (Bahia Econômica, 13/08/2026 — com 3 executivos da empresa):**

**a) Manutenção preditiva e prescritiva**
- IA avalia comportamento dos ativos a partir de dados dos equipamentos
- Identifica falhas antes que aconteçam e recomenda ações preventivas
- Equipamentos estratégicos antes mantidos por intervalo de tempo agora têm o momento ótimo de intervenção definido pela IA — "evitando substituições desnecessárias" (Davi Ohlweiler, gerente de Manutenção e Confiabilidade)

**b) Central de Gestão de Ativos (CGA) — 2023**
- Rotinas computacionais automáticas de monitoramento das instalações
- Precisão na interpretação e correlação de eventos antes de um problema (Pablo Brito, engenheiro sênior)

**c) Agentes de IA para equipes industriais — 2025**
- Acesso à documentação técnica, execução de procedimentos operacionais, capacitação de operadores, suporte à decisão
- Ganho declarado: produtividade, padronização, segurança operacional (Etri Bandeira, coordenador regional de Transformação Digital Industrial)

**d) IA no desenvolvimento de software**
- Time de engenharia de software em Camaçari usa IA para acelerar criação, validação e evolução de aplicações

**e) Números do caso**
- "R$ 460 milhões/ano estimados com transformação digital/IA" (Convergência Digital citando Braskem): não confirmado
- Control Tower (IA + Big Data, visibilidade end-to-end da cadeia) — braskem.com.br (oficial)
- Resultado 2025: EBITDA recorrente de R$ 3.156.000.000,00 (2024: R$ 5.759.000.000,00) e prejuízo líquido atribuível de R$ 9.879.000.000,00. O "EBITDA +26,2% em 2025" (Investing.com) era falso

**Elo da cadeia:** 3 (refino/petroquímica) + 7 (back-office)
**Grau:** SITE OFICIAL + IMPRENSA (declarado por 3 executivos on-record)

---

### 2.5 OUTROS SINAIS NO SETOR BRASILEIRO

| Empresa | Sinal | Fonte | Grau |
|---|---|---|---|
| Lei obrigando petroleiras a investir em IA | Cláusula PD&I da ANP: cerca de R$ 34 bilhões em 27 anos, incluindo IA (não confirmado na ANP) | CPG (11/04/2026); IBP | OFICIAL-SETORIAL |
| Petroleiras + IA para eficiência/descarbonização | Trend piece com Cenpes | Valor (18/08/2026); Época (20/08/2026) | IMPRENSA MAJOR |
| Cenpes | IA em exploração, reservatórios, integridade | Valor/Época | OFICIAL (via imprensa) |
| IA no mercado de postos | Câmeras + IA no varejo (Vibra; tendência para rede toda) | Bloomberg Línea/LIDE | IMPRENSA |
| Ultrapar (Vammo) | Digitalização pós-venda, rede de recarga — automação de operação | relatório Ultrapar | OFICIAL (RI) |
| Maxtrack/Fórum Nacional de Transportes 2026 (promovido pela Vibra) | Ecossistema de telemetria+IA logística no setor | Gazeta da Semana (11/09/2026) | IMPRENSA |

---

## 3. CASES INTERNACIONAIS (BENCHMARK — ordem de grandeza)

*Fonte: blogs especializados (enkiai.com, derekwilson.ai) compilando comunicados das empresas e estudos (C3 AI, MIT). Grau ESPECIALISTA — números não confirmados, salvo o release da C3 AI indicado. Verifique nas fontes primárias (bp.com, shell.com, exxonmobil.com, chevron.com, totalenergies.com) antes de citar.*

| Empresa | Uso | Ganho declarado/estimado |
|---|---|---|
| **Shell** | Manutenção preditiva com C3 AI em mais de 13.000 equipamentos (desde 2018); digital twin de plantas | "Centenas de milhões de dólares" em valor, segundo o presidente da C3 AI (release da C3 AI, 04/06/2026 — declaração do fornecedor). "US$ 2 bilhões por ano; -40% falhas; -35% paradas; -20% custo de manutenção": não confirmado (blog) |
| **BP** | IA em exploração (sísmica), parceria Palantir 5 anos, Open Energi | +4% de produção; -90% tempo de análise sísmica; -10% paradas; US$ 10 milhões (Open Energi); meta -US$ 2 bilhões de custo (não confirmado) |
| **ExxonMobil** | Programa de redução de custos estruturais | Não é caso de IA: os cerca de US$ 9,7 bilhões (→ US$ 15 bilhões projetados) são economias estruturais de custo da empresa inteira desde 2019 |
| **Chevron** | IA em energia, HSE, previsão de demanda | 12 acidentes evitados; US$ 12 milhões no 1º ano (não confirmado) |
| **TotalEnergies** | IA para redução de metano (satélites + ML) | -47% de metano (não confirmado) |
| **Aramco/ADNOC** | IA em toda a cadeia (referência de escala no Oriente Médio) | "Centenas de milhões de USD/ano (comunicados)": não confirmado |

**Padrão internacional de ganho por tipo de uso** (compilação derekwilson.ai, grau ESPECIALISTA — não confirmado):
- Distribuição: -24% custo logístico; -50% erros de previsão
- Operação: 5-20% de economia operacional; +40% produtividade (Rand Group — benchmark de consultoria)

---

## 4. TABELA CONSOLIDADA: ONDE ESTÁ O DINHEIRO DA IA NESTE SETOR

| Tipo de uso | Elo | Ganho documentado | Empresa | Grau |
|---|---|---|---|---|
| Previsão de demanda (gêmeos digitais + ML) | 2-5 | R$ 900 milhões a menos em estoque; erro <2%; 20% melhor que o sistema anterior | Vibra | IMPRENSA MAJOR (VEJA, 05/08/2026) |
| Logística/roteirização | 4 | -11% veículos; dezenas de milhões de reais em fretes (VEJA). "-24% custo logístico (5 anos)": não confirmado | Vibra | IMPRENSA MAJOR |
| Segurança de frota (câmeras+IA) | 4 | **-67% acidentes** | Vibra | IMPRENSA MAJOR (VEJA, 05/08/2026) |
| Automação fiscal com IA generativa | 7 | US$ 120 milhões em 3 semanas; impostos em 3 dias; "mais de US$ 1 bilhão" esperado — números do fornecedor (não confirmado) | Petrobras | FORNECEDOR (PR) |
| Previsão de receita (ML) | 7 | +51% de precisão (Agência eixos, 07/11/2024). "Cerca de R$ 400 milhões de redução do erro médio": não confirmado | Petrobras | ESPECIALISTA |
| Otimização de transporte | 2-4 | **R$ 230 milhões** de redução de custos, acumulados desde 2021 | Raízen | IMPRENSA MAJOR |
| Manutenção preditiva industrial | 3 | CGA; agentes de IA (Bahia Econômica, 13/08/2026). "R$ 460 milhões/ano": não confirmado | Braskem | SITE OFICIAL + IMPRENSA |
| Copiloto interno (RAG) | 7 | Mais de 100 mil trabalhadores, com resposta citando a fonte | Petrobras | OFICIAL |
| Rastreamento de devedores (IA) | 7 | Recuperação de bens — inédito | Petrobras (Lê-AI) | OFICIAL |
| Fidelidade B2C (IA First) | 6 | "20 mi+ usuários": não confirmado; orquestração de dados | Vibra (Premmia) | IMPRENSA MAJOR |
| Manutenção de plataformas | 3 | Menos tempo de parada | Petrobras | IMPRENSA MAJOR |
| Exploração (sísmica, reservatórios) | 1 | Supercomputadores (Tatu/Harpia); Wisdom | Petrobras | OFICIAL |

**Padrão do ganho:** 3 camadas — (1) capital liberado (estoque), (2) custo evitado (logística, fiscal, manutenção, acidentes), (3) receita protegida (precisão de demanda, fidelidade).

---

## 5. O WHITE SPACE: QUEM NÃO TEM CASO PÚBLICO DE IA ENCONTRADO

Das 46 maiores de O&G do Brasil (censo Valor 1000 + nosso levantamento) — contagem sem método reprodutível (não confirmado):

- **Com caso público de IA encontrado:** Petrobras, Vibra, Raízen, Braskem, Ultrapar/Ipiranga (parcial), Cosan, Acelen (parcial) e as que usam fornecedores documentados
- **Sem caso público de IA encontrado nesta pesquisa:** incluindo PETROBAHIA, Larco, ALE, Atem+Ream, Brava Energia (ex-3R + Enauta, fundidas em 2024), PetroReconcavo, Setta, Dislub, Potencial, Royal FIC, Copercana, FAN, Stang, Idaza, Manguinhos, Peixoto de Castro, Madalena, Grasa
- Nesta pesquisa, não encontramos caso público de IA em distribuidora regional do NE
- **Atenção:** ausência de caso público não prova que a empresa não use IA — não usar como afirmação sobre as empresas

---

## 6. IMPLICAÇÕES PARA O PITCH

1. **O caso Vibra é o script completo do que vender:** previsão de demanda (98% de precisão) → capital liberado → custo logístico menor → segurança → agentes autônomos. Cada etapa é um produto que a Cultura Builder empacota.
2. **O caso fiscal da Petrobras (US$ 120 milhões/3 semanas) não foi confirmado** — é número do fornecedor Automation Anywhere (07/03/2024); não usar sem nova checagem. Se usar, citar como "case de fornecedor", nunca como dado oficial da Petrobras.
3. **A Braskem mostra IA industrial em escala regional** (Camaçari — BA), com casos on-record (Bahia Econômica, 13/08/2026). A empresa pediu recuperação extrajudicial em 24/08/2026 — não usar como argumento.
4. **O dado do IBGE (16,9%→41,9%) fecha a janela:** se 41,9% das empresas industriais já usavam IA em 2024, ficar sem IA em 2026 é desvantagem competitiva, não "inovação futura".
5. **RenovaBio é o gatilho urgente** (dado oficial ANP, 14/07/2026): 37 das 163 distribuidoras ficaram abaixo de 100% da meta de 2025 (19 com 0%) e 4 estão sem percentual por liminar; 122 cumpriram 100%. Royal FIC: 30,89%. TDC: 31,19%. Rodoil: 85%. Setta: 92,07%. Vibra: 98,86%. PETROBAHIA: 100%. Descumprir a meta é crime ambiental (Lei 15.082/2024). A dor existe, é mensurável e é pública.
6. **A oferta da Cultura Builder está no elo 4-7** (logística, varejo, fiscal, back-office) — onde estão os casos brasileiros confirmados (Vibra e Raízen).

---

## 7. METODOLOGIA E HONESTIDADE

- Tudo acima é **publicamente verificável** nas fontes citadas; o que não foi conferido está marcado (não confirmado).
- Nenhum órgão oficial (ANP/EPE/IBGE) publica censo de adoção de IA por empresa do setor — a classificação "IA documentada" vem de: (a) documentos de RI, (b) imprensa major com declaração da empresa, (c) sites oficiais.
- Números internacionais são de ordem de grandeza (blogs especializados citando comunicados) — não citar como "oficiais".
- O US$ 120 milhões da Petrobras é case de fornecedor (Automation Anywhere, 07/03/2024) — não confirmado pela Petrobras; conferir na divulgação da Petrobras antes de qualquer uso.
- Estimativas da Cultura Builder (margem, ROI, payback) estão declaradas em 06-fontes.md §8.

### Fontes primárias dos cases completos
- VEJA Radar Econômico, 05/08/2026 — veja.abril.com.br/economia/ia-libera-r-900-milhoes-que-a-vibra-mantinha-em-estoques/ (texto completo obtido)
- Bahia Econômica, 13/08/2026 — bahiaeconomica.com.br/wp/2026/08/13/braskem-amplia-eficiencia-e-seguranca-operacional-com-inteligencia-artificial/ (texto completo obtido)
- Agência Petrobras — agencia.petrobras.com.br (artigos ChatPetrobras 05/12/2023; Lê-AI 07/08/2024; Tatu 22/03/2023; Harpia)
- Agência eixos, 07/11/2024 — "Petrobras amplia uso da tecnologia e prevê receitas com machine learning" (texto obtido)
- Automation Anywhere (PR Newswire), 07/03/2024 — release do fornecedor sobre a Petrobras (texto obtido)
- C3 AI, 04/06/2026 — "C3 AI and Shell Expand Collaboration" (texto obtido)
- Vibra — Relato Integrado 2024, p. 12 (PDF obtido)
- ANP — relatorio-cumprimento-meta-2025.xlsx (atualização 14/07/2026, baixado em fontes/)
- CVM — dados abertos, DFP 2025 (receitas); ANP — vendas por distribuidora 2025 e cadastro de postos de 24/09/2026
- Estadão, 08/04/2024 — Raízen R$ 230 milhões (título confirmado via Google News)
- 06-fontes.md §3-4 — tabela completa de fontes com datas
