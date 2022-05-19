<template>
  <div class="index">
    <el-tag>single: {{ counter }}</el-tag>
    <el-tag>doubleCount : {{ doubleCount }}</el-tag>
    <el-button @click="onChange">Change It</el-button>
  </div>
</template>

<script name="Index" setup lang="ts">
  import { useCounterStore } from '@/stores/counter'
  let { counter, doubleCount, increment } = $(useCounterStore())

  let onChange = () => {
    increment()
  }
</script>

<style scoped></style>
