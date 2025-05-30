<template>
  <div class="weekly-progress">
    <div class="days-container">
      <div 
        v-for="(day, index) in days" 
        :key="index" 
        class="day-item"
      >
        <div class="day-label">{{ day.label }}</div>
        <div 
          class="day-circle" 
          :class="{ 
            'completed': day.completed, 
            'active': index === activeDay,
            'connected': index < days.length - 1 && day.completed && days[index + 1].completed
          }"
        >
          <v-icon v-if="day.completed" color="white">mdi-check</v-icon>
          <v-icon v-if="index === activeDay" color="black">mdi-check</v-icon>
        </div>
        <div class="day-progress" v-if="day.progress || index === activeDay">
          <span :class="{ 'active-progress': index === activeDay }">
            {{ day.current || 0 }}/{{ day.total || dailyTarget }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeeklyProgress',
  props: {
    activeDay: {
      type: Number,
      default: 0
    },
    dailyTarget: {
      type: Number,
      default: 1000
    }
  },
  data() {
    return {
      days: [
        { label: 'M', completed: true, progress: true, current: 900, total: 1000 },
        { label: 'T', completed: true, progress: true, current: 700, total: 1000 },
        { label: 'W', completed: false, progress: false },
        { label: 'Th', completed: false, progress: false },
        { label: 'F', completed: false, progress: false },
        { label: 'Sat', completed: false, progress: false },
        { label: 'Su', completed: false, progress: false }
      ]
    }
  },
  watch: {
    dailyTarget: {
      handler(newTarget) {
        this.days = this.days.map(day => ({
          ...day,
          total: day.progress ? newTarget : day.total
        }));
      },
      immediate: true
    }
  },
  methods: {
    getClampedPercentage(current, total) {
      if (total === 0) return 0;
      const percentage = (current / total) * 100;
      return Math.min(percentage, 100);
    }
  }
}
</script>

<style scoped>
.weekly-progress {
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  margin: 20px 0;
}

.days-container {
  display: flex;
  position: relative;
}

.day-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex: 1;
}

.day-label {
  margin-bottom: 10px;
  font-weight: 500;
  color: #666;
}

.day-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  position: relative;
  z-index: 2;
}

.day-circle.completed {
  background-color: #009688;
}

.day-circle.active {
  border: 2px solid #009688;
  background-color: white;
  color: #009688;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.day-circle .v-icon {
  margin: 0;
  padding: 0;
  font-size: 18px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.day-progress {
  font-size: 14px;
  color: #666;
}

.active-progress {
  font-weight: bold;
  color: #009688;
}

@media (max-width: 600px) {
  .day-progress {
    font-size: 10px;
  }
}

.day-circle.connected::after {
  content: '';
  position: absolute;
  height: 2px;
  background-color: #009688;
  width: calc(100% + 80px);
  top: 50%;
  left: 50%;
  z-index: 1;
  transform: translateX(20px);
}

@media (max-width: 1270px) {
  .day-circle.connected::after {
    width: calc(100% + 60px);
  }
}

@media (max-width: 800px) {
  .day-circle.connected::after {
    width: calc(100% + 20px);
  }
}

@media (max-width: 600px) {
  .day-circle.connected::after {
    width: calc(100%);
  }
}
</style>
