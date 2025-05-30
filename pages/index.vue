<template>
  <v-container>
    <v-row class="mt-4">
      <v-col cols="12">
        <div class="d-flex justify-space-between align-center">
          <h1 class="text-h3 font-weight-bold">Today's Progress</h1>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card class="rounded-lg" elevation="2">
          <ProgressCircle 
            :history="progressHistory" 
            :activeDay="activeDay" 
            :dailyTarget="dailyTarget"
            label="Per Day"
            :onUpdateTarget="updateDailyTarget"
          />
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card class="rounded-lg" elevation="2">
          <WeeklyProgress :activeDay="activeDay" :dailyTarget="dailyTarget" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ProgressCircle from '~/components/ProgressCircle.vue'
import WeeklyProgress from '~/components/WeeklyProgress.vue'

export default {
  components: {
    ProgressCircle,
    WeeklyProgress
  },
  data() {
    return {
      progressHistory: [800, 700, 500, 900, 600, 300, 450],
      activeDay: 1,
      dailyTarget: 1000
    }
  },
  methods: {
    updateDailyTarget(newTarget) {
      this.dailyTarget = newTarget;
      // In a real app, you might want to save this to localStorage or a backend
    }
  }
}
</script>

<style scoped>
.text-h3 {
  color: #333;
}
</style>
