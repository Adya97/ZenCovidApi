import { useState, useEffect } from 'react';
import "./topbar.scss";
import { User, ApiUser } from '../../interfaces';

const TopBox = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const jsonData: ApiUser[] = await response.json();
        const transformedData: User[] = jsonData
          .slice(0, 6) // Slice the array to only include the first six users
          .map((user: ApiUser) => ({
            id: user.id,
            username: user.username,
            email: user.email,
            img: `https://api.dicebear.com/8.x/pixel-art/svg?seed=${user.username}`,
            amount: `$${(Math.random() * 100).toFixed(2)}`
          }));
        setUsers(transformedData);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="topBox">
      <h2>New Patients</h2>
      <div className="list">
        {users.map(user => (
          <div className="listItem" key={user.id}>
            <div className="user">
              <img src={user.img} alt={user.username} />
              <div className="userTexts">
                <span className="username">{user.username}</span>
                <span className="email">{user.email}</span>
              </div>
            </div>
            <span className="amount">{user.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopBox;