import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export const useGsapAnimation = (
  animationFunction: (element: HTMLElement) => gsap.core.Tween | gsap.core.Timeline,
  dependencies: any[] = [],
) => {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const animation = animationFunction(element)

    return () => {
      animation.kill()
    }
  }, dependencies)

  return elementRef
}

export const useGsapStaggerAnimation = (
  selector: string,
  staggerTime = 0.1,
  dependencies: any[] = [],
  runOnlyOnce = false,
) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hasRun, setHasRun] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    if (runOnlyOnce && hasRun) return

    const elements = container.querySelectorAll(selector)

    const tl = gsap.timeline()
    tl.fromTo(
      elements,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: staggerTime,
        ease: "power2.out",
      },
    )

    if (runOnlyOnce) {
      setHasRun(true)
    }

    return () => {
      tl.kill()
    }
  }, dependencies)

  return containerRef
}

