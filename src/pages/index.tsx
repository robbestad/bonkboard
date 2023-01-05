import { getLayout } from "@/components/common/Layout";
import { Board } from "@/components/landing/Board";

function Home() {
  return <Board />;
}

Home.getLayout = (page: React.ReactNode) => getLayout(page);

export default Home;
