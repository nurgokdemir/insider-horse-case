<template>
  <div ref="raceTrack" class="race-track">
    <div class="track-container">
      <div
        v-for="(horseName, index) in displayHorses"
        :key="horseName"
        :index="index"
        class="track-row"
      >
        <div class="lane-number">{{ index + 1 }}</div>
        <RaceHorse
          :horse="findHorse(horseName)"
          @setHorseDimensions="updateHorseDimensions"
        />
      </div>
      <!-- Finish line -->
      <div class="finish-line"></div>
      <!-- Finish text -->
      <div class="finish-text">FINISH</div>
    </div>
    <div class="lap-header">
      <h2>{{ currentLapName }}</h2>
    </div>
  </div>
</template>

<script>
import RaceHorse from "./RaceHorse.vue";
import { mapState } from "vuex";
import '../styles/HorseTrack.css'

export default {
  name: "HorseTrack",
  props: {
    horses: Array,
    trackLength: Number,
  },
  components: {
    RaceHorse,
  },
  data() {
    return {
      defaultHorses: [
        "Thunder",
        "Storm",
        "Lightning",
        "Shadow",
        "Spirit",
        "Blaze",
        "Wind",
        "Arrow",
        "Flash",
        "Bolt",
      ],
    };
  },
  computed: {
    ...mapState(["laps", "currentRound"]),
    programOrder() {
      return this.laps?.[this.currentRound]?.program || [];
    },
    currentLapName() {
      return this.laps?.[this.currentRound]?.name || "1ST Lap - 1200m";
    },
    displayHorses() {
      return this.programOrder.length > 0 ? this.programOrder : this.defaultHorses;
    },
  },
  methods: {
    updateHorseDimensions({ horseWidth, trackLength }) {
      this.$emit("setHorseWidth", horseWidth);
      this.$emit("updateTrackLength", trackLength);
    },
    findHorse(horseName) {
      const horse = this.horses?.find((h) => h.name === horseName);
      return (
        horse || {
          name: horseName,
          position: 0,
          color: "#ddd",
        }
      );
    },
  },
};
</script>
