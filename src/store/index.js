// store/index.js
import { createStore } from 'vuex'

const HORSE_COLORS = {
  Secretariat: '#FF6B6B',    // Red
  ManOWar: '#4ECDC4',        // Turquoise
  Seabiscuit: '#45B7D1',     // Blue
  Citation: '#96CEB4',       // Mint
  SeattleSlew: '#FFEEAD',    // Yellow
  PharLap: '#D4A5A5',        // Pink
  Eclipse: '#9B59B6',        // Purple
  RedRum: '#3498DB',         // Blue
  Frankel: '#E67E22',        // Orange
  Arkle: '#2ECC71',          // Green
  BlackCaviar: '#F1C40F',    // Yellow
  Zenyatta: '#E74C3C',       // Red
  Kincsem: '#1ABC9C',        // Turquoise
  Nijinsky: '#8E44AD',       // Purple
  Winx: '#D35400',           // Orange
  Makybe: '#27AE60',         // Green
  Ruffian: '#3498DB',        // Blue
  Affirmed: '#F39C12',       // Orange
  Barbaro: '#16A085',        // Green
  NorthernDancer: '#8E44AD'  // Purple
};

const HORSE_CONDITIONS = {
  Secretariat: 95,
  ManOWar: 94,
  Seabiscuit: 88,
  Citation: 92,
  SeattleSlew: 87,
  PharLap: 89,
  Eclipse: 86,
  RedRum: 91,
  Frankel: 96,
  Arkle: 88,
  BlackCaviar: 93,
  Zenyatta: 89,
  Kincsem: 90,
  Nijinsky: 86,
  Winx: 92,
  Makybe: 88,
  Ruffian: 87,
  Affirmed: 86,
  Barbaro: 89,
  NorthernDancer: 90
};

export default createStore({
  state() {
    return {
      horses: [
        { id: 1, name: "Secretariat", position: 0, color: HORSE_COLORS.Secretariat, condition: HORSE_CONDITIONS.Secretariat },
        { id: 2, name: "ManOWar", position: 0, color: HORSE_COLORS.ManOWar, condition: HORSE_CONDITIONS.ManOWar },
        { id: 3, name: "Seabiscuit", position: 0, color: HORSE_COLORS.Seabiscuit, condition: HORSE_CONDITIONS.Seabiscuit },
        { id: 4, name: "Citation", position: 0, color: HORSE_COLORS.Citation, condition: HORSE_CONDITIONS.Citation },
        { id: 5, name: "SeattleSlew", position: 0, color: HORSE_COLORS.SeattleSlew, condition: HORSE_CONDITIONS.SeattleSlew },
        { id: 6, name: "PharLap", position: 0, color: HORSE_COLORS.PharLap, condition: HORSE_CONDITIONS.PharLap },
        { id: 7, name: "Eclipse", position: 0, color: HORSE_COLORS.Eclipse, condition: HORSE_CONDITIONS.Eclipse },
        { id: 8, name: "RedRum", position: 0, color: HORSE_COLORS.RedRum, condition: HORSE_CONDITIONS.RedRum },
        { id: 9, name: "Frankel", position: 0, color: HORSE_COLORS.Frankel, condition: HORSE_CONDITIONS.Frankel },
        { id: 10, name: "Arkle", position: 0, color: HORSE_COLORS.Arkle, condition: HORSE_CONDITIONS.Arkle },
        { id: 11, name: "BlackCaviar", position: 0, color: HORSE_COLORS.BlackCaviar, condition: HORSE_CONDITIONS.BlackCaviar },
        { id: 12, name: "Zenyatta", position: 0, color: HORSE_COLORS.Zenyatta, condition: HORSE_CONDITIONS.Zenyatta },
        { id: 13, name: "Kincsem", position: 0, color: HORSE_COLORS.Kincsem, condition: HORSE_CONDITIONS.Kincsem },
        { id: 14, name: "Nijinsky", position: 0, color: HORSE_COLORS.Nijinsky, condition: HORSE_CONDITIONS.Nijinsky },
        { id: 15, name: "Winx", position: 0, color: HORSE_COLORS.Winx, condition: HORSE_CONDITIONS.Winx },
        { id: 16, name: "Makybe", position: 0, color: HORSE_COLORS.Makybe, condition: HORSE_CONDITIONS.Makybe },
        { id: 17, name: "Ruffian", position: 0, color: HORSE_COLORS.Ruffian, condition: HORSE_CONDITIONS.Ruffian },
        { id: 18, name: "Affirmed", position: 0, color: HORSE_COLORS.Affirmed, condition: HORSE_CONDITIONS.Affirmed },
        { id: 19, name: "Barbaro", position: 0, color: HORSE_COLORS.Barbaro, condition: HORSE_CONDITIONS.Barbaro },
        { id: 20, name: "NorthernDancer", position: 0, color: HORSE_COLORS.NorthernDancer, condition: HORSE_CONDITIONS.NorthernDancer }
      ],
      laps: [
        { name: "1ST Lap - 1200m", program: [], results: [] },
        { name: "2ND Lap - 1400m", program: [], results: [] },
        { name: "3RD Lap - 1600m", program: [], results: [] },
        { name: "4TH Lap - 1800m", program: [], results: [] },
        { name: "5TH Lap - 2000m", program: [], results: [] },
        { name: "6TH Lap - 2200m", program: [], results: [] },
      ],
      selectedHorses: [],
      currentRound: 0,
      isRacePaused: true,
      trackLength: 0,
      horseWidth: 0,
      isReady: false
    }
  },
  mutations: {
    RESET_HORSE_POSITIONS(state) {
      state.horses = state.horses.map(horse => ({
        ...horse,
        position: 0
      }))
    },
    SET_PROGRAM(state, programs) {
      state.laps = state.laps.map((lap, index) => ({
        ...lap,
        program: programs[index],
        results: []
      }))
    },
    SET_SELECTED_HORSES(state, horses) {
      state.selectedHorses = horses
    },
    UPDATE_HORSE_POSITIONS(state, horses) {
      state.selectedHorses = horses
    },
    UPDATE_LAP_RESULTS(state, { round, results }) {
      state.laps[round].results = results
    },
    SET_CURRENT_ROUND(state, round) {
      state.currentRound = round
    },
    SET_RACE_PAUSED(state, isPaused) {
      state.isRacePaused = isPaused
    },
    SET_TRACK_LENGTH(state, length) {
      state.trackLength = length
    },
    SET_HORSE_WIDTH(state, width) {
      state.horseWidth = width
    },
    SET_READY(state, isReady) {
      state.isReady = isReady
    },
    RESET_RACE(state) {
      state.currentRound = 0;
      state.isRacePaused = true;
      state.laps = state.laps.map(lap => ({
        ...lap,
        program: [],
        results: []
      }));
      state.selectedHorses = [];
      state.horses = state.horses.map(horse => ({
        ...horse,
        position: 0
      }));
      state.isReady = false;
    },
    RESET_LAPS(state) {
      state.laps = state.laps.map(lap => ({
        ...lap,
        program: [],
        results: []
      }));
    },
    RESET_RESULTS(state) {
      state.laps = state.laps.map(lap => ({
        ...lap,
        results: []
      }));
      state.selectedHorses = state.selectedHorses.map(horse => ({
        ...horse,
        position: 0
      }));
    }
  },
  actions: {
    generateProgram({ commit, state }) {
      commit('RESET_RACE')
      commit('RESET_HORSE_POSITIONS')
      
      const programs = state.laps.map(() => {
        const programHorses = [...state.horses]
          .sort(() => 0.5 - Math.random())
          .slice(0, 10)
          .map(horse => horse.name)
        return programHorses
      })
      
      commit('SET_PROGRAM', programs)
      
      const firstRoundHorses = state.horses
        .filter(horse => programs[0].includes(horse.name))
        .map(horse => ({
          ...horse,
          position: 0
        }))
      commit('SET_SELECTED_HORSES', firstRoundHorses)
    },
    
    initializeRound({ commit, state }) {
      const programHorses = state.horses
        .filter(horse => state.laps[state.currentRound].program.includes(horse.name))
        .map(horse => ({
          ...horse,
          position: 0
        }))
      commit('SET_SELECTED_HORSES', programHorses)
    },
    
    updateRacePositions({ commit }, newPositions) {
      commit('UPDATE_HORSE_POSITIONS', newPositions)
    },
    
    updateResults({ commit, state }, results) {
      commit('UPDATE_LAP_RESULTS', {
        round: state.currentRound,
        results: results
      })
    }
  },
  getters: {
    currentLap: state => state.laps[state.currentRound],
    isRaceComplete: state => state.currentRound >= state.laps.length,
    programGenerated: state => state.laps[0].program.length > 0
  }
})
