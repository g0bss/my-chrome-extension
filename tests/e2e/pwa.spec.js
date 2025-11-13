import { test, expect } from '@playwright/test';

const BASE_URL = process.env.E2E_BASE_URL || 'http://localhost:8080';

test.describe('PWA - Notas Rápidas', () => {
  test('deve carregar a página principal', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page).toHaveTitle(/Notas Rápidas PWA/);
    await expect(page.locator('h1')).toContainText('Notas Rápidas');
  });

  test('deve exibir estado vazio inicial', async ({ page }) => {
    // Limpar storage antes do teste
    await page.goto(BASE_URL);
    await page.evaluate(() => {
      localStorage.clear();
      indexedDB.deleteDatabase('NotesDB');
    });
    await page.reload();

    const emptyState = page.locator('.empty-state');
    await expect(emptyState).toBeVisible();
    await expect(emptyState).toContainText('Nenhuma nota ainda');
  });

  test('deve criar uma nova nota', async ({ page }) => {
    await page.goto(BASE_URL);

    // Limpar storage
    await page.evaluate(() => {
      localStorage.clear();
      indexedDB.deleteDatabase('NotesDB');
    });
    await page.reload();

    // Clicar no botão de nova nota
    await page.click('#new-note-btn');

    // Modal deve aparecer
    const modal = page.locator('#note-modal');
    await expect(modal).not.toHaveClass(/hidden/);

    // Preencher título e conteúdo
    await page.fill('#note-title-input', 'Minha primeira nota');
    await page.fill('#note-content-input', 'Conteúdo de teste da nota');

    // Selecionar uma tag
    await page.click('[data-tag="trabalho"]');

    // Salvar
    await page.click('#save-note-btn');

    // Modal deve fechar
    await expect(modal).toHaveClass(/hidden/);

    // Nota deve aparecer na lista
    const noteCard = page.locator('.note-card').first();
    await expect(noteCard).toBeVisible();
    await expect(noteCard.locator('.note-title')).toContainText('Minha primeira nota');
    await expect(noteCard.locator('.note-content')).toContainText('Conteúdo de teste');
    await expect(noteCard.locator('.note-tag.trabalho')).toBeVisible();
  });

  test('deve editar uma nota existente', async ({ page }) => {
    await page.goto(BASE_URL);

    // Limpar e criar nota
    await page.evaluate(() => {
      localStorage.clear();
      indexedDB.deleteDatabase('NotesDB');
    });
    await page.reload();

    // Criar nota
    await page.click('#new-note-btn');
    await page.fill('#note-title-input', 'Nota para editar');
    await page.fill('#note-content-input', 'Conteúdo original');
    await page.click('#save-note-btn');

    // Clicar na nota para editar
    await page.click('.note-card');

    // Modal deve abrir com dados
    await expect(page.locator('#note-title-input')).toHaveValue('Nota para editar');
    await expect(page.locator('#note-content-input')).toHaveValue('Conteúdo original');

    // Editar
    await page.fill('#note-title-input', 'Nota editada');
    await page.fill('#note-content-input', 'Conteúdo modificado');
    await page.click('#save-note-btn');

    // Verificar alterações
    const noteCard = page.locator('.note-card').first();
    await expect(noteCard.locator('.note-title')).toContainText('Nota editada');
    await expect(noteCard.locator('.note-content')).toContainText('Conteúdo modificado');
  });

  test('deve buscar notas', async ({ page }) => {
    await page.goto(BASE_URL);

    // Limpar e criar notas
    await page.evaluate(() => {
      localStorage.clear();
      indexedDB.deleteDatabase('NotesDB');
    });
    await page.reload();

    // Criar primeira nota
    await page.click('#new-note-btn');
    await page.fill('#note-title-input', 'JavaScript Tutorial');
    await page.fill('#note-content-input', 'Aprender sobre closures');
    await page.click('#save-note-btn');

    // Criar segunda nota
    await page.click('#new-note-btn');
    await page.fill('#note-title-input', 'Python Guide');
    await page.fill('#note-content-input', 'Estudar decorators');
    await page.click('#save-note-btn');

    // Buscar por "JavaScript"
    await page.fill('#search-input', 'JavaScript');

    // Deve mostrar apenas 1 nota
    const notes = page.locator('.note-card');
    await expect(notes).toHaveCount(1);
    await expect(notes.first().locator('.note-title')).toContainText('JavaScript');
  });

  test('deve filtrar notas por tag', async ({ page }) => {
    await page.goto(BASE_URL);

    // Limpar e criar notas
    await page.evaluate(() => {
      localStorage.clear();
      indexedDB.deleteDatabase('NotesDB');
    });
    await page.reload();

    // Criar nota com tag trabalho
    await page.click('#new-note-btn');
    await page.fill('#note-title-input', 'Reunião');
    await page.fill('#note-content-input', 'Discutir projeto');
    await page.click('[data-tag="trabalho"]');
    await page.click('#save-note-btn');

    // Criar nota com tag pessoal
    await page.click('#new-note-btn');
    await page.fill('#note-title-input', 'Compras');
    await page.fill('#note-content-input', 'Lista do mercado');
    await page.click('[data-tag="pessoal"]');
    await page.click('#save-note-btn');

    // Filtrar por trabalho
    await page.click('.tag-filter[data-tag="trabalho"]');

    // Deve mostrar apenas 1 nota
    const notes = page.locator('.note-card');
    await expect(notes).toHaveCount(1);
    await expect(notes.first().locator('.note-title')).toContainText('Reunião');
  });

  test('deve excluir uma nota', async ({ page }) => {
    await page.goto(BASE_URL);

    // Limpar e criar nota
    await page.evaluate(() => {
      localStorage.clear();
      indexedDB.deleteDatabase('NotesDB');
    });
    await page.reload();

    await page.click('#new-note-btn');
    await page.fill('#note-title-input', 'Nota para excluir');
    await page.fill('#note-content-input', 'Será removida');
    await page.click('#save-note-btn');

    // Abrir nota
    await page.click('.note-card');

    // Clicar em excluir e confirmar
    page.on('dialog', (dialog) => dialog.accept());
    await page.click('#delete-note-btn');

    // Estado vazio deve aparecer
    await expect(page.locator('.empty-state')).toBeVisible();
  });

  test('deve exibir widget de clima', async ({ page }) => {
    await page.goto(BASE_URL);

    // Widget deve estar visível
    const widget = page.locator('#weather-widget');
    await expect(widget).toBeVisible();

    // Aguardar carregamento (timeout maior para API)
    await page.waitForTimeout(3000);

    // Verificar se carregou ou mostrou erro
    const hasContent = await page.locator('.weather-content').count();
    const hasError = await page
      .locator('#weather-widget:has-text("Não foi possível")')
      .count();

    expect(hasContent + hasError).toBeGreaterThan(0);
  });

  test('deve ter manifest.webmanifest válido', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/manifest.webmanifest`);
    expect(response?.status()).toBe(200);

    const manifest = await response?.json();
    expect(manifest).toHaveProperty('name');
    expect(manifest).toHaveProperty('short_name');
    expect(manifest).toHaveProperty('start_url');
    expect(manifest).toHaveProperty('display', 'standalone');
    expect(manifest.icons).toBeInstanceOf(Array);
    expect(manifest.icons.length).toBeGreaterThan(0);
  });

  test('deve ter service worker registrado', async ({ page }) => {
    await page.goto(BASE_URL);

    // Aguardar registro do SW
    await page.waitForTimeout(2000);

    const swRegistered = await page.evaluate(async () => {
      if (!('serviceWorker' in navigator)) return false;
      const reg = await navigator.serviceWorker.getRegistration();
      return !!reg;
    });

    expect(swRegistered).toBe(true);
  });
});
