import { GraphQLResolveInfo } from 'graphql'

export interface ResolverFunction<Result = any> {
  (root, args: {}, context: {}, info: GraphQLResolveInfo): Promise<Result> | Result | never
}

export interface PureResolverFunction<FinalResult = any> extends ResolverFunction<FinalResult> {
  (root, args: {}, context: {}, info: GraphQLResolveInfo | any): Promise<FinalResult>
}

export type Resolvers = Array<ResolverFunction>

export interface ResolversMap {
  [key:string]: ResolverFunction
}