<template>
  <div class="container mt-4">
    <h2 class="text-center mb-4">Aerolíneas</h2>
    <ul class="list-group mb-4">
      <li v-for="airline in airlines" :key="airline.id" class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <h5 class="mb-0">{{ airline.nombre }}</h5>
          <small class="text-muted">ID: {{ airline.id }} | {{ airline.pais_origen }} - Fleet: {{ airline.flota }}</small>
        </div>
        <div>
          <button class="btn btn-primary btn-sm me-2" @click="setEditAirline(airline)">
            <i class="bi bi-pencil-square"></i> Edit
          </button>
          <button class="btn btn-danger btn-sm" @click="deleteAirline(airline.id)">
            <i class="bi bi-trash"></i> Delete
          </button>
        </div>
      </li>
    </ul>

    <button class="btn btn-success mb-3" @click="toggleAddForm">
      <i class="bi" :class="showAddForm ? 'bi-x-circle' : 'bi-plus-circle'"></i>
      {{ showAddForm ? 'Cancel' : 'Add Airline' }}
    </button>

    <div v-if="showAddForm" class="card p-4">
      <h4 class="card-title">{{ editingAirline ? 'Edit Airline' : 'Add Airline' }}</h4>
      <form @submit.prevent="editingAirline ? updateAirline() : addAirline()">
        <div v-if="editingAirline" class="mb-3">
          <label>ID</label>
          <input type="number" class="form-control" v-model="airlineForm.id" disabled>
        </div>
        <div class="mb-3">
          <label>Name</label>
          <input
            type="text"
            class="form-control"
            v-model="airlineForm.nombre"
            :disabled="editingAirline"
            required
          >
        </div>
        <div class="mb-3">
          <label>Country of Origin</label>
          <input type="text" class="form-control" v-model="airlineForm.pais_origen" required>
        </div>
        <div class="mb-3">
          <label>Fleet Size</label>
          <input type="number" class="form-control" v-model="airlineForm.flota" required>
        </div>
        <div class="mb-3">
          <label>Operated Models</label>
          <input
            type="text"
            class="form-control"
            v-model="airlineForm.modelos_operados"
            required
            placeholder="Comma-separated values"
          >
        </div>
        <button type="submit" class="btn btn-primary w-100">
          {{ editingAirline ? 'Update' : 'Add' }} Airline
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AirlineList',
  data() {
    return {
      airlines: [],
      airlineForm: {
        id: '', // Including `id` in the form
        nombre: '',
        pais_origen: '',
        flota: '',
        modelos_operados: ''
      },
      editingAirline: false,
      showAddForm: false
    };
  },
  methods: {
    async fetchAirlines() {
      try {
        const response = await axios.get('https://proyecto3backendsd.netlify.app/.netlify/functions/aerolineas');
        this.airlines = response.data;
      } catch (error) {
        console.error("Error fetching airlines:", error);
      }
    },
    async addAirline() {
      try {
        const response = await axios.post('https://proyecto3backendsd.netlify.app/.netlify/functions/aerolineas', this.airlineForm);
        this.airlines.push(response.data); // Add the new airline to the list
        this.clearForm();
      } catch (error) {
        console.error("Error adding airline:", error);
      }
    },
    async deleteAirline(id) {
      try {
        await axios.delete('https://proyecto3backendsd.netlify.app/.netlify/functions/aerolineas', {
          params: { id } // Sending `id` as a query parameter
        });
        this.airlines = this.airlines.filter(airline => airline.id !== id);
      } catch (error) {
        console.error("Error deleting airline:", error);
      }
    },
    setEditAirline(airline) {
      this.airlineForm = { ...airline };
      this.editingAirline = true;
      this.showAddForm = true;
    },
    async updateAirline() {
      try {
        const response = await axios.put(`https://proyecto3backendsd.netlify.app/.netlify/functions/aerolineas/${this.airlineForm.id}`, {
          nombre: this.airlineForm.nombre,
          pais_origen: this.airlineForm.pais_origen,
          flota: this.airlineForm.flota,
          modelos_operados: this.airlineForm.modelos_operados
        });

        const index = this.airlines.findIndex(airline => airline.id === this.airlineForm.id);
        if (index !== -1) this.airlines.splice(index, 1, response.data);
        this.clearForm();
      } catch (error) {
        console.error("Error updating airline:", error);
      }
    },
    clearForm() {
      this.airlineForm = {
        id: '',
        nombre: '',
        pais_origen: '',
        flota: '',
        modelos_operados: ''
      };
      this.editingAirline = false;
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
    this.fetchAirlines();
  }
};
</script>

<style>
.container {
  max-width: 800px;
  margin: auto;
}
.card {
  border: 1px solid #e3e3e3;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
