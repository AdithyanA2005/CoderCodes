# CoderCodes

A modern web application built with Next.js, Sanity CMS, and TypeScript, featuring authentication and a beautiful UI powered by Tailwind CSS.

## Features

- 🚀 Built with Next.js 15 and React 19
- 📝 Content management with Sanity CMS
- 🔐 Authentication using NextAuth.js
- 💅 Modern UI with Tailwind CSS and Radix UI components
- 🌗 Markdown support with syntax highlighting
- 📱 Fully responsive design
- 🔍 Type-safe development with TypeScript

## Prerequisites

- Node.js (Latest LTS version recommended)
- npm (v10.5.2 or higher)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/AdithyanA2005/CoderCodes
   cd CoderCodes
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `env.example` to `.env.local`
   - Fill in the required environment variables

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run typegen` - Generate Sanity schema types

## Tech Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Content Management:** Sanity CMS
- **Styling:** Tailwind CSS
- **UI Components:** Shadc UI
- **Authentication:** NextAuth.js
- **Markdown:** markdown-it, react-syntax-highlighter
- **Code Quality:** ESLint, Prettier

## Project Structure

- `/app` - Next.js application routes and pages
- `/components` - Reusable React components
- `/lib` - Utility functions and shared code
- `/public` - Static assets
- `/sanity` - Sanity CMS configuration and schemas
- `/data` - Data utilities and configurations

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
