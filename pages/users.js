import UserList from "../components/UserList";
import Layout from "../components/Layout";

const Users = (props) => (
  <Layout>
    <div>
      <h2>Users Page</h2>
      <br />
      <UserList users={props.users} />
    </div>
  </Layout>
);

export default Users;
