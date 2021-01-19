import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import styled from 'styled-components';

import SingleTopping from './SingleTopping';

const ToppingListStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    align-items: center;
    padding: 5px;
    background: var(--grey);
    border-radius: 2px;
    .count {
      background: white;
      padding: 2px 5px;
    }
    &[aria-current='page'] {
      background: var(--yellow);
    }
  }
`;

function countPizzasInToppings(pizzas) {
  // return the pizzas with count

  const counts = pizzas
    .map((pizza) => pizza.toppings)
    .flat()
    .reduce((acc, topping) => {
      // check if this is an existing topping
      const existingTopping = acc[topping.id];
      if (existingTopping) {
        // if it is increment by 1
        existingTopping.count += 1;
      } else {
        // otherwise create new entry in our acc and set it to one
        acc[topping.id] = {
          id: topping.id,
          name: topping.name,
          count: 1,
        };
      }

      return acc;
    }, {});

  // sort based on counts
  const sortedToppings = Object.values(counts).sort(
    (a, b) => b.count - a.count
  );

  return sortedToppings;
}

const ToppingsFilter = ({ activeTopping }) => {
  // Get a list of all toppings
  // Get a list of all pizzas with their toppings
  const { toppings, pizzas } = useStaticQuery(graphql`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
          vegetarian
        }
      }
      pizzas: allSanityPizza {
        nodes {
          toppings {
            name
            id
          }
        }
      }
    }
  `);

  const toppingsWithCount = countPizzasInToppings(pizzas.nodes);

  // Count how many pizzas are in each topping
  // Loop over the list of toppings and display the topping and the count of pazzas in that
  return (
    <ToppingListStyles>
      <Link to="/pizzas">
        <span className="name">All</span>
        <span className="count">{pizzas.nodes.length}</span>
      </Link>
      {toppingsWithCount.map((topping) => (
        <SingleTopping
          key={topping.id}
          topping={topping}
          // isActive={topping.name === activeTopping}
        />
      ))}
    </ToppingListStyles>
  );
};

export default ToppingsFilter;

//   {toppings.map((topping) => (
//     <SingleTopping id={topping.id} topping={topping} />
//   ))}
