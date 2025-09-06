# CoderCodes

A modern web application built with Next.js, Sanity CMS, and TypeScript, featuring authentication and a beautiful UI powered by Tailwind CSS.

Explore this platform where there is a curated collection of programs based on different subjecs/labs

## Features

- 🚀 Built with Next.js 15 and React 19
- 📝 Content management with Payload CMS
- 🔐 Authentication using NextAuth.js
- 💅 Modern UI with Tailwind CSS and Radix UI components
- 🌗 Markdown support with syntax highlighting
- 📱 Fully responsive design
- 🔍 Type-safe development with TypeScript

## Prerequisites

- Node.js LTS (v24.5.0 or higher)
- pnpm (v10.15.0 or higher)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/AdithyanA2005/CoderCodes
   cd CoderCodes
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:
   - Copy `env.example` to `.env.local`
   - Fill in the required environment variables

4. Run the development server:

   ```bash
   pnpm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Scripts

- `pnpm run dev` - Start the development server
- `pnpm run build` - Build the application for production
- `pnpm run start` - Start the production server

## Tech Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Content Management:** Payload CMS
- **Styling:** Tailwind CSS
- **UI Components:** Shadc UI
- **Authentication:** NextAuth.js
- **Markdown:** react-syntax-highlighter, Payload RichText component
- **Code Quality:** ESLint, Prettier

## Project Structure

- `/src/app/` - Next.js application routes and pages
- `/src/components` - Reusable React components
- `/src/lib` - Utility functions and shared code
- `/public` - Static assets
- `/src/collections` - Schemas for various collection in payload-cms
- `/src/block` - Reusable blocks that can be used in payload-cms rich text

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
