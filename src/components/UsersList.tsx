import React from 'react';
import { User } from '../models/User';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';

export const UsersList = ({ users }: { users: User[] }): JSX.Element => {
  return (
    <ListGroup variant="flush" className="userList" as="ul">
      {users.map((item) => (
        <ListGroup.Item key={item.id} className="usersList_item" as="li">
          <Image src={item.avatar} roundedCircle className="avatar_img" />
          {item.first_name} {item.last_name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};
