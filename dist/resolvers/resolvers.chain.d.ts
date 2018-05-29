import { Resolvers, ResolverChained } from './resolvers.types';
export declare class ResolversChain {
    private independantsResolvers;
    constructor(independantsResolvers: Resolvers);
    with<T>(resolversToApply: Resolvers): ResolverChained<T>[];
}
