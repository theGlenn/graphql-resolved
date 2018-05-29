import { ResolverFunction, ResolverChained } from './resolvers.types';

export interface ResolversLinkArgs<EndResult> {
  before: ResolverFunction<any>
  next: ResolverFunction<EndResult>
};

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
