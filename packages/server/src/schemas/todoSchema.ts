import { Field, ObjectType, InputType, Int } from "type-graphql";
import { GraphQLScalarType, Kind } from "graphql";

export type TodoI = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
  completedAt: Date | undefined;
};

export type TodoInputI = Pick<
  Todo,
  "completed" | "title" | "createdAt" | "completedAt"
>;

// Schema for Todo item
@ObjectType()
export class Todo {
  @Field(() => Int)
  id!: number;

  @Field(() => String)
  title!: string;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Boolean)
  completed!: boolean;

  @Field(() => Date, { nullable: true })
  completedAt: Date | undefined;
}

// Schema for input data of todo item
@InputType()
export class TodoInput implements TodoInputI {
  @Field(() => String)
  title!: string;

  @Field(() => Boolean)
  completed!: boolean;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date, { nullable: true })
  completedAt: Date | undefined;
}
