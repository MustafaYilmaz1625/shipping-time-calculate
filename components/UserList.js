import Link from "next/link";

const UserList = (props) => (
  <div>
    <Link href={`/user?name=${user.username}`} as={`${user.username}`}>
      <a className="username">mehmet</a>
    </Link>

    <style jsx>{`
      .username {
        background: green;
        color: white;
        font-size: 20px;
        font-weight: bold;
        margin-left: 10px;
      }
    `}</style>
  </div>
);

export default UserList;
