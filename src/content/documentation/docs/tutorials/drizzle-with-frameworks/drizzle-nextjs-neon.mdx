---
title: "Todo App with Neon Postgres"
date: "2024-01-17"
svgs: ['<svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="9.63139" height="40.8516" rx="4.8157" transform="matrix(0.873028 0.48767 -0.497212 0.867629 43.4805 67.3037)" fill="currentColor"></rect><rect width="9.63139" height="40.8516" rx="4.8157" transform="matrix(0.873028 0.48767 -0.497212 0.867629 76.9395 46.5342)" fill="currentColor"></rect><rect width="9.63139" height="40.8516" rx="4.8157" transform="matrix(0.873028 0.48767 -0.497212 0.867629 128.424 46.5352)" fill="currentColor"></rect><rect width="9.63139" height="40.8516" rx="4.8157" transform="matrix(0.873028 0.48767 -0.497212 0.867629 94.957 67.3037)" fill="currentColor"></rect></svg>', '<svg width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_84_2)"><path d="M128 256C198.692 256 256 198.692 256 128C256 57.3075 198.692 0 128 0C57.3075 0 0 57.3075 0 128C0 198.692 57.3075 256 128 256Z" fill="black"/><path d="M212.63 224.03L98.34 76.8H76.8V179.16H94.03V98.68L199.11 234.45C203.85 231.27 208.37 227.79 212.63 224.03Z" fill="url(#paint0_linear_84_2)"/><path d="M180.63 76.8H163.56V179.2H180.63V76.8Z" fill="url(#paint1_linear_84_2)"/></g><defs><linearGradient id="paint0_linear_84_2" x1="132.707" y1="181.561" x2="178.076" y2="237.79" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="1" stop-color="white" stop-opacity="0"/></linearGradient><linearGradient id="paint1_linear_84_2" x1="172.083" y1="76.7712" x2="171.776" y2="151.973" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="1" stop-color="white" stop-opacity="0"/></linearGradient><clipPath id="clip0_84_2"><rect width="256" height="256" fill="white"/></clipPath></defs></svg>', '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 6.27586C2 4.46665 3.54385 3 5.44828 3H18.5517C20.4562 3 22 4.46665 22 6.27586V16.8631C22 18.7349 19.5068 19.5471 18.2976 18.0694L14.5173 13.4496V19.0517C14.5173 20.68 13.1278 22 11.4138 22H5.44828C3.54385 22 2 20.5333 2 18.7241V6.27586ZM5.44828 5.62069C5.06739 5.62069 4.75863 5.91402 4.75863 6.27586V18.7241C4.75863 19.086 5.06739 19.3793 5.44828 19.3793H11.5172C11.7077 19.3793 11.7586 19.2327 11.7586 19.0517V11.5393C11.7586 9.66758 14.2518 8.8552 15.461 10.333L19.2414 14.9528V6.27586C19.2414 5.91402 19.2774 5.62069 18.8966 5.62069H5.44828Z" fill="currentColor"/></svg>']
---

import Steps from "@mdx/Steps.astro";
import Npm from "@mdx/Npm.astro";
import CodeTabs from "@mdx/CodeTabs.astro";
import CodeTab from "@mdx/CodeTab.astro";
import Section from "@mdx/Section.astro";
import Tabs from "@mdx/Tabs.astro";
import Tab from "@mdx/Tab.astro";
import Prerequisites from "@mdx/Prerequisites.astro";
import Callout from "@mdx/Callout.astro";

This tutorial demonstrates how to build `Todo app` using **Drizzle ORM** with **Neon database** and **Next.js**.

<Prerequisites>  
  - You should have an existing Next.js project or create a new one using the following command:
  ```bash
  npx create-next-app@latest --typescript
  ```

  - You should have installed Drizzle ORM and [Drizzle kit](/docs/kit-overview). You can do this by running the following command:
  <Npm>
    drizzle-orm 
    -D drizzle-kit
  </Npm>

  - You should have installed the [Neon serverless driver](https://neon.tech/docs/serverless/serverless-driver). 
  <Npm>
    @neondatabase/serverless
  </Npm>

  - You should have installed the `dotenv` package for managing environment variables. 
  <Npm>
    dotenv
  </Npm>  
</Prerequisites>

<Callout type="warning">
In case you face the issue with resolving dependencies during installation:

If you're not using React Native, forcing the installation with `--force` or `--legacy-peer-deps` should resolve the issue. If you are using React Native, then you need to use the exact version of React which is compatible with your React Native version.
</Callout>

## Setup Neon and Drizzle ORM

<Steps>
#### Create a new Neon project

Log in to the [Neon Console](https://console.neon.tech/app/projects) and navigate to the Projects section. Select a project or click the `New Project` button to create a new one. 

Your Neon projects come with a ready-to-use Postgres database named `neondb`. We'll use it in this tutorial.

#### Setup connection string variable

Navigate to the **Connection Details** section in the project console to find your database connection string. It should look similar to this:

```bash
postgres://username:password@ep-cool-darkness-123456.us-east-2.aws.neon.tech/neondb
```

Add the `DATABASE_URL` environment variable to your `.env` or `.env.local` file, which you'll use to connect to the Neon database.

```bash
DATABASE_URL=NEON_DATABASE_CONNECTION_STRING
```

#### Connect Drizzle ORM to your database 

Create a `drizzle.ts` file in your `src/db` folder and set up your database configuration:

```tsx copy filename="src/db/drizzle.ts"
import { config } from "dotenv";
import { drizzle } from 'drizzle-orm/neon-http';

config({ path: ".env" }); // or .env.local

export const db = drizzle(process.env.DATABASE_URL!);
```

#### Declare todo schema

```tsx copy filename="src/db/schema.ts"
import { integer, text, boolean, pgTable } from "drizzle-orm/pg-core";

export const todo = pgTable("todo", {
  id: integer("id").primaryKey(),
  text: text("text").notNull(),
  done: boolean("done").default(false).notNull(),
});
```

Here we define the **`todo`** table with fields **`id`**, **`text`**, and **`done`**, using data types from Drizzle ORM.

#### Setup Drizzle config file

**Drizzle config** - a configuration file that is used by [Drizzle Kit](/docs/kit-overview) and contains all the information about your database connection, migration folder and schema files.

Create a `drizzle.config.ts` file in the root of your project and add the following content:

```typescript copy filename="drizzle.config.ts"
import { config } from 'dotenv';
import { defineConfig } from "drizzle-kit";

config({ path: '.env' });

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

#### Applying changes to the database

You can generate migrations using `drizzle-kit generate` command and then run them using the `drizzle-kit migrate` command.

Generate migrations:

```bash
npx drizzle-kit generate
```

These migrations are stored in the `drizzle/migrations`  directory, as specified in your `drizzle.config.ts`. This directory will contain the SQL files necessary to update your database schema and a `meta` folder for storing snapshots of the schema at different migration stages.

Example of a generated migration:

```sql
CREATE TABLE IF NOT EXISTS "todo" (
	"id" integer PRIMARY KEY NOT NULL,
	"text" text NOT NULL,
	"done" boolean DEFAULT false NOT NULL
);
```

Run migrations:

```bash
npx drizzle-kit migrate
```

Alternatively, you can push changes directly to the database using [Drizzle kit push command](/docs/kit-overview#prototyping-with-db-push):

```bash
npx drizzle-kit push
```

<Callout type="warning">Push command is good for situations where you need to quickly test new schema designs or changes in a local development environment, allowing for fast iterations without the overhead of managing migration files.</Callout>
</Steps>

#### Establish server-side functions
In this step, we establish server-side functions in the **src/actions/todoAction.ts** file to handle crucial operations on todo items:

1. **`getData`:**
    - Fetches all existing todo items from the database.
2. **`addTodo`:**
    - Adds a new todo item to the database with the provided text.
    - Initiates revalidation of the home page using **`revalidatePath("/")`**.
3. **`deleteTodo`:**
    - Removes a todo item from the database based on its unique ID.
    - Triggers a revalidation of the home page.
4. **`toggleTodo`:**
    - Toggles the completion status of a todo item, updating the database accordingly.
    - Revalidates the home page after the operation.
5. **`editTodo`:**
    - Modifies the text of a todo item identified by its ID in the database.
    - Initiates a revalidation of the home page.

```tsx collapsable copy filename="src/actions/todoAction.ts"
"use server";
import { eq, not } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { todo } from "@/db/schema";

export const getData = async () => {
  const data = await db.select().from(todo);
  return data;
};

export const addTodo = async (id: number, text: string) => {
  await db.insert(todo).values({
    id: id,
    text: text,
  });
};

export const deleteTodo = async (id: number) => {
  await db.delete(todo).where(eq(todo.id, id));

  revalidatePath("/");
};

export const toggleTodo = async (id: number) => {
  await db
    .update(todo)
    .set({
      done: not(todo.done),
    })
    .where(eq(todo.id, id));

  revalidatePath("/");
};

export const editTodo = async (id: number, text: string) => {
  await db
    .update(todo)
    .set({
      text: text,
    })
    .where(eq(todo.id, id));

  revalidatePath("/");
};
```

## Setup home page with Next.js

<Steps>
#### Define a TypeScript type

Define a TypeScript type for a todo item in `src/types/todoType.ts` with three properties: **`id`** of type **`number`**, **`text`** of type **`string`**, and **`done`** of type **`boolean`**. This type, named **`todoType`**, represents the structure of a typical todo item within your application.

```ts copy filename="src/types/todoType.ts"
export type todoType = {
  id: number;
  text: string;
  done: boolean;
};
```

#### Create a home page for a to-do application

1. **`src/components/todo.tsx`:**
    Create a `Todo` component that represents a single todo item. It includes features for displaying and editing the todo text, marking it as done with a checkbox, and providing actions for editing, saving, canceling, and deleting the todo.
2. **`src/components/addTodo.tsx`:**
    The `AddTodo` component provides a simple form for adding new todo items to the Todo app. It includes an input field for entering the todo text and a button for triggering the addition of the new todo.
3. **`src/components/todos.tsx`:**
    Create Todos components that represents the main interface of a Todo app. It manages the state of todo items, provides functions for creating, editing, toggling, and deleting todos, and renders the individual todo items using the `Todo` component.

<CodeTabs items={["todo.tsx", "addTodo.tsx", "todos.tsx"]}>
```tsx collapsable copy
"use client";
import { ChangeEvent, FC, useState } from "react";
import { todoType } from "@/types/todoType";

interface Props {
  todo: todoType;
  changeTodoText: (id: number, text: string) => void;
  toggleIsTodoDone: (id: number, done: boolean) => void;
  deleteTodoItem: (id: number) => void;
}

const Todo: FC<Props> = ({
  todo,
  changeTodoText,
  toggleIsTodoDone,
  deleteTodoItem,
}) => {
  // State for handling editing mode
  const [editing, setEditing] = useState(false);

  // State for handling text input
  const [text, setText] = useState(todo.text);

  // State for handling "done" status
  const [isDone, setIsDone] = useState(todo.done);

  // Event handler for text input change
  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  // Event handler for toggling "done" status
  const handleIsDone = async () => {
    toggleIsTodoDone(todo.id, !isDone);
    setIsDone((prev) => !prev);
  };

  // Event handler for initiating the edit mode
  const handleEdit = () => {
    setEditing(true);
  };

  // Event handler for saving the edited text
  const handleSave = async () => {
    changeTodoText(todo.id, text);
    setEditing(false);
  };

  // Event handler for canceling the edit mode
  const handleCancel = () => {
    setEditing(false);
    setText(todo.text);
  };

  // Event handler for deleting a todo item
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this todo?")) {
      deleteTodoItem(todo.id);
    }
  };

  // Rendering the Todo component
  return (
    <div className="flex items-center gap-2 p-4 border-gray-200 border-solid border rounded-lg">
      {/* Checkbox for marking the todo as done */}
      <input
        type="checkbox"
        className="text-blue-200 rounded-sm h-4 w-4"
        checked={isDone}
        onChange={handleIsDone}
      />
      {/* Input field for todo text */}
      <input
        type="text"
        value={text}
        onChange={handleTextChange}
        readOnly={!editing}
        className={`${
          todo.done ? "line-through" : ""
        } outline-none read-only:border-transparent focus:border border-gray-200 rounded px-2 py-1 w-full`}
      />
      {/* Action buttons for editing, saving, canceling, and deleting */}
      <div className="flex gap-1 ml-auto">
        {editing ? (
          <button
            onClick={handleSave}
            className="bg-green-600 text-green-50 rounded px-2 w-14 py-1"
          >
            Save
          </button>
        ) : (
          <button
            onClick={handleEdit}
            className="bg-blue-400 text-blue-50 rounded w-14 px-2 py-1"
          >
            Edit
          </button>
        )}
        {editing ? (
          <button
            onClick={handleCancel}
            className="bg-red-400 w-16 text-red-50 rounded px-2 py-1"
          >
            Close
          </button>
        ) : (
          <button
            onClick={handleDelete}
            className="bg-red-400 w-16 text-red-50 rounded px-2 py-1"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Todo;
```
```tsx collapsable copy
"use client";
import { ChangeEvent, FC, useState } from "react";

interface Props {
  createTodo: (value: string) => void;
}

const AddTodo: FC<Props> = ({ createTodo }) => {
  // State for handling input value
  const [input, setInput] = useState("");

  // Event handler for input change
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // Event handler for adding a new todo
  const handleAdd = async () => {
    createTodo(input);
    setInput("");
  };

  // Rendering the AddTodo component
  return (
    <div className="w-full flex gap-1 mt-2">
      {/* Input field for entering new todo text */}
      <input
        type="text"
        className="w-full px-2 py-1 border border-gray-200 rounded outline-none"
        onChange={handleInput}
        value={input}
      />
      {/* Button for adding a new todo */}
      <button
        className="flex items-center justify-center bg-green-600 text-green-50 rounded px-2 h-9 w-14 py-1"
        onClick={handleAdd}
      >
        Add
      </button>
    </div>
  );
};

export default AddTodo;
```

	<CodeTab>
```tsx collapsable copy
"use client";
import { FC, useState } from "react";
import { todoType } from "@/types/todoType";
import Todo from "./todo";
import AddTodo from "./addTodo";
import { addTodo, deleteTodo, editTodo, toggleTodo } from "@/actions/todoAction";

interface Props {
  todos: todoType[];
}

const Todos: FC<Props> = ({ todos }) => {
  // State to manage the list of todo items
  const [todoItems, setTodoItems] = useState<todoType[]>(todos);

  // Function to create a new todo item
  const createTodo = (text: string) => {
    const id = (todoItems.at(-1)?.id || 0) + 1;
    addTodo(id, text);
    setTodoItems((prev) => [...prev, { id: id, text, done: false }]);
  };

  // Function to change the text of a todo item
  const changeTodoText = (id: number, text: string) => {
    setTodoItems((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
    editTodo(id, text);
  };

  // Function to toggle the "done" status of a todo item
  const toggleIsTodoDone = (id: number) => {
    setTodoItems((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo))
    );
    toggleTodo(id);
  };

  // Function to delete a todo item
  const deleteTodoItem = (id: number) => {
    setTodoItems((prev) => prev.filter((todo) => todo.id !== id));
    deleteTodo(id);
  };

  // Rendering the Todo List component
  return (
    <main className="flex mx-auto max-w-xl w-full min-h-screen flex-col items-center p-16">
      <div className="text-5xl font-medium">To-do app</div>
      <div className="w-full flex flex-col mt-8 gap-2">
        {/* Mapping through todoItems and rendering Todo component for each */}
        {todoItems.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            changeTodoText={changeTodoText}
            toggleIsTodoDone={toggleIsTodoDone}
            deleteTodoItem={deleteTodoItem}
          />
        ))}
      </div>
      {/* Adding Todo component for creating new todos */}
      <AddTodo createTodo={createTodo} />
    </main>
  );
};

export default Todos;
```

    </CodeTab>
</CodeTabs>

Update the `page.tsx` file in the `src/app` folder to fetch the todo items from the database and render the `Todos` component:

```tsx copy filename="src/app/page.tsx"
import { getData } from "@/actions/todoAction";
import Todos from "@/components/todos";

export default async function Home() {
  const data = await getData();
  return <Todos todos={data} />;
}
```
</Steps>

## Basic file structure

This guide uses the following file structure:

```text
📦 <project root>
 ├ 📂 migrations
 │  ├ 📂 meta
 │  └ 📜 0000_heavy_doctor_doom.sql
 ├ 📂 public
 ├ 📂 src
 │  ├ 📂 actions
 │  │  └ 📜 todoActions.ts
 │  ├ 📂 app
 │  │  ├ 📜 favicon.ico
 │  │  ├ 📜 globals.css
 │  │  ├ 📜 layout.tsx
 │  │  └ 📜 page.tsx
 │  ├ 📂 components
 │  │  ├ 📜 addTodo.tsx
 │  │  ├ 📜 todo.tsx
 │  │  └ 📜 todos.tsx
 │  └ 📂 db
 │  │  ├ 📜 drizzle.ts
 │  │  └ 📜 schema.ts
 │  └ 📂 types
 │     └ 📜 todoType.ts
 ├ 📜 .env
 ├ 📜 .eslintrc.json
 ├ 📜 .gitignore
 ├ 📜 drizzle.config.ts
 ├ 📜 next-env.d.ts
 ├ 📜 next.config.mjs
 ├ 📜 package-lock.json
 ├ 📜 package.json
 ├ 📜 postcss.config.mjs
 ├ 📜 README.md
 ├ 📜 tailwind.config.ts
 └ 📜 tsconfig.json
```
