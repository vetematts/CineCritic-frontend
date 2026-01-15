# 🎬 CineCritic Frontend

Frontend React application for the CineCritic movie review platform. This repo consumes the
CineCritic backend API.

## 📂 Repositories

- Backend: https://github.com/vetematts/CineCritic-backend.git
- Frontend: https://github.com/vetematts/CineCritic-frontend.git

## 🚀 Deployed URLs

- Backend API: (to be added)
- Frontend App: (to be added)

## 📏 Code Style Guide

This project follows the Google JavaScript Style Guide: https://google.github.io/styleguide/jsguide.html

Style is enforced with ESLint (eslint-config-google) and formatting is handled by Prettier.
ESLint is configured to defer formatting rules to Prettier to avoid conflicts.

## 📦 Dependencies

| Name                                                                                               | Description               |
| -------------------------------------------------------------------------------------------------- | ------------------------- |
| [react](https://www.npmjs.com/package/react)                                                       | UI library                |
| [react-router](https://www.npmjs.com/package/react-router)                                         | Client-side routing       |
| [styled-components](https://www.npmjs.com/package/styled-components)                               | Component-scoped styling  |
| [vite](https://www.npmjs.com/package/vite)                                                         | Build tool and dev server |
| [vitest](https://www.npmjs.com/package/vitest)                                                     | Unit testing              |
| [@testing-library/react](https://www.npmjs.com/package/@testing-library/react)                     | UI testing utilities      |
| [@testing-library/jest-dom](https://www.npmjs.com/package/@testing-library/jest-dom)               | DOM assertions            |
| [@testing-library/user-event](https://www.npmjs.com/package/@testing-library/user-event)           | User interaction testing  |
| [eslint](https://www.npmjs.com/package/eslint), [prettier](https://www.npmjs.com/package/prettier) | Linting and formatting    |

## 💻 Hardware Requirements

- CPU: modern dual-core (or better)
- RAM: 4 GB minimum (8 GB recommended)
- Disk: ~500 MB for node_modules

## 🧭 Technology Choices and Alternatives

- React + React Router: component model and client-side routing; alternative: Next.js.
- Vite: fast dev server and build pipeline; alternative: Webpack/CRA.
- styled-components: scoped styling; alternative: CSS modules.
- Vitest + Testing Library: lightweight testing; alternative: Jest.

## 📜 Licensing Notes

This project depends on open-source packages under permissive licenses (MIT/ISC/BSD-2/3).
See each dependency's npm page for details.

## 🧪 Commands

- `npm run dev` - start the dev server
- `npm run build` - build production bundle
- `npm run preview` - preview production build
- `npm run lint` - check style + code issues
- `npm run lint:fix` - auto-fix ESLint issues where possible
- `npm run format` - format with Prettier
- `npm run test` - run Vitest tests

## 🛠️ Frontend Install Instructions

1. **Clone the repo**
   ```bash
   git clone https://github.com/vetematts/CineCritic-frontend.git
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Create `.env`**
   ```sh
   VITE_API_BASE_URL="http://localhost:4000"
   ```
4. **Start the app**
   ```bash
   npm run dev
   ```

## ⚙️ Environment Variables

Copy `.env.example` to `.env` and set your values:

- `VITE_API_BASE_URL` (required): backend API base URL

## 🔐 Authentication

- Login via `POST /api/users/login` to receive a JWT (`token`).
- Store the token in `localStorage` and send it on protected routes as
  `Authorization: Bearer <token>`.
- Logout is stateless: `POST /api/users/logout` acknowledges the request; clients clear the token.

## 🧩 Key Endpoints Used

- Movies: `GET /api/movies/trending`, `GET /api/movies/top-rated`, `GET /api/movies/search?q=`,
  `GET /api/movies/advanced?query=&year=&genres=&crew=&ratingMin=&ratingMax=`, `GET /api/movies/{id}`,
  `GET /api/movies/genres` (returns list of available genres for advanced search)
- Reviews: `GET /api/reviews/{tmdbId}`, `POST /api/reviews`, `PUT /api/reviews/{id}`,
  `DELETE /api/reviews/{id}`
- Watchlist: `GET /api/watchlist/{userId}`, `POST /api/watchlist`, `PUT /api/watchlist/{id}`,
  `DELETE /api/watchlist/{id}`
