# Next.js Page Routing (Learning Project)

This is a project I created while learning **page routing**, **data fetching**, and **Next.js optimization features**.  
It showcases essential routing concepts (including dynamic routes and programmatic navigation), different data-fetching strategies, and best practices for optimization.

---

## 🚏 Routing Essentials

- **Basic page routing** with the `pages/` directory  
- **Dynamic routes** using `[...slug].js`  
- **Nested dynamic routes** using `[eventId].js`  
- **useRouter() hook** to access route parameters  
- **Programmatic navigation** (`router.push()` / `router.replace()` for redirects)  

---

## 📡 Data Fetching

- **`getStaticProps` with `revalidate`** – Static Site Generation (SSG) with Incremental Static Regeneration (ISR)  
- **Dynamic pages**: `getStaticProps` + `getStaticPaths` with `fallback` for pre-rendering dynamic routes  
- **`getServerSideProps`** – Server-Side Rendering (SSR) on every request  
- **Client-side data fetching** – used hook `useEffect` and library `SWR` for real-time updates in the browser  

---

## ⚡ Optimization Features

- **Optimize images** with Next.js `<Image />` component (automatic resizing, lazy loading, WebP support)  
- **Optimize metadata** with the `<Head />` component for dynamic titles, descriptions, and SEO improvements  
- **Custom `_document.js`** – extended default HTML document for global meta, fonts, and structure optimizations  

---

## 🛠️ Tech Stack

- [Next.js (Pages Router)](https://nextjs.org/docs/pages)  
- React  
- JavaScript  

## 🚀 Getting Started

To run this project locally, follow these steps:

1. **Clone the repository**  
   ```bash
   git clone https://github.com/your-username/nextjs-routing-learning.git
   cd nextjs-routing-learning

2. **Install dependencies**
       ```bash
       npm run dev
      
3. **Open the project in your browser**
    ```bash
    Navigate to http://localhost:3000