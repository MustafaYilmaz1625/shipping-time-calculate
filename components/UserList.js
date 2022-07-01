import Link from "next/link";
const UserList = () => (
  <div>
    <Link href="/user?name=mehmet" as="mehmet">
      <a className="username">Mehmet</a>
    </Link>
    <br />
    <Link href="/user?name=ahmet" as="ahmet">
      <a className="username">Ahmet</a>
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
