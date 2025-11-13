import './styles.css';
import { NotesManager } from './notesManager.js';
import { WeatherWidget } from './weatherWidget.js';

// Configuração da API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Inicializar managers
const notesManager = new NotesManager();
const weatherWidget = new WeatherWidget(API_URL);

// Estado da aplicação
let currentNoteId = null;
let deferredPrompt = null;

// Elementos do DOM
const elements = {
  notesContainer: document.getElementById('notes-container'),
  emptyState: document.getElementById('empty-state'),
  searchInput: document.getElementById('search-input'),
  filterTags: document.getElementById('filter-tags'),
  newNoteBtn: document.getElementById('new-note-btn'),
  modal: document.getElementById('note-modal'),
  modalTitle: document.getElementById('modal-title'),
  closeModalBtn: document.getElementById('close-modal'),
  noteTitleInput: document.getElementById('note-title-input'),
  noteContentInput: document.getElementById('note-content-input'),
  saveNoteBtn: document.getElementById('save-note-btn'),
  deleteNoteBtn: document.getElementById('delete-note-btn'),
  selectedTags: document.getElementById('selected-tags'),
  installPrompt: document.getElementById('install-prompt'),
  installBtn: document.getElementById('install-btn'),
};

// ==================== SERVICE WORKER ====================
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((reg) => console.log('[App] Service Worker registrado:', reg.scope))
      .catch((err) => console.error('[App] Erro ao registrar SW:', err));
  });
}

// ==================== PWA INSTALL ====================
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  elements.installPrompt.classList.remove('hidden');
});

elements.installBtn.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  console.log('[App] Install prompt result:', outcome);
  deferredPrompt = null;
  elements.installPrompt.classList.add('hidden');
});

window.addEventListener('appinstalled', () => {
  console.log('[App] PWA instalado!');
  elements.installPrompt.classList.add('hidden');
});

// ==================== WEATHER WIDGET ====================
weatherWidget.init();

// ==================== NOTES ====================
function renderNotes(notes) {
  if (notes.length === 0) {
    elements.emptyState.style.display = 'block';
    elements.notesContainer.innerHTML = '';
    elements.notesContainer.appendChild(elements.emptyState);
    return;
  }

  elements.emptyState.style.display = 'none';
  elements.notesContainer.innerHTML = notes
    .map((note) => createNoteCard(note))
    .join('');

  // Adicionar event listeners aos cards
  document.querySelectorAll('.note-card').forEach((card) => {
    card.addEventListener('click', () => {
      const noteId = card.dataset.noteId;
      openEditModal(noteId);
    });
  });
}

function createNoteCard(note) {
  const date = new Date(note.updatedAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const tagsHtml = note.tags
    .map((tag) => `<span class="note-tag ${tag}">${getTagEmoji(tag)} ${tag}</span>`)
    .join('');

  return `
    <div class="note-card" data-note-id="${note.id}">
      <div class="note-card-header">
        <h3 class="note-title">${escapeHtml(note.title || 'Sem título')}</h3>
      </div>
      <div class="note-date">${date}</div>
      <p class="note-content">${escapeHtml(note.content.substring(0, 150))}${
    note.content.length > 150 ? '...' : ''
  }</p>
      <div class="note-tags">${tagsHtml}</div>
    </div>
  `;
}

function getTagEmoji(tag) {
  const emojis = {
    trabalho: '🏢',
    pessoal: '🏠',
    ideias: '💡',
    urgente: '🔥',
    estudos: '📚',
  };
  return emojis[tag] || '📌';
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ==================== SEARCH & FILTER ====================
elements.searchInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  const activeTag = document.querySelector('.tag-filter.active')?.dataset.tag || 'all';
  const filtered = notesManager.filterNotes(query, activeTag);
  renderNotes(filtered);
});

function updateFilterTags() {
  const allTags = notesManager.getAllTags();
  const currentTag = document.querySelector('.tag-filter.active')?.dataset.tag || 'all';

  elements.filterTags.innerHTML = `
    <button class="tag-filter ${currentTag === 'all' ? 'active' : ''}" data-tag="all">
      Todas (${notesManager.getNotes().length})
    </button>
    ${allTags
      .map((tag) => {
        const count = notesManager.getNotesByTag(tag).length;
        return `
        <button class="tag-filter ${currentTag === tag ? 'active' : ''}" data-tag="${tag}">
          ${getTagEmoji(tag)} ${tag} (${count})
        </button>
      `;
      })
      .join('')}
  `;

  // Event listeners para filtros
  document.querySelectorAll('.tag-filter').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tag-filter').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const tag = btn.dataset.tag;
      const query = elements.searchInput.value.toLowerCase();
      const filtered = notesManager.filterNotes(query, tag);
      renderNotes(filtered);
    });
  });
}

// ==================== MODAL ====================
elements.newNoteBtn.addEventListener('click', () => {
  openNewNoteModal();
});

elements.closeModalBtn.addEventListener('click', () => {
  closeModal();
});

elements.modal.addEventListener('click', (e) => {
  if (e.target === elements.modal) {
    closeModal();
  }
});

function openNewNoteModal() {
  currentNoteId = null;
  elements.modalTitle.textContent = 'Nova Nota';
  elements.noteTitleInput.value = '';
  elements.noteContentInput.value = '';
  elements.deleteNoteBtn.classList.add('hidden');
  clearSelectedTags();
  elements.modal.classList.remove('hidden');
  elements.noteTitleInput.focus();
}

function openEditModal(noteId) {
  const note = notesManager.getNote(noteId);
  if (!note) return;

  currentNoteId = noteId;
  elements.modalTitle.textContent = 'Editar Nota';
  elements.noteTitleInput.value = note.title;
  elements.noteContentInput.value = note.content;
  elements.deleteNoteBtn.classList.remove('hidden');

  clearSelectedTags();
  note.tags.forEach((tag) => {
    const btn = document.querySelector(`.tag-btn[data-tag="${tag}"]`);
    if (btn) btn.classList.add('selected');
  });
  updateSelectedTags();

  elements.modal.classList.remove('hidden');
  elements.noteTitleInput.focus();
}

function closeModal() {
  elements.modal.classList.add('hidden');
  currentNoteId = null;
}

// ==================== TAGS ====================
document.querySelectorAll('.tag-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    btn.classList.toggle('selected');
    updateSelectedTags();
  });
});

function updateSelectedTags() {
  const selected = Array.from(document.querySelectorAll('.tag-btn.selected')).map(
    (btn) => btn.dataset.tag
  );
  elements.selectedTags.innerHTML = selected
    .map(
      (tag) =>
        `<span class="note-tag ${tag}">${getTagEmoji(tag)} ${tag}</span>`
    )
    .join('');
}

function clearSelectedTags() {
  document.querySelectorAll('.tag-btn').forEach((btn) => btn.classList.remove('selected'));
  elements.selectedTags.innerHTML = '';
}

// ==================== SAVE & DELETE ====================
elements.saveNoteBtn.addEventListener('click', () => {
  const title = elements.noteTitleInput.value.trim();
  const content = elements.noteContentInput.value.trim();
  const tags = Array.from(document.querySelectorAll('.tag-btn.selected')).map(
    (btn) => btn.dataset.tag
  );

  if (!content) {
    alert('Por favor, escreva algo na nota!');
    return;
  }

  if (currentNoteId) {
    // Editar nota existente
    notesManager.updateNote(currentNoteId, { title, content, tags });
  } else {
    // Criar nova nota
    notesManager.createNote({ title, content, tags });
  }

  closeModal();
  renderNotes(notesManager.getNotes());
  updateFilterTags();
});

elements.deleteNoteBtn.addEventListener('click', () => {
  if (!currentNoteId) return;

  if (confirm('Tem certeza que deseja excluir esta nota?')) {
    notesManager.deleteNote(currentNoteId);
    closeModal();
    renderNotes(notesManager.getNotes());
    updateFilterTags();
  }
});

// ==================== INIT ====================
function init() {
  renderNotes(notesManager.getNotes());
  updateFilterTags();
}

init();
