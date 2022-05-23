import { useQuery, useSubscription } from "@apollo/client";
import { Card, Checkbox, CircularProgress, Grid } from "@mui/material";
import React, { ReactElement } from "react";
import {
  GET_ALL_TODO,
  NEW_TO_DO_SUBSCRIPTION,
} from "../../hooks/todos/gqlCalls";

interface Todo {
  id: number | undefined;
  title: string | undefined;
  completed: boolean | undefined;
  createdAt: Date | undefined;
  completedAt: Date | undefined;
}

interface TodoData {
  getTodoItems: Todo[];
}

export const TodoList = (): ReactElement => {
  const { loading, data } = useQuery<TodoData>(GET_ALL_TODO);

  useSubscription<Todo>(NEW_TO_DO_SUBSCRIPTION, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      const todos = client.cache.readQuery<TodoData>({
        query: GET_ALL_TODO,
      });

      const newTodo: Todo = {
        id: subscriptionData.data?.id,
        title: subscriptionData.data?.title,
        createdAt: subscriptionData.data?.createdAt,
        completedAt: subscriptionData.data?.completedAt,
        completed: subscriptionData.data?.completed,
      };

      const newTodoItems = todos?.getTodoItems.map((item) => item);

      newTodoItems?.push(newTodo);

      client.cache.writeQuery({
        query: GET_ALL_TODO,
        data: {
          getTodoItems: newTodo,
        },
      });
    },
  });

  return (
    <div>
      {loading ? (
        <CircularProgress style={{ display: "flex", margin: "auto" }} />
      ) : (
        <Grid container>
          {data &&
            data.getTodoItems.map((item) => (
              <Grid item xs={12} key={item.id}>
                <Card sx={{ display: "flex", margin: "16px" }} elevation={1}>
                  <Grid
                    container
                    spacing={2}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Grid item md={1} xs={3}>
                      <Checkbox />
                    </Grid>
                    <Grid item md={9} xs={4}>
                      <p>{item.title}</p>
                    </Grid>
                    <Grid item md={2} xs={5}>
                      {item.createdAt && (
                        <p>{`Created on ${new Date(
                          item.createdAt
                        ).toLocaleDateString()}`}</p>
                      )}
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))}
        </Grid>
      )}
    </div>
  );
};