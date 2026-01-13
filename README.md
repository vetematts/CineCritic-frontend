# About

CineCritic is a full-stack web application that allows users to browse films and share reviews and ratings. This repository is the web application for generating the front end views and connects with the database through API contracts.

# Dependencies

| Name                                                                                     | Description                                                                                       |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| [NPM](https://www.npmjs.com/)                                                            | Node package manager handles all the integration of import packages used in this project          |
| [Vite](https://www.npmjs.com/package/vite)                                               | Frontend build tool                                                                               |
| [React](https://react.dev/)                                                              | Framework to build the web application                                                            |
| [React-Router](https://reactrouter.com/)                                                 | Add routing capability to the React application                                                   |
| [ESLint](https://eslint.org/)                                                            | Highlights potential errors in the code and formatting issues.                                    |
| [Prettier](https://prettier.io/)                                                         | Code formatter to keep our code formatted to our preferred style guide.                           |
| [ESLint-Config-Google](https://www.npmjs.com/package/eslint-config-google)               | Google style guide that prettier and eslint use to format the code.                               |
| [Vitest](https://www.npmjs.com/package/vitest)                                           | Unit testing for the web application. It is compatible with [Jest](https://jestjs.io/) libraries. |
| [@testing-library/react](https://www.npmjs.com/package/@testing-library/react)           | Vitest library with React testing features.                                                       |
| [@testing-library/jest-dom](https://www.npmjs.com/package/@testing-library/jest-dom)     | Library that tests the state of the DOM.                                                          |
| [@testing-library/user-event](https://www.npmjs.com/package/@testing-library/user-event) | Library with testing features that simulate users interacting with the web application.           |
| [Styled-Components](https://styled-components.com/)                                      | Adds styling capabilities to React Components.                                                    |

## Technology choices

- **React + React Router**: component model and client-side routing for a multi-page style app.
- **Vite**: fast dev server and build pipeline, simpler than older bundlers like Webpack or CRA.
- **styled-components**: scoped component styling to avoid global CSS collisions; keeps styles near components.
- **Vitest + Testing Library**: lightweight unit/integration tests for UI behaviour.
- **ESLint + Prettier (Google style)**: consistent formatting and linting across frontend and backend.

### Alternatives considered

- **Webpack/CRA**: more boilerplate and slower builds than Vite.
- **CSS modules / plain CSS**: less co-location and reusability compared to styled-components.
- **Jest**: heavier for Vite; Vitest integrates better with the Vite toolchain.

## Requirements

- **Node.js**: 18+ recommended.
- **npm**: 9+ recommended.
- **Hardware**: any modern laptop/desktop; 4 GB RAM minimum (8 GB recommended).
- **Backend**: CineCritic backend running locally or deployed; set `VITE_API_BASE_URL`.

## Style guide

We follow the **Google JavaScript Style Guide** via ESLint, with Prettier enforcing formatting rules.

## Auth

Login returns a JWT which is stored in `localStorage` and sent on protected requests as
`Authorization: Bearer <token>`.

## Licensing

This project uses the repository `LICENSE` file. Third-party libraries are used under their respective licences.

## Setting up

1. Install dependencies

   npm install

2. Configure environment

   Create a `.env` file using `.env.example` and set:
   - `VITE_API_BASE_URL` (e.g. `http://localhost:4000`)

3. Run the app

   npm run dev

## Scripts

- `npm run dev` - start the development server
- `npm run build` - build the production bundle
- `npm run preview` - preview the production build
- `npm run lint` - run ESLint
- `npm run lint:fix` - fix lint issues
- `npm run format` - format code with Prettier
- `npm run test` - run Vitest
