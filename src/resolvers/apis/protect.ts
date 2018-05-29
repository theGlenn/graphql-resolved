import { ResolverChained, ResolverFunction, ResolversMap, Resolvers } from './../resolvers.types';
import { chain, apply } from './';

export interface ProtectArgs<R> {
  it?: ResolverFunction<R>
  all?: ResolversMap
  using: Resolvers
}

export const protect = <R>({ it, all, using }: ProtectArgs<R>) => {
  if(it) {
    return chain([...using, it])
  } else if(all) {
    return apply({ resolvers: using, to: all })
  }
  
  throw new Error(`Invalid arguments: should be an object of shape
  {
    it?: ResolverFunction<R>
    all?: ResolversMap
    using: Resolvers
  }`);
}