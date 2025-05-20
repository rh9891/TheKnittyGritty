import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";
import { useState } from "react";
import { Badge, Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

import type { UserResponse } from "../types.ts";
import { DEFAULT_ERROR_MESSAGE } from "../../../shared/constants.ts";
import { useDeleteUserMutation } from "../slices/usersApiSlice.ts";
import Loader from "./Loader";
import Message from "./Message.tsx";
import ConfirmModal from "./ConfirmModal.tsx";

type UsersTableProps = {
  users: UserResponse[];
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
  refetch: () => void;
};

const UsersTable = ({ users, isLoading, error, refetch }: UsersTableProps) => {
  const [show, setShow] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const handleOnConfirm = () => {
    if (selectedUserId) {
      deleteHandler(selectedUserId);
    }
    setShow(false);
    setSelectedUserId(null);
  };
  const handleOnCancel = () => setShow(false);
  const handleShow = (id: string) => {
    setSelectedUserId(id);
    setShow(true);
  };

  const [deleteUser, { isLoading: loadingDeleteUser, error: deleteError }] =
    useDeleteUserMutation();

  const deleteHandler = async (id: string) => {
    try {
      await deleteUser(id);
      toast.success("User deleted successfully.");
      refetch();
    } catch (err) {
      const error = err as FetchBaseQueryError | SerializedError;

      if ("status" in error) {
        if (error.data && typeof error.data === "object") {
          const data = error.data as { message?: string };
          toast.error(data?.message || DEFAULT_ERROR_MESSAGE);
        } else {
          toast.error(DEFAULT_ERROR_MESSAGE);
        }
      } else {
        toast.error(error.message || DEFAULT_ERROR_MESSAGE);
      }
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    const err = error as FetchBaseQueryError | SerializedError;

    if ("data" in err && typeof err.data === "object" && err.data !== null) {
      const message =
        (err.data as { message?: string })?.message || DEFAULT_ERROR_MESSAGE;
      return <Message variant="danger" text={message} />;
    }
    return <Message variant="danger" text={DEFAULT_ERROR_MESSAGE} />;
  }

  return (
    <>
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </td>
              <td>
                {user.isAdmin ? (
                  <Badge bg="primary">Admin</Badge>
                ) : (
                  <Badge bg="secondary">User</Badge>
                )}
              </td>
              <td>
                <div className="d-flex gap-1 flex-nowrap justify-content-center">
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant="primary" className="btn-sm">
                      <FaEdit color="#ffffff" />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="secondary"
                    className="btn-sm"
                    onClick={() => handleShow(user._id)}
                  >
                    <FaTrash color="#ffffff" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ConfirmModal
        show={show}
        title={`Delete ${users?.find((u) => u._id === selectedUserId)?.name || "User"}?`}
        body="Are you sure you want to delete this user? This action cannot be undone."
        confirmText="Delete"
        onConfirm={handleOnConfirm}
        onCancel={handleOnCancel}
        loading={loadingDeleteUser}
        error={deleteError}
      />
    </>
  );
};

export default UsersTable;
