# Organization Management App

[Live Site](https://organization-management-mashuk.vercel.app/)

This is a web application that allows users to manage transactions and view data in a dashboard, with breakdowns based on weekly, monthly, and yearly transactions. I utilized **Recharts** for displaying charts and **TanStack Table** for building dynamic, filterable, and sortable tables. The app is built using **Next.js 14**, **MongoDB**, **Mongoose**, and **Tailwind CSS** for the frontend design. I also implemented **server actions** for optimized server-side logic handling.

## Features

- **Transaction Management**: Users can add, view, and manage transactions.
- **Dashboard Overview**: Displays charts and transaction summaries (weekly, monthly, yearly).
- **Client and Server-Side Validation**: Ensures that all data is validated properly both client-side (using Zod) and server-side (for secure and error-free transactions).
- **Secure Login with Http-only Cookie**: Provides a secure login system using encrypted cookies to store JWT tokens.
- **Responsive Design**: Optimized for small, medium, and large devices.
- **Beautiful UI**: The interface is clean, user-friendly, and accessible.
- **Reusable Components and Hooks**: The project is organized with reusable components and custom hooks following good practices.
- **Transaction History Table**: Filter, sort, and paginate transaction data seamlessly.
- **Dashboard Features**: Dynamic and detailed representation of data in charts for easy analysis.
- **Pagination**: Server-side pagination for efficient data loading and better user experience.

## Tech Stack

- **Next.js 14**: For server-side rendering, fast development, and optimized performance.
- **MongoDB & Mongoose**: For database management and schema-based data validation.
- **Tailwind CSS**: For utility-first responsive design.
- **Recharts**: For interactive and dynamic charts.
- **TanStack Table**: For advanced table features like filtering, sorting, and pagination.
- **Zod**: For schema-based validation of input data.
- **NextAuth v5**: Used for user authentication with secure cookies.

## Why I Used These Technologies

- **Next.js**: To leverage the power of server-side rendering (SSR) and API routes for efficient data handling.
- **Recharts**: It provides great customization and is ideal for building dynamic data visualizations.
- **TanStack Table**: Perfect for managing complex tables with features like filtering, sorting, and pagination.
- **Server Actions**: These allowed me to run server-side logic efficiently without managing complex API routes manually, making the app more performant.
- **Tailwind CSS**: Speeding up styling with its utility classes and making the app responsive effortlessly.

## Challenges Faced

- **Dropdown and Modal Conflicts in Table Rows**: I encountered issues displaying dropdowns and modals within table row actions due to internal conflicts. I had to handle these cases manually to ensure proper functionality.
- **Handling JWT for Session Management**: Managing user sessions securely through JWT and cookies took extra care to avoid security issues.

## Next Steps

- **Server-Side Filtering & Sorting**: Enhance performance by offloading filtering and sorting to the server-side.
- **Role-Based Authorization**: Implement user roles and permissions for different functionalities within the app.
- **Google & GitHub Login**: Add Google and GitHub providers for user login using NextAuth v5.


## How to Run the Project

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

1. Clone the repository (using SSH):

   ```bash
   git@github.com:mashuk-tamim/organization-management-app.git
   ```

2. Navigate into the project directory:
   ```bash
   cd organization-management-app
   ```
3. Install dependencies:
    ```bash
    npm install
    # or
    yarn
    ````
4. Run the development server::

    ```bash
    npm run dev
    # or
    yarn dev
    ````

5. Open your browser and navigate to:
   ```bash
   http://localhost:3000
   ```

run the development server:

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
