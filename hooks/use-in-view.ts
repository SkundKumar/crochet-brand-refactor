'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Fires once when the element enters the viewport.
 * Replaces the repeated IntersectionObserver + useRef + useState pattern.
 */
export function useInView(threshold = 0.1) {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true)
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}
