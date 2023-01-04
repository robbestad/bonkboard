import { Container, Text } from "@chakra-ui/react";

import { getLayout } from "@/components/common/Layout";

function Home() {
  return (
    <Container pb={12} textAlign="center" mt="52px">
      <Text as="h1" fontSize="32px" lineHeight="1.5" fontWeight={700}>
        Bonk!
      </Text>
    </Container>
  );
}

Home.getLayout = (page: React.ReactNode) => getLayout(page);

export default Home;
