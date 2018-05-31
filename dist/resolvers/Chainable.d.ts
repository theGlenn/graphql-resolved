import { ResolverFunction, Resolvers, ChainedFunction } from './resolvers.types';
export interface ChainableArgs<EndResult> {
    before: ResolverFunction<any>;
    next: ResolverFunction<EndResult>;
}
export default class Chainable<ChainResult> {
    private resolver;
    constructor(resolver: ResolverFunction<ChainResult>);
    after<T>(resolversToApply: Resolvers): ChainedFunction<T>;
    static assemble<R>({before, next}: ChainableArgs<R>): ChainedFunction<R>;
}
