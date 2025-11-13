# 🔑 Como Pegar a Chave da API (SUPER SIMPLES)

## O que é essa chave?

É como uma "senha" que permite seu app usar o serviço de clima do OpenWeatherMap.
**É DE GRAÇA** e leva apenas 5 minutos!

---

## Passo 1: Criar Conta

### 1.1 - Abra este link no navegador:
```
https://home.openweathermap.org/users/sign_up
```

### 1.2 - Preencha o formulário:

Você vai ver uma tela pedindo:

- **Username** → Digite um nome de usuário (ex: `seunome123`)
- **Email** → Seu email
- **Password** → Crie uma senha
- **Repeat Password** → Repita a mesma senha
- ✅ Marque a caixinha "I am 16 years old and over"
- ✅ Marque "I agree with Privacy Policy..."

### 1.3 - Clique no botão laranja "Create Account"

### 1.4 - Verifique seu email

Você vai receber um email com assunto tipo:
**"Please confirm your email address"**

📧 **Abra o email** e clique no link de confirmação dentro dele.

---

## Passo 2: Pegar a Chave

### 2.1 - Faça login

Depois de confirmar o email, acesse:
```
https://home.openweathermap.org/users/sign_in
```

Digite seu **email** e **senha** e clique em "Sign In"

### 2.2 - Ir para API Keys

Você vai ver um menu no topo da página.
Clique em **"API keys"**

OU acesse diretamente:
```
https://home.openweathermap.org/api_keys
```

### 2.3 - Copiar a chave

Você vai ver uma tela assim:

```
API keys
────────────────────────────────────────
Key                                    Actions
────────────────────────────────────────
abc123def456ghi789jkl012mno345pqr678   Delete

Create key: [________] [Generate]
────────────────────────────────────────
```

**Copie** a sequência de letras e números (a chave).

Exemplo: `abc123def456ghi789jkl012mno345pqr678`

⚠️ **IMPORTANTE:**
A chave pode levar de **10 a 15 minutos** para ficar ativa depois que você criar a conta.
Se não funcionar imediatamente, aguarde um pouco!

---

## Passo 3: Colocar no Projeto

### 3.1 - Criar arquivo .env

Abra seu projeto no editor de código.

Na **pasta raiz** (onde está o README.md), crie um arquivo chamado:
```
.env
```

⚠️ **É só ".env" mesmo**, sem nada antes ou depois!

### 3.2 - Adicionar a chave

Dentro do arquivo `.env`, escreva:

```env
OPENWEATHER_API_KEY=abc123def456ghi789jkl012mno345pqr678
```

**IMPORTANTE:**
- Cole SUA chave (a que você copiou)
- Não coloque aspas, espaços ou nada mais
- É só a chave depois do `=`

### 3.3 - Salvar

Salve o arquivo `.env` (Ctrl+S)

---

## Passo 4: Configurar API também

Agora vá na pasta da API:

```bash
cd apps/api
```

Copie o arquivo de exemplo:

```bash
# Windows (Git Bash)
cp .env.example .env

# OU se não funcionar, crie manualmente
```

Abra `apps/api/.env` e cole a **MESMA CHAVE**:

```env
OPENWEATHER_API_KEY=abc123def456ghi789jkl012mno345pqr678
PORT=3000
```

Salve (Ctrl+S)

---

## ✅ Pronto! Como saber se funcionou?

### Testar a chave:

Abra este link no navegador (substitua `SUA_CHAVE` pela sua chave):

```
https://api.openweathermap.org/data/2.5/weather?q=London&appid=SUA_CHAVE&units=metric
```

**Exemplo com chave de verdade:**
```
https://api.openweathermap.org/data/2.5/weather?q=London&appid=abc123def456ghi789jkl012mno345pqr678&units=metric
```

### Se funcionou:

Você vai ver um monte de texto assim:

```json
{
  "weather": [{"main": "Clouds", "description": "broken clouds"}],
  "main": {"temp": 15.5, "feels_like": 14.2},
  "name": "London"
}
```

🎉 **SUCESSO!** Sua chave está funcionando!

### Se deu erro:

Você vai ver:

```json
{
  "cod": 401,
  "message": "Invalid API key"
}
```

**Motivos:**
1. ⏰ Chave ainda não ativou → Aguarde 10-15 minutos
2. ❌ Você copiou errado → Copie de novo com cuidado
3. 📧 Não confirmou o email → Verifique sua caixa de entrada

---

## 🔒 Segurança

**NUNCA** compartilhe sua chave com ninguém!
**NUNCA** coloque no GitHub!

O arquivo `.env` já está configurado para ser ignorado pelo Git, então não vai subir para o GitHub acidentalmente.

---

## 📋 Resumo Rápido

1. ✅ Criar conta: https://home.openweathermap.org/users/sign_up
2. ✅ Confirmar email
3. ✅ Pegar chave: https://home.openweathermap.org/api_keys
4. ✅ Criar arquivo `.env` na raiz do projeto
5. ✅ Escrever: `OPENWEATHER_API_KEY=sua_chave_aqui`
6. ✅ Fazer o mesmo em `apps/api/.env`
7. ✅ Testar no navegador

---

## ❓ Dúvidas?

**"Não recebi o email de confirmação"**
→ Verifique spam/lixo eletrônico

**"A chave não funciona"**
→ Aguarde 15 minutos após criar a conta

**"Onde fica o arquivo .env?"**
→ Na mesma pasta do README.md

**"Como criar o arquivo .env?"**
→ Botão direito na pasta > Novo > Arquivo de Texto > Renomear para `.env`

---

**Pronto!** Com isso você tem tudo que precisa! 🎉
