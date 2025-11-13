# Teste Local SEM Docker

Como você não tem Docker nessa máquina, siga este guia para testar localmente:

## Pré-requisitos

- Node.js 20+ instalado
- Git Bash ou terminal
- Navegador moderno (Chrome/Edge recomendado)

## Passo a Passo

### 1. Configurar API Key

1. Obtenha sua chave em: https://home.openweathermap.org/api_keys
   - Veja o guia completo em `OBTER_API_KEY.md`

2. Crie os arquivos `.env`:

**Raiz do projeto:**
```bash
# .env
OPENWEATHER_API_KEY=sua_chave_aqui
```

**apps/api/.env:**
```bash
cd apps/api
cp .env.example .env
# Edite e cole sua chave
```

### 2. Instalar Dependências

```bash
# Voltar para raiz
cd ../..

# Instalar Playwright (root)
npm ci

# Instalar deps do Web
cd apps/web
npm ci

# Instalar deps da API
cd ../api
npm ci

# Voltar para raiz
cd ../..
```

### 3. Testar a API (Separadamente)

Abra um **Terminal 1**:

```bash
cd apps/api
npm start
```

**Deve mostrar:**
```
🚀 API rodando em http://localhost:3000
📡 Health check: http://localhost:3000/health
🌤️  Weather endpoint: http://localhost:3000/api/weather
```

**Testar health check:**
```bash
# Novo terminal
curl http://localhost:3000/health
```

Deve retornar:
```json
{"status":"ok","timestamp":"..."}
```

**Testar weather endpoint:**
```bash
curl "http://localhost:3000/api/weather?city=SaoPaulo"
```

Deve retornar dados do clima.

### 4. Testar o PWA (Desenvolvimento)

Abra um **Terminal 2** (mantendo o Terminal 1 com a API rodando):

```bash
cd apps/web
npm run dev
```

**Deve mostrar:**
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:8080/
  ➜  Network: use --host to expose
```

**Acesse:** http://localhost:8080

### 5. Verificações no Navegador

Abra **DevTools (F12)**:

#### Console (Aba Console)
Deve aparecer:
- `[App] Service Worker registrado: http://localhost:8080/`
- `[NotesManager] Inicializado com 0 notas`

**NÃO deve ter erros vermelhos!**

#### Application > Service Workers
- Deve mostrar `sw.js` ativo
- Status: "activated and is running"

#### Application > Manifest
- Name: "Notas Rápidas PWA"
- Icons: 2 ícones (192x192, 512x512)
- Installable: "Yes"

#### Network (Aba Network)
Ao carregar a página:
- Request para `/api/weather` deve retornar 200 OK
- Se der erro, verifique se a API está rodando

### 6. Testar Funcionalidades

**Criar Nota:**
1. Clique em "+ Nova Nota"
2. Preencha título e conteúdo
3. Selecione uma tag
4. Clique em "Salvar"
5. Nota deve aparecer na lista

**Buscar:**
1. Digite no campo de busca
2. Notas devem filtrar em tempo real

**Filtrar por Tag:**
1. Clique em uma tag (ex: "trabalho")
2. Deve mostrar apenas notas dessa tag

**Editar Nota:**
1. Clique em uma nota
2. Edite e salve
3. Mudanças devem persistir

**Excluir Nota:**
1. Abra uma nota
2. Clique em "Excluir"
3. Confirme

**Widget Clima:**
- Deve mostrar temperatura e cidade
- Se não carregar, verifique API key e se a API está rodando

### 7. Build de Produção (Opcional)

```bash
# Terminal 2 (parar o dev server com Ctrl+C)
cd apps/web
npm run build
```

Deve criar pasta `dist/` com:
- index.html
- assets/ (JS e CSS)
- manifest.webmanifest
- sw.js
- icons/

**Preview do build:**
```bash
npm run preview
```

Acesse: http://localhost:8080

### 8. Rodar Testes E2E

**IMPORTANTE:** O PWA deve estar rodando primeiro!

Terminal 2 (dev server):
```bash
cd apps/web
npm run dev
```

Terminal 3 (testes):
```bash
# Na raiz do projeto
npm run test:e2e
```

**Deve rodar ~10 testes** e todos devem passar ✓

**Ver relatório:**
```bash
npm run test:e2e:report
```

## Problemas Comuns

### API não inicia

**Erro:** `Cannot find module 'express'`

**Solução:**
```bash
cd apps/api
rm -rf node_modules
npm install
```

### Widget não carrega

**Erro no console:** `Failed to fetch` ou `CORS error`

**Solução:**
1. Verifique se a API está rodando (Terminal 1)
2. Verifique se a API key está no `.env`
3. Aguarde 10-15min se a chave foi criada recentemente

### Service Worker não registra

**Erro:** `Service worker registration failed`

**Solução:**
- HTTPS ou localhost é obrigatório (você já está em localhost ✓)
- Limpe cache do navegador (Ctrl+Shift+Del)
- Hard refresh (Ctrl+Shift+R)

### Notas não salvam

**Verifique:**
- Console do navegador (F12)
- IndexedDB deve estar habilitado
- Modo anônimo/privado pode bloquear

### Testes E2E falham

**Erro:** `browserType.launch: Executable doesn't exist`

**Solução:**
```bash
npx playwright install chromium
```

## Checklist Final

Antes de fazer commit/push, verifique:

- [ ] API rodando sem erros
- [ ] PWA carrega no navegador
- [ ] Service Worker registrado
- [ ] Widget de clima funciona
- [ ] Criar/editar/excluir nota funciona
- [ ] Busca e filtros funcionam
- [ ] Testes E2E passam
- [ ] Build de produção cria `dist/` sem erros

## Próximo Passo

Se tudo funcionou localmente:

```bash
git add .
git commit -m "feat: implementa PWA completo com backend e testes"
git push origin main
```

O GitHub Actions vai:
1. Build automático
2. Rodar testes E2E
3. Deploy para GitHub Pages

**Aguarde ~5-10 minutos** e acesse:
https://g0bss.github.io/my-chrome-extension/

---

**Dúvidas?** Consulte `README.md` ou `SETUP.md`
