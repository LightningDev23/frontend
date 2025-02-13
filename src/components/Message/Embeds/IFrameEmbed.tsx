import { Avatar, Card, CardBody, CardFooter, CardHeader, Image, User } from "@nextui-org/react";
import Link from "next/link";
import { Embed } from "./RichEmbed.tsx";
import { useState } from "react";
import { Play } from "lucide-react";
import { twMerge } from "tailwind-merge";

const baseProviderUrls = {
    Youtube: "https://www.youtube.com"
};

const IFrameEmbed = ({
    embed
}: {
    embed: Embed;
}) => {

    const HyperLinkPossibly = ({ url, children, noColor }: { url?: string; children: React.ReactNode; noColor?: boolean; }) => {
        return url ? (
            <Link href={url} passHref className={!noColor ? "text-blue-500" : ""} target="_blank">
                {children}
            </Link>
        ) : (
            <>{children}</>
        );
    };

    if (!embed.iframeSource) return null;

    const PreIframe = ({
        children
    }: {
        children: React.ReactNode;
    }) => {
        const [iframeInview, setiframeInview] = useState<boolean>(false);

        if (embed.iframeSource?.provider !== "Youtube") return children;

        // todo: proxy image
        const backgroundImage = `url("https://i.ytimg.com/vi_webp/${embed.iframeSource.url.split("/").pop()?.split("?")[0]}/maxresdefault.webp")`;

        return (
            <div className={twMerge("relative max-w-md w-[28rem] h-80", !iframeInview ? "cursor-pointer" : "")} onClick={() => {
                if (!iframeInview) setiframeInview(true);
            }}>
                {!iframeInview && (
                    <>
                        <div className="w-full h-full opacity-65" style={{
                            backgroundImage: backgroundImage,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }} />
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <Play size={40} className="text-white" />
                        </div>
                    </>
                )}
                {iframeInview && children}
            </div>
        );
    };

    return (
        <div style={{
            borderLeft: `4px solid #${embed.color?.toString(16) ?? "000000"}`
        }} className="rounded-md inline-block w-auto ">
            <Card shadow="sm" radius="none" className="rounded-md min-w-0 min-h-0 bg-accent">
                {(embed.title || embed.author?.name || embed.thumbnail?.url) && (
                    <CardHeader className="p-0 pl-3 pt-3 mr-3">
                        <div className="flex flex-col items-start gap-2 text-white">
                            {embed.iframeSource.provider && (
                                <p className="text-xs">
                                    <HyperLinkPossibly url={baseProviderUrls[embed.iframeSource.provider]} noColor>
                                        {embed.iframeSource.provider}
                                    </HyperLinkPossibly>
                                </p>
                            )}
                            {embed.author?.name && (
                                <HyperLinkPossibly url={embed.author.url} noColor>
                                    <User name={embed.author.name} avatarProps={{
                                        src: embed.author.iconUrl,
                                        className: "h-6 w-6 rounded-full",
                                        imgProps: {
                                            referrerPolicy: "no-referrer"
                                        }
                                    }} className="font-bold truncate max-w-md" classNames={{
                                        name: "text-xs"
                                    }} />
                                </HyperLinkPossibly>
                            )}
                            {embed.title && <HyperLinkPossibly url={embed.url}><p className="truncate max-w-md mb-2">{embed.title}</p></HyperLinkPossibly>}
                        </div>
                        {embed.thumbnail?.url && (
                            <div className="ml-4 mr-4">
                                <Image src={embed.thumbnail.url} alt="Thumbnail" className="rounded-md max-w-20 min-w-20 max-h-20 min-h-20" referrerPolicy="no-referrer" />
                            </div>
                        )}
                    </CardHeader>
                )}
                <CardBody className="p-0 pl-3 mr-3">
                    {embed.description && <p className="text-sm text-white max-w-lg whitespace-pre-line overflow-hidden break-words">{embed.description}</p>}
                    <div className="mt-2">
                        {/*//t! Allow disabling of iframes for those more safety focused people(?) */}
                        <PreIframe>
                            <iframe
                                src={embed.iframeSource.url}
                                allowFullScreen
                                title="Embed"
                                className="w-full h-full"
                                // ? ;3 if you know you know
                                sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                                allow="autoplay"
                            />
                        </PreIframe>
                    </div>
                </CardBody>
                {(embed.footer?.text || embed.footer?.timestamp) && (
                    <CardFooter className="mr-3">
                        <div className="flex items-center justify-between text-xs">
                            {embed.footer.iconUrl && <>
                                <Avatar src={embed.footer.iconUrl} className="h-6 w-6 rounded-full" />
                                <span className="ml-1.5 mr-1 select-none">•</span>
                            </>}
                            {embed.footer.text &&
                                <span>
                                    {embed.footer.text}
                                    <span className="ml-1 mr-1 select-none">•</span>
                                </span>}
                            {embed.footer.timestamp &&
                                <p>
                                    {new Date(embed.footer.timestamp).toLocaleString()}
                                </p>
                            }
                        </div>
                    </CardFooter>
                )}
            </Card>
        </div>
    );
};

export default IFrameEmbed;