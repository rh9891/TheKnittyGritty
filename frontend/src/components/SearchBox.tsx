import { Button, Form } from "react-bootstrap";
import { FormEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type SearchBoxProps = {
  currentPath: string;
};

const SearchBox = ({ currentPath }: SearchBoxProps) => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams<{ keyword?: string }>();
  const [keyword, setKeyword] = useState<string>(urlKeyword ?? "");

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (keyword.trim()) {
      setKeyword("");

      if (currentPath.includes("/top-rated")) {
        navigate(`/top-rated/search/${keyword}`);
      } else {
        navigate(`/search/${keyword}`);
      }
    } else {
      navigate("/");
    }
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex gap-2 mx-2">
      <Form.Control
        type="text"
        name=""
        onChange={(event) => setKeyword(event.target.value)}
        value={keyword}
        placeholder="Search Products..."
        className="mr-sm-2 ml-sm-5"
      />
      <Button type="submit" variant="outline-light">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
