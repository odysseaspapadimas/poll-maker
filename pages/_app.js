import "tailwindcss/tailwind.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";


function MyApp({ Component, pageProps }) {
  
  return (
    <ChakraProvider>
      <Component {...pageProps} />
      <style jsx global>
        {`
          body {
            background-color: #0b0e11 !important;
            color: #fff !important;
            font-family: "Montserrat", sans-serif !important;
          }
        `}
      </style>
    </ChakraProvider>
  );
}

export default MyApp;
