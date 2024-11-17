<template>
  <div class="container mt-4">
    <h2>Fabricantes</h2>
    <ul class="list-group mb-3">
      <li v-for="manufacturer in manufacturers" :key="manufacturer.id" class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <h5 class="mb-0">{{ manufacturer.nombre }}</h5>
          <small class="text-muted">{{ manufacturer.pais_origen }} - Founded: {{ manufacturer.año_fundacion }}</small>
        </div>
        <div>
          <button class="btn btn-primary btn-sm me-2" @click="setEditManufacturer(manufacturer)">
            <i class="bi bi-pencil-square"></i> Edit
          </button>
          <button class="btn btn-danger btn-sm" @click="deleteManufacturer(manufacturer.id)">
            <i class="bi bi-trash"></i> Delete
          </button>
        </div>
      </li>
    </ul>

    <button class="btn btn-success mb-3" @click="toggleAddForm">
      <i class="bi" :class="showAddForm ? 'bi-x-circle' : 'bi-plus-circle'"></i>
      {{ showAddForm ? 'Cancel' : 'Add Manufacturer' }}
    </button>

    <div v-if="showAddForm" class="card p-4">
      <h4 class="card-title">{{ editingManufacturer ? 'Edit Manufacturer' : 'Add Manufacturer' }}</h4>
      <form @submit.prevent="editingManufacturer ? updateManufacturer() : addManufacturer()">
        <div class="mb-2">
          <label>Name</label>
          <input
            type="text"
            class="form-control"
            v-model="manufacturerForm.nombre"
            :disabled="editingManufacturer" 
            required
          >
        </div>
        <div class="mb-2">
          <label>Country of Origin</label>
          <input type="text" class="form-control" v-model="manufacturerForm.pais_origen" required>
        </div>
        <div class="mb-2">
          <label>Year Founded</label>
          <input type="number" class="form-control" v-model="manufacturerForm.año_fundacion" required>
        </div>
        <div class="mb-2">
          <label>Models Manufactured</label>
          <input
            type="text"
            class="form-control"
            v-model="manufacturerForm.modelos_fabricados"
            required
            placeholder="Comma-separated values"
          >
        </div>
        <button type="submit" class="btn btn-primary w-100">
          {{ editingManufacturer ? 'Update' : 'Add' }} Manufacturer
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ManufacturerList',
  data() {
    return {
      manufacturers: [],
      manufacturerForm: {
        id: null, // Using `id` as the unique identifier
        nombre: '',
        pais_origen: '',
        año_fundacion: '',
        modelos_fabricados: ''
      },
      editingManufacturer: false,
      showAddForm: false
    };
  },
  methods: {
    async fetchManufacturers() {
      try {
        const response = await axios.get('https://proyecto3backendsd.netlify.app/.netlify/functions/fabricantes');
        this.manufacturers = response.data;
      } catch (error) {
        console.error("Error fetching manufacturers:", error);
      }
    },
    async addManufacturer() {
      try {
        const response = await axios.post('https://proyecto3backendsd.netlify.app/.netlify/functions/fabricantes', this.manufacturerForm);
        this.manufacturers.push(response.data);
        this.clearForm();
      } catch (error) {
        console.error("Error adding manufacturer:", error);
      }
    },
    async deleteManufacturer(id) {
      try {
        await axios.delete('https://proyecto3backendsd.netlify.app/.netlify/functions/fabricantes', {
          params: { id } // Sending `id` as a query parameter
        });
        this.manufacturers = this.manufacturers.filter(manufacturer => manufacturer.id !== id);
      } catch (error) {
        console.error("Error deleting manufacturer:", error);
      }
    },
    setEditManufacturer(manufacturer) {
      this.manufacturerForm = { ...manufacturer };
      this.editingManufacturer = true;
      this.showAddForm = true;
    },
    async updateManufacturer() {
      try {
        await axios.put(`https://proyecto3backendsd.netlify.app/.netlify/functions/fabricantes/${this.manufacturerForm.id}`, this.manufacturerForm);
        const index = this.manufacturers.findIndex(manufacturer => manufacturer.id === this.manufacturerForm.id);
        if (index !== -1) this.manufacturers.splice(index, 1, this.manufacturerForm);
        this.clearForm();
      } catch (error) {
        console.error("Error updating manufacturer:", error);
      }
    },
    clearForm() {
      this.manufacturerForm = {
        id: null,
        nombre: '',
        pais_origen: '',
        año_fundacion: '',
        modelos_fabricados: ''
      };
      this.editingManufacturer = false;
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
    this.fetchManufacturers();
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
