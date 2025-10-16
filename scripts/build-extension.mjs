import fs from 'node:fs';
import path from 'node:path';
import archiver from 'archiver';

const dist = 'dist';
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist);

// Copia arquivos essenciais
for (const f of ['manifest.json']) fs.copyFileSync(f, path.join(dist, f));
fs.cpSync('src', path.join(dist, 'src'), { recursive: true });
fs.cpSync('icons', path.join(dist, 'icons'), { recursive: true });

// Gera ZIP dos arquivos individuais (não do diretório dist completo)
const output = fs.createWriteStream(path.join(dist, 'extension.zip'));
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
  console.log(`Build gerado em dist/ e dist/extension.zip (${archive.pointer()} bytes)`);
});

archive.on('error', (err) => {
  throw err;
});

archive.pipe(output);

// Adiciona apenas os arquivos da extensão, não o diretório dist inteiro
archive.file(path.join(dist, 'manifest.json'), { name: 'manifest.json' });
archive.directory(path.join(dist, 'src'), 'src');
archive.directory(path.join(dist, 'icons'), 'icons');

await archive.finalize();