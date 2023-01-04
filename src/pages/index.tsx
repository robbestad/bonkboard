import { Container } from "@chakra-ui/react";

import { getLayout } from "@/components/common/Layout";
import { Board } from "@/components/landing/Board";

function Home() {
  return (
    <Container pb={12} textAlign="center" mt="52px">
      <Board />
    </Container>
  );
}

Home.getLayout = (page: React.ReactNode) => getLayout(page);

export default Home;
