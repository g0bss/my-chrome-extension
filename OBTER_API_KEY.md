# Como Obter sua API Key do OpenWeatherMap

## Passo 1: Criar Conta (Gratuita)

1. Acesse: **https://home.openweathermap.org/users/sign_up**

2. Preencha o formulário:
   - Username (nome de usuário)
   - Email
   - Password (senha)
   - Confirme que você tem 16+ anos
   - Aceite os termos

3. Clique em **"Create Account"**

4. **Verifique seu email** - você receberá um email de confirmação
   - Abra o email
   - Clique no link de verificação

## Passo 2: Obter sua API Key

1. Após verificar o email, faça login em:
   **https://home.openweathermap.org/users/sign_in**

2. No dashboard, clique em **"API keys"** no menu (ou acesse diretamente):
   **https://home.openweathermap.org/api_keys**

3. Você verá:
   - Uma chave padrão já criada com nome "Default"
   - OU um campo para criar uma nova chave

4. **Copie sua API Key** (exemplo):
   ```
   1234567890abcdef1234567890abcdef
   ```

5. **IMPORTANTE:** A chave pode levar até 2 horas para ser ativada
   - Mas geralmente ativa em 10-15 minutos

## Passo 3: Adicionar no Projeto

1. No seu projeto, crie o arquivo `.env` na **raiz**:
   ```bash
   cp .env.example .env
   ```

2. Edite o arquivo `.env` e cole sua chave:
   ```env
   OPENWEATHER_API_KEY=1234567890abcdef1234567890abcdef
   ```

   Substitua `1234567890abcdef1234567890abcdef` pela sua chave real!

3. Também configure no arquivo `apps/api/.env`:
   ```bash
   cd apps/api
   cp .env.example .env
   # Edite e cole a mesma chave
   ```

## Passo 4: Testar a API

Teste se sua chave funciona:

```bash
# Substitua YOUR_API_KEY pela sua chave
curl "https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY&units=metric"
```

**Resposta esperada (sucesso):**
```json
{
  "weather": [{"main": "Clouds", "description": "broken clouds"}],
  "main": {"temp": 15.5, "feels_like": 14.2},
  "name": "London"
}
```

**Erro comum (chave inválida ou inativa):**
```json
{
  "cod": 401,
  "message": "Invalid API key. Please see http://openweathermap.org/faq#error401"
}
```

Se receber erro 401, aguarde mais alguns minutos para a chave ativar.

## Limites do Plano Gratuito

- ✅ 1.000 chamadas por dia
- ✅ 60 chamadas por minuto
- ✅ Dados atuais do clima
- ✅ Previsão de 5 dias

**Isso é mais que suficiente para o projeto!**

## Segurança

**NUNCA** commite o arquivo `.env` no Git!

O `.gitignore` já está configurado para ignorar:
```gitignore
.env
.env.local
.env.*.local
```

## Problemas Comuns

### "API key not activated"
- **Solução:** Aguarde 10-15 minutos após criar a conta

### "Invalid API key"
- **Solução:** Verifique se copiou a chave completa
- Não deve ter espaços antes/depois
- Deve ter exatamente 32 caracteres

### "API call limit exceeded"
- **Solução:** No plano gratuito, aguarde até o dia seguinte
- Ou faça upgrade para plano pago

### Widget não carrega no PWA
- Verifique se a API está rodando (`http://localhost:3000/health`)
- Verifique os logs do browser (F12 > Console)
- Verifique se a chave está no `.env` correto

## Links Úteis

- **Sign Up:** https://home.openweathermap.org/users/sign_up
- **API Keys:** https://home.openweathermap.org/api_keys
- **Documentação:** https://openweathermap.org/current
- **FAQ:** https://openweathermap.org/faq

---

**Pronto!** Agora você pode usar a API no seu PWA.
