import { RecoilRoot } from "recoil";
import { ChakraProvider } from "@chakra-ui/react";
import "@/styles/globals.css";
import theme from "@/utils/theme";
import Init from "@/components/init.tsx";
import { AppProps } from "next/app.js";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <RecoilRoot>
        <ChakraProvider theme={theme}>
          <Init />
          <Component {...pageProps} />
        </ChakraProvider>
      </RecoilRoot>
    </>
  );
};

export default App;
