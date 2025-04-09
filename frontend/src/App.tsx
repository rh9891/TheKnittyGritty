import { Container } from "react-bootstrap";
import Header from "../components/Header.tsx";

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <h1>The Knitty Gritty</h1>
        </Container>
      </main>
    </>
  );
};

export default App;
