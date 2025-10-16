import { test, expect, chromium, type BrowserContext } from '@playwright/test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import os from 'node:os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dist = path.resolve(__dirname, '..', 'dist');

test.describe('Extensão Chrome - Anotação rápida', () => {

  test('content script aplica estilo de fundo nas páginas', async () => {
    const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'pw-test-'));

    const context = await chromium.launchPersistentContext(userDataDir, {
      channel: 'chromium',
      args: [
        `--disable-extensions-except=${dist}`,
        `--load-extension=${dist}`,
        '--headless=new',
        '--disable-dev-shm-usage'
      ]
    });

    const [page] = context.pages();
    await page.goto('https://example.com');

    // Aguarda o content script ser carregado e aplicar o estilo
    await page.waitForTimeout(1000);

    // Verifica se o content script aplicou a cor de fundo
    const bgColor = await page.evaluate(() => {
      return document.body.style.backgroundColor;
    });

    expect(bgColor).toBe('rgb(240, 248, 255)'); // #f0f8ff convertido para rgb
    await context.close();

    // Limpa o diretório temporário
    fs.rmSync(userDataDir, { recursive: true, force: true });
  });

  test('extensão carrega com manifest correto', async () => {
    const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'pw-test-'));

    const context = await chromium.launchPersistentContext(userDataDir, {
      channel: 'chromium',
      args: [
        `--disable-extensions-except=${dist}`,
        `--load-extension=${dist}`,
        '--headless=new',
        '--disable-dev-shm-usage'
      ]
    });

    // Verifica que a página inicial carrega
    const [page] = context.pages();
    await page.goto('https://example.com');

    // Aguarda o content script ser carregado
    await page.waitForTimeout(1000);

    // Verifica que a extensão foi carregada verificando efeitos do content script
    const hasContentScript = await page.evaluate(() => {
      return document.body.style.backgroundColor !== '';
    });

    expect(hasContentScript).toBe(true);
    await context.close();

    // Limpa o diretório temporário
    fs.rmSync(userDataDir, { recursive: true, force: true });
  });

  test('estrutura da extensão está completa', async () => {
    const fs = await import('node:fs');

    // Verifica que os arquivos essenciais existem no dist
    expect(fs.existsSync(path.join(dist, 'manifest.json'))).toBe(true);
    expect(fs.existsSync(path.join(dist, 'src', 'popup', 'popup.html'))).toBe(true);
    expect(fs.existsSync(path.join(dist, 'src', 'popup', 'popup.js'))).toBe(true);
    expect(fs.existsSync(path.join(dist, 'src', 'content', 'content.js'))).toBe(true);
    expect(fs.existsSync(path.join(dist, 'icons', 'icon16.png'))).toBe(true);
    expect(fs.existsSync(path.join(dist, 'extension.zip'))).toBe(true);
  });
});