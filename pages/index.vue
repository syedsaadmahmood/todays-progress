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
          <ProgressCard 
            :history="history" 
            :activeDay="activeDay" 
            :dailyTarget="dailyTarget"
            label="Per Day"
            :onUpdateTarget="updateDailyTarget"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ProgressCard from '~/components/ProgressCard.vue'

export default {
  components: {
    ProgressCard
  },
  data() {
    return {
      history: [
        { label: 'M', completed: true, progress: true, current: 900, total: 1000 },
        { label: 'T', completed: true, progress: true, current: 700, total: 1000 },
        { label: 'W', completed: true, progress: false },
        { label: 'Th', completed: false, progress: false },
        { label: 'F', completed: false, progress: false },
        { label: 'Sat', completed: false, progress: false },
        { label: 'Su', completed: false, progress: false }
      ],
      activeDay: 1,
      dailyTarget: 1000
    }
  },
  methods: {
    updateDailyTarget(newTarget) {
      this.dailyTarget = newTarget;
      this.history = this.history.map(day => ({
        ...day,
        total: day.progress ? newTarget : day.total
      }));
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
