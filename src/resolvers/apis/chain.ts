import { ResolvableSequence, ResolverFunction, ChainedFunction, Resolvers } from './../resolvers.types';
import { isArray, isApplyArgs } from './../resolvers.check';

export const chain = <R> (resolvers: Resolvers): ChainedFunction<R> | ChainedFunction<any> => {
  if(isArray(resolvers)){
    //const lastToResolve = resolvers.pop()
    return new ResolvableSequence(resolvers).resolved();
  }

  throw new Error(`Invalid arguments: should be an Array or object of shape
  {
    using: Resolvers
    into : ResolversMap
  }`);
}
