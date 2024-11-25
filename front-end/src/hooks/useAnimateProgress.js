import { useState, useEffect } from 'react'

export default function useAnimateProgress(targetValue) {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
      const animationDuration = 1000 // 1 second
      const stepTime = 20 // Update every 20ms
      const steps = animationDuration / stepTime
      const stepValue = targetValue / steps
  
      let currentStep = 0
  
      const intervalId = setInterval(() => {
        currentStep++
        setProgress((prevProgress) => {
          const newProgress = prevProgress + stepValue
          return newProgress >= targetValue ? targetValue : newProgress
        })
  
        if (currentStep >= steps) {
          clearInterval(intervalId)
        }
      }, stepTime)
  
      return () => clearInterval(intervalId)
    }, [targetValue])
  
    return progress
}
