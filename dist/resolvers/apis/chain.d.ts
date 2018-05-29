import { ResolverFunction, ResolverChained } from './../resolvers.types';
export declare const chain: <R>(resolvers: ResolverFunction<any>[]) => ResolverChained<any> | ResolverChained<R>;
