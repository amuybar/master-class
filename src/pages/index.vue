
<script lang="ts">
export default {
  name: 'HomeView',
 
}
</script>

<template>
  <div class="home-view">
    <RouterLink :to="{name:'/project/[id]',params:{id:1}}">Project 1 </RouterLink>
  </div>
</template>


<style scoped>
.home-view {
  
}
</style>