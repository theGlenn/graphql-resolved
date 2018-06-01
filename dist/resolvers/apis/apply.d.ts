import { ResolversMap, Resolvers } from './../types';
export interface ApplyArgs<R> {
    resolvers: Resolvers;
    to: ResolversMap;
}
export declare const apply: <R>(args: ApplyArgs<R>) => ResolversMap;
