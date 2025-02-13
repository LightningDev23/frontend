import { type Section } from "@/types/settings.ts";
import { Modal, ModalContent } from "@nextui-org/react";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

const Section = ({
	title,
	children,
	setSection,
}: {
	title: string | null;
	children: Section["children"];
	setSection: (section: string) => void;
}) => {
	return (
		<div className="flex flex-col gap-1 p-2 select-none xl:min-w-64 min-w-60 w-full">
			{title && <h2 className="text-md font-semibold select-none mb-2 text-white ml-2">{title}</h2>}
			{children.map((child) => (
				<div
					key={child.title}
					className={twMerge(
						"flex items-center justify-between w-full h-14 cursor-pointer rounded-lg mb-0.5 group",
						child.disabled
							? "cursor-not-allowed bg-charcoal-900"
							: "hover:bg-charcoal-600 bg-charcoal-700 transition-all duration-300 ease-in-out transform active:scale-[.97]",
						child.danger ? "bg-danger/20 hover:bg-danger/15 text-danger focus:bg-danger/20" : "text-white",
					)}
					onClick={() => {
						if (child.onClick) {
							child.onClick();
						}

						if (!child.disabled && child.section) {
							setSection(child.id);
						}
					}}
				>
					<div className="flex items-center">
						{child.startContent}
						<p className=" truncate ml-2 text-md">{child.title}</p>
					</div>
					{child.endContent}
				</div>
			))}
		</div>
	);
};

/**
 * This is a helper made to make creating setting modals easier, only two spots using this right now are user and guild settings
 */
const BaseSettings = ({
	isOpen,
	onOpenChange,
	sections,
	initialSection,
	title,
}: {
	isOpen: boolean;
	onOpenChange: () => void;
	onClose: () => void;
	sections: Section[];
	initialSection: string;
	title: string;
}) => {
	const [selectedSection, setSelectedSection] = useState(initialSection);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		setOpen(false);
	}, [selectedSection]);

	return (
		<>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				size="full"
				className="w-screen h-screen"
				isDismissable={false}
				isKeyboardDismissDisabled={true}
				classNames={{
					closeButton: "z-20"
				}}
			>
				<ModalContent>
					<div className="flex w-full m-0 overflow-x-hidden h-full">
						<div className="flex w-full h-full">
							<div className={twMerge("!z-[100] bg-accent overflow-y-auto h-screen xl:min-w-96 min-w-64 sm:flex justify-end", !open ? "hidden" : "absolute z-20 w-[100vw]")}>
								<div className="justify-end mr-2">
									<Menu
										color="#acaebf"
										size={24}
										onClick={() => setOpen(!open)}
										className="cursor-pointer sm:hidden"
									/>
									<p className="text-white text-md font-semibold p-4 select-none truncate max-w-64">
										{title}
									</p>
									{sections.map((section) => (
										<Section
											title={section.title}
											key={section.title}
											// eslint-disable-next-line react/no-children-prop
											children={section.children}
											setSection={setSelectedSection}
										/>
									))}

								</div>
							</div>

							<div className={twMerge("overflow-auto sm:hidden justify-center cursor-pointer", open ? "hidden" : "")}>
								<Menu
									color="#acaebf"
									size={24}
									onClick={() => setOpen(!open)}
								/>
							</div>

							<div className="flex flex-col w-full p-5 pt-4 h-full overflow-auto">
								{
									sections
										.find((s) => s.children.find((c) => c.id === selectedSection))
										?.children.find((c) => c.id === selectedSection)?.section
								}
							</div>
						</div>
					</div>
				</ModalContent>
			</Modal>
		</>
	);
};

export default BaseSettings;
