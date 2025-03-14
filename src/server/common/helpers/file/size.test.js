import {
  fileSizeInMB,
  fileSizeInBytes,
  fileSizeReductionPercentage
} from './size.js'

describe('fileSizeInMB', () => {
  it('should convert bytes to megabytes correctly', () => {
    expect(fileSizeInMB(1048576)).toBe(1) // 1 MB
    expect(fileSizeInMB(5242880)).toBe(5) // 5 MB
    expect(fileSizeInMB(0)).toBe(0) // 0 bytes
  })
})

describe('fileSizeInBytes', () => {
  it('should convert megabytes to bytes correctly', () => {
    expect(fileSizeInBytes(1)).toBe(1048576) // 1 MB
    expect(fileSizeInBytes(5)).toBe(5242880) // 5 MB
    expect(fileSizeInBytes(0)).toBe(0) // 0 MB
  })
})

describe('fileSizeReductionPercentage', () => {
  it('should calculate the reduction percentage correctly', () => {
    expect(fileSizeReductionPercentage(100, 50)).toBe(50) // 50% reduction
    expect(fileSizeReductionPercentage(200, 100)).toBe(50) // 50% reduction
    expect(fileSizeReductionPercentage(100, 0)).toBe(100) // 100% reduction
    expect(fileSizeReductionPercentage(100, 100)).toBe(0) // No reduction
  })

  it('should handle edge cases', () => {
    expect(fileSizeReductionPercentage(0, 0)).toBeNaN() // Division by zero
  })
})
