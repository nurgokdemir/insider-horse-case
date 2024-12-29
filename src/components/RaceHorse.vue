<template>
  <div ref="horseContainer" class="horse-container">
    <img
      ref="horseImage"
      class="horse-image"
      src="@/assets/horse.png"
      alt="horse"
      @load="emitDimensions"
      :style="{ transform: `translateX(${horse.position}px)` }"
    />
  </div>
</template>

<script>
import '../styles/RaceHorse.css'

export default {
  name: "RaceHorse",
  props: {
    horse: Object, // Horse object
  },
  methods: {
    emitDimensions() {
      // Ensure both the container and image dimensions are calculated
      this.$nextTick(() => {
        const horseWidth = this.$refs.horseImage?.offsetWidth || 0;
        const trackLength = this.$refs.horseContainer?.offsetWidth || 0;

        if (horseWidth > 0 && trackLength > 0) {
          // Emit both dimensions to the parent
          this.$emit("setHorseDimensions", {
            horseWidth,
            trackLength,
          });
          console.log("Horse Image Width:", horseWidth);
          console.log("Horse Container Track Length:", trackLength);
        } else {
          console.warn(
            "Retrying Horse Dimensions Calculation: Width or Track Length not ready."
          );
          setTimeout(this.emitDimensions, 100); // Retry after a short delay
        }
      });
    },
  },
};
</script>