// Importações usando ES Modules
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuração do __dirname (já que não existe nativamente em ES Modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Inicializa o Express
const app = express();
const port = process.env.PORT || 4000;

// Configurações
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Define pasta de views
app.use(express.static('public')); // Arquivos estáticos

// Rota da Home (lista todos os posts)
app.get('/', (req, res) => {
  const posts = JSON.parse(fs.readFileSync('./posts.json', 'utf-8'));
  res.render('home', { posts });
});

// Rota "/about" (ou "/sobre", se preferir)
app.get('/about', (req, res) => {
    res.render('about', { 
      title: 'Sobre o Supernova',
      description: 'Um blog dedicado a explorar os mistérios do universo.',
    });
  });
// Rota de Post Individual
app.get('/post/:id', (req, res) => {
  const posts = JSON.parse(fs.readFileSync('./posts.json', 'utf-8'));
  const post = posts.find(p => p.id === parseInt(req.params.id));
  res.render('post', { post });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Cosmo está rodando em http://localhost:${port} 🚀`);
});