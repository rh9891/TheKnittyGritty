import { useGetUsersQuery } from "../slices/usersApiSlice.ts";
import UsersPreview from "../components/UsersPreview.tsx";
import UsersTable from "../components/UsersTable.tsx";

const AdminUsers = () => {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();

  return (
    <>
      <h1>Users</h1>
      <UsersPreview users={users ?? []} isLoading={isLoading} error={error} />
      <UsersTable
        users={users ?? []}
        isLoading={isLoading}
        error={error}
        refetch={refetch}
      />
    </>
  );
};

export default AdminUsers;
