const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const recipeRoutes = require('./routes/recipeRoutes');

const app = express();
const path = require('path');

app.use(cors({
  origin: 'http://localhost:3000', // или ваш фронтенд-адрес
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // явно разрешите нужные методы
  allowedHeaders: ['Content-Type']
}));

// Добавьте это ПЕРЕД объявлением маршрутов
app.use(express.static(path.join(__dirname, 'client')));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/recipes', recipeRoutes);

const masterclassRoutes = require('./routes/masterclassRoutes');
app.use('/api/masterclasses', masterclassRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const chefRoutes = require('./routes/chefRoutes');
app.use('/api/chefs', chefRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Что-то сломалось!');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
