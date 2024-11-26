import fs from 'fs';
import path from 'path';
import { SitemapStream } from 'sitemap';
import { Readable } from 'stream';

// Obtener el directorio actual
const __dirname = path.resolve();

const links = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/login', changefreq: 'weekly', priority: 0.8 },
    { url: '/register', changefreq: 'weekly', priority: 0.8 },
    { url: '/cart', changefreq: 'daily', priority: 0.9 },
    // Agrega todas tus páginas aquí
];

// Crear el flujo de salida del sitemap
const sitemap = new SitemapStream({ hostname: 'http://localhost:5173' });

// Usar path.resolve para obtener la ruta completa al archivo de salida
const writeStream = fs.createWriteStream(path.resolve(__dirname, 'public', 'sitemap.xml'));
const readable = Readable.from(links);

readable.pipe(sitemap).pipe(writeStream);

writeStream.on('finish', () => {
    console.log('Sitemap generado correctamente!');
});
