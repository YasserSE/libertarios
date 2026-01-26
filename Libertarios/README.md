# Libertarios.eu - Next.js Application

A Next.js application for visualizing and understanding libertarian political positions in Spain.

## Getting Started

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Deployment on Vercel

This application is configured for Vercel deployment.

### Automatic Deployment

1. Push your code to GitHub, GitLab, or Bitbucket
2. Import your repository in [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and configure the build settings
4. Deploy!

### Manual Deployment

```bash
npm install -g vercel
vercel
```

### Environment Variables

If you need environment variables, add them in the Vercel dashboard under Project Settings > Environment Variables.

## Project Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── layout.tsx   # Root layout
│   ├── page.tsx     # Home page
│   └── [routes]/     # Route pages
├── components/       # React components
├── data/            # Mock data and constants
├── hooks/           # Custom React hooks
└── lib/             # Utility functions
```

## Technologies

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI component library
- **React Query** - Data fetching and state management
- **React Simple Maps** - Map visualizations

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
