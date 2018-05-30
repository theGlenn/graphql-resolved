import { ResolverFunction, ChainedFunction, Resolvers } from './../resolvers.types';
import { isArray, isApplyArgs } from './../resolvers.check';
import Chainable from './../Chainable';

export const chain = <R> (resolvers: Resolvers): ChainedFunction<R> | ChainedFunction<any> => {
  if(isArray(resolvers)){
    const lastToResolve = resolvers.pop()
    return new Chainable(lastToResolve).after<R>(resolvers);
  }

  throw new Error(`Invalid arguments: should be an Array or object of shape
  {
    using: Resolvers
    into : ResolversMap
  }`);
}
