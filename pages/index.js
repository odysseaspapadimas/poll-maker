import { Box } from "@chakra-ui/react";
import Head from "next/head";
import Poll from "../components/Poll/Poll";

export default function Home() {


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Poll />
    </div>
  );
}
