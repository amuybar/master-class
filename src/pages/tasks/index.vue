<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable @typescript-eslint/no-explicit-any -->

<script setup lang="ts">
import {supabase} from '@/lib/supabaseClient'
import {ref, onMounted} from 'vue'
import type {Tables} from '../../../database/types'

const tasks = ref<Tables<'tasks'>[] | null>(null)
const error = ref()

onMounted(async () => {
  const {data, error: supaError} = await supabase.from('tasks').select('*')
  if(supaError) {
    error.value = supaError.message
  } else {
    tasks.value = data
  }
})
</script>

<template>
  <div class="task-view">
    <RouterLink to='/'>Homepage </RouterLink>
    <h1>tasks</h1>
    <div v-if="error">{{error}}</div>
    <div v-else-if="tasks">
      <li v-for="task in tasks " :key="task.id">
        {{task.name}}
      </li>
    </div>
  </div>
</template>


<style scoped>
.project-view {
  
}
</style>