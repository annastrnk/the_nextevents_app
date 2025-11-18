# Next.js Events App


A full-stack Next.js application for managing and displaying events with comments and newsletter subscriptions. Built with MongoDB for data persistence and featuring a clean, service-oriented architecture.

This is a project I created while learning **page routing**, **data fetching**, and **Next.js optimization features**.  
It showcases essential routing concepts (including dynamic routes and programmatic navigation), different data-fetching strategies, and best practices for optimization.

---

## 🚏 Routing Essentials

- **Basic page routing** with the `pages/` directory  
- **Dynamic routes** using `[...slug].js` for filtered event views
- **Nested dynamic routes** using `[eventId].js` for event detail pages
- **useRouter() hook** to access route parameters  
- **Programmatic navigation** (`router.push()` / `router.replace()`)

---

## 📡 Data Fetching

- **`getStaticProps` with `revalidate`** – Static Site Generation (SSG) with Incremental Static Regeneration (ISR)  
- **Dynamic pages**: `getStaticProps` + `getStaticPaths` with `fallback` for pre-rendering dynamic routes  
- **`getServerSideProps`** – Server-Side Rendering (SSR) on every request  
- **Client-side data fetching** – used hook `useEffect` and library `SWR` for real-time updates in the browser  

---

### Key Principles

- **Separation of Concerns**: Business logic separated from UI and API routes
- **Service Layer**: All database operations handled through service functions
- **Reusability**: Services can be used from pages, API routes, or scripts
- **Maintainability**: Clear structure makes code easy to navigate and modif

---

## 🔌 API Routes + Database

- **Static API routes** – simple handlers inside `pages/api/*.js` (e.g. `/api/newsletter`)  
- **Dynamic API routes** – handled via `pages/api/[eventId].js`, supporting operations tied to specific IDs  
- **Integration with MongoDB Atlas** – API routes connect to a MongoDB cluster for persistent data storage  
  - Newsletter sign-up saves email addresses to the database  
  - Comments feature stores and retrieves event-related comments  

---

## ⚡ Optimization Features

- **Optimize images** with Next.js `<Image />` component (automatic resizing, lazy loading, WebP support)  
- **Optimize metadata** with the `<Head />` component for dynamic titles, descriptions, and SEO improvements  
- **Custom `_document.js`** – extended default HTML document for global meta, fonts, and structure optimizations  

---

## 🔔 React Context for Notifications

- **Global notification system** using React Context
- Supports **success, error,** and **pending** messages
- Can be triggered from **any component** in the app
- Automatically **hides notifications** after a specified duration

---
## 🛠️ Tech Stack

- [Next.js (Pages Router)](https://nextjs.org/docs/pages)  
- React  
- JavaScript  

## 🚀 Getting Started

To run this project locally, follow these steps:

1. **Clone the repository**  
   ```bash
   git clone https://github.com/annastrnk/the_nextevents_app.git
   cd the_nextevents_app

2. **Install dependencies**
   ```bash
   npm install

3. **Run the development server**
   ```bash
   npm run dev
      
3. **Open the project in your browser**
    ```bash
    Navigate to http://localhost:3000