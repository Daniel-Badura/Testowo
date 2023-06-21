import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Table } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { logout, deleteUser, listUsers } from "../actions/userActions";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const UsersListScreen = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: deleted } = userDelete;

  const usersList = useSelector((state) => state.usersList);
  const { loading, error, users } = usersList;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      dispatch(logout());
      navigate("/login");
    }
  }, [dispatch, userInfo, navigate, deleted]);

  const deleteHandler = (id, email) => {
    if (window.confirm(`Confirm removing ${email}`)) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <>
      <h1>{t("usersListScreen.users")}</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>{t("usersListScreen.name")}</th>
              <th>{t("usersListScreen.lastname")}</th>
              <th>Email</th>
              <th>Admin</th>
              <th>{t("usersListScreen.dateCreated")}</th>
            </tr>
          </thead>
          <tbody>
            {users ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td>
                    {" "}
                    <a href={`/users/${user._id}`}>{user._id}</a>
                  </td>
                  <td>{user.name}</td>
                  <td>{user.lastname}</td>
                  <td>
                    <a href={`mailto: ${user.email}`}>{user.email}</a>
                  </td>
                  <td className="text-centered">
                    {user.isAdmin ? (
                      <i className="fas fa-check green" />
                    ) : (
                      <i className="fas fa-times red" />
                    )}
                  </td>
                  <td>{user.createdAt.substring(0, 10)}</td>
                  <td>
                    <LinkContainer to={`/admin/users/${user._id}/edit`}>
                      <Button
                        variant="outline-warning"
                        className="btn-sm rounded"
                      >
                        <i className="fas fa-edit" />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="outline-danger"
                      className="btn-sm "
                      onClick={() => {
                        deleteHandler(user._id, user.email);
                      }}
                    >
                      <i className="fas fa-trash" />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <></>
            )}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UsersListScreen;
