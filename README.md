# Athletics Management Frontend

This is the frontend application for the Athletics Management system. It is built using React and TypeScript and allows users to manage participants, disciplines, and results. The application also includes user authentication and role-based access control.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Login, Signup, and Logout functionality.
- **Role-Based Access Control**: Access to different features based on user roles (Admin, User).
- **Participant Management**: Create, read, update, and delete participants.
- **Discipline Management**: Create, read, update, and delete disciplines.
- **Result Management**: Create, read, update, and delete results.
- **Filtering and Sorting**: Filter and sort participants by various criteria.
- **Responsive Design**: Optimized for various screen sizes.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/athletics-management-frontend.git
   cd athletics-management-frontend

2. **Install dependencies**:
   npm install

## Usage

1. **Start the development server**:
   npm start

2. **Open your browser and navigate to ``http://localhost:3000``**


## Folder Structure

athletics-management-frontend/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── Login.tsx
│   │   │   ├── Signup.tsx
│   │   │   └── AuthProvider.tsx
│   │   ├── Participants/
│   │   │   ├── CreateParticipant.tsx
│   │   │   ├── ListParticipants.tsx
│   │   │   └── ...
│   │   ├── Disciplines/
│   │   │   ├── CreateDiscipline.tsx
│   │   │   ├── ListDisciplines.tsx
│   │   │   └── ...
│   │   ├── Results/
│   │   │   ├── CreateResult.tsx
│   │   │   ├── ListResults.tsx
│   │   │   └── ...
│   │   ├── Navbar.tsx
│   │   └── ...
│   ├── services/
│   │   ├── api.ts
│   │   ├── AuthService.ts
│   │   ├── ParticipantService.ts
│   │   ├── DisciplineService.ts
│   │   ├── ResultService.ts
│   │   └── UserService.ts
│   ├── types/
│   │   ├── Participant.ts
│   │   ├── Discipline.ts
│   │   ├── Result.ts
│   │   └── ...
│   ├── App.tsx
│   ├── index.tsx
│   └── ...
├── .gitignore
├── package.json
├── README.md
└── ...

## Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder.

### `npm run eject`
Ejects the app, allowing full control over the configuration files.

## Environment Variables

Create a `.env` file in the root of your project to configure the following environment variables:

- `REACT_APP_API_URL`: The base URL for the backend API.

Example `.env` file:

REACT_APP_API_URL=http://localhost:8080


## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.


