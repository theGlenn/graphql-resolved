import { ResolversMap, Resolvers } from './../types';
import { chain } from './chain';

export interface ApplyArgs<R> {
  resolvers: Resolvers
  to : ResolversMap
}

const isApplyArgs = (args: any) => ('resolvers' in args && 'into' in args)

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
