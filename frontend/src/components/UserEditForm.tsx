import { FormEvent, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

import type { UserResponse } from "../types.ts";
import { DEFAULT_ERROR_MESSAGE } from "../../constants.ts";
import { useUpdateUserMutation } from "../slices/usersApiSlice.ts";
import FormContainer from "./FormContainer.tsx";
import Loader from "./Loader";

type UserEditFormProps = {
  user?: UserResponse;
  userId?: string;
  refetch: () => void;
};

const UserEditForm = ({ user, userId, refetch }: UserEditFormProps) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const [updateUser, { isLoading: loadingUpdateUser }] =
    useUpdateUserMutation();

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedUser: UserResponse = {
      _id: userId!,
      name,
      email,
      isAdmin,
    };

    const res = await updateUser(updatedUser);

    if ("error" in res && res.error) {
      const err = res.error;
      const message =
        "status" in err &&
        typeof err.data === "object" &&
        err.data !== null &&
        "message" in err.data
          ? (err.data as { message: string }).message
          : DEFAULT_ERROR_MESSAGE;

      toast.error(message);
    } else {
      toast.success("User updated successfully.");
      refetch();
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  if (loadingUpdateUser) {
    return <Loader />;
  }

  return (
    <FormContainer>
      <h1>Edit User</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name" className="my-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="isAdmin" className="my-3">
          <Form.Check
            type="checkbox"
            label="Is Admin Role"
            checked={isAdmin}
            onChange={(event) => setIsAdmin(event.target.checked)}
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Update
        </Button>
      </Form>
    </FormContainer>
  );
};

export default UserEditForm;
