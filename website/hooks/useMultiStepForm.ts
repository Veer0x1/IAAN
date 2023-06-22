import { useState } from "react"

export function useMultiStepForm(steps: React.ReactNode[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  function next() {
    setCurrentStepIndex((i) => {
      if (i >= steps.length - 1) return i
      return i + 1
    })
  }
  function back() {
    
    setCurrentStepIndex((i) => {
      console.log(i)
      if (i <= 0) return i
      return i - 1
    })
  }
  function goToStep(index: number) {
    setCurrentStepIndex(index)
  }

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    next,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    back,
    goToStep,
    steps,
  }
}
