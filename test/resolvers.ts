import db from './db'
import { chain, ChainedFunction, Resolvers, protect } from './../src';

const extremelySafeToken = 'Emi';

export interface User {
  id: number
  name: string
}

export interface Context {
  token?: string
  user?: User
}

export const getMe = (root, args: {}, context: Context, info: {}) => {
  return db.getById(1234);
}

export const getInfo = (root, args: {}, context: Context, info: {}) => {
  return 'Test api info'
}

export const isAuthenticated = async (root, args: {}, context: Context, info: {}) => {
  const { token } = context;
  if(!token || token !== extremelySafeToken) {
    throw Error('Not authenticated');
  }

  context.user = await db.getById(1234);
}

export const isAdmin = (root, args: {}, context: Context, info: {}) => {
  throw Error('Not allowed');
}

const executeWithToken = (resolver: ChainedFunction) => execute(resolver, extremelySafeToken)
const execute = (resolver: ChainedFunction, token?: string) => resolver({}, {}, {token}, {})

export const executor = {
  runWithToken: executeWithToken,
  run: execute
}