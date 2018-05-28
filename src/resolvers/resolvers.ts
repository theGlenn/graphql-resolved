import { isArray, isApplyArgs } from './resolvers.check';

export interface ResolverFunction<Result> {
  (root, args: {}, context: {}, info: {}): Promise<Result> | Result | never
}

// A type that define composed resolvers it has to return a Promise
export interface ResolverChained<FinalResult> extends ResolverFunction<FinalResult | any> {
  (root, args: {}, context: {}, info: {}): Promise<FinalResult | any>
}

export type Resolvers = Array<ResolverFunction<any>>

export interface ResolversLinkArgs<EndResult> {
  before: ResolverFunction<any>
  next: ResolverFunction<EndResult>
};

interface ResolversMap {
  [key:string]: ResolverFunction<any>
}

export class ResolversAssembler {
  static assemble<R>({ before, next }: ResolversLinkArgs<R>): ResolverChained<R> {
    return (root, args: {}, context: {}, info: {}) => new Promise<R>((resolve, reject) => {
      try {
        return Promise.resolve(before(root, args, context, info))
        .then(() => next(root, args, context, info))
        .then(result => resolve(result), error => reject(error));
      } catch (e) {
        return reject(e);
      }
    }) 
  }
}

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

interface ApplyArgs<R> {
  resolvers: Resolvers
  to : ResolversMap
}

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

interface ProtectArgs<R> {
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