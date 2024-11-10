<template>
    <div class="container mt-4">
      <h2>Publishers</h2>
      <ul class="list-group mb-3">
        <li v-for="publisher in publishers" :key="publisher.id" class="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <h5 class="mb-0">{{ publisher.publisher }}</h5>
            <small>{{ publisher.country }} - Founded: {{ publisher.founded }}</small>
          </div>
          <div>
            <button class="btn btn-primary btn-sm me-2" @click="setEditPublisher(publisher)">Edit</button>
            <button class="btn btn-danger btn-sm" @click="deletePublisher(publisher.id)">Delete</button>
          </div>
        </li>
      </ul>
      <button class="btn btn-success" @click="toggleAddForm">{{ showAddForm ? 'Cancel' : 'Add Publisher' }}</button>
  
      <div v-if="showAddForm" class="mt-3">
        <h4>{{ editingPublisher ? 'Edit Publisher' : 'Add Publisher' }}</h4>
        <form @submit.prevent="editingPublisher ? updatePublisher() : addPublisher()">
          <div class="mb-2">
            <label>Publisher</label>
            <input type="text" class="form-control" v-model="publisherForm.publisher" required>
          </div>
          <div class="mb-2">
            <label>Country</label>
            <input type="text" class="form-control" v-model="publisherForm.country" required>
          </div>
          <div class="mb-2">
            <label>Founded Year</label>
            <input type="number" class="form-control" v-model="publisherForm.founded" required>
          </div>
          <div class="mb-2">
            <label>Genre</label>
            <input type="text" class="form-control" v-model="publisherForm.genre" required>
          </div>
          <button type="submit" class="btn btn-primary">{{ editingPublisher ? 'Update' : 'Add' }} Publisher</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'PublisherList',
    data() {
      return {
        publishers: [],
        publisherForm: {
          id: null,
          publisher: '',
          country: '',
          founded: '',
          genre: ''
        },
        editingPublisher: false,
        showAddForm: false
      };
    },
    methods: {
      async fetchPublishers() {
        try {
          const response = await axios.get('https://bespoke-pika-8d8a4b.netlify.app/.netlify/functions/publishers');
          this.publishers = response.data;
        } catch (error) {
          console.error("Error fetching publishers:", error);
        }
      },
      async addPublisher() {
        try {
          const response = await axios.post('https://bespoke-pika-8d8a4b.netlify.app/.netlify/functions/publishers', this.publisherForm);
          this.publishers.push(response.data);
          this.clearForm();
        } catch (error) {
          console.error("Error adding publisher:", error);
        }
      },
      async deletePublisher(id) {
        try {
          await axios.delete('https://bespoke-pika-8d8a4b.netlify.app/.netlify/functions/publishers', {
            headers: {
              'Content-Type': 'application/json'
            },
            data: { id }
          });
          this.publishers = this.publishers.filter(publisher => publisher.id !== id);
        } catch (error) {
          console.error("Error deleting publisher:", error);
        }
      },
      setEditPublisher(publisher) {
        this.publisherForm = { ...publisher };
        this.editingPublisher = true;
        this.showAddForm = true;
      },
      async updatePublisher() {
        try {
          await axios.put('https://bespoke-pika-8d8a4b.netlify.app/.netlify/functions/publishers', this.publisherForm);
          const index = this.publishers.findIndex(publisher => publisher.id === this.publisherForm.id);
          if (index !== -1) this.publishers.splice(index, 1, this.publisherForm);
          this.clearForm();
        } catch (error) {
          console.error("Error updating publisher:", error);
        }
      },
      clearForm() {
        this.publisherForm = {
          id: null,
          publisher: '',
          country: '',
          founded: '',
          genre: ''
        };
        this.editingPublisher = false;
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
      this.fetchPublishers();
    }
  };
  </script>
  