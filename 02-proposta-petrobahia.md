# Proposta Comercial — PETROBAHIA
## Digitalização e IA para distribuição de combustíveis
### Cultura Builder

---

## 1. Resumo executivo

A Petrobras economizou **US$ 120 milhões em 3 semanas** com automação fiscal e IA generativa,
arquivou impostos em 3 dias pela primeira vez em 15 anos e projetou **mais de US$ 1 bilhão**
de economia adicional. A Shell economiza **US$ 2 bilhões por ano** com manutenção preditiva.
A BP aumentou a produção em **4%** com IA.

Essas ferramentas existem há anos — mas ficaram presas nas grandes. As distribuidoras
regionais, que vendem margem apertada e capital de giro caro, operam com telefone, planilha
e WhatsApp.

**A Cultura Builder entrega a versão regional dessas tecnologias em semanas, não em anos.**

Esta proposta cobre 3 frentes integradas para a PETROBAHIA:

1. **Petrobahia Digital** — portal B2B de cotação, pedidos e crédito para revendas e frotistas
2. **Cérebro Comercial** — IA para precificação, previsão de demanda e prospecção
3. **Conformidade Sem Dor** — automação fiscal multi-estado + segurança (OWASP)

Investimento total sugerido: **R$ 75.000 a R$ 125.000** (3 meses) + retainer opcional.
ROI esperado: **10x a 40x** (detalhado na seção 7).

---

## 2. Diagnóstico (o que sabemos da PETROBAHIA)

| Fato | Fonte |
|---|---|
| Fundada em 1996 em Salvador-BA, uma das primeiras regionais pós-abertura do mercado | petrobahia.com.br |
| 130+ postos bandeirados em NE, N, CO e SE | Movimento Econômico, 2022 |
| 18 bases: 6 próprias (Balsas/MA, Itabuna/BA, Juazeiro/BA, LEM/BA, Pojuca/BA, São Francisco do Conde/BA) + 12 filiais | petrobahia.com.br |
| Trading próprio em Suape/PE (capital R$ 68 mi, CNAE 46.81-8/01) | Receita Federal |
| Portfólio: gasolina, etanol, diesel, Diesel Clean BAC, ODM, GNV/GNL, linha Impulse | petrobahia.com.br |
| R$ 1 bi em usina de etanol de milho (Correntina/Jaborandi-BA) — 1ª da Bahia | NovaCana, 2024 |
| R$ 50 mi em gás para Sergipe + liquefação com Bahia Gás | imprensa |
| Diferenciais declarados: crédito pré-aprovado, seguro de carga, garantia de suprimento | petrobahia.com.br |

### Lacunas identificadas (hipóteses a validar no diagnóstico)
- Funil de captação de postos "Seja um Bandeirado" é offline (telefone/WhatsApp) — sem LP, sem SEO, sem rastreio
- Precificação por base/região não é sistêmica (decisão comercial manual)
- Esteira fiscal multi-estado (BA, MA, PE, PI, GO, MT, MG, TO, AL, PB, SE) consome time contábil
- Sem portal B2B: revenda liga ou chama no WhatsApp para cotação e pedido

---

## 3. As 3 dores que atacamos (com prova de mercado)

### Dor 1 — Fiscal (a dor nº 1 do setor)
150 páginas de regras fiscais por período só na Petrobras. ICMS diferente por estado,
PIS/Cofins, base de cálculo com frete e encargos, transações interestaduais, isenções
regionais. A partir de 2026, a Reforma Tributária (IBS/CBS) obriga a reescrever toda
a esteira fiscal de todas as distribuidoras do país.

**Prova:** Petrobras + Automation Anywhere + IA generativa = US$ 120 mi economizados
em 3 semanas; impostos arquivados em 3 dias (primeira vez em 15 anos); +40% de eficiência.

### Dor 2 — Margem e capital de giro
Receita oscila com Brent + câmbio (Petrobras: R$ 9 bi/semana de flutuação). Revenda paga
30-45 dias, ICMS por antecipação, Selic alta. Raízen — 2ª maior distribuidora do país —
entrou em recuperação extrajudicial com R$ 65,1 bi de dívida.

**Prova:** ML de previsão de receita da Petrobras melhorou a precisão em 51% e reduziu
o erro de previsão em ~R$ 400 mi sobre uma base semanal de R$ 9 bi.

### Dor 3 — Crescimento da rede
49,4% dos 10.332 postos do Nordeste são de bandeira branca. A disputa por esses postos é
concentrada em força comercial e preço. Quem digitaliza o funil (LP + prospecção IA + portal
com crédito) captura mais rápido que o concorrente.

**Prova:** distribuidoras com funil digital captam e onboarding revendas a um custo por
posto 3-5x menor que o funil telefônico (benchmark B2B de mercado).

---

## 4. A oferta — 3 pacotes integrados

### Pacote A — "Petrobahia Digital" (fundação)
| Item | Detalhe |
|---|---|
| Portal B2B de cotação/pedidos/crédito | Next.js + PostgreSQL + deploy Vercel; login por CNPJ da revenda; saldo, faturas, cotação por produto e base; histórico |
| LP "Seja um Bandeirado" | Página de alta conversão (design + copy + SEO técnico) com formulário qualificado e rastreio |
| Painel interno de rede | Dashboard de postos, contratos, volumes por base |
| Prazo | 6-8 semanas |
| Investimento sugerido | R$ 35.000 - R$ 50.000 |

### Pacote B — "Cérebro Comercial" (IA)
| Item | Detalhe |
|---|---|
| Copiloto de precificação | Preço sugerido por produto × base × região, alimentado por histórico de vendas, Brent, câmbio e concorrência |
| Previsão de demanda por posto | ML sobre séries temporais (replica a lógica do case Petrobras em escala regional) |
| Scoring de crédito de revenda | Modelo de risco com dados cadastrais + histórico de pagamento; integra com o crédito pré-aprovado |
| Agente de prospecção | IA que gera e qualifica listas de postos de bandeira branca por região e produz roteiros de abordagem |
| Prazo | 8-10 semanas (pode rodar em paralelo ao A) |
| Investimento sugerido | R$ 30.000 - R$ 55.000 |

### Pacote C — "Conformidade Sem Dor" (fiscal + segurança)
| Item | Detalhe |
|---|---|
| Automação de apuração multi-estado | Pipeline com IA para ICMS/PIS/Cofins por base; prepara o terreno para IBS/CBS |
| Hardening de segurança | Checklist OWASP no portal (pagamentos, dados de revendas), trilha de auditoria |
| Copiloto de compliance | RAG sobre legislação ANP + tributária; responde dúvidas do time com citação da fonte |
| Prazo | 4-6 semanas |
| Investimento sugerido | R$ 15.000 - R$ 25.000 |

**Retainer opcional pós-entrega:** R$ 8.000 - R$ 15.000/mês (evolução, suporte, novos agentes).

*Observação: valores são referência para validação com a tabela interna da Cultura Builder.*

---

## 5. Cronograma de 90 dias

| Semanas | Entrega |
|---|---|
| 1-2 | Diagnóstico: entrevistas, mapeamento de dados, desenho da arquitetura |
| 3-6 | Pacote A em produção: portal B2B v1 + LP Seja um Bandeirado no ar |
| 7-10 | Pacote B v1: copiloto de precificação + previsão de demanda |
| 11-12 | Pacote C: automação fiscal v1 + hardening OWASP + treinamento do time |

---

## 6. Casos de prova (resumo executável)

| Player | Resultado | Relevância para a PETROBAHIA |
|---|---|---|
| Petrobras | US$ 120 mi economizados em 3 semanas (fiscal + IA) | Mesma esteira fiscal, escala menor |
| Petrobras | +51% de precisão em previsão de receita (~R$ 400 mi de erro evitado) | Preço e caixa por base |
| Shell | US$ 2 bi/ano em manutenção preditiva | Bases e frota própria |
| BP | +4% produção; -90% tempo de interpretação sísmica | Prova de maturidade da IA no setor |
| Chevron | 12 acidentes maiores evitados, US$ 12 mi | Segurança operacional |
| ExxonMobil | US$ 9,7 bi de economia estrutural com IA em trading/refino | Comercial e precificação |

---

## 7. ROI estimado (premissas conservadoras)

| Premissa | Valor |
|---|---|
| Faturamento anual estimado da rede (130 postos) | R$ 1,5 bi - R$ 3 bi |
| Melhoria de margem com precificação inteligente | +0,5% a +1,5% |
| Ganhos em margem/ano | R$ 7,5 mi - R$ 45 mi |
| Economia fiscal (automatização de apuração, reduz horas contábeis) | R$ 300 mil - R$ 1 mi/ano |
| Postos captados via funil digital (vs. telefone) | +10 a +30 postos/ano |
| Investimento total (3 pacotes) | R$ 75 mil - R$ 125 mil |
| **Payback estimado** | **1 a 3 meses** |

---

## 8. Por que a Cultura Builder (e não a consultoria)

- **Velocidade:** entregas em semanas; consultoria tradicional exige 6-12 meses
- **Custo:** 5-10x menor que big consultorias
- **IA nativa:** engenharia de prompts, RAG e avaliação de LLM são competência de casa, não subcontratada
- **Fim a fim:** design, desenvolvimento, conteúdo, SEO, segurança e code review internos
- **Stack comprovada:** Next.js, PostgreSQL, Vercel, padrões OWASP

---

## 9. Próximos passos

1. Reunião de 60 minutos com o diretor comercial + fiscal (diagnóstico guiado)
2. Proposta ajustada com números reais da PETROBAHIA
3. Piloto: LP "Seja um Bandeirado" no ar em 2 semanas (prova de valor antes do contrato maior)

**Contato:** Cultura Builder — nascimentokelvin93@gmail.com

---

*Anexos: benchmark completo do setor, dossiê de mercado, lista de alvos replicáveis (arquivos 00-dossie-mercado.md e 01-alvos-mercado.md).*
