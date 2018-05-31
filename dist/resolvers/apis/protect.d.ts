import { ResolverFunction, ResolversMap, Resolvers, ChainedFunction } from './../resolvers.types';
export interface ProtectArgs<R> {
    it?: ResolverFunction<R>;
    all?: ResolversMap;
    using: Resolvers;
}
export declare const protect: <R>({it, all, using}: ProtectArgs<R>) => ResolversMap | ChainedFunction<any>;
