import Layout from "@/components/Layout";
import Notification from "@/components/Notification";
import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { persistor, store } from "../redux/store";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { PersistGate } from "redux-persist/integration/react";
import Loader from "@/components/Loader";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  // Create a client
  const queryClient = new QueryClient();

  return (
    <ThemeProvider attribute='class'>
      <Notification />
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <Provider store={store}>
            <PersistGate
              loading={
                <div className='flex h-screen items-center justify-center'>
                  <Loader />
                </div>
              }
              persistor={persistor}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </PersistGate>
          </Provider>
        </SessionProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
