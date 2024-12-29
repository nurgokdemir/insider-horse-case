<!-- src/components/RaceHeader.vue -->
<template>
  <header class="race-header">
    <h1 class="race-title">Horse Racing</h1>
    <div class="button-group">
      <button @click="$emit('generate')" class="action-button">Generate Program</button>
      <button @click="$emit('start')" class="action-button">
        {{ isRacePaused ? 'Start' : 'Pause' }}
      </button>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
import '../styles/RaceHeader.css'

export default {
  name: "RaceHeader",
  emits: ['generate', 'start', 'reset'],
  computed: {
    ...mapState(['isRacePaused'])
  }
}
</script>