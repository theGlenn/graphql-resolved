import { ResolversMap, Resolvers } from './../resolvers.types';
export interface ApplyArgs<R> {
    resolvers: Resolvers;
    to: ResolversMap;
}
export declare const apply: <R>(args: ApplyArgs<R>) => ResolversMap;
