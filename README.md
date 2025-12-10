# Kanban Board Application

A modern task management application built with React, Redux, and Tailwind CSS. This project allows users to organize and manage tasks using a Kanban board interface.

## 🚀 Features

- **Kanban Board View**: Organize tasks by status with drag-and-drop functionality
- **Task Management**: Create, view, and manage tasks
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS
- **State Management**: Redux-based state management for predictable app state
- **API Integration**: Axios-based HTTP client for backend communication

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## 🛠️ Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:

```bash
npm install
```

## 🎯 Usage

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (Vite default port).

### Build

Create a production build:

```bash
npm run build
```

### Preview

Preview the production build locally:

```bash
npm run preview
```

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

## 📁 Project Structure

- **`src/`** - Source code directory

  - **`components/`** - Reusable React components
    - `KanbanBoardComponent.jsx` - Main Kanban board component
    - `NavBarComponent.jsx` - Navigation bar
    - `SidebarComponent.jsx` - Sidebar navigation
    - `NewTaskFormComponent.jsx` - Task creation form
    - `Loader.jsx` - Loading indicator
  - **`pages/`** - Page components
    - `dashboard/` - Dashboard page
  - **`Redux/`** - Redux store and slices
    - `store.js` - Redux store configuration
    - `statusSlice.js` - Task status reducer
  - **`lib/`** - Utility libraries
    - `axiosMethod.js` - Axios HTTP client configuration
    - `taskService.js` - Task API service
  - **`utils/`** - Utility functions
    - `endPoints.js` - API endpoint constants
  - **`App.jsx`** - Main App component
  - **`main.jsx`** - Application entry point
  - **`App.css`** - App styles
  - **`index.css`** - Global styles

- **`public/`** - Static assets
- **`index.html`** - HTML entry point
- **`vite.config.js`** - Vite configuration
- **`tailwind.config.js`** - Tailwind CSS configuration
- **`postcss.config.js`** - PostCSS configuration
- **`eslint.config.js`** - ESLint configuration

## 🔧 Configuration Files

- **Vite**: [vite.config.js](vite.config.js) - Build tool and dev server configuration
- **Tailwind CSS**: [tailwind.config.js](tailwind.config.js) - Styling framework configuration
- **ESLint**: [eslint.config.js](eslint.config.js) - Code quality rules
- **PostCSS**: [postcss.config.js](postcss.config.js) - CSS processing configuration

## 📦 Dependencies

Main dependencies (see [package.json](package.json)):

- **React** - UI library
- **Redux** - State management
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool and dev server

## 🌐 API Integration

API endpoints are configured in [src/utils/endPoints.js](src/utils/endPoints.js).

The [src/lib/taskService.js](src/lib/taskService.js) module provides methods for:

- Fetching tasks
- Creating new tasks
- Updating task status
- Deleting tasks

## 🎨 Styling

The project uses **Tailwind CSS** for styling with a custom configuration in [tailwind.config.js](tailwind.config.js).

Global styles are defined in [src/index.css](src/index.css) and component-specific styles in [src/App.css](src/App.css).

## 📖 Components Overview

### KanbanBoardComponent

Main component that displays tasks organized by status columns.

### NavBarComponent

Top navigation bar with app branding and navigation links.

### SidebarComponent

Side navigation for menu and additional options.

### NewTaskFormComponent

Form for creating and adding new tasks to the board.

### Loader

Loading indicator component for async operations.

## 🚀 Deployment

To deploy this application:

1. Build the project:

```bash
npm run build
```
