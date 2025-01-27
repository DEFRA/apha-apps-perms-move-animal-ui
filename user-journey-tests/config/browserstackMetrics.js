const defaultMinimum = 6

export const getBrowserStackRunners = async () => {
  const username = process.env.BROWSERSTACK_USER
  const accessKey = process.env.BROWSERSTACK_KEY

  try {
    const response = await fetch(
      'https://api.browserstack.com/automate/plan.json',
      {
        headers: {
          Authorization: 'Basic ' + btoa(`${username}:${accessKey}`)
        }
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    const {
      parallel_sessions_max_allowed: threadsAllowed,
      parallel_sessions_running: threadsRunning
    } = data
    const availableThreads = threadsAllowed - threadsRunning
    const threadsToUse = Math.floor(availableThreads / 2)

    if (threadsToUse < defaultMinimum) {
      return threadsToUse
    }

    if (defaultMinimum > threadsAllowed) {
      return threadsAllowed
    }

    return availableThreads
  } catch (error) {
    return defaultMinimum // default to a speculative value
  }
}
