# :shipit: graphql-resolved :shipit:
> Provides a **middleware**-like capability to your GraphQL api by enabling the combination of multiple resolvers through a simple and expressive API. 

Resolvers solved :shipit:

[![NPM][npm-image]][npm-url]

[![Build Status][travis-image]][travis-url]
[![npm version](https://badge.fury.io/js/graphql-resolved.svg)](https://badge.fury.io/js/graphql-resolved)

[npm-url]: https://nodei.co/npm/graphql-resolved/
[npm-image]: https://nodei.co/npm/graphql-resolved.png?downloads=true&downloadRank=true&stars=true

[travis-image]: https://travis-ci.com/theGlenn/graphql-resolvers-chain.svg?branch=master
[travis-url]: https://travis-ci.com/theGlenn/graphql-resolvers-chain

## Installing

#### npm
```bash
npm i graphql-resolved --save
```

#### yarn

```bash
yarn add graphql-resolved
```

## Usage
### Create your first resolver using the `chain`, `protect` or `apply` api

#### `chain`
Return a resolver that is the sum of the ones in the supplied array.
*The execution order follows the order from left to right*.
The last resolver being the one to return the final expect value.
```chain([1, 2, 3, 4])``` 

```ts
import { chain } from 'graphql-resolved';
import { isAuthenticated, isAdmin, isTopContributer } from './auth/resolvers';
import * as UserResolvers from './user/resolvers';

const getMe = chain([isAuthenticated, UserResolvers.getMe])

const Query = {
  getMe
}

const resolvers = {
  Query,
}
```

#### `apply`
Applies a list of `resolvers` to each of those supplied by the `to` object.
- `resolvers` *The execution order follows the order from left to right*.
```ts
const allUserResolvers = apply({ resolvers: [isAuthenticated], to: UserResolvers })
const Query = {
  ...allUserResolvers
}
```

#### `protect`
The protect key work take three arguments:
- `it` (Optional) a resolver function, if supplied `protect` returns a new resolver function
- `all`(Optional) a map of resolvers, if supplied `protect` returns an object with the exact same resolvers names as keys
- `using` a list of resolvers to apply(*The order matters from left to right*).

```ts
const getMe = protect({
  it: UserResolvers.getMe,
  using: [isAuthenticated]
});

const adminResolvers = protect({
  all: { PostResolvers.deletePost, PostResolvers.correctPost },
  using: [isAuthenticated, isAdmin]
});

const Query = {
  getMe
  ...adminResolvers
}
```