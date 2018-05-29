import { ResolverFunction, ResolverChained, Resolvers } from './../resolvers.types';
import { ResolversChain} from './../resolvers.chain';
import { isArray, isApplyArgs } from './../resolvers.check';

export const chain = <R> (resolvers: Resolvers): ResolverChained<R> | ResolverChained<any> => {
  if(isArray(resolvers)){
    const lastToResolve = resolvers.pop()
    return new ResolversChain([lastToResolve]).with<R>(resolvers)[0];
  }

  throw new Error(`Invalid arguments: should be an Array or object of shape
  {
    using: Resolvers
    into : ResolversMap
  }`);
}
