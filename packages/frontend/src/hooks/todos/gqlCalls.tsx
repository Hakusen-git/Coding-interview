import { gql } from "@apollo/client";

export const CREATE_TODO = gql`
  mutation CreateTodoItem($input: TodoInput!) {
    createTodoItem(input: $input) {
      title
    }
  }
`;

export const GET_ALL_TODO = gql`
  query {
    getTodoItems {
      id
      title
      completed
      createdAt
    }
  }
`;

export const NEW_TO_DO_SUBSCRIPTION = gql`
  subscription Subscription {
    newTodoAdded {
      id
      title
      createdAt
      completed
      completedAt
    }
  }
`;
