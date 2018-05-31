import { ResolverFunction, ChainedFunction } from './../resolvers.types';
export declare const chain: <R>(resolvers: ResolverFunction<any>[]) => ChainedFunction<any> | ChainedFunction<R>;
