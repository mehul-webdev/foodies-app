# NextLevel Food

A recipe-sharing app for discovering meals and sharing your own with a community of food lovers.

**Live demo:** [foodie-app-nextjs.netlify.app](https://foodie-app-nextjs.netlify.app/)

## Features

- Browse community-shared meals and view recipe details.
- Share a meal with its title, summary, cooking instructions, creator details, and a photo.
- Preview a selected image before submitting the form.
- Store meal records in SQLite and meal photos in Amazon S3.
- Sanitize recipe instructions before saving them.
- Render meal pages with route-based metadata.

## Tech stack

- [Next.js](https://nextjs.org/) App Router
- [React](https://react.dev/) and [TypeScript](https://www.typescriptlang.org/)
- SQLite with [better-sqlite3](https://github.com/WiseLibs/better-sqlite3)
- [Amazon S3](https://aws.amazon.com/s3/) for uploaded images
- CSS Modules

## Run locally

### Requirements

- Node.js 20.9 or later
- npm
- AWS credentials with permission to upload objects to the app's configured S3 bucket if you want to submit new meals

### Setup

1. Clone the repository and install dependencies:

   ```bash
   git clone <your-repository-url>
   cd foodies-app
   npm install
   ```

2. Create a `.env.local` file in the project root for S3 uploads:

   ```env
   ACCESS_KEY_ID=your_aws_access_key_id
   SECRET_ACCESS_KEY=your_aws_secret_access_key
   ```

   Keep these values private. The credentials need permission to upload objects to the S3 bucket configured by the app. Do not commit `.env.local`.

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

The repository includes `meals.db` with the app's meal table and sample data. The database schema and sample-data initializer are in [`initdb.ts`](./initdb.ts).

## App routes

| Route | Description |
| --- | --- |
| `/` | Landing page and links to explore meals or visit the community |
| `/community` | Community information |
| `/meals` | Browse available meals |
| `/meals/[mealSlug]` | View an individual meal and its recipe |
| `/meals/share` | Submit a meal and upload its image |

## Project structure

```text
app/                  Next.js routes, layouts, and page styles
assets/               App logo and feature illustrations
components/            Shared navigation, slideshow, and meal components
lib/                   Meal data access and server actions
initdb.ts              SQLite schema and sample-data initializer
meals.db               SQLite database used by the app
```

## Available scripts

```bash
npm run dev     # Start the local development server
npm run build   # Create a production build
npm run start   # Serve the production build
npm run lint    # Run ESLint
```

## Deployment

The live demo is hosted on Netlify. To deploy your own instance, configure `ACCESS_KEY_ID` and `SECRET_ACCESS_KEY` in the deployment platform's environment variables. Meal images are uploaded to the S3 bucket configured in `lib/meals.ts`; the image host is also configured in `next.config.ts`.

The app uses SQLite for meal records. For a deployment that must retain new meal submissions reliably across serverless instances or redeploys, use a persistent database rather than relying on a bundled SQLite file.
