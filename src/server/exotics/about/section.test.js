import { AboutSection } from "./section.js"

describe('AboutSection', () => {
  it('should have the correct configuration', () => {
    expect(AboutSection.config.key).toBe('about')
    expect(AboutSection.config.title).toBe('About the movement')
  })
})
