# ⚡ INÍCIO RÁPIDO - 3 Passos Simples

Siga exatamente estes passos para rodar seu PWA localmente:

---

## 📋 Passo 1: Pegar a Chave da API (5 minutos)

### 1. Criar conta
Abra: https://home.openweathermap.org/users/sign_up

Preencha:
- Username (ex: `seunome123`)
- Email
- Password
- Marque as caixinhas
- Clique em "Create Account"

### 2. Confirmar email
Abra seu email e clique no link de confirmação.

### 3. Pegar a chave
- Acesse: https://home.openweathermap.org/api_keys
- Copie a chave (sequência de letras e números)
- Exemplo: `abc123def456ghi789jkl012mno345pqr678`

⏰ **Aguarde 10-15 minutos** após criar a conta para a chave ativar!

---

## 🔧 Passo 2: Configurar o Projeto (3 minutos)

### 1. Criar arquivo .env

Na **pasta raiz do projeto** (onde está o README.md), crie um arquivo chamado `.env`

**Conteúdo do arquivo:**
```env
OPENWEATHER_API_KEY=cole_sua_chave_aqui
```

**Exemplo:**
```env
OPENWEATHER_API_KEY=abc123def456ghi789jkl012mno345pqr678
```

### 2. Configurar a API

```bash
cd apps/api
cp .env.example .env
```

Abra `apps/api/.env` e cole a **mesma chave**:
```env
OPENWEATHER_API_KEY=abc123def456ghi789jkl012mno345pqr678
PORT=3000
```

### 3. Voltar para a raiz
```bash
cd ../..
```

---

## 🚀 Passo 3: Rodar o Projeto (5 minutos)

### 1. Instalar dependências

```bash
# Raiz
npm install

# Web
cd apps/web
npm install

# API
cd ../api
npm install

# Voltar para raiz
cd ../..
```

### 2. Abrir 2 terminais

**Terminal 1 - Rodar a API:**
```bash
cd apps/api
npm start
```

Deve aparecer:
```
🚀 API rodando em http://localhost:3000
📡 Health check: http://localhost:3000/health
🌤️  Weather endpoint: http://localhost:3000/api/weather
```

**Terminal 2 - Rodar o PWA:**
```bash
cd apps/web
npm run dev
```

Deve aparecer:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:8080/
```

### 3. Abrir no navegador

Acesse: **http://localhost:8080**

---

## ✅ Verificar se Funcionou

### No navegador:

1. **Página carrega?** ✓
   - Você deve ver "📝 Notas Rápidas"

2. **Service Worker ativo?** ✓
   - F12 > Application > Service Workers
   - Deve mostrar "sw.js" ativo

3. **Widget de clima funciona?** ✓
   - Deve aparecer temperatura e cidade

4. **Criar nota funciona?** ✓
   - Clique "+ Nova Nota"
   - Preencha e salve
   - Nota aparece na lista

### Se algo não funcionar:

**Widget clima não aparece:**
- Aguarde 15 min após criar a conta (chave ativando)
- Verifique se a API está rodando (Terminal 1)
- Verifique se copiou a chave correta no `.env`

**Console tem erros:**
- F12 > Console
- Copie o erro e releia os passos

**API não inicia:**
```bash
cd apps/api
rm -rf node_modules
npm install
npm start
```

---

## 🧪 Rodar Testes (Opcional)

Com a API e PWA rodando:

```bash
# Novo terminal
npm run test:e2e
```

Vai rodar 10 testes e todos devem passar ✓

---

## 📦 Fazer Deploy (Quando estiver funcionando localmente)

### 1. Configurar GitHub Pages

- Vá em: Settings > Pages
- Source: GitHub Actions
- Save

### 2. Commit e Push

```bash
git add .
git commit -m "feat: PWA completo funcionando"
git push origin main
```

### 3. Aguardar Deploy

- Vá em: Actions (tab no GitHub)
- Aguarde ~5-10 minutos
- ✅ Ficou verde? Deploy concluído!

### 4. Acessar PWA

Seu PWA estará em:
```
https://SEU_USUARIO.github.io/my-chrome-extension/
```

**Exemplo:**
```
https://g0bss.github.io/my-chrome-extension/
```

---

## 📝 Resumo dos Comandos

```bash
# 1. Pegar chave: https://home.openweathermap.org/api_keys

# 2. Criar .env na raiz com a chave

# 3. Instalar tudo
npm install
cd apps/web && npm install
cd ../api && npm install
cd ../..

# 4. Terminal 1 (API)
cd apps/api
npm start

# 5. Terminal 2 (PWA)
cd apps/web
npm run dev

# 6. Abrir: http://localhost:8080

# 7. Testar
npm run test:e2e

# 8. Deploy
git add .
git commit -m "feat: PWA completo"
git push origin main
```

---

## 🆘 Ajuda Rápida

| Problema | Solução |
|----------|---------|
| Não sei pegar a chave | Leia: `COMO_PEGAR_CHAVE.md` |
| API não inicia | `cd apps/api && npm install` |
| PWA não abre | Verifique se usou porta 8080 |
| Widget não carrega | Aguarde 15min (chave ativando) |
| Testes falham | API + PWA devem estar rodando |
| Deploy falha | Veja: Settings > Pages configurado |

---

## 🎯 Checklist Final

Antes de fazer deploy, verifique:

- [ ] Chave da API funcionando
- [ ] `.env` criado (raiz e `apps/api/`)
- [ ] API rodando em http://localhost:3000
- [ ] PWA rodando em http://localhost:8080
- [ ] Service Worker ativo (F12 > Application)
- [ ] Criar/editar/excluir nota funciona
- [ ] Widget de clima aparece
- [ ] Testes E2E passam
- [ ] Settings > Pages configurado
- [ ] `.env` NÃO vai para o Git

---

## 🎉 Pronto!

Agora você tem:
- ✅ PWA funcionando localmente
- ✅ Notas com categorias e busca
- ✅ Widget de clima
- ✅ Testes automatizados
- ✅ Deploy automático no GitHub Pages

**Dúvidas?** Consulte:
- `COMO_PEGAR_CHAVE.md` - Guia detalhado da API key
- `README.md` - Documentação completa
- `TESTE_LOCAL.md` - Troubleshooting

---

**Desenvolvido para o Bootcamp de Programação** 🚀
