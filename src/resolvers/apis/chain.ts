import { ResolvableSequence, ResolverFunction, PureResolverFunction, Resolvers } from './../types';
import { isArray } from './../resolvers.check';

export const chain = <R = any> (resolvers: Resolvers): PureResolverFunction<R> => {
  if(isArray(resolvers)){
    return new ResolvableSequence(resolvers).resolved();
  }

  throw new Error(`Invalid arguments: should be an Array or object of shape
  {
    using: Resolvers
    into : ResolversMap
  }`);
}