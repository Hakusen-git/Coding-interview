import {
  Arg,
  Int,
  Mutation,
  Publisher,
  PubSub,
  Query,
  Resolver,
  Root,
  Subscription,
} from "type-graphql";
import { Todo, TodoInput } from "../schemas/todoSchema";

// Todo resolver
@Resolver(() => Todo)
export class TodoResolver {
  // mock data
  private todoItems: Todo[] = [
    {
      id: 1,
      title: "Grocery shopping",
      completed: false,
      createdAt: new Date(),
      completedAt: undefined,
    },
    {
      id: 2,
      title: "Grocery shopping",
      completed: false,
      createdAt: new Date(),
      completedAt: undefined,
    },
    {
      id: 3,
      title: "Grocery shopping",
      completed: false,
      createdAt: new Date(),
      completedAt: undefined,
    },
  ];

  // Query: Get all todo items
  @Query(() => [Todo])
  async getTodoItems(): Promise<Todo[]> {
    return this.todoItems;
  }

  // Query: get single todo item
  @Query(() => Todo)
  async getTodoItem(
    @Arg("id", () => Int) id: number
  ): Promise<Todo | undefined> {
    const todo = this.todoItems.find((item) => item.id === id);
    return todo;
  }

  // Mutation: create new todo item and add to mock data array
  @Mutation(() => Todo)
  async createTodoItem(
    @Arg("input", () => TodoInput) input: TodoInput,
    @PubSub("NEW_TODO_ADDED") publish: Publisher<Todo>
  ): Promise<Todo> {
    const todoItem = {
      id: this.todoItems.length + 1,
      ...input,
    };
    this.todoItems.push(todoItem);
    await publish(todoItem);
    return todoItem;
  }

  // Mutation delete specific todo item
  @Mutation(() => Boolean)
  deleteTodoItem(@Arg("id", () => Int) id: number): boolean {
    const newList = this.todoItems.filter((item) => item.id !== id);
    if (newList.length === this.todoItems.length) {
      return false;
    } else {
      this.todoItems = [...newList];
      return true;
    }
  }

  // Update specific todo item
  @Mutation(() => Todo)
  async updateTodoItem(
    @Arg("id", () => Int) id: number,
    @Arg("input", () => TodoInput) input: TodoInput,
    @PubSub("TODO_UPDATE") publish: Publisher<Todo>
  ): Promise<Todo> {
    const todo = this.todoItems.find((item) => item.id === id);
    if (!todo) {
      throw new Error("User not found");
    }
    const updatedTodo = {
      ...todo,
      ...input,
    };
    this.todoItems = this.todoItems.map((item) =>
      item.id === id ? updatedTodo : item
    );
    publish(updatedTodo);
    return updatedTodo;
  }

  // Subscription, listen to creation of todo items
  @Subscription(() => Todo, {
    topics: "NEW_TODO_ADDED",
  })
  newTodoAdded(@Root() todo: Todo): Todo {
    return todo;
  }

  // Subscription, listen to creation of todo items
  @Subscription(() => Todo, {
    topics: "TODO_UPDATE",
  })
  newTodoUpdate(@Root() todo: Todo): Todo {
    return todo;
  }
}
