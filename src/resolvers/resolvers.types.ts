import { GraphQLResolveInfo } from 'graphql'

export interface ResolverFunction<Result> {
  (root, args: {}, context: {}, info: GraphQLResolveInfo): Promise<Result> | Result | never
}

// A type that define composed resolvers it has to return a Promise
export interface ChainedFunction<FinalResult = any> extends ResolverFunction<FinalResult> {
  (root, args: {}, context: {}, info: GraphQLResolveInfo): Promise<FinalResult>
}

export type Resolvers = Array<ResolverFunction<any>>

export interface ResolversMap {
  [key:string]: ResolverFunction<any>
}