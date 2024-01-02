import { Center, Heading } from "@chakra-ui/react";

const Home = () => {
  return (
      <Center><Heading
          fontWeight={600}
          fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
      >
        Kastel Staff Panel
      </Heading></Center>
  )
}
export default Home;