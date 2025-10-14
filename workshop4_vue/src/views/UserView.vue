<template>
  <div class="user-view">
    <h1>User Profile</h1>
    <div class="multiplication-table">
      <h2>ตารางสูตรคูณ</h2>
      <input type="number" v-model.number="number" placeholder="ใส่ตัวเลข" />
      <button @click="generateTable">สร้างตาราง</button>

      <div v-if="multiplicationTable.length">
        <h3>ตารางสูตรคูณของ {{ number }}</h3>
        <ul>
          <li v-for="(value, index) in multiplicationTable" :key="index">
            {{ number }} x {{ index + 1 }} = {{ value }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const number = ref(null)
const multiplicationTable = ref([])
const generateTable = () => {
  multiplicationTable.value = []
  if (number.value !== null) {
    for (let i = 1; i <= 12; i++) {
      multiplicationTable.value.push(number.value * i)
    }
  }
}
</script>
