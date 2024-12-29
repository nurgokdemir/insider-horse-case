<template>
  <div id="app">
    <RaceHeader @generate="generateProgram" @start="startRace" />
    <div class="main-content">
      <HorseList :horses="selectedHorses" />
      <HorseTrack
        ref="horseTrack"
        :horses="selectedHorses"
        :trackLength="trackLength"
        @updateTrackLength="updateTrackLength"
        @setHorseWidth="setHorseWidth"
      />
      <ProgramResult />
    </div>
  </div>
</template>

<script>
import RaceHeader from "./components/RaceHeader.vue";
import HorseList from "./components/HorseList.vue";
import HorseTrack from "./components/HorseTrack.vue";
import ProgramResult from "./components/ProgramResult.vue";
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: "App",
  components: {
    RaceHeader,
    HorseList,
    HorseTrack,
    ProgramResult,
  },
  data() {
    return {
      raceInterval: null,
      totalRounds: 6,
    };
  },
  computed: {
    ...mapState([
      'laps',
      'selectedHorses',
      'trackLength',
      'horseWidth',
      'isRacePaused',
      'isReady',
      'currentRound'
    ]),
    ...mapGetters(['currentLap', 'isRaceComplete', 'programGenerated'])
  },
  methods: {
    ...mapActions([
      'generateProgram',
      'initializeRound',
      'updateRacePositions',
      'updateResults'
    ]),
    updateHorseDimensions({ horseWidth, trackLength }) {
      this.$emit("setHorseWidth", horseWidth); // Forward horse width to App.vue
      console.log("Horse Width Emitted to Parent:", horseWidth);

      this.$emit("updateTrackLength", trackLength); // Forward track length to App.vue
      console.log("Track Length Emitted to Parent:", trackLength);
    },
    getRandomColor() {
      const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
      return colors[Math.floor(Math.random() * colors.length)];
    },
    generateProgram() {
      console.log("Generating new program...");
      this.$store.dispatch('generateProgram');
    },
    setHorseWidth(width) {
      if (width > 0) {
        this.$store.commit('SET_HORSE_WIDTH', width);
        this.checkReadiness("Horse Width");
      }
    },
    updateTrackLength(length) {
      if (length > 0) {
        this.$store.commit('SET_TRACK_LENGTH', length);
        this.checkReadiness("Track Length");
      }
    },
    checkReadiness(source) {
      console.log(`Check Readiness Triggered by: ${source}`);
      if (this.horseWidth > 0 && this.trackLength > 0) {
        this.$store.commit('SET_READY', true);
        console.log("App is Ready: Both Dimensions Set");
      }
    },
    async startRace() {
      if (!this.programGenerated) {
        alert("Please generate program first!");
        return;
      }

      if (!this.isReady) {
        console.warn("Race cannot start. Dimensions not ready.");
        return;
      }

      if (this.isRacePaused && this.currentRound === 0 && this.laps[0].results.length > 0) {
        this.$store.commit('RESET_RESULTS');
        this.$store.dispatch('initializeRound');
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      if (this.isRacePaused) {
        console.log("Resuming race...");
        this.$store.commit('SET_RACE_PAUSED', false);

        while (this.currentRound < this.totalRounds) {
          // Only initialize horses if they don't have positions (new round)
          if (!this.selectedHorses.length || this.selectedHorses[0].position >= this.trackLength - this.horseWidth) {
            this.$store.dispatch('initializeRound');
          }

          console.log(`Starting round ${this.currentRound + 1}`);
          await this.runSingleRace();

          if (this.isRacePaused) {
            console.log("Race paused. Keeping current positions.");
            break;
          }

          if (this.currentRound === 5) {
            const resetHorses = this.selectedHorses.map(horse => ({
              ...horse,
              position: 0
            }));
            this.$store.dispatch('updateRacePositions', resetHorses);
            this.$store.commit('SET_RACE_PAUSED', true);
            this.$store.commit('SET_CURRENT_ROUND', 0);
            break;
          }

          this.$store.commit('SET_CURRENT_ROUND', this.currentRound + 1);
        }

        if (this.currentRound >= this.totalRounds) {
          console.log("All rounds completed!");
          this.$store.commit('SET_CURRENT_ROUND', 0);
          this.$store.commit('SET_RACE_PAUSED', true);
        }
      } else {
        console.log("Pausing race...");
        this.$store.commit('SET_RACE_PAUSED', true);
        clearInterval(this.raceInterval);
      }
    },
    runSingleRace() {
      return new Promise((resolve) => {
        const finishedSet = new Set();
        const baseSpeed = 3;
        const maxSpeedVariation = 15;
        const accelerationChance = 0.1;
        let allHorsesMoving = false;
        let canStartMoving = this.currentRound === 0; // Only first round starts immediately

        // For rounds after first, add delay before starting
        if (this.currentRound > 0) {
          setTimeout(() => {
            canStartMoving = true;
          }, 1000); // 1 second delay before horses start moving
        }

        this.raceInterval = setInterval(() => {
          const programOrder = this.laps[this.currentRound].program;
          
          const updatedHorses = this.selectedHorses.map((horse) => {
            // Only move horses if canStartMoving is true
            if (!finishedSet.has(horse.name) && canStartMoving) {
              let speed = baseSpeed + (Math.random() * maxSpeedVariation);
              
              if (Math.random() < accelerationChance) {
                speed *= 1.5;
              }
              
              const newPosition = horse.position + speed;
              
              return {
                ...horse,
                position: Math.min(
                  newPosition,
                  this.trackLength - this.horseWidth
                ),
              };
            }
            return horse;
          });

          allHorsesMoving = canStartMoving && updatedHorses.every(horse => horse.position > 0);
          this.$store.dispatch('updateRacePositions', updatedHorses);

          if (allHorsesMoving) {
            updatedHorses.forEach(horse => {
              if (horse.position >= this.trackLength - this.horseWidth && !finishedSet.has(horse.name)) {
                const programPosition = programOrder.indexOf(horse.name) + 1;
                console.log(`${horse.name} (Program Position: ${programPosition}) finished!`);
                finishedSet.add(horse.name);
                
                const currentResults = [...this.laps[this.currentRound].results];
                currentResults.push(horse.name);
                this.$store.dispatch('updateResults', currentResults);
              }
            });

            if (finishedSet.size === programOrder.length) {
              console.log('Round Complete:', this.currentRound + 1);
              clearInterval(this.raceInterval);
              resolve();
            }
          }
        }, 50);
      });
    },
    updateResults() {
      this.raceResults = [...this.selectedHorses].sort(
        (a, b) => b.position - a.position
      );
      console.log("Race Results:", this.raceResults);
    },
    selectRandomHorses(count) {
      return [...this.$store.state.horses]
        .sort(() => 0.5 - Math.random())
        .slice(0, count);
    },
  },
  mounted() {
    this.selectedHorses = this.selectRandomHorses(10); // Select 10 horses initially
    window.addEventListener("resize", this.updateTrackLength);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateTrackLength);
  },
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  display: flex;
  padding: 0.5rem;
  background-color: #dfd3c3;
  gap: 1rem;
  /* overflow: auto;  */
}

@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
  }
}
</style>
