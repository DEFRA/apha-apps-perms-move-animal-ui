import { readdir, access } from 'fs/promises'
import { join } from 'path'

export const sectionKeyPrompt = {
  type: 'list',
  name: 'sectionKey',
  message: (answers) =>
    `What \x1b[33msection\x1b[0m of ${answers.journey} is this question being added to?`,
  choices: async (answers) => {
    const journeyPath = `src/server/${answers.journey}`
    const sections = await readdir(journeyPath, { withFileTypes: true })

    const sectionKeys = []
    for (const section of sections) {
      if (section.isDirectory()) {
        try {
          await access(join(journeyPath, section.name, 'section.js'))
          sectionKeys.push(section.name)
        } catch {
          // section.js doesn't exist, skip this directory
        }
      }
    }

    if (sectionKeys.length === 0) {
      throw new Error(
        `No valid sections found in ${journeyPath}. Please create a section first.`
      )
    }

    return sectionKeys
  }
}

