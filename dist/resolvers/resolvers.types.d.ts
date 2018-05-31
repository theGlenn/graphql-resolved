import { GraphQLResolveInfo } from 'graphql';
export interface ResolverFunction<Result> {
    (root: any, args: {}, context: {}, info: GraphQLResolveInfo): Promise<Result> | Result | never;
}
export interface ChainedFunction<FinalResult = any> extends ResolverFunction<FinalResult> {
    (root: any, args: {}, context: {}, info: GraphQLResolveInfo): Promise<FinalResult>;
}
export declare type Resolvers = Array<ResolverFunction<any>>;
export interface ResolversMap {
    [key: string]: ResolverFunction<any>;
}
