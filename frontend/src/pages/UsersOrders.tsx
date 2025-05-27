import { useGetOrdersQuery } from "../slices/ordersApiSlice.ts";
import Meta from "../components/Meta.tsx";
import OrdersPreview from "../components/OrdersPreview.tsx";
import UsersOrdersTable from "../components/UsersOrdersTable.tsx";

const UsersOrders = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery(undefined);

  return (
    <>
      <Meta
        title="Admin | Customer Orders | The Knitty Gritty"
        description="View and manage all customer orders including order details, payment status, fulfillment, and shipping updates in The Knitty Gritty admin dashboard."
        keywords="admin orders, customer orders, order management, The Knitty Gritty admin, yarn order tracking"
      />
      <h1>Orders</h1>
      <OrdersPreview orders={orders} isLoading={isLoading} error={error} />
      <UsersOrdersTable orders={orders} isLoading={isLoading} error={error} />
    </>
  );
};

export default UsersOrders;
