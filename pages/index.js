import { Box } from "@chakra-ui/react";
import Head from "next/head";
import Poll from "../components/Poll/Poll";
import FingerprintJS from "@fingerprintjs/fingerprintjs-pro";

export default function Home() {
  FingerprintJS.load({ token: process.env.PUBLIC_NEXT_FINGERPRINT_TOKEN })
    .then((fp) => fp.get())
    .then((result) => console.log(result.visitorId));

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
