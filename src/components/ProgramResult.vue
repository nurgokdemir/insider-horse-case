<template>
  <div id="app" class="container">
    <div class="box-container">
      <!-- Program Box -->
      <div class="box">
        <h2>Program</h2>
        <div class="scrollable">
          <div v-for="(lap, index) in laps" :key="index" class="lap">
            <table border="1" class="lap-table">
              <thead>
                <tr>
                  <th colspan="2" class="lap-header">{{ lap.name }}</th>
                </tr>
                <tr>
                  <th>Position</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(person, idx) in lap.program" :key="idx">
                  <td>{{ idx + 1 }}</td>
                  <td>{{ person }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Results Box -->
      <div class="box">
        <h2>Results</h2>
        <div class="scrollable">
          <div v-for="(lap, index) in laps" :key="index" class="lap">
            <table border="1" class="lap-table">
              <thead>
                <tr>
                  <th colspan="2" class="lap-header">{{ lap.name }}</th>
                </tr>
                <tr>
                  <th>Position</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(person, idx) in lap.results" :key="idx">
                  <td>{{ getTrackNumber(lap.program, person) }}</td>
                  <td>{{ person }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div> 
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import '../styles/ProgramResult.css'

export default {
  computed: {
    ...mapState(['laps'])
  },
  methods: {
    getTrackNumber(program, horseName) {
      // Add 1 because array index starts at 0
      return program.indexOf(horseName) + 1;
    }
  }
};
</script>
