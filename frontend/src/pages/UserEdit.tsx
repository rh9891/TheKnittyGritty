import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";
import { Link, useParams } from "react-router-dom";

import { DEFAULT_ERROR_MESSAGE } from "../../../shared/constants.ts";
import { useGetUserByIdQuery } from "../slices/usersApiSlice.ts";
import Loader from "../components/Loader";
import UserEditForm from "../components/UserEditForm.tsx";
import Message from "../components/Message.tsx";

const UserEdit = () => {
  const { id: userId } = useParams();

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useGetUserByIdQuery(userId ?? "");

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
      <Link to="/admin/users" className="btn btn-primary my-3">
        Go Back
      </Link>
      <UserEditForm refetch={refetch} user={user} userId={userId} />
    </>
  );
};
export default UserEdit;
