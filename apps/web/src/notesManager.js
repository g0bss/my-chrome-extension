/**
 * NotesManager - Gerencia notas usando IndexedDB
 */
export class NotesManager {
  constructor() {
    this.dbName = 'NotesDB';
    this.storeName = 'notes';
    this.db = null;
    this.notes = [];
    this.init();
  }

  async init() {
    try {
      this.db = await this.openDB();
      this.notes = await this.loadNotes();
      console.log('[NotesManager] Inicializado com', this.notes.length, 'notas');
    } catch (error) {
      console.error('[NotesManager] Erro ao inicializar:', error);
      // Fallback para localStorage
      this.loadFromLocalStorage();
    }
  }

  openDB() {
    return new Promise((resolve, reject) => {
      if (!window.indexedDB) {
        reject(new Error('IndexedDB não suportado'));
        return;
      }

      const request = indexedDB.open(this.dbName, 1);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, { keyPath: 'id' });
          store.createIndex('updatedAt', 'updatedAt', { unique: false });
          store.createIndex('tags', 'tags', { unique: false, multiEntry: true });
        }
      };
    });
  }

  async loadNotes() {
    if (!this.db) return [];

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      request.onsuccess = () => {
        const notes = request.result.sort((a, b) => b.updatedAt - a.updatedAt);
        resolve(notes);
      };
      request.onerror = () => reject(request.error);
    });
  }

  loadFromLocalStorage() {
    try {
      const stored = localStorage.getItem('notes');
      this.notes = stored ? JSON.parse(stored) : [];
      console.log('[NotesManager] Carregado do localStorage:', this.notes.length, 'notas');
    } catch (error) {
      console.error('[NotesManager] Erro ao carregar do localStorage:', error);
      this.notes = [];
    }
  }

  saveToLocalStorage() {
    try {
      localStorage.setItem('notes', JSON.stringify(this.notes));
    } catch (error) {
      console.error('[NotesManager] Erro ao salvar no localStorage:', error);
    }
  }

  async saveNote(note) {
    if (!this.db) {
      // Fallback para localStorage
      const index = this.notes.findIndex((n) => n.id === note.id);
      if (index >= 0) {
        this.notes[index] = note;
      } else {
        this.notes.push(note);
      }
      this.saveToLocalStorage();
      return;
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.put(note);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async deleteNoteFromDB(id) {
    if (!this.db) {
      // Fallback para localStorage
      this.notes = this.notes.filter((n) => n.id !== id);
      this.saveToLocalStorage();
      return;
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // ==================== API PÚBLICA ====================

  getNotes() {
    return this.notes;
  }

  getNote(id) {
    return this.notes.find((note) => note.id === id);
  }

  createNote({ title = '', content = '', tags = [] }) {
    const note = {
      id: this.generateId(),
      title,
      content,
      tags,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.notes.unshift(note);
    this.saveNote(note);
    return note;
  }

  updateNote(id, { title, content, tags }) {
    const note = this.notes.find((n) => n.id === id);
    if (!note) return null;

    note.title = title;
    note.content = content;
    note.tags = tags;
    note.updatedAt = Date.now();

    this.saveNote(note);
    return note;
  }

  deleteNote(id) {
    this.notes = this.notes.filter((note) => note.id !== id);
    this.deleteNoteFromDB(id);
  }

  filterNotes(query, tag = 'all') {
    let filtered = this.notes;

    // Filtrar por tag
    if (tag !== 'all') {
      filtered = filtered.filter((note) => note.tags.includes(tag));
    }

    // Filtrar por busca
    if (query) {
      filtered = filtered.filter(
        (note) =>
          note.title.toLowerCase().includes(query) ||
          note.content.toLowerCase().includes(query) ||
          note.tags.some((t) => t.toLowerCase().includes(query))
      );
    }

    return filtered;
  }

  getNotesByTag(tag) {
    return this.notes.filter((note) => note.tags.includes(tag));
  }

  getAllTags() {
    const tagSet = new Set();
    this.notes.forEach((note) => {
      note.tags.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }

  generateId() {
    return `note_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
