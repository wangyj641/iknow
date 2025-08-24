# iknow

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Features

- [Next.js](https://nextjs.org/) 15.5 with App Router
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) 4 for styling
- [ESLint](https://eslint.org/) for code quality
- [next/font](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) with [Geist](https://vercel.com/font)
- AI chat assistant via [`app/api/ai/route.js`](app/api/ai/route.js) (requires `GITHUB_TOKEN` in `.env.local`)

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

- Edit [`app/page.tsx`](app/page.tsx) to customize the main page.
- The AI assistant is available on the homepage. Enter a message and press Enter or click "发送" to interact.
- API requests require a valid `GITHUB_TOKEN` set in your `.env.local` file.

## Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run start` – Start production server
- `npm run lint` – Run ESLint

## Project Structure

```
app/
  globals.css        # Global styles (Tailwind CSS)
  layout.tsx         # Root layout
  page.tsx           # Main page with AI chat
  api/ai/route.js    # AI chat API route
public/
  *.svg              # Icons
...
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vercel Deployment](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)

## Deployment

Deploy easily on [Vercel](https://vercel.com/)
