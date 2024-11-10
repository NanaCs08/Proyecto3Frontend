<template>
    <div class="container mt-4">
      <h2>Books</h2>
      <ul class="list-group mb-3">
        <li v-for="book in books" :key="book.id" class="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <h5 class="mb-0">{{ book.title }}</h5>
            <small>{{ book.author }} - {{ book.language }}</small>
          </div>
          <div>
            <button class="btn btn-primary btn-sm me-2" @click="setEditBook(book)">Edit</button>
            <button class="btn btn-danger btn-sm" @click="deleteBook(book.id)">Delete</button>
          </div>
        </li>
      </ul>
      <button class="btn btn-success" @click="toggleAddForm">{{ showAddForm ? 'Cancel' : 'Add Book' }}</button>
  
      <!-- Formulario para agregar o editar libros -->
      <div v-if="showAddForm" class="mt-3">
        <h4>{{ editingBook ? 'Edit Book' : 'Add Book' }}</h4>
        <form @submit.prevent="editingBook ? updateBook() : addBook()">
          <div class="mb-2">
            <label>Title</label>
            <input type="text" class="form-control" v-model="bookForm.title" required>
          </div>
          <div class="mb-2">
            <label>Edition</label>
            <input type="text" class="form-control" v-model="bookForm.edition" required>
          </div>
          <div class="mb-2">
            <label>Copyright Year</label>
            <input type="number" class="form-control" v-model="bookForm.copyright" required>
          </div>
          <div class="mb-2">
            <label>Language</label>
            <input type="text" class="form-control" v-model="bookForm.language" required>
          </div>
          <div class="mb-2">
            <label>Pages</label>
            <input type="number" class="form-control" v-model="bookForm.pages" required>
          </div>
          <div class="mb-2">
            <label>Author</label>
            <input type="text" class="form-control" v-model="bookForm.author" required>
          </div>
          <div class="mb-2">
            <label>Author ID</label>
            <input type="number" class="form-control" v-model="bookForm.author_id" required>
          </div>
          <div class="mb-2">
            <label>Publisher</label>
            <input type="text" class="form-control" v-model="bookForm.publisher" required>
          </div>
          <div class="mb-2">
            <label>Publisher ID</label>
            <input type="number" class="form-control" v-model="bookForm.publisher_id" required>
          </div>
          <button type="submit" class="btn btn-primary">{{ editingBook ? 'Update' : 'Add' }} Book</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'BookList',
    data() {
      return {
        books: [],
        bookForm: {
          id: null,
          title: '',
          edition: '',
          copyright: '',
          language: '',
          pages: '',
          author: '',
          author_id: '',
          publisher: '',
          publisher_id: ''
        },
        editingBook: false,
        showAddForm: false
      };
    },
    methods: {
      async fetchBooks() {
        try {
          const response = await axios.get('https://bespoke-pika-8d8a4b.netlify.app/.netlify/functions/books');
          this.books = response.data;
        } catch (error) {
          console.error("Error fetching books:", error);
        }
      },
      async addBook() {
        try {
          const response = await axios.post('https://bespoke-pika-8d8a4b.netlify.app/.netlify/functions/books', this.bookForm);
          this.books.push(response.data);
          this.clearForm();
        } catch (error) {
          console.error("Error adding book:", error);
        }
      },
      async deleteBook(id) {
        try {
          await axios.delete('https://bespoke-pika-8d8a4b.netlify.app/.netlify/functions/books', {
            headers: {
              'Content-Type': 'application/json'
            },
            data: { id }
          });
          this.books = this.books.filter(book => book.id !== id);
        } catch (error) {
          console.error("Error deleting book:", error);
        }
      },
      setEditBook(book) {
        this.bookForm = { ...book };
        this.editingBook = true;
        this.showAddForm = true;
      },
      async updateBook() {
        try {
          await axios.put('https://bespoke-pika-8d8a4b.netlify.app/.netlify/functions/books', this.bookForm);
          const index = this.books.findIndex(book => book.id === this.bookForm.id);
          if (index !== -1) this.books.splice(index, 1, this.bookForm);
          this.clearForm();
        } catch (error) {
          console.error("Error updating book:", error);
        }
      },
      clearForm() {
        this.bookForm = {
          id: null,
          title: '',
          edition: '',
          copyright: '',
          language: '',
          pages: '',
          author: '',
          author_id: '',
          publisher: '',
          publisher_id: ''
        };
        this.editingBook = false;
        this.showAddForm = false;
      },
      toggleAddForm() {
        this.showAddForm = !this.showAddForm;
        if (!this.showAddForm) {
          this.clearForm();
        }
      }
    },
    mounted() {
      this.fetchBooks();
    }
  };
  </script>
  