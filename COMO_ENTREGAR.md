# 🎯 O QUE FAZER AGORA PARA ENTREGAR

Você já tem a API key configurada! Falta pouco!

---

## ✅ PASSO A PASSO PARA ENTREGAR

### 1️⃣ Copiar o .env.example para .env (10 segundos)

```bash
# Na raiz do projeto (onde você está agora)
cp .env.example .env
```

Pronto! A chave já está lá dentro.

Agora faça o mesmo para a API:

```bash
cd apps/api
cp .env.example .env
cd ../..
```

---

### 2️⃣ Instalar tudo (3-5 minutos)

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

---

### 3️⃣ Testar localmente (5 minutos)

**Abra 2 terminais:**

**Terminal 1 - API:**
```bash
cd apps/api
npm start
```

Deve aparecer:
```
🚀 API rodando em http://localhost:3000
```

**Terminal 2 - PWA:**
```bash
cd apps/web
npm run dev
```

Deve aparecer:
```
➜  Local:   http://localhost:8080/
```

**Abra no navegador:** http://localhost:8080

**Teste:**
- [ ] Página carrega
- [ ] Widget de clima aparece
- [ ] Cria uma nota
- [ ] Busca funciona
- [ ] F12 > Application > Service Workers está ativo

Se tudo funcionar, **PODE CONTINUAR!**

---

### 4️⃣ Configurar GitHub Pages (30 segundos)

1. Vá no seu repositório no GitHub
2. Clique em **Settings** (configurações)
3. No menu lateral, clique em **Pages**
4. Em **Source**, selecione: **GitHub Actions**
5. Clique em **Save**

Pronto!

---

### 5️⃣ Fazer Commit e Push (2 minutos)

**Feche** os terminais do passo 3 (Ctrl+C em cada um).

Agora rode:

```bash
# Adicionar tudo
git add .

# Criar commit
git commit -m "feat: implementa PWA completo com notas, categorias, busca e clima

- PWA com manifest e service worker
- Backend Node/Express com proxy OpenWeatherMap
- Gerenciamento de notas com IndexedDB
- Categorias, tags, busca e filtros
- Widget de clima integrado
- Docker Compose (web + api)
- Testes E2E com Playwright
- CI/CD com GitHub Actions
- Deploy automático GitHub Pages

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"

# Enviar para GitHub
git push origin main
```

---

### 6️⃣ Aguardar Deploy (5-10 minutos)

1. Vá no seu repositório no GitHub
2. Clique na aba **Actions**
3. Você verá um workflow rodando (círculo amarelo girando)
4. **Aguarde** até ficar verde ✅

Se der erro vermelho ❌:
- Clique no workflow que falhou
- Veja qual step deu erro
- Me avise que te ajudo

---

### 7️⃣ Acessar o PWA publicado

Depois que o workflow ficar verde ✅:

Seu PWA estará em:
```
https://g0bss.github.io/my-chrome-extension/
```

**Teste:**
- [ ] Página carrega
- [ ] PWA é instalável (ícone de download no navegador)
- [ ] Criar nota funciona
- [ ] Service Worker ativo
- [ ] Funciona offline (desconectar internet e recarregar)

---

### 8️⃣ Gravar vídeo/GIF (3 minutos)

Grave um vídeo curto (≤ 3 minutos) mostrando:

1. **Instalar o PWA**
   - Ícone de download no navegador
   - Clicar e instalar
   - App abre em janela própria

2. **Criar uma nota**
   - Clicar "+ Nova Nota"
   - Preencher título e conteúdo
   - Selecionar tag
   - Salvar

3. **Buscar e filtrar**
   - Criar mais 2 notas com tags diferentes
   - Buscar por palavra
   - Filtrar por tag

4. **Widget de clima**
   - Mostrar temperatura e localização

5. **Modo offline**
   - Desconectar internet (WiFi off)
   - Recarregar app
   - Mostrar que funciona offline
   - Criar nota offline
   - Reconectar

**Ferramentas para gravar:**
- Windows: Xbox Game Bar (Win + G)
- OBS Studio (gratuito)
- Loom (online)

**Para GIF:**
- LICEcap (gratuito)
- ScreenToGif (gratuito)

---

### 9️⃣ Entregar

**O que você precisa entregar:**

1. **Link do Repositório**
   ```
   https://github.com/g0bss/my-chrome-extension
   ```

2. **Link do PWA publicado**
   ```
   https://g0bss.github.io/my-chrome-extension/
   ```

3. **Link do último CI/CD run**
   ```
   https://github.com/g0bss/my-chrome-extension/actions
   ```
   (Clica no último workflow verde e copia a URL)

4. **Vídeo/GIF demonstrativo**
   - Upload no YouTube (pode ser não-listado) OU
   - Upload no Google Drive/Dropbox OU
   - Adicionar no repositório em `docs/demo.mp4`

5. **Documentação**
   - README.md está completo ✅
   - Instruções de instalação ✅
   - Arquitetura documentada ✅

---

## 📋 CHECKLIST FINAL DE ENTREGA

Antes de enviar, confira:

### Desenvolvimento Local
- [ ] `.env` criado na raiz com sua API key
- [ ] `apps/api/.env` criado com sua API key
- [ ] Dependências instaladas (`npm install` em tudo)
- [ ] API roda sem erros (`cd apps/api && npm start`)
- [ ] PWA roda sem erros (`cd apps/web && npm run dev`)
- [ ] Página carrega em http://localhost:8080
- [ ] Widget de clima funciona
- [ ] Criar/editar/excluir nota funciona
- [ ] Busca e filtros funcionam
- [ ] Service Worker registrado (F12 > Application)

### GitHub
- [ ] `.env` NÃO foi commitado (só .env.example)
- [ ] Código commitado e pushado
- [ ] Settings > Pages configurado (GitHub Actions)
- [ ] GitHub Actions rodou e ficou verde ✅
- [ ] PWA acessível no GitHub Pages
- [ ] PWA instalável no navegador

### Funcionalidades PWA
- [ ] Manifest válido
- [ ] Service Worker ativo
- [ ] Funciona offline
- [ ] Notas salvam em IndexedDB
- [ ] Categorias e tags funcionam
- [ ] Busca em tempo real funciona
- [ ] Widget clima aparece

### Docker (opcional - se quiser testar)
- [ ] `docker-compose build` funciona
- [ ] `docker-compose up` sobe os 2 serviços
- [ ] Acessa em http://localhost:8080

### Testes (opcional - mas recomendado)
- [ ] `npm run test:e2e` passa todos os testes

### Entregáveis
- [ ] Link do repositório
- [ ] Link do PWA publicado
- [ ] Link do CI/CD
- [ ] Vídeo/GIF demonstrativo
- [ ] README completo

---

## 🚨 PROBLEMAS COMUNS

### "git push" pede senha
```bash
# Se nunca configurou Git no Windows
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"

# Se pedir senha, use Personal Access Token do GitHub
# Settings > Developer settings > Personal access tokens > Generate new token
```

### CI/CD falha
**Erro comum:** "OPENWEATHER_API_KEY não definida"

**Não precisa fazer nada!** O CI está configurado com uma chave demo.
Se quiser usar sua chave:
1. GitHub repo > Settings > Secrets
2. New repository secret
3. Name: `OPENWEATHER_API_KEY`
4. Value: sua chave
5. Re-run o workflow

### PWA no GitHub Pages não mostra clima
**É normal!** O widget precisa de um backend rodando.

**Opções:**
1. Deploy a API no Render/Heroku (avançado)
2. Deixar sem clima no Pages (notas funcionam offline!)

O widget vai aparecer **apenas quando rodar localmente**.

### Testes E2E falham
Certifique-se que:
- API está rodando (Terminal 1)
- PWA está rodando (Terminal 2)
- Chromium instalado: `npx playwright install chromium`

---

## ⏱️ TEMPO TOTAL ESTIMADO

- Copiar .env: **10 segundos**
- Instalar deps: **3-5 min**
- Testar local: **5 min**
- Configurar Pages: **30 seg**
- Commit/Push: **2 min**
- Aguardar deploy: **5-10 min**
- Testar online: **3 min**
- Gravar vídeo: **5 min**

**TOTAL: ~25-30 minutos**

---

## 🎉 PRONTO!

Seguindo esses passos você terá:

✅ PWA funcionando localmente
✅ PWA publicado no GitHub Pages
✅ CI/CD configurado e funcionando
✅ Todos os requisitos do Bootcamp atendidos
✅ Vídeo demonstrativo
✅ Documentação completa

**BOA SORTE NA ENTREGA!** 🚀

---

**Dúvida em algum passo?** Me chame que eu ajudo!
