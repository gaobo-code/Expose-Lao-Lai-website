import { createContext } from 'react'

export const EmblaCarouselContext = createContext<{
  goToPrev: (fn: () => void) => void
  goToNext: (fn: () => void) => void
} | null>(null)