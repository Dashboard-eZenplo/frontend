# Dashboard eZenplo frontend

This is a React application project using TypeScript and Vite.

## Prerequisites

Before installing and running this project, ensure you have the following prerequisites:

1. **Node.js**: React requires a compatible version of Node.js. You can download and install Node.js from [here](https://nodejs.org/).

2. **Recommended Node Version**: To ensure compatibility, it's recommended to use version v20.11.1 of Node.js. You can use tools like [Node Version Manager (nvm)](https://github.com/nvm-sh/nvm) to manage multiple Node.js versions.

## Installation

1. Clone the repository:

   ```bash
   git clone https://tools.ages.pucrs.br/dashboard-ezenplo/frontend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd frontend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Usage

1. To start the development server, run:

   ```bash
   npm run dev
   ```

   This will run the application in development mode. Open [http://localhost:5173](http://localhost:5173) in your browser to view it.

2. To build the project for production, execute:

   ```bash
   npm run build
   ```

   This will create a dist directory with the production build.

3. To run as a Docker container in development mode, follow these steps:

   ```bash
   docker build -t dashboard-ezenplo-dev .
   docker run -p 5173:5173 dashboard-ezenplo-dev
   ```

   This will run the application in development mode. Open [http://localhost:5173](http://localhost:5173) in your browser to view it.

## Additional Notes

1. **Environment Variables**: If you need to configure environment-specific variables, ensure they are properly set up in the respective environment files or through a .env file.

2. **Linting**: To check the code for linting errors, run:

   ```bash
   npm run lint
   ```

3. **Testing**: To run unit tests, execute:

   ```bash
   npm run test
   ```
