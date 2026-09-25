# Proposta Comercial — PETROBAHIA

> Revisado em 24/09/2026: números conferidos em fonte oficial. Os dados usados na apresentação estão em lp-apresentacao/src/lib/dados-oficiais.ts. Itens marcados como (não confirmado) não devem ser usados sem nova checagem.
>
> **Rascunho interno.** Este arquivo não é uma proposta enviada: não existe proposta comercial para a Petrobahia.

## Digitalização e IA para distribuição de combustíveis
### Cultura Builder

---

## 1. Resumo executivo

A Petrobras economizou **US$ 120 milhões em 3 semanas** com automação fiscal e IA generativa,
arquivou impostos em 3 dias pela primeira vez em 15 anos e projetou **mais de US$ 1 bilhão**
de economia adicional (não confirmado: números do release do fornecedor Automation Anywhere, de
07/03/2024, não da Petrobras; o US$ 1 bilhão é expectativa, não resultado). A Shell economiza
**US$ 2 bilhões por ano** com manutenção preditiva (não confirmado: o release da C3 AI de 04/06/2026
fala em "centenas de milhões de dólares"). A BP aumentou a produção em **4%** com IA (não confirmado).

Casos confirmados que podem substituir os de cima: a Vibra reduziu em R$ 900 milhões o estoque com IA
(VEJA, 05/08/2026); a Raízen reduziu custos em R$ 230 milhões com IA (Estadão, 08/04/2024).

Essas ferramentas existem há anos — mas ficaram presas nas grandes. As distribuidoras
regionais, que vendem margem apertada e capital de giro caro, operam com telefone, planilha
e WhatsApp (hipótese, não confirmado).

**A Cultura Builder entrega a versão regional dessas tecnologias em semanas, não em anos.**

Esta proposta cobre 3 frentes integradas para a PETROBAHIA:

1. **Petrobahia Digital** — portal B2B de cotação, pedidos e crédito para revendas e frotistas
2. **Cérebro Comercial** — IA para precificação, previsão de demanda e prospecção
3. **Conformidade Sem Dor** — automação fiscal multi-estado + segurança (OWASP)

Investimento total sugerido: **R$ 75.000,00 a R$ 125.000,00** (3 meses) + retainer opcional.
ROI esperado: **10x a 40x** (estimativa interna, não confirmado; detalhado na seção 7).

---

## 2. Diagnóstico (o que sabemos da PETROBAHIA)

| Fato | Fonte |
|---|---|
| CNPJ aberto em 02/04/1996, em Salvador-BA. "Uma das primeiras regionais pós-abertura do mercado": não confirmado | Receita Federal; petrobahia.com.br |
| 154 postos com a bandeira em 10 UFs de 4 regiões (o "130+" era de 2022) | ANP, cadastro de 24/09/2026 |
| 9ª distribuidora do país em volume em 2025: 2.030.040 m³ (1,48%), +8,3% sobre 2024 | ANP, vendas por distribuidora |
| 5 bases próprias com 28.786 m³ (Luís Eduardo Magalhães/BA, São Francisco do Conde/BA, Balsas/MA, Itabuna/BA, Juazeiro/BA) e terminais de terceiros em 20 municípios. O "18 bases: 6 próprias (com Pojuca/BA) + 12 filiais" não se sustenta | ANP, abr/2026 |
| Trading próprio em Suape/PE (CNAE 46.81-8/01; capital social): não confirmado | Receita Federal (via agregador) |
| Portfólio: gasolina, etanol, diesel, Diesel Clean BAC, ODM, GNV/GNL, linha Impulse | petrobahia.com.br |
| Usina de etanol de milho em Correntina/Jaborandi-BA, "1ª da Bahia": cerca de R$ 1 bilhão (não confirmado) | NovaCana, 01/11/2024 |
| Investimento em gás para Sergipe + liquefação com Bahia Gás: não confirmado | imprensa (sem fonte específica) |
| Diferenciais declarados: crédito pré-aprovado, seguro de carga, garantia de suprimento | petrobahia.com.br |

### Lacunas identificadas (hipóteses a validar no diagnóstico)
- Funil de captação de postos "Seja um Bandeirado" é offline (telefone/WhatsApp) — sem LP, sem SEO, sem rastreio
- Precificação por base/região não é sistêmica (decisão comercial manual)
- Esteira fiscal multi-estado (BA, MA, PE, PI, GO, MT, MG, TO, AL, PB, SE) consome time contábil (a ANP registra postos da bandeira em 10 UFs)
- Sem portal B2B: revenda liga ou chama no WhatsApp para cotação e pedido

---

## 3. As 3 dores que atacamos (com prova de mercado)

### Dor 1 — Fiscal (a dor nº 1 do setor)
O ICMS da gasolina e do diesel é monofásico, por litro e igual em todo o país: R$ 1,57/L e
R$ 1,17/L desde 01/01/2026 (Conv. ICMS 112/25 e 113/25). Seguem PIS/Cofins, subvenções,
transações interestaduais e isenções regionais. A CBS por litro substitui PIS/Cofins nos
combustíveis em 01/01/2027 (IBS de 0,1% em 2027–28; IBS por litro a partir de 2029; transição
até 2033 — LC 214/2025): a esteira fiscal de todas as distribuidoras do país terá de ser refeita.
("150 páginas de regras fiscais por período só na Petrobras": não confirmado.)

**Prova (não confirmado):** Petrobras + Automation Anywhere + IA generativa = US$ 120 milhões economizados
em 3 semanas e impostos arquivados em 3 dias (primeira vez em 15 anos) — números do release do
fornecedor (07/03/2024), não da Petrobras. "+40% de eficiência": não confirmado.

### Dor 2 — Margem e capital de giro
Receita oscila com Brent + câmbio. (Correção: os cerca de R$ 9 bilhões por semana citados pela
Agência eixos, 07/11/2024, são a receita semanal média da Petrobras, não flutuação.) Revenda paga
30-45 dias (não confirmado), tributo embutido no custo de compra, Selic alta. A Raízen — 3ª
distribuidora do país em volume em 2025 (ANP) — pediu recuperação extrajudicial em 11/03/2026,
com dívidas de aproximadamente R$ 65,1 bilhões (valor aproximado segundo o próprio fato relevante);
o plano foi homologado em 30/07/2026.

**Prova:** o modelo de machine learning da Petrobras melhorou em 51% a precisão das estimativas de
vendas (Agência eixos, 07/11/2024). "Segundo fontes", reduziria o erro médio em cerca de R$ 400 milhões
numa receita semanal média de cerca de R$ 9 bilhões — é redução do erro de previsão, não economia
(não confirmado).

### Dor 3 — Crescimento da rede
61,61% dos 12.950 postos do Nordeste (7.978) são de bandeira branca (ANP, cadastro de 24/09/2026).
A disputa por esses postos é concentrada em força comercial e preço. Quem digitaliza o funil
(LP + prospecção IA + portal com crédito) captura mais rápido que o concorrente.

**Prova:** distribuidoras com funil digital captam e onboarding revendas a um custo por
posto 3-5x menor que o funil telefônico (benchmark B2B de mercado; não confirmado).

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
| Automação de apuração multi-estado | Pipeline com IA para ICMS/PIS/Cofins por base; prepara o terreno para CBS/IBS |
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
| Vibra | R$ 900 milhões a menos em estoque com IA (VEJA, 05/08/2026) | Estoque e capital de giro por base |
| Raízen | R$ 230 milhões de redução de custos com IA (Estadão, 08/04/2024) | Logística e transporte |
| Petrobras | US$ 120 milhões economizados em 3 semanas (fiscal + IA) — número do fornecedor Automation Anywhere (não confirmado) | Mesma esteira fiscal, escala menor |
| Petrobras | +51% de precisão na previsão de vendas (Agência eixos, 07/11/2024); "cerca de R$ 400 milhões de redução do erro médio" (não confirmado; não é economia) | Caixa por base |
| Shell | "US$ 2 bilhões/ano em manutenção preditiva" (não confirmado); o release da C3 AI (04/06/2026) fala em mais de 13.000 equipamentos e "centenas de milhões de dólares" | Bases e frota própria |
| BP | +4% produção; -90% tempo de interpretação sísmica (não confirmado) | Prova de maturidade da IA no setor |
| Chevron | 12 acidentes maiores evitados, US$ 12 milhões (não confirmado) | Segurança operacional |
| ExxonMobil | Não é caso de IA: os cerca de US$ 9,7 bilhões são economias estruturais de custo da empresa inteira desde 2019 | Não usar |

---

## 7. ROI estimado (premissas conservadoras)

| Premissa | Valor |
|---|---|
| Faturamento anual estimado da rede (premissa de 130 postos; a ANP registra 154 com a bandeira em 24/09/2026) | R$ 1.500.000.000,00 a R$ 3.000.000.000,00 (estimativa interna, não confirmado) |
| Melhoria de margem com precificação inteligente | +0,5% a +1,5% (estimativa interna, não confirmado) |
| Ganhos em margem/ano | R$ 7.500.000,00 a R$ 45.000.000,00 (estimativa interna, não confirmado) |
| Economia fiscal (automatização de apuração, reduz horas contábeis) | R$ 300.000,00 a R$ 1.000.000,00 por ano (estimativa interna, não confirmado) |
| Postos captados via funil digital (vs. telefone) | +10 a +30 postos/ano (estimativa interna, não confirmado) |
| Investimento total (3 pacotes) | R$ 75.000,00 a R$ 125.000,00 |
| **Payback estimado** | **1 a 3 meses** (estimativa interna, não confirmado) |

---

## 8. Por que a Cultura Builder (e não a consultoria)

- **Velocidade:** entregas em semanas; consultoria tradicional exige 6-12 meses (não confirmado)
- **Custo:** 5-10x menor que big consultorias (estimativa interna, não confirmado)
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
