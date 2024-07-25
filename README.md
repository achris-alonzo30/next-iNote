
<h1 align="center">
  <br>
  <img src="https://github.com/user-attachments/assets/527870e1-84d5-4e63-bae1-95a92452d5d3" alt="iNote" width="200">
  <br>
  iNote
  <br>
</h1>



<h4 align="center">Minimalist note-taking platform powered by AI.</h4>

## ᯈ Minimalistic Landing Page ᯈ

<img width="1469" alt="Screenshot 2024-07-25 at 5 41 36 PM" src="https://github.com/user-attachments/assets/aa272541-fbd5-41f6-b4c9-72bd88e97583">

## 🔐 Private Workspace Area 🔐

<img width="1469" alt="Screenshot 2024-07-25 at 5 41 53 PM" src="https://github.com/user-attachments/assets/e283896d-7dcd-40ca-aa49-1ff57f71a212">

## 🖋️ Notion Like Writing Canvas With AI Writer 🖋️

<img width="1469" alt="Screenshot 2024-07-25 at 5 42 16 PM" src="https://github.com/user-attachments/assets/79153862-f8d4-430f-bc2a-7bf998e9d138">


## ✨ Main Key Features of iNote ✨
| <div style="width:285px">**Feature**</div> | **Description** |
|---|---|
| **1. Privacy Workspace** | A secure, personalized environment where users can manage their job search data, including resumes, cover letters, and applications, with end-to-end encryption powered by Clerk. |
| **2. AI Powered Idea Generation** | Spark your creativity with intelligent suggestions and prompts to help you overcome writer's block and develop fresh ideas. |
| **3. Minimalist Note-Taking** | Capture your thoughts and ideas in a clean and distraction-free environment, focusing on essential elements for efficient note-taking. |
| **4. Simple Organization** | Easily manage and categorize your notes with intuitive features, ensuring quick access and efficient retrieval of information. |
| **5. Clean, Modern UI using TailwindCSS and Shadcn-UI** | A visually appealing and user-friendly interface that provides a seamless experience across devices, built with cutting-edge technologies for optimal performance and responsiveness. |


## 📚 Tech Stack 📚

| <div style="width:140px">**Category**</div> | <div style="width:100px">**Choice**</div> | **Descriptions** |
|---|---|---|
| **Frontend** | [React](https://github.com/facebook/react) | Declarative and component-based for building interactive UIs. |
| **Web Framework** | [Next.js](https://github.com/vercel/next.js) | Server-side rendering and static site generation for SEO and performance. |
| **Language** | [TypeScript](https://github.com/microsoft/TypeScript) | Static typing for improved code maintainability and fewer errors. |
| **CSS Framework** | [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss) | Utility-first approach for rapid UI development and customization. |
| **UI Library** | [Shadcn-UI](https://github.com/shadcn-ui/ui) | Pre-built components for a consistent and modern UI experience. |
| **Backend** | [Convex-DB](https://github.com/get-convex/convex-backend) | Real-time data management, serverless functions, and efficient queries. |
| **Authentication** | [Clerk](https://github.com/clerk/clerk-docs) | Seamless user authentication and authorization. |
| **Rich Text Editor** | [Blocknote](https://github.com/TypeCellOS/BlockNote) | Enables creating and editing notes with rich formatting options like bold, italics, headings, and bullet points for a versatile note-taking experience. |
| **Storage Server** | [Edgestore](https://github.com/edgestorejs/edgestore) | Secure and scalable storage solution for your notes, ensuring data persistence and accessibility across devices. |
| **AI Integration** | [OpenAI](https://github.com/openai/openai-quickstart-node) | Integrating AI capabilities. |
| **Lucide Icon** | [Lucide-Icon](https://github.com/lucide-icons/lucide) | Intuitive and minimalist icons |
| **Zod** | [Zod](https://github.com/colinhacks/zod) | TypeScript-first schema validation with static type inference |
| **React-Hook-Form** | [React-Hook-Form](https://github.com/react-hook-form/react-hook-form) | React Hooks for form state management and validation. |
| **Framer Motion** | [Framer-Motion](https://github.com/framer/motion) | Motion library for React. |


## 🔥 Getting started 🔥

To clone and run this application, you'll need [Git](https://github.com/achris-alonzo30/next-iNote.git) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/achris-alonzo30/next-iNote.git

# Go into the repository
$ cd next-iNote

# Install dependencies
$ npm install or bun install

# Run the app
$ npm run dev or bun run dev
```

## ‼️ **Prerequisites** ‼️

> [Convex](https://docs.convex.dev/quickstart/nextjs) Create your account on Convex for free and get your API keys by following the instructions on the given link.

> [Clerk](https://dashboard.clerk.com/) Create your account on Clerk for free and get your API keys by following the instructions on the given link.

> [OpenAI](https://platform.openai.com/api-keys) Get your API Key from the link but you must have credits to be able to use it.

> [Edgestore](https://edgestore.dev/) Get your API Key from the link but you must have credits to be able to use it.


Copy this and paste it in your .env or .env.local.
```
CONVEX_DEPLOYMENT=

NEXT_PUBLIC_CONVEX_URL=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

EDGE_STORE_ACCESS_KEY=
EDGE_STORE_SECRET_KEY=

OPENAI_API_KEY=
```
