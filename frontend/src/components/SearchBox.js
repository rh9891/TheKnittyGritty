import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  const history = useHistory();

  const submitHandler = (event) => {
    event.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type="text"
        name="q"
        onChange={(event) => setKeyword(event.target.value)}
        className="mr-sm-2 ml-sm-5"
        placeholder="Search"
      ></Form.Control>
      <Button type="submit" className="btn btn-secondary p-2">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
