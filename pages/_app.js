import Layout from '@/components/Layout'
import Notification from '@/components/Notification';
import '@/styles/globals.css'
import { ThemeProvider } from "next-themes";
import { toast, ToastBar, Toaster } from 'react-hot-toast';


export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute='class'>
     <Notification/>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
  
}
