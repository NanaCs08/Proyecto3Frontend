<template>
  <div class="container mt-4">
    <h2>Aviones</h2>
    <ul class="list-group mb-3">
      <li v-for="plane in planes" :key="plane.id" class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <h5 class="mb-0">{{ plane.modelo }}</h5>
          <small class="text-muted">
            ID: {{ plane.id }} | {{ plane.fabricante }} - {{ plane.tipo }}
          </small>
        </div>
        <div>
          <button class="btn btn-primary btn-sm me-2" @click="setEditPlane(plane)">
            <i class="bi bi-pencil-square"></i> Edit
          </button>
          <button class="btn btn-danger btn-sm" @click="deletePlane(plane.id)">
            <i class="bi bi-trash"></i> Delete
          </button>
        </div>
      </li>
    </ul>

    <button class="btn btn-success mb-3" @click="toggleAddForm">
      <i class="bi" :class="showAddForm ? 'bi-x-circle' : 'bi-plus-circle'"></i>
      {{ showAddForm ? 'Cancel' : 'Add Plane' }}
    </button>

    <div v-if="showAddForm" class="card p-4">
      <h4 class="card-title">{{ editingPlane ? 'Edit Plane' : 'Add Plane' }}</h4>
      <form @submit.prevent="editingPlane ? updatePlane() : addPlane()">
        <div class="mb-2">
          <label>Model</label>
          <input
            type="text"
            class="form-control"
            v-model="planeForm.modelo"
            :disabled="editingPlane" 
            required
          >
        </div>
        <div class="mb-2">
          <label>Manufacturer</label>
          <input type="text" class="form-control" v-model="planeForm.fabricante" required>
        </div>
        <div class="mb-2">
          <label>Type</label>
          <input type="text" class="form-control" v-model="planeForm.tipo" required>
        </div>
        <div class="mb-2">
          <label>Capacity</label>
          <input type="number" class="form-control" v-model="planeForm.capacidad" required>
        </div>
        <button type="submit" class="btn btn-primary w-100">
          {{ editingPlane ? 'Update' : 'Add' }} Plane
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PlaneList',
  data() {
    return {
      planes: [],
      planeForm: {
        id: null, // Use `null` for initial empty state
        modelo: '',
        fabricante: '',
        tipo: '',
        capacidad: null // Use `null` for numeric fields
      },
      editingPlane: false,
      showAddForm: false
    };
  },
  methods: {
    async fetchPlanes() {
      try {
        const response = await axios.get('https://proyecto3backendsd.netlify.app/.netlify/functions/aviones');
        this.planes = response.data;
      } catch (error) {
        console.error("Error fetching planes:", error);
      }
    },
    async addPlane() {
      try {
        const response = await axios.post('https://proyecto3backendsd.netlify.app/.netlify/functions/aviones', this.planeForm);
        this.planes.push(response.data);
        this.clearForm();
      } catch (error) {
        console.error("Error adding plane:", error);
      }
    },
    async deletePlane(id) {
      try {
        await axios.delete('https://proyecto3backendsd.netlify.app/.netlify/functions/aviones', {
          params: { id } // Send `id` as a query parameter
        });
        this.planes = this.planes.filter(plane => plane.id !== id);
      } catch (error) {
        console.error("Error deleting plane:", error);
      }
    },
    setEditPlane(plane) {
      this.planeForm = { ...plane };
      this.editingPlane = true;
      this.showAddForm = true;
    },
    async updatePlane() {
      try {
        await axios.put(`https://proyecto3backendsd.netlify.app/.netlify/functions/aviones/${this.planeForm.id}`, this.planeForm);
        const index = this.planes.findIndex(plane => plane.id === this.planeForm.id);
        if (index !== -1) this.planes.splice(index, 1, this.planeForm);
        this.clearForm();
      } catch (error) {
        console.error("Error updating plane:", error);
      }
    },
    clearForm() {
      this.planeForm = {
        id: null,
        modelo: '',
        fabricante: '',
        tipo: '',
        capacidad: null
      };
      this.editingPlane = false;
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
    this.fetchPlanes();
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
