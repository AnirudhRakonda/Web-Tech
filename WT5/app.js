const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;


app.use(bodyParser.json());


let books = [];
let idCounter = 1;


const validateBook = (book) => {
  const { title, author, year } = book;
  if (!title || typeof title !== 'string') return 'Title is required and must be a string.';
  if (!author || typeof author !== 'string') return 'Author is required and must be a string.';
  if (!year || typeof year !== 'number') return 'Year is required and must be a number.';
  return null;
};

// API Endpoints

// Create a new book (POST)
app.post('/books', (req, res) => {
  const error = validateBook(req.body);
  if (error) return res.status(400).json({ error });

  const newBook = { id: idCounter++, ...req.body };
  books.push(newBook);
  res.status(201).json(newBook);
});

// Get all books (GET)
app.get('/books', (req, res) => {
  res.json(books);
});

// Get a single book by ID (GET)
app.get('/books/:id', (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(book);
});

// Update a book by ID (PUT)
app.put('/books/:id', (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: 'Book not found' });

  const error = validateBook(req.body);
  if (error) return res.status(400).json({ error });

  Object.assign(book, req.body);
  res.json(book);
});

// Delete a book by ID (DELETE)
app.delete('/books/:id', (req, res) => {
  const bookIndex = books.findIndex((b) => b.id === parseInt(req.params.id));
  if (bookIndex === -1) return res.status(404).json({ error: 'Book not found' });

  books.splice(bookIndex, 1);
  res.status(204).send();
});

// Error handling for invalid routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});