# Exercício: Formulário com Validação e Cálculo de IR

## 🎯 Objetivo
Este projeto tem como objetivo praticar **HTML, CSS e JavaScript** por meio da criação de um formulário de cadastro que:
- Valida os campos com regras específicas (nome, CPF, login, e-mail, senha, etc.).
- Aplica feedback visual de erro/sucesso.
- Calcula o **Imposto de Renda (IR)** com base no salário e no número de dependentes, utilizando uma tabela simplificada de alíquotas.

## 📋 Funcionalidades
- **Validação de campos:**
  - Nome completo: mínimo 3 caracteres.
  - CPF: obrigatório, formato `000.000.000-00` (regex).
  - Login: mínimo 4 caracteres, apenas letras, números e símbolos `. _ -`.
  - E-mail: formato válido (regex simples).
  - Senha: mínimo 8 caracteres, contendo ao menos 1 letra e 1 número.
  - Confirmação de senha: deve ser idêntica à senha digitada.
  - Salário: obrigatório, valor numérico maior que zero.
  - Dependentes: inteiro ≥ 0.

- **Cálculo de IR (após sair do campo dependentes):**
  - Base = Salário – (200 × número de dependentes).
  - Se a base < 0, usar 0.
  - Aplicar alíquota única conforme tabela:

    | Faixa (mensal)             | Alíquota |
    |-----------------------------|----------|
    | Até R$ 2.000,00             | Isento   |
    | R$ 2.000,01 – R$ 3.000,00   | 7,5%     |
    | R$ 3.000,01 – R$ 4.500,00   | 15%      |
    | R$ 4.500,01 – R$ 6.000,00   | 22,5%    |
    | Acima de R$ 6.000,00        | 27,5%    |

- **Botões:**
  - `Cadastrar`: valida todos os campos, impede envio se houver erros, foca no primeiro campo inválido e mostra mensagem de sucesso caso tudo esteja correto.
  - `Limpar`: reseta o formulário, retira classes visuais `.is-valid` e `.is-invalid`, e zera o campo IR para `0,00`.

- **UX:**
  - Mensagens de erro específicas ao lado de cada campo inválido.
  - Campos válidos/ inválidos destacados com bordas coloridas.
  - Botão “olhinho” para mostrar/ocultar senha.

## ▶️ Como executar
1. Clone ou baixe este repositório.
2. Abra o arquivo `index.html` no navegador.
3. Preencha o formulário e teste as validações.

## 📝 Exemplo de uso
- **Entrada:**
  - Nome: João Silva  
  - CPF: `123.456.789-09`  
  - Login: `joao.silva`  
  - E-mail: `joao@email.com`  
  - Senha: `abc12345`  
  - Confirmação: `abc12345`  
  - Salário: `3500`  
  - Dependentes: `2`  

- **Processamento:**
  - Base = 3500 – (200 × 2) = 3100  
  - Faixa: 15%  
  - IR = 465,00  

- **Saída:**
  - Campo IR exibirá: `465,00`  
  - Mensagem: `Usuário cadastrado com sucesso`.

---

## 📂 Estrutura do repositório
├── index.html
├── style.css
├── script.js
└── README.md

---

## 💡 Observações
- Este exercício é apenas **didático** e não representa a regra oficial de cálculo de IR.  
- Para algumas funções em **JavaScript**, utilizei a **IA ChatGPT** para compreender e implementar recursos que ainda não conhecia.  
- Também foi utilizada a **IA ChatGPT** para auxiliar na criação da estrutura do **HTML**, garantindo que todas as `div`s e `id`s estivessem alinhados corretamente com o CSS disponibilizado em aula.  
- Este documento READ.md também foi realizado utilizando IA, pois não conhecimento em **markdown**. Deis instruções para a realização deste.
