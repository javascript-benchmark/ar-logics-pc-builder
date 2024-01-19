import { Provider } from "react-redux";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { StyleProvider } from "@ant-design/cssinjs";
import { store } from "@/redux/store";
export default function MyApp({ Component, pageProps }) {
   // Use the layout defined at the page level, if available
   const getLayout = Component.getLayout || ((page) => page);

   return getLayout(
      <Provider store={store}>
         <StyleProvider hashPriority="high">
            <Component {...pageProps} />
         </StyleProvider>
      </Provider>
   );
}
