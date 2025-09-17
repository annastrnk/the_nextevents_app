# Next.js Page Routing (Learning Project)

This is a project I created while learning **page routing** and **data fetching** in Next.js.  
It showcases essential routing concepts (including dynamic routes and programmatic navigation) as well as different data-fetching strategies.

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

## 🛠️ Tech Stack

- [Next.js (Pages Router)](https://nextjs.org/docs/pages)  
- React  
- JavaScript