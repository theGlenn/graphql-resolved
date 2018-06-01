import { ResolverFunction, ResolversMap, Resolvers, PureResolverFunction } from './../types';
export interface ProtectArgs<R> {
    it?: ResolverFunction<R>;
    all?: ResolversMap;
    using: Resolvers;
}
export declare const protect: <R>({ it, all, using }: ProtectArgs<R>) => ResolversMap | PureResolverFunction<any>;
