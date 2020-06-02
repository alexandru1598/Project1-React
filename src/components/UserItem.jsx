import React from 'react';
import './UserItem.css';


function UserItem(props) {
    const {name, email, image, salary, isGoldClient, deleteUser} = props;

    return (
        <div className="user-item">
            <img src={image} alt=" " width="150" height="150"/>
            <h3>Name: { name }</h3>
            <p>E-mail: { email }</p>
            <p>Salary: { salary }</p>
            { isGoldClient
                ? <h3>Client GOLD</h3>
                : null
            }
            <button onClick={deleteUser}>Delete User</button>
        </div>
    );
}

export default UserItem;