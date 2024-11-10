<template>
  <div class="container mt-4">
    <h2>Authors</h2>
    <ul class="list-group mb-3">
      <li v-for="author in authors" :key="author._id" class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <h5 class="mb-0">{{ author.author }}</h5> <!-- Cambiado a `author.author` -->
          <small>{{ author.nationality }} - {{ author.fields }}</small>
        </div>
        <div>
          <button class="btn btn-primary btn-sm me-2" @click="setEditAuthor(author)">Edit</button>
          <button class="btn btn-danger btn-sm" @click="deleteAuthor(author._id)">Delete</button>
        </div>
      </li>
    </ul>

    <button class="btn btn-success" @click="toggleAddForm">{{ showAddForm ? 'Cancel' : 'Add Author' }}</button>

    <div v-if="showAddForm" class="mt-3">
      <h4>{{ editingAuthor ? 'Edit Author' : 'Add Author' }}</h4>
      <form @submit.prevent="editingAuthor ? updateAuthor() : addAuthor()">
        <div class="mb-2">
          <label>Author</label>
          <input type="text" class="form-control" v-model="authorForm.author" required> <!-- Cambiado a `authorForm.author` -->
        </div>
        <div class="mb-2">
          <label>Nationality</label>
          <input type="text" class="form-control" v-model="authorForm.nationality" required>
        </div>
        <div class="mb-2">
          <label>Birth Year</label>
          <input type="number" class="form-control" v-model="authorForm.birth_year" required>
        </div>
        <div class="mb-2">
          <label>Fields</label>
          <input type="text" class="form-control" v-model="authorForm.fields" required>
        </div>
        <button type="submit" class="btn btn-primary">{{ editingAuthor ? 'Update' : 'Add' }} Author</button>
      </form>
    </div>
  </div>
</template>

  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'AuthorList',
    data() {
      return {
        authors: [],
        authorForm: {
          id: null,
          author: '',
          nationality: '',
          birth_year: '',
          fields: ''
        },
        editingAuthor: false,
        showAddForm: false
      };
    },
    methods: {
      async fetchAuthors() {
        try {
          const response = await axios.get('https://bespoke-pika-8d8a4b.netlify.app/.netlify/functions/authors');
          this.authors = response.data;
        } catch (error) {
          console.error("Error fetching authors:", error);
        }
      },
      async addAuthor() {
        try {
          const response = await axios.post('https://bespoke-pika-8d8a4b.netlify.app/.netlify/functions/authors', this.authorForm);
          this.authors.push(response.data);
          this.clearForm();
        } catch (error) {
          console.error("Error adding author:", error);
        }
      },
      async deleteAuthor(id) {
        try {
          console.log("Deleting author with ID:", id); // Verifica el ID en la consola
          await axios.delete('https://bespoke-pika-8d8a4b.netlify.app/.netlify/functions/authors', {
            headers: {
              'Content-Type': 'application/json'
            },
            data: { id } // El ID se envía en el cuerpo
          });
          this.authors = this.authors.filter(author => author._id !== id);
        } catch (error) {
          console.error("Error deleting author:", error);
        }
      },
      setEditAuthor(author) {
        this.authorForm = { ...author };
        this.editingAuthor = true;
        this.showAddForm = true;
      },
      async updateAuthor() {
        try {
          await axios.put('https://bespoke-pika-8d8a4b.netlify.app/.netlify/functions/authors', {
            id: this.authorForm._id, // Cambia a `id` en el backend y mantén el nombre aquí
            name: this.authorForm.name,
            nationality: this.authorForm.nationality,
            birth_year: this.authorForm.birth_year,
            fields: this.authorForm.fields
          });
          const index = this.authors.findIndex(author => author._id === this.authorForm._id);
          if (index !== -1) this.authors.splice(index, 1, this.authorForm);
          this.clearForm();
        } catch (error) {
          console.error("Error updating author:", error);
        }
      },
      clearForm() {
        this.authorForm = {
          id: null,
          name: '',
          nationality: '',
          birth_year: '',
          fields: ''
        };
        this.editingAuthor = false;
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
      this.fetchAuthors();
    }
  };
  </script>
  