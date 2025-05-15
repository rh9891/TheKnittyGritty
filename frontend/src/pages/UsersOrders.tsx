import { useGetOrdersQuery } from "../slices/ordersApiSlice.ts";
import OrdersPreview from "../components/OrdersPreview.tsx";
import UsersOrdersTable from "../components/UsersOrdersTable.tsx";

const UsersOrders = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery(undefined);

  return (
    <>
      <h1>Orders</h1>
      <OrdersPreview orders={orders} isLoading={isLoading} error={error} />
      <UsersOrdersTable orders={orders} isLoading={isLoading} error={error} />
    </>
  );
};

export default UsersOrders;
