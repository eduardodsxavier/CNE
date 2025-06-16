# 📅 CNE - Calendário do Núcleo de Estágios da UNICEPLAC

**Objetivo:**
Substituir planilhas e documentos físicos por uma aplicação web moderna, centralizando informações sobre **cenários de estágio**, **alunos**, **disciplinas**, **unidades concedentes**, **responsáveis por TCE** e **estágios em andamento**.

---

## ✅ Escopo

* 🔐 Autenticação com controle de acesso por perfil
* 📆 Interface de calendário com filtros dinâmicos
* 🧽 Criação de cenários em etapas (wizard)
* 📋 Gerenciamento de usuários, alunos, disciplinas, unidades e responsáveis
* ⚙️ Funcionalidades específicas para administradores (edição, exclusão lógica)
* 💰 Registro de status e valores financeiros por cenário

**❌ Fora do Escopo**

* Integrações externas (sistemas acadêmicos)
* Envio de e-mails automáticos
* Aplicativos mobile

---

## 🌟 Critérios de Sucesso

* Funcionalidade completa entregue até **25/06/2025**
* Sistema utilizado no ambiente real pelo Núcleo de Estágios
* Acesso completo ao calendário e cenários no sistema

---

## 🚀 Como Executar Localmente

```bash
./mvnw clean package -DskipTests
```

```bash
docker compose up --build
```

---

## 🧹 Estrutura do Projeto

| Elemento             | Localização                      |
| -------------------- | -------------------------------- |
| Escopo funcional     | `/docs/escopo.pdf`               |
| Diagrama ER          | `/docs/diagrama-er.png`          |
| Código-fonte         | `/src` (Spring Boot + Thymeleaf) |
| Banco de Dados       | Docker (PostgreSQL)              |
| Interface (Frontend) | Templates Thymeleaf              |
| Execução local       | `docker-compose.yml`             |

---

## 📌 Planejamento

### 📦 Forma de entrega

* Repositório GitHub público com README, escopo e diagrama ER

### 🧪 Critério de aceite

* Sistema funcional de acordo com o escopo aprovado

### 🛠️ Ambiente

* Docker com `docker-compose`

### ⏱️ Prazo final

* **25/06/2025**

---

## 🛠️ Tarefas por Módulo

| Módulo                     | Tarefas                                                   |
| -------------------------- | --------------------------------------------------------- |
| **Autenticação**           | Login, primeiro acesso, recuperação de senha              |
| **Calendário de Cenários** | Visualização mensal com filtros                           |
| **Wizard de Cenários**     | 6 etapas: aluno, disciplina, unidade, TCE, valores, datas |
| **CRUD Geral**             | Usuários, alunos, disciplinas, unidades, responsáveis     |
| **Regras de Negócio**      | Permissões, visualizações, inativação (soft delete)       |
| **Interface Responsiva**   | Layout com Thymeleaf                                      |
| **Banco de Dados**         | Modelagem, criação de tabelas, integração com JPA         |
| **Dockerização**           | Ambientes Spring + PostgreSQL                             |
| **Documentação**           | README, escopo, diagrama ER                               |

---

## ⏳ Estimativas

| Tarefa                     | Estimativa  |
| -------------------------- | ----------- |
| Login / Autenticação       | 2 dias      |
| Calendário                 | 3 dias      |
| Wizard de Cenários         | 4 dias      |
| CRUD de Cadastros          | 4 dias      |
| Regras de Negócio          | 2 dias      |
| Modelagem e Banco de Dados | 2 dias      |
| Front-end (Thymeleaf)      | 3 dias      |
| Dockerização               | 1 dia       |
| Documentação               | 1 dia       |
| **Total estimado**         | **22 dias** |

---

## 📅 Cronograma

| Etapa                      | Início     | Fim        |
| -------------------------- | ---------- | ---------- |
| Levantamento de Requisitos | 01/06/2025 | 03/06/2025 |
| Prototipação               | 04/06/2025 | 05/06/2025 |
| Desenvolvimento            | 06/06/2025 | 20/06/2025 |
| Testes Manuais e Ajustes   | 21/06/2025 | 23/06/2025 |
| **Entrega Final**          | —          | 25/06/2025 |

---

## 👥 Equipe de Desenvolvimento

| Nome                                                   | Função                               |
| ------------------------------------------------------ | ------------------------------------ |
| [Marcelo de Souza](https://github.com/Marcelo914)      | Gerente de Projetos / Infraestrutura |
| [Daniel Cintra](https://github.com/DanielCs1609)       | UI/UX Designer                       |
| [Eduardo da Silva](https://github.com/eduardodsxavier) | Analista de Requisitos               |
| [Marcos André](https://github.com/Dede-0081)           | Desenvolvedor                        |
| [Marianna Alves](https://github.com/marixlo)           | Desenvolvedora                       |

---

## 💻 Tecnologias Utilizadas

* Java 17 + Spring Boot
* Spring Security (JWT)
* PostgreSQL
* JPA / Hibernate
* Thymeleaf
* Docker + Docker Compose
* Git + GitHub

---

## 📊 Esforço e Custo

* **Carga horária total:** 160 horas
* **Custo estimado:**

  * Acadêmico: R\$ 7.500,00
  * Mercado: R\$ 15.000,00+

---

## ⚠️ Riscos

| Risco                         | Probabilidade | Impacto | Mitigação                                  |
| ----------------------------- | ------------- | ------- | ------------------------------------------ |
| Atraso nas entregas           | Média         | Médio   | Reuniões semanais e boa divisão de tarefas |
| Mudança de escopo             | Baixa         | Alto    | Escopo fixo com validação inicial          |
| Falta de testes automatizados | Alta          | Médio   | Testes manuais reforçados                  |
| Problemas com Docker          | Média         | Médio   | Testes locais e documentação clara         |

---

## 🔗 Repositório

[https://github.com/eduardodsxavier/CNE](https://github.com/eduardodsxavier/CNE)
