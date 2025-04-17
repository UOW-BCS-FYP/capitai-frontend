# Capit-AI Frontend Repository

## **Project Overview**
Capit-AI is an AI-powered personal finance platform designed to help individuals manage their finances more effectively through features like smart budgeting, goal tracking, notifications, and AI-driven financial advice.  
This project is a **capstone project developed by Bachelor of Computer Science students from the University of Wollongong**.

## **Project Structure**
This repository contains the frontend codebase for Capit-AI, built using modern web technologies to ensure scalability and a seamless user experience.

### **Features**
- **Smart Budgeting System**: Intuitive interface for income and spending records and budgeting categories.
- **Goal Tracking**: Helps users define, prioritize, and monitor financial goals.
- **AI Financial Services**: Provides personalized financial advice based on user data.
- **Notifications**: Alerts for spending, goals, budget reviews, and financial news.

### **Getting Started**
#### Prerequisites
- Node.js: Ensure you have the latest version installed.
- npm or yarn: A package manager for JavaScript.

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
