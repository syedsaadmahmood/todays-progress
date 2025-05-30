<template>
  <div class="progress-circle-container">
    <div class="progress-header">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
            class="menu-button"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="showTargetDialog = true">
            <v-list-item-title>Set Daily Target</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-progress-circular
          :rotate="0"
          :size="200"
          :width="20"
          :value="percentage"
          color="teal"
          class="progress-ring"
          v-bind="attrs"
          v-on="on"
        >
          <div class="progress-text">
            <div class="value">{{ currentValue }}<span class="total">/{{ targetValue }}</span></div>
            <div class="label">{{ label }}</div>
          </div>
        </v-progress-circular>
      </template>
      <span v-if="percentage < 100">Keep going — {{ remainingToTarget }} words to target!</span>
    </v-tooltip>

    <v-dialog v-model="showTargetDialog" max-width="400px">
      <v-card>
        <v-card-title>Set Daily Target</v-card-title>
        <v-card-text>
          <v-text-field
            v-model.number="newTarget"
            label="Daily Target"
            type="number"
            min="1"
            outlined
            dense
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="showTargetDialog = false">Cancel</v-btn>
          <v-btn color="primary" text @click="updateTarget">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'ProgressCircle',
  props: {
    history: {
      type: Array,
      required: true
    },
    activeDay: {
      type: Number,
      required: true
    },
    dailyTarget: {
      type: Number,
      required: true
    },
    label: {
      type: String,
      default: 'Per Day'
    },
    onUpdateTarget: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      showTargetDialog: false,
      newTarget: null
    }
  },
  computed: {
    currentValue() {
      return this.history[this.activeDay] || 0;
    },
    targetValue() {
      return this.dailyTarget;
    },
    percentage() {
      if (this.targetValue === 0) return 0;
      const percent = (this.currentValue / this.targetValue) * 100;
      return Math.min(Math.max(percent, 0), 100);
    },
    remainingToTarget() {
      if (this.percentage >= 100) return 0;
      return this.targetValue - this.currentValue;
    }
  },
  methods: {
    updateTarget() {
      if (this.newTarget && this.newTarget > 0) {
        this.onUpdateTarget(this.newTarget);
        this.showTargetDialog = false;
      }
    }
  },
  watch: {
    showTargetDialog(val) {
      if (val) {
        this.newTarget = this.dailyTarget;
      }
    }
  }
}
</script>

<style scoped>
.progress-circle-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 100%;
  min-width: 320px;
  box-sizing: border-box;
}

.progress-header {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  position: relative;
}

.menu-button {
  position: relative;
  z-index: 1;
}

.progress-ring {
  margin: 20px 0;
}

.progress-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.value {
  font-size: 28px;
  font-weight: bold;
  color: #333;
}

.total {
  font-size: 20px;
  color: #777;
}

.label {
  font-size: 16px;
  color: #555;
  margin-top: 5px;
}

.day-pills {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
  width: 100%;
}

.day-pill {
  width: 30px;
  height: 10px;
  border-radius: 5px;
  background-color: #e0e0e0;
}

.day-pill.completed {
  background-color: teal;
}

.day-pill.active {
  border: 2px solid teal;
  box-sizing: border-box;
}

.progress-ring ::v-deep .v-progress-circular__overlay {
  stroke-linecap: round;
}

.progress-ring ::v-deep .v-progress-circular__underlay {
  stroke-linecap: round;
}

@media (max-width: 600px) {
  .progress-circle-container {
    padding: 10px;
  }
  
  .value {
    font-size: 24px;
  }
  
  .total {
    font-size: 18px;
  }
  
  .label {
    font-size: 14px;
  }
  
  .day-pill {
    width: 25px;
  }
}
</style>
