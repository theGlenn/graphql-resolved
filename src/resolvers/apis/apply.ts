import { ResolversMap, Resolvers } from './../resolvers.types';
import { isArray, isApplyArgs } from './../resolvers.check';
import { chain } from './chain';

export interface ApplyArgs<R> {
  resolvers: Resolvers
  to : ResolversMap
}

export const apply = <R>(args: ApplyArgs<R>) => {
  const { resolvers: resolversToApply, to: independantResolvers } = args;
  if(isApplyArgs(args)) {
    throw new Error(`Invalid arguments: should be an Array or object of shape
    {
      using: Resolvers
      into : ResolversMap
    }`);
  }

  const chainedResolvers: ResolversMap = {};

  for (let key in independantResolvers) {
    const resolver = independantResolvers[key];
    chainedResolvers[key] = chain([...resolversToApply, resolver])
  }
  return chainedResolvers;
}
