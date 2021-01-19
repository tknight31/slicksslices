import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const ToppingStyles = styled.div``;

const SingleTopping = ({ topping, isActive }) => (
  <ToppingStyles>
    <Link to={`/topping/${topping.name}`}>
      <span className="name">{topping.name}</span>
      <span className="count">{topping.count}</span>
    </Link>
  </ToppingStyles>
);

export default SingleTopping;
