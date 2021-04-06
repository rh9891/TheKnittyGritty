import React, { Fragment, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Popover, OverlayTrigger } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listUsers, deleteUser } from "../actions/userActions";

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, successDelete, userInfo]);

  const deleteHandler = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <Fragment>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin?</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i
                      className="far fa-check-circle"
                      style={{ color: "#58cb9d" }}
                    ></i>
                  ) : (
                    <i
                      className="far fa-times-circle"
                      style={{ color: "#fe7851" }}
                    ></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i
                        className="fas fa-user-edit"
                        style={{ color: "#6bc3d4" }}
                      ></i>
                    </Button>
                  </LinkContainer>

                  <OverlayTrigger
                    rootClose
                    trigger="click"
                    placement="left"
                    overlay={
                      <Popover
                        id="popover-basic"
                        style={{
                          position: "relative",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <Popover.Title as="h3">Are you sure?</Popover.Title>
                        <Popover.Content>
                          This user will be deleted immediately. You cannot undo
                          this action.
                        </Popover.Content>
                        <Button
                          variant="secondary"
                          className="btn-sm"
                          style={{
                            position: "relative",
                            marginLeft: "1.5rem",
                            marginRight: "1rem",
                            marginBottom: ".5rem",
                          }}
                          onClick={() => document.body.click()}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="primary"
                          className="btn-sm"
                          style={{
                            position: "relative",
                            marginLeft: ".5rem",
                            marginRight: "1rem",
                            marginBottom: ".5rem",
                          }}
                          onClick={() => deleteHandler(user._id)}
                        >
                          Yes, Delete User
                        </Button>
                      </Popover>
                    }
                  >
                    <Button
                      variant="danger"
                      className="btn-sm"
                      disabled={userInfo._id === user._id}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </OverlayTrigger>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Fragment>
  );
};

export default UserListScreen;
