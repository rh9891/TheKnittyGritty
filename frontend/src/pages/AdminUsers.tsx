import { useGetUsersQuery } from "../slices/usersApiSlice.ts";
import Meta from "../components/Meta.tsx";
import UsersPreview from "../components/UsersPreview.tsx";
import UsersTable from "../components/UsersTable.tsx";

const AdminUsers = () => {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();

  return (
    <>
      <Meta
        title="Admin | Manage Users | The Knitty Gritty"
        description="Admin dashboard page for managing user accounts on The Knitty Gritty. View, edit, and oversee all registered users."
        keywords="admin, user management, account administration, The Knitty Gritty"
      />
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
