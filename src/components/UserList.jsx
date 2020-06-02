import React from 'react';
import UserItem from './UserItem';
import './UserList.css';

function UserList(props) {
    const { users, deleteUser } = props;

    return (
        <div>
            <h2>Users List:</h2>
                <div className="users-list">
                    { users.map((user, index) => {
                        return <UserItem
                            id={ user.id }
                            name={ user.name }
                            email={ user.email }
                            image={ user.image }
                            salary={ user.salary }
                            isGoldClient={ user.isGoldClient }
                            key={ index }
                            deleteUser={() => deleteUser(index)}
                        />   
                    })}
                </div>
        </div>
    );
}

export default UserList;