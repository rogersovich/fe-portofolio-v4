import { useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints({
  sm:   640,
  md:   768,
  lg:  1024,
  xl:  1280,
  '2xl': 1536,
})

export const isMobile  = breakpoints.smaller('md')          // < 768px
export const isTablet  = breakpoints.between('md', 'lg')    // ≥ 768px & < 1024px
export const isLaptop  = breakpoints.between('lg', 'xl')    // ≥ 1024px & < 1280px
export const isDesktop = breakpoints.greaterOrEqual('xl')   // ≥ 1280px