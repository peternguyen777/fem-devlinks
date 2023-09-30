import { ClerkProvider } from "@clerk/nextjs";
import { type AppType } from "next/app";
import "~/styles/globals.css";
import { api } from "~/utils/api";
import localFont from "next/font/local";
import { Toaster } from "~/components/ui/toaster";

const InstrumentSans = localFont({
  src: "../../public/fonts/InstrumentSans-VariableFont_wdth,wght.ttf",
  variable: "--font-instrument",
});

const InstrumentSansItalic = localFont({
  src: "../../public/fonts/InstrumentSans-Italic-VariableFont_wdth,wght.ttf",
  variable: "--font-instrument-italic",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      {/* Global font for shadcn-ui */}
      <style jsx global>
        {`
          html {
            font-family: ${InstrumentSans.style.fontFamily};
          }
        `}
      </style>
      <ClerkProvider {...pageProps}>
        <main
          className={`${InstrumentSansItalic.variable} ${InstrumentSans.variable}`}
        >
          <Toaster />
          <Component {...pageProps} />
        </main>
      </ClerkProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
