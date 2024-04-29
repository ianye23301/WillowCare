import "../styles/globals.css";
import Layout from "@/components/layout/Layout";
import Provider from "@/components/Provider";
import AppRouter from "next/dist/client/components/app-router";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import Head from 'next/head'

export const metadata = {
  title: "WillowCare",
  description: "Your all-in-one software for elderly care management!",
  favicon: "/public/assets/images/favicon.jpg"
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">

      <body>
        <AppRouterCacheProvider>
          <Provider>
            <main className='app"bg-gray-100"'>
              <Layout>{children}</Layout>
            </main>
          </Provider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
};

export default RootLayout;
