import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../App.css'

const Admin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/admin')
      .then(response => {
        setUsers(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, []);



  return(
    <div >
      <h2>All registered users</h2>
      <table className="tableStyle">
        <tbody>
         <tr>
           <th>Username</th>
           <th>Email</th>
           <th>Role</th>
           <th>ID</th>
         </tr>
         {users.map(user => (
           <tr key={user.id}>
             <td>{user.username}</td>
             <td>{user.email}</td>
             <td>{user.role}</td>
             <td>{user.id}</td>
           </tr>
         ))}
        </tbody>
      </table>
    </div>
  )
}

export default Admin;