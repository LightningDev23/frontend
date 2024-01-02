import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  clientStore,
  currentChannel,
  currentGuild,
  readyStore,
  tokenStore,
} from "@/utils/stores";
import {
  Avatar,
  Box,
  Center,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import AppNavbar from "@/components/app/navbar";
import Loading from "@/components/app/loading";
import SEO from "@/components/seo";
import GuildSideBar from "@/components/app/guild/side-bar";

const GuildChannelPage = () => {
  const router = useRouter();
  const { guildId, channelId } = router.query as {
    guildId: string;
    channelId: string;
  };
  const [token] = useRecoilState(tokenStore);
  const [client] = useRecoilState(clientStore);
  const [ready] = useRecoilState(readyStore);
  const [, setGuild] = useRecoilState(currentGuild);
  const [channel, setChannel] = useRecoilState(currentChannel);
  const [areWeReady, setAreWeReady] = useState(false);

  useEffect(() => {
    if (!token) router.push("/login");
  }, [ready]);

  useEffect(() => {
    if (!client) return;
    if (!ready) return;

    const foundGuild = client.guilds.get(guildId);

    if (!foundGuild) {
      router.push("/app");

      return;
    }

    const channel =
      foundGuild.channels.find((channel) => channel.id === channelId) ??
      foundGuild.channels.find((channel) =>
        ["GuildText", "GuildNews", "GuildRules", "GuildNewMember"].includes(
          channel.type,
        ),
      );

    if (!channel) {
      console.log("no channel found");

      return;
    }

    if (channel.id !== channelId) {
      router.push(`/app/guilds/${guildId}/channels/${channel.id}`);
    }

    setGuild(foundGuild);
    setChannel(channel);
    setAreWeReady(true); // we create our custom "ready" thing, since the "ready" for the client is well for when its ready, not when we are ready
  }, [ready, guildId, channelId]);

  const messages = [
    {
      user: {
        name: "Test #1",
        avatar: "/icon-3.png",
      },
      content: "Hello world!",
    },
    {
      user: {
        name: "Test #2",
        avatar: "/icon-4.png",
      },
      content: "Hello",
    },
    {
      user: {
        name: "Test #3",
        avatar: "/icon-2.png",
      },
      content: "Whats up?",
    },
  ];

  const background = useColorModeValue("#e6e9ef", "#101319");

  return (
    <>
      <SEO
        title={"App"}
        description={
          "Kastel is a fresh take on chat apps. With a unique look and feel, it's the perfect way to connect with friends, family, and communities."
        }
      />
      {areWeReady ? (
        <>
          <Box>
            <AppNavbar />

            <GuildSideBar>
              <Box
                pos={"fixed"}
                zIndex={10}
                h={10}
                top={0}
                w={"full"}
                bg={background}
              >
                <Text mt={2} ml={2}>
                  #{channel?.name}
                </Text>
              </Box>

              {/* messages */}
              <Box mt={20}>
                {messages.map((message) => (
                  <Box
                    key={message.user.name}
                    _hover={{
                      bg: "gray.700",
                    }}
                  >
                    <Stack
                      ml={5}
                      py="1.5"
                      direction={["column", "row"]}
                      spacing={6}
                    >
                      <Center>
                        <Avatar
                          size="sm"
                          src={message.user.avatar || "/icon-1.png"}
                          name={message?.user.name || "Loading"}
                          mb={4}
                          cursor="pointer"
                        ></Avatar>
                        <Box ml={2}>
                          <Box fontWeight="semibold">{message.user.name}</Box>
                        </Box>
                      </Center>
                    </Stack>
                  </Box>
                ))}
              </Box>
            </GuildSideBar>
          </Box>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default GuildChannelPage;
