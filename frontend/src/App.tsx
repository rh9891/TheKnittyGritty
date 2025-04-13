import { Container } from "react-bootstrap";

import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import Home from "./screens/Home.tsx";

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Home />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
