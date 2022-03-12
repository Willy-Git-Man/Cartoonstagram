import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  const userComponents = users.map((user,i) => {
    return (
      <ul key={i}>
        <li>
          <NavLink to={`/users/${user.id}`}>{user.username}</NavLink>
        </li>
      </ul>
    );
  });

  return (
    <>
      <h1>User List: </h1>
      <div>{userComponents}</div>
    </>
  );
}

export default UsersList;
//.
