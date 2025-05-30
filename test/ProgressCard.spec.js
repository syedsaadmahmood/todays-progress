import { mount } from '@vue/test-utils'
import ProgressCard from '@/components/ProgressCard.vue'

describe('ProgressCard', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(ProgressCard, {
      propsData: {
        history: [
          { label: 'M', completed: true, progress: true, current: 900, total: 1000 },
          { label: 'T', completed: false, progress: true, current: 700, total: 1000 },
          { label: 'W', completed: false, progress: false, current: 600, total: 1000 },
          { label: 'Th', completed: false, progress: false, current: 0, total: 1000 },
          { label: 'F', completed: false, progress: false, current: 0, total: 1000 },
          { label: 'Sat', completed: false, progress: false, current: 0, total: 1000 },
          { label: 'Su', completed: false, progress: false, current: 0, total: 1000 }
        ],
        activeDay: 1,
        dailyTarget: 1000,
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
      expect(firstDayCircle.classes()).toContain('completed')
    })
    
    it('should connect days with progress', () => {
      const firstDayCircle = wrapper.findAll('.day-circle').at(0)
      expect(firstDayCircle.classes()).toContain('connected')
    })
    
    it('should display the label from data', () => {
      expect(wrapper.vm.label).toBe('Per Day')
      expect(wrapper.find('.label').text()).toBe('Per Day')
    })
  })

  describe('updating target', () => {
    it('should call onUpdateTarget with the new target value', async () => {
      // First show the dialog to trigger the watcher
      wrapper.setData({ showTargetDialog: true })
      await wrapper.vm.$nextTick()
      
      // Then set the new target
      wrapper.setData({ newTarget: 1500 })
      await wrapper.vm.$nextTick()
      
      // Now call updateTarget
      await wrapper.vm.updateTarget()
      
      expect(wrapper.vm.onUpdateTarget).toHaveBeenCalledWith(1500)
      expect(wrapper.vm.showTargetDialog).toBe(false)
    })
    
    it('should not call onUpdateTarget with invalid values', async () => {
      const mockFn = jest.fn()
      wrapper.setProps({ onUpdateTarget: mockFn })
      
      // First show the dialog to trigger the watcher
      wrapper.setData({ showTargetDialog: true })
      await wrapper.vm.$nextTick()
      
      // Then set an invalid target
      wrapper.setData({ newTarget: 0 })
      await wrapper.vm.$nextTick()
      
      // Reset the mock to clear any previous calls
      mockFn.mockReset()
      
      // Now call updateTarget
      await wrapper.vm.updateTarget()
      
      expect(mockFn).not.toHaveBeenCalled()
      expect(wrapper.vm.showTargetDialog).toBe(true)
    })
  })
})