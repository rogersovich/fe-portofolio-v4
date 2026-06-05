# 🚀 Web Portfolio v4

A modern personal portfolio application built with Nuxt.js 3, showcasing projects, blogs, experiences, and various interactive features.

## ✨ Key Features

- 🎨 **Modern Design** - Clean and responsive interface with dark/light mode
- 📝 **Blog System** - Complete blogging system with rich text editor (TipTap)
- 💼 **Portfolio Showcase** - Project gallery with details and statistics
- 👤 **About Section** - Comprehensive information about experience and skills
- 🎯 **Fun Facts** - Interactive section with interesting information
- 📊 **Admin Dashboard** - Admin panel for content management
- 🔐 **Authentication** - Login system for administrators
- 📱 **Responsive Design** - Optimized for all screen sizes
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 📈 **Analytics** - Integrated with Umami analytics

## 🛠️ Tech Stack

### Frontend
- **Nuxt.js 3** - Vue.js framework
- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **PrimeVue** - Vue UI component library
- **TipTap** - Rich text editor
- **VueUse** - Collection of Vue composition utilities

### State Management & Data
- **Pinia** - Vue state management
- **Axios** - HTTP client
- **Zod** - TypeScript-first schema validation

### Styling & Animation
- **@vueuse/motion** - Vue animation library
- **Tailwind CSS** - Utility-first CSS
- **PrimeIcons** - Icon library
- **Tabler Icons** - Icon set

### Development Tools
- **Jenkins** - CI/CD pipeline
- **PM2** - Production process manager
- **ESLint** - Code linting

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or newer)
- npm, pnpm, yarn, or bun

### Installation

1. **Clone repository**
```bash
git clone <repository-url>
cd web-portofolio-v4
```

2. **Install dependencies**
```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

3. **Setup environment variables**
```bash
cp .env.example .env
```

Edit the `.env` file and fill in the appropriate configuration:
```env
NUXT_PUBLIC_API_BASE=your_api_endpoint
```

4. **Start development server**
```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

The application will run at `http://localhost:3000`

## 🏗️ Build & Deployment

### Production Build
```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

### Preview Production Build
```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

### Production (VPS with PM2)

```bash
# Install dependencies and build
npm ci --prefer-offline
npm run build

# Start (first time)
pm2 start "node .output/server/index.mjs" --name fe-portofolio

# Restart (subsequent deploys)
pm2 restart fe-portofolio

# Save pm2 process list (run once, so it survives VPS reboot)
pm2 save
pm2 startup
```

> **Note:** `Dockerfile` and `docker-compose.yml` are kept as reference but **not used in production**. The app is deployed as a Nitro server managed by PM2.

## 📝 Usage

### Admin Dashboard
Access the admin dashboard to manage:
- 📄 About content
- 👥 Author management
- 📝 Blog posts
- 💼 Projects
- 🏢 Experience
- 🛠️ Technologies
- 💬 Testimonials
- 🏷️ Topics
- 📊 Statistics

### Content Management
The application provides a rich text editor for creating and editing blog and project content with features:
- Text formatting
- Image upload
- Code blocks with syntax highlighting
- Link management

## 🎨 Customization

### Theme
Edit the `themes/customTheme.ts` file to customize the PrimeVue theme.

### Styling
- Global styles: `assets/css/tailwind.css`
- Font configuration: `assets/css/fonts.css`
- Component-specific styles in respective `.vue` files

### Components
All components are available in the `components/` folder and can be used throughout the application.

## 📊 Analytics

The application is integrated with Umami analytics for visitor tracking. Analytics configuration can be found in `nuxt.config.ts`.

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run generate` - Generate static site
- `npm run preview` - Preview production build

### Code Style
This project uses ESLint and Prettier to maintain code consistency.

## 📄 License

[MIT License](LICENSE)

## 👨‍💻 Author

**Dimas Roger Widianto**
- Website: [dimasroger.com](https://dimasroger.com)
- GitHub: [@rogersovich](https://github.com/rogersovich)

---

Built with ❤️ using Nuxt.js
