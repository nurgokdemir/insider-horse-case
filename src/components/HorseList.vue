<template>
  <div class="horse-list">
    <h3>Horse List (1-20)</h3>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Condition</th>
          <th>Color</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="horse in allHorses" :key="horse.id">
          <td>{{ horse.name }}</td>
          <td>{{ horse.condition }}</td>
          <td>
            <div 
              class="color-box" 
              :style="{ backgroundColor: horse.color }"
              :title="getColorName(horse.color)"
            ></div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import '../styles/HorseList.css'

export default {
  computed: {
    ...mapState(['horses', 'selectedHorses', 'laps', 'currentRound']),
    allHorses() {
      return this.horses
    }
  },
  methods: {
    getColorName(colorCode) {
      const HORSE_COLORS = {
        '#FF6B6B': 'Red',
        '#4ECDC4': 'Turquoise',
        '#45B7D1': 'Blue',
        '#96CEB4': 'Mint',
        '#FFEEAD': 'Yellow',
        '#D4A5A5': 'Pink',
        '#9B59B6': 'Purple',
        '#3498DB': 'Blue',
        '#E67E22': 'Orange',
        '#2ECC71': 'Green',
        '#F1C40F': 'Yellow',
        '#E74C3C': 'Red',
        '#1ABC9C': 'Turquoise',
        '#8E44AD': 'Purple',
        '#D35400': 'Orange',
        '#27AE60': 'Green',
        '#16A085': 'Green',
        '#F39C12': 'Orange'
      }
      
      return HORSE_COLORS[colorCode.toUpperCase()] || colorCode
    }
  }
}
</script>
  