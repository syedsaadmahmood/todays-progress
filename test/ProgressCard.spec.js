import { mount } from '@vue/test-utils'
import ProgressCard from '@/components/ProgressCard.vue'

describe('ProgressCard', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(ProgressCard, {
      propsData: {
        history: [
          { label: 'M', completed: true, progress: true, current: 900, total: 1000 },
          { label: 'T', completed: true, progress: true, current: 700, total: 1000 },
          { label: 'W', completed: false, progress: false },
          { label: 'Th', completed: false, progress: false },
          { label: 'F', completed: false, progress: false },
          { label: 'Sat', completed: false, progress: false },
          { label: 'Su', completed: false, progress: false }
        ],
        activeDay: 1,
        dailyTarget: 1000,
        label: 'Per Day',
        onUpdateTarget: jest.fn()
      }
    })
  })

  describe('getClampedPercentage', () => {
    it('should return the correct percentage when value is less than 100%', () => {
      const current = 75
      const total = 100
      
      const result = wrapper.vm.getClampedPercentage(current, total)
      
      expect(result).toBe(75)
    })

    it('should clamp the percentage to 100 when value exceeds 100%', () => {
      const current = 150
      const total = 100
      
      const result = wrapper.vm.getClampedPercentage(current, total)
      
      expect(result).toBe(100)
    })

    it('should return 0 when total is 0', () => {
      const current = 50
      const total = 0
      
      const result = wrapper.vm.getClampedPercentage(current, total)
      
      expect(result).toBe(0)
    })
  })

  describe('computed properties', () => {
    it('should calculate currentValue correctly', () => {
      expect(wrapper.vm.currentValue).toBe(700)
    })

    it('should calculate targetValue correctly', () => {
      expect(wrapper.vm.targetValue).toBe(1000)
    })

    it('should calculate percentage correctly', () => {
      expect(wrapper.vm.percentage).toBe(70)
    })

    it('should calculate remainingToTarget correctly', () => {
      expect(wrapper.vm.remainingToTarget).toBe(300)
    })
  })

  describe('rendering', () => {
    it('should display the correct number of day items', () => {
      expect(wrapper.findAll('.day-item').length).toBe(7)
    })

    it('should mark the active day correctly', () => {
      const activeDayCircle = wrapper.findAll('.day-circle').at(1)
      expect(activeDayCircle.classes()).toContain('active')
    })

    it('should mark completed days correctly', () => {
      const firstDayCircle = wrapper.findAll('.day-circle').at(0)
      const secondDayCircle = wrapper.findAll('.day-circle').at(1)
      
      expect(firstDayCircle.classes()).toContain('completed')
      expect(secondDayCircle.classes()).toContain('completed')
    })
  })
})