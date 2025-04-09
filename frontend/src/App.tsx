import { Container } from "react-bootstrap";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <h1>The Knitty Gritty</h1>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
