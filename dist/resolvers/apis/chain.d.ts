import { ResolverFunction, PureResolverFunction } from './../types';
export declare const chain: <R = any>(resolvers: ResolverFunction<any>[]) => PureResolverFunction<R>;
