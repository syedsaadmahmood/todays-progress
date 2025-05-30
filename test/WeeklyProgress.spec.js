import { mount } from '@vue/test-utils'
import WeeklyProgress from '@/components/WeeklyProgress.vue'

describe('WeeklyProgress', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(WeeklyProgress)
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
})
