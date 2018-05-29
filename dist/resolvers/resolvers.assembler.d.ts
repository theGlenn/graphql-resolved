import { ResolverFunction, ResolverChained } from './resolvers.types';
export interface ResolversLinkArgs<EndResult> {
    before: ResolverFunction<any>;
    next: ResolverFunction<EndResult>;
}
export declare class ResolversAssembler {
    static assemble<R>({before, next}: ResolversLinkArgs<R>): ResolverChained<R>;
}
