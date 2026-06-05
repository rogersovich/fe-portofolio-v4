const techIconMap: Record<string, string> = {
  // Add entries as: 'slug': '/images/tech/filename.svg'
  // Slug is auto-generated from tech name in BE (lowercase, spaces→hyphens, dots removed)
  // Examples:
  // 'nextjs': '/images/tech/nextjs.svg',
  // 'vuejs': '/images/tech/vuejs.svg',
  // 'golang': '/images/tech/golang.svg',
  // 'typescript': '/images/tech/typescript.svg',
  // 'tailwindcss': '/images/tech/tailwindcss.svg',
  // 'postgresql': '/images/tech/postgresql.svg',
  // 'docker': '/images/tech/docker.svg',
  // 'nuxtjs': '/images/tech/nuxtjs.svg',
  // 'react': '/images/tech/react.svg',
  // 'nodejs': '/images/tech/nodejs.svg',
}

export const useTechIcon = (slug: string): string => {
  return techIconMap[slug] ?? '/images/tech/default.svg'
}
