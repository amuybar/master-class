
<template>
  <div class="not-found">
    <h1>404 Error</h1>
    <p>Page '{{ $route.path }}' not found</p>
    <RouterLink to = '/'>Go to Homepage</RouterLink>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<style>
.not-found {
  text-align: center;
  padding: 2rem;
  background-color: #1f3300;
  color: #ffffff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.not-found h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.not-found p {
  font-size: 1.5rem;
}
</style>
