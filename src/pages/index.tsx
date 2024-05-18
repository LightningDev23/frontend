import HomeLayout from "@/layouts/HomeLayout.tsx";
import { useTranslationStore } from "@/wrapper/Stores.ts";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const IndexPage = () => {
	const { t } = useTranslationStore();

	const [device, setDevice] = useState<string>("");

	useEffect(() => {
		if (typeof window !== "undefined") {
			setDevice(window.navigator.userAgent);
		}
	}, []);


	return (
		<HomeLayout>
			<div className="bg-cover text-white py-32 flex items-center justify-center ">
				<div className="text-center">
					<h1 className="text-3xl font-bold">{t("home.title")}</h1>
					<p className="text-medium mt-4">{t("home.subtitle")}</p>
					<p className="text-medium">{t("home.subtitle2")}</p>
					<div className="mt-8">
						<Button href="/register" as={Link} size="lg" variant="flat" color="primary">{t("home.getStarted")}</Button>
						<Button href="/download" as={Link} className="ml-4" size="lg" variant="flat" color="success" >{t("home.download")} {device.includes("Android") ? "Android" : device.includes("iPhone") ? "iOS" : device.includes("Windows") ? "Windows" : "Unknown"}</Button>
					</div>
				</div>
			</div>
		</HomeLayout>
	);
};

export default IndexPage;