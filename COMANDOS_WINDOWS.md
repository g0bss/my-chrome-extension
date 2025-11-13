# 🪟 COMANDOS PARA WINDOWS (PowerShell)

Você está usando PowerShell! Use estes comandos:

---

## 1️⃣ Copiar .env

```powershell
# Raiz
Copy-Item .env.example .env

# API
cd apps/api
Copy-Item .env.example .env
cd ../..
```

---

## 2️⃣ Instalar dependências

```powershell
# Raiz
npm install

# Web
cd apps/web
npm install
cd ../..

# API
cd apps/api
npm install
cd ../..
```

---

## 3️⃣ Rodar o projeto

### Terminal 1 (PowerShell) - API:
```powershell
cd apps/api
npm start
```

Deixe este terminal **aberto**!

### Terminal 2 (PowerShell - NOVO) - PWA:
```powershell
cd apps/web
npm run dev
```

Deixe este terminal **aberto** também!

### Navegador:
Abra: http://localhost:8080

---

## 4️⃣ Testar

- [ ] Página carrega
- [ ] Widget clima aparece
- [ ] Criar nota funciona
- [ ] F12 > Application > Service Workers ativo

**Se tudo funcionar, pode fazer o deploy!**

---

## 5️⃣ Parar os servidores

Quando quiser parar:
- Em cada terminal, aperte: **Ctrl + C**

---

## 6️⃣ Deploy no GitHub

### Configurar GitHub Pages primeiro:
1. Vá no repositório GitHub
2. Settings > Pages
3. Source: GitHub Actions
4. Save

### Depois rode:

```powershell
# Voltar para raiz (se estiver em outra pasta)
cd ../..

# Adicionar tudo
git add .

# Commit
git commit -m "feat: PWA completo funcionando"

# Push
git push origin main
```

---

## 7️⃣ Aguardar deploy

- GitHub > aba Actions
- Aguarde ficar verde ✅ (~5-10 min)

---

## 8️⃣ Acessar PWA online

```
https://g0bss.github.io/my-chrome-extension/
```

---

## ✅ PRONTO!

Agora é só gravar o vídeo demonstrativo e entregar! 🎉

---

## 🚨 Se der erro no git push

```powershell
# Configurar Git (primeira vez)
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"

# Tentar push novamente
git push origin main
```

Se pedir senha, use um Personal Access Token do GitHub (não a senha da conta).
