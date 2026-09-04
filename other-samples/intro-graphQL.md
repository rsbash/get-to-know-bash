---
layout: default
title: Introduction to GraphQL
---

# Introduction to GraphQL

GraphQL is a query language for your API, and a server-side runtime for executing queries using a `type` system you define for your data. The [GraphQL specification](https://spec.graphql.org/) was open-sourced in 2015 and has since been implemented in [a variety of programming languages](https://graphql.org/community/tools-and-libraries/?tags=server). 

If you’re already familiar with GraphQL, learn how [client applications can query existing GraphQL APIs](https://graphql.org/community/tools-and-libraries/?tags=client).

## Describe your API with a type system

A GraphQL service is created by [defining types and their fields](https://graphql.org/learn/schema/), and then writing a function for each field to [provide the required data](https://graphql.org/learn/execution/). 

For example, a GraphQL service that tells you the name of a logged-in user might look like this:

```graphql   
type Query {  
  me: User  
}  
   
type User {  
  name: String  
}  
```

Along with functions for each field on each type:

```graphql  
// Resolver for the `me` field on the `Query` type
function resolveQueryMe(_parent, _args, context, _info) {  
  return context.request.auth.user;  
}  
   
// Resolver for the `name` field on the `User` type  
function resolveUserName(user, _args, context, _info) { 
  return context.db.getUserFullName(user.id);  
}  
```

In the example above, the function data maps as follows:

| Type | Query | Notes |
| :---: | :---: | :---: |
| `Query` | `me` | The authenticated user. |
| `User` | `name` | The user’s name, populated after using the user’s ID to fetch their full name details from the database.  |

## Query exactly what you need

When a GraphQL service (like a web URL) runs, it can receive [GraphQL queries](https://graphql.org/learn/queries/) to validate and execute from clients. The service:

1. Checks the query to ensure it only refers to defined types and fields used by the API.   
2. Runs the provided functions.  
3. Produces a result.

For example, this query:

```graphql
{  
  me {  
    name  
  }  
}
```

Could produce the following JSON result:

```graphql
{  
  "data": {  
    "me": {  
      "name": "Luke Skywalker"  
    }  
  }  
}
```

With GraphQL, clients make queries to the API that mirror the structure of the data they need. The response is returned in the defined shape with a single request, and without concern for the underlying data sources that provided it.

## Evolve your API without versioning

GraphQL can evolve in response to client requirements that change over time. In this example,  the `User` type calls for more specific name values, updating the end user as follows:

```graphql
type User {  
  fullName: String  
  nickname: String  
  name: String @deprecated(reason: "Use `fullName`.")  
}
```

Client tooling encourages developers to use these new fields and deprecate old and unused fields, with no interruptions to data retrieval. 

## Try it out!

The best way to learn GraphQL is to start writing queries. 

This guide’s query editors are **interactive**, so try adding `id` and `appearsIn` fields to the `hero` object to see an updated result:

| Operation | Response |
| :---- | :---- |
| `{ hero { name # add additional fields here! } }` | `{ "data": { "hero": { "name": "R2-D2" } } }` |

**Note:** The examples in this guide are based on [a modified version of the SWAPI GraphQL schema](https://github.com/graphql/graphql.github.io/blob/source/src/components/interactive-code-block/swapi-schema.tsx). Because these queries are designed for illustrative purposes, they will not run on the full version of the SWAPI GraphQL API due to differences between the two schemas. [You can try the full version of the API here.](https://graphql.org/swapi-graphql/)

## Next steps

Now that you know some key GraphQL concepts:

* Learn about the different aspects of its [type system](https://graphql.org/learn/schema/).  
* Deep dive with [these available training courses](https://graphql.org/community/resources/training-courses/).