import type { AppProps } from "next/app";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { fontSans, fontMono } from "@/config/fonts";
import { useRouter } from "next/router";
import "@/styles/globals.css";
import "@/styles/colorPalette.css";
import ErrorBoundary from "@/layouts/ErrorBoundary.tsx";
import { useTranslationStore } from "@/wrapper/Stores.ts";
import SEO from "@/components/SEO.tsx";
import { DefaultSeo } from "next-seo";
import Init from "@/components/Init.tsx";

import { NextPage } from "next";

type NextPageWithLayout = NextPage & {
	shouldHaveLayout?: boolean;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};


const App = ({ Component, pageProps }: AppPropsWithLayout) => {
	const router = useRouter();

	// eslint-disable-next-line @typescript-eslint/naming-convention
	const { _hasHydrated } = useTranslationStore();

	if (!_hasHydrated) return null;

	const shouldHaveLayout = Component.shouldHaveLayout || false;

	return (
		<>
			<DefaultSeo {...SEO} />
			<ErrorBoundary>
				<NextUIProvider navigate={router.push}>
					<NextThemesProvider>
						<Init shouldHaveLayout={shouldHaveLayout}>
							<Component {...pageProps} />
						</Init>
					</NextThemesProvider>
				</NextUIProvider>
			</ErrorBoundary>
		</>
	);
};

export const fonts = {
	sans: fontSans.style.fontFamily,
	mono: fontMono.style.fontFamily,
};

export default App;
