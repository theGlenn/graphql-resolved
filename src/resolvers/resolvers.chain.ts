import { Resolvers, ResolverChained } from './resolvers.types';
import { ResolversAssembler } from './resolvers.assembler';

export class ResolversChain {
  constructor(private independantsResolvers: Resolvers) { }

  with<T>(resolversToApply: Resolvers): ResolverChained<T>[] {
    return this.independantsResolvers.map(resolver => [...resolversToApply, resolver].reduce((previousResolver, currentResolver) => {
      return ResolversAssembler.assemble({
        before: previousResolver,
        next: currentResolver
      }) as ResolverChained<T>
    }));
  }
}