# PA Catholic Daughters State Court Website- A Dynamic CMS-Driven Web Application

## Project Description
This project is a modern, high-performance website built with Next.js, Payload CMS, GraphQL, and the Apollo Client.
This project delivers both statically generated and dynamic content through a customizable and scalable architecture, optimized for flexibility, speed, and content management.

## Project Stack

### Next.JS
This application's frontend is powered by **Next.js**, a React framework that allows for static and dynamic routing, image and font optimizations, incremental static regeneration, and both client and server side rendering.

To create a project in Next.js, run the following command in the terminal:
```
npx create-next-app@latest
```
You will then see the following prompts:
```
What is your project named? my-app
Would you like to use TypeScript? No / Yes
Would you like to use ESLint? No / Yes
Would you like to use Tailwind CSS? No / Yes
Would you like your code inside a `src/` directory? No / Yes
Would you like to use App Router? (recommended) No / Yes
Would you like to use Turbopack for `next dev`?  No / Yes
Would you like to customize the import alias (`@/*` by default)? No / Yes
What import alias would you like configured? @/*
```
After you've answered the required prompts, `create-next-app` will create a application folder with the project name you specified within the directory where you ran the initial command from, then install the required dependencies.
Navigate to the project's directory using `cd <project-name>`, then run `npm run dev` to spin up your new project locally at http://localhost:3000.

For more information on Next.js, you can find all its documentation [here](https://nextjs.org/docs).

### Payload CMS

This project's backend utilizes **Payload CMS**, a configuration-based headless content management system.
Payload is _Next.js native_, built on top of Next.js and itegrated seamlessly within the application's structure.
Payload is fully-typed, exposes a customizable and extensible admin panel, allows for Live Preview, and handles database schema creation and migrations.

To get started with a Payload application, you have (more or less), two choices.
You can choose to use the Payload website template, or start with a blank project.

To use the website template, run the following command in the terminal:
```
npx create-payload-app@latest -t website
```
To create a blank project, run:
```
npx create-payload-app@latest -t blank
```
You will be then be prompted to enter your project's name and select the type of database you would like to use, as Payload requires a database to function.
This project uses a Vercel Postgres database hosted through Neon. If you're following along with this project, select Vercel Postgres.
You will be prompted to enter your Vercel connection string, which will be provided to you after setting up a database in Vercel.

After the required dependencies have been installed, navigate to the project's directory using `cd <project-name>`, then run `npm run dev` to spin up your new project locally at http://localhost:3000.

For more information on Payload, you can find all its documentation [here](https://payloadcms.com/docs/getting-started/what-is-payload).

_**Note on Project Initialization**_: These commands can be run within an existing Next.js project or as a seperate application.
If you choose to run either of these commands in an existing Next.js project, you will need to create a _route group_ for your existing `app` folder.
A route group can be created by wrapping a folder's name in parenthesis, as in `(app)`. This route group will act as the front-end within your Payload project.
For more documentation on route groups, visit [Routing: Route Groups](https://nextjs.org/docs/app/building-your-application/routing/route-groups) in the Next.js documentation.

### GraphQL

**GraphQL** is a strongly typed API query language that allows for tailored queries based on data needs, enhancing application performance.
Payload automatically exposes a GraphQL endpoint (and playground, in development) with no additional set up required.

To learn more about GraphQL, visit [Introduction to GraphQL](https://graphql.org/learn/).

### Apollo Client

To communication with its database, this application uses the **Apollo Client**, a state management libary for Javascript.
More specifically, this project uses the `@apollo/client-integration-nextjs` libary that allows for data fetching during both server and client side rendering.

To use this library in your own project, start by install the necessary packages:
```
npm install @apollo/client@latest @apollo/client-integration-nextjs
```
This project also uses the `cross-fetch` libary, which you can install by running:
```
npm install cross-fetch
```

The `@apollo/client-integration-nextjs` library handles React Server Components (RSC) and Client Components (and SSR streaming) seperately.
I have made slight modifications to the RSC implementation that allow for an optional `token` argument to be passed in during client instantiation.
When using the Apollo Client, this token is required for Payload's Live Preview functionality to function correctly.

For RSC, create an `apolloClient.ts` file:
```
import { HttpLink } from '@apollo/client';
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client-integration-nextjs";
import fetch from 'cross-fetch';

export function getApolloServerClient(token?: string) {
  const { getClient } = registerApolloClient(() => {
    return new ApolloClient({
      cache: new InMemoryCache(),
      link:new HttpLink({
        uri: `${process.env.NEXT_PUBLIC_SERVER_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL}/api/graphql`,
        fetch,
        headers: token ? { Authorization: `JWT ${token}` } : {},
      })
    })
  })

  return getClient();
}
```
You can then instantiate a new instance of the Apollo Client anywhere in your project inside an RSC:
```
import { getApolloServerClient } from "@/graghql/apolloClient";

const client = getApolloServerClient();
```
or,
```
const client = getApolloServerClient(token);
```

For Client Components and SSR streaming, create an `ApolloProvider.tsx` wrapper:
```
"use client";

import { HttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client-integration-nextjs";

function makeClient() {
  const httpLink = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_SERVER_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL}/api/graphql`,
    fetchOptions: {},
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  });
}

export default function ApolloProvider({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
```
You can then use this wrapper either within a `layout.tsx` file or anywhere in your application where you would need to fetch data within a client component, as it provides its children with an instance of the Apollo Client as context.
This wrapper is particularly useful when combined with React's `<Suspense>` component. For example:
```
import { ArchiveBlock as ArchiveBlockProps } from "@/payload-types";
import { Archive } from "./Archive";
import { Suspense } from "react";
import ArchiveLoadingSkeleton from "@/components/archive/ArchiveLoadingSkeleton";
import ApolloProvider from "@/providers/ApolloProvider";

export const ArchiveBlock: React.FC<ArchiveBlockProps> = (props) => {
    return (
        <ApolloProvider>
            <Suspense fallback={<ArchiveLoadingSkeleton />}>
                <Archive {...props}  />
            </Suspense>
        </ApolloProvider>
    )
}
```

### Styling

For the majority of its styling, this project uses **Tailwind CSS**, a utility-first CSS framework.
If you are creating a new project, Next.js provides you with the option to have it install Tailwind and its necessary packages on your behalf during project initialization.
If you would like to implement Tailwind into an existing Next.js project, you can find instructions on how to do so [here](https://tailwindcss.com/docs/installation/framework-guides/nextjs).

### TypeScript
This application is written entirely in **TypeScript**, a strongly typed version of JavaScript.
For more information on TypeScript, you can find all its documentation [here](https://www.typescriptlang.org/docs/).

## Deployment

This project is deployed using **Vercel**. To deploy your own project using Vercel, create a Vercel account [here](https://vercel.com/signup) if you do not already have one set up.
I recommend linking your Github account to your Vercel account during account creation. After account creation, import your project's repository from Github into Vercel.
Add your project's production evironment variables in your project's dashboard, set your build settings (if necessary, Vercel auto-detects Next.js), then deploy your project.

## Continuous Integration (CI)

After deployment, you may find that you would like to add more features to your new Payload project.
This will require seperating your development and production environments and creating a CI pipeline.
If you are using a Vercel Postgres database hosted in Neon, create a seperate branch of your database specifically dedicated for development.
You can do so from your database dashboard in Neon. 
This will create a new database connection string for you child branch, which you should save in a `.env.local` file in the root of your project's directory.

During development, Payload will automatically push changes in your database schema to your Neon database. _This only works in development mode_.
Once you have created and tested new features in development, you will need to migrate these changes to the production database.
First, ensure you have set up your build settings correctly in your `package.json` file:
```
  "scripts": {
    "build": "cross-env NODE_OPTIONS=--no-deprecation next build",
    "ci": "payload migrate && npm run build",
    "dev": "cross-env NODE_OPTIONS=--no-deprecation next dev",
    "devsafe": "rm -rf .next && cross-env NODE_OPTIONS=--no-deprecation next dev",
    "generate:importmap": "cross-env NODE_OPTIONS=--no-deprecation payload generate:importmap",
    "generate:types": "cross-env NODE_OPTIONS=--no-deprecation payload generate:types",
    "lint": "cross-env NODE_OPTIONS=--no-deprecation next lint",
    "payload": "cross-env NODE_OPTIONS=--no-deprecation payload",
    "start": "cross-env NODE_OPTIONS=--no-deprecation next start"
  },
```
You will need to mirror these build settings in your Vercel project.
Specifically, ensure your Vercel project is set to run your `ci` script on build.

Create a `migrations` folder either in your `src` directory or root directory.
You will then need to prompt Payload to create a migration file. In the terminal, run:
```
npm run payload migrate:create
```
This will create a new migration that will run prior to your application being built.
While Payload's migrations are relatively programmatic in nature, it is recommended that you at least check these migration files briefly to ensure they are correct.
I am aware that these migration files can be extremly large, especially during your first migration, but at least give them a cursory glance.

_**Note on Your First Migration:**_ Payload's Vercel Postgres Adapter does not support true schema diffing.
Rather, it checks your previous migrations and creates the SQL necessary to modify your schema according.
In practice, this means your first migration is just the creation of your entire database schema.
This will function properly for over 95% of the migration file, but if you have used ENUM types in your database previously, Payload will attempt to create these types again regardless of if they already exist.
_This will cause an error during migration_.
To fix this, manually remove all ENUM type declarations that already exist in your production database from the beginning of your first migration file.
Thankfully, this only needs done during your first migration.

For more information on Payload migration, visit [Migrations](https://payloadcms.com/docs/database/migrations) in Payload's documentation.