import { ResolverFunction, Resolvers, ChainedFunction } from './resolvers.types';

export interface ChainableArgs<EndResult> {
  before: ResolverFunction<any>
  next: ResolverFunction<EndResult>
};

export default class Chainable<ChainResult> {
  
  constructor(private resolver: ResolverFunction<ChainResult>) { }

  after<T>(resolversToApply: Resolvers): ChainedFunction<T> {
    const resolvers = [...resolversToApply, this.resolver];
    return resolvers.reduce((previousResolver, currentResolver) => {
      return Chainable.assemble({
        before: previousResolver,
        next: currentResolver
      })
    });
  }

  static assemble<R>({ before, next }: ChainableArgs<R>): ChainedFunction<R> {
    return (root, args: {}, context: {}, info: {}) => new Promise<R>((resolve, reject) => {
      try {
        return Promise.resolve(before(root, args, context, info))
        .then(() => next(root, args, context, info))
        .then(result => resolve(result), error => reject(error));
      } catch (e) {
        return reject(e);
      }
    });
  }
}