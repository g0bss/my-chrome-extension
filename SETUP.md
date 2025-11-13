# Setup Rápido - PWA Notas

## Desenvolvimento Local (Início Rápido)

### 1. Clone e Configure

```bash
git clone https://github.com/g0bss/my-chrome-extension.git
cd my-chrome-extension

# Configurar API Key
cp .env.example .env
# Edite .env e adicione sua OPENWEATHER_API_KEY
```

### 2. Instalar Dependências

```bash
# Raiz (Playwright)
npm ci

# Web
cd apps/web
npm ci

# API
cd ../api
npm ci
cd ../..
```

Ou use o script helper:

```bash
npm run install:all
```

### 3. Rodar Aplicação

**Opção A: Docker (Recomendado)**

```bash
docker-compose up --build
```

Acesse:
- PWA: http://localhost:8080
- API: http://localhost:3000/health

**Opção B: Local (Desenvolvimento)**

Terminal 1 (API):
```bash
cd apps/api
npm run dev
```

Terminal 2 (Web):
```bash
cd apps/web
npm run dev
```

### 4. Rodar Testes

```bash
# E2E (Playwright)
npm run test:e2e

# UI Mode
npm run test:e2e:ui

# Lighthouse
npm run lighthouse
```

## Checklist de Entrega

- [ ] PWA funcional (manifest + service worker)
- [ ] Integração com OpenWeatherMap API
- [ ] Docker Compose rodando (web + api)
- [ ] Testes E2E passando
- [ ] CI/CD configurado (GitHub Actions)
- [ ] Deploy no GitHub Pages
- [ ] README documentado
- [ ] Vídeo/GIF demonstrativo (≤ 3 min)

## Obter OpenWeatherMap API Key

1. Acesse https://openweathermap.org/api
2. Crie conta gratuita
3. Vá em "API Keys"
4. Copie a chave e adicione no `.env`:
   ```
   OPENWEATHER_API_KEY=sua_chave_aqui
   ```

## GitHub Pages Setup

1. Vá em **Settings > Pages**
2. Source: **GitHub Actions**
3. Push para `main` - deploy automático

## Problemas Comuns

### Erro: "IndexedDB não suportado"
- Use Chrome/Edge/Firefox moderno
- HTTPS/localhost necessário

### Widget de clima não carrega
- Verifique `.env` com API key válida
- API está rodando? `curl http://localhost:3000/health`

### Docker build falha
- Verifique node_modules não foi copiado (use .dockerignore)
- Limpe cache: `docker-compose build --no-cache`

### Testes E2E falham
- Instale browsers: `npx playwright install chromium`
- Verifique server está rodando na porta correta

## Scripts Úteis

```bash
# Desenvolvimento
npm run dev:web          # Vite dev server
npm run dev:api          # API com hot reload

# Build
npm run build:web        # Build PWA
npm run build:api        # Build API (se necessário)

# Docker
npm run docker:build     # Build imagens
npm run docker:up        # Subir containers
npm run docker:down      # Parar containers

# Testes
npm run test:e2e         # E2E tests
npm run test:e2e:ui      # Interactive mode
npm run lighthouse       # PWA audit
```

## Recursos

- [README principal](./README.md)
- [Documentação PWA](https://developer.mozilla.org/pt-BR/docs/Web/Progressive_web_apps)
- [OpenWeatherMap API Docs](https://openweathermap.org/current)
- [Playwright Docs](https://playwright.dev/)

---

**Dúvidas?** Abra uma issue no repositório!
