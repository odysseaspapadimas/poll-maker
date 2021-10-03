import "tailwindcss/tailwind.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Global } from "@emotion/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

function MyApp({ Component, pageProps }) {
  const breakpoints = createBreakpoints({
    sm: "30em",
    md: "48em",
    lg: "62em",
    xl: "80em",
    "2xl": "96em",
  });

  const theme = extendTheme({ breakpoints });

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
