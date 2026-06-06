const techIconMap: Record<string, string> = {
  // Add entries as: 'slug': '/images/tech/filename.png'
  // Slug is auto-generated from tech name in BE (lowercase, spaces→hyphens, dots removed)
  // Examples:
  'vuetify': '/images/tech/vuetify.png',
  'pinia': '/images/tech/pinia.png',
  'php': '/images/tech/php.png',
  'express-js': '/images/tech/express.png',
  'chakra-ui': '/images/tech/chakra-ui.png',
  'react-js': '/images/tech/react.png',
  'angular-js': '/images/tech/angular.png',
  'vue': '/images/tech/vue.png',
  'typescript': '/images/tech/typescript.png',
  'tailwind': '/images/tech/tailwindcss.png',
  'amazon-web-services': '/images/tech/aws.png',
  'react-redux': '/images/tech/redux.png',
  'promotheus': '/images/tech/prometheus.png',
  'postgresql': '/images/tech/postgresql.png',
  'nuxt-js': '/images/tech/nuxt.png',
  'node-js': '/images/tech/nodejs.png',
  'nginx': '/images/tech/nginx.png',
  'next-js': '/images/tech/nextjs.png',
  'mysql': '/images/tech/mysql.png',
  'mongo-db': '/images/tech/mongodb.png',
  'laravel': '/images/tech/laravel.png',
  'javascript': '/images/tech/javascript.png',
  'html': '/images/tech/html.png',
  'graphql': '/images/tech/graphql.png',
  'firebase': '/images/tech/firebase.png',
  'golang': '/images/tech/golang.png',
  'git': '/images/tech/git.png',
  'github': '/images/tech/github.png',
  'docker': '/images/tech/docker.png',
  'css': '/images/tech/css.png',
  'bitbucket': '/images/tech/bitbucket.png',
  'figma': '/images/tech/figma.svg',
  'auth-google': '/images/tech/google.png',
  'prisma-orm': '/images/tech/prisma-orm.png',
  'supabase': '/images/tech/supabase.png',
  'vercel': '/images/tech/vercel.png'
}

export const useTechIcon = (slug: string): string => {
  return techIconMap[slug] ?? '/images/tech/default.png'
}

export const useTechIconByName = (name: string): string => {
  if (!name) return '/images/tech/default.png';
  let slug = name.toLowerCase();
  slug = slug.replace(/c\+\+/g, 'cpp');
  slug = slug.replace(/c#/g, 'csharp');
  slug = slug.replace(/\.net/g, 'dotnet');
  slug = slug.replace(/\./g, '');
  slug = slug.replace(/\s+/g, '-');
  slug = slug.replace(/[^a-z0-9\-]/g, '');
  slug = slug.replace(/-+/g, '-');
  slug = slug.replace(/^-+|-+$/g, '');
  return useTechIcon(slug);
}
