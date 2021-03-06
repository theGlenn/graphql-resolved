import { GraphQLResolveInfo } from 'graphql'
import { ResolverFunction, PureResolverFunction } from './Resolvers'

export interface Resolvable<R = any> {
  evaluate(root, args: {}, context: {}, info): Promise<R>
}

export function isResolvable(object: any): object is Resolvable {
  return 'evaluate' in object;
}

export type ResolvableSequenceArgs = Array<Resolvable | ResolverFunction>

export class ResolvableSequence<R = any> {
  resolvables: Resolvable<R>[]

  constructor(resolvers: ResolvableSequenceArgs) {
    this.resolvables = resolvers.map((resolver) => {
      if(isResolvable(resolver)){
        return resolver;
      } else {
        return new SimpleResolvable(resolver)
      }
    })
  }

  resolved(): PureResolverFunction<R> {
    return (root, args: {}, context: {}, info) => {
      const firstToResolve = this.resolvables.shift();
      return this.resolvables.reduce((previousResolver, currentResolvable) => {
        return previousResolver.then(() => currentResolvable.evaluate(root, args, context, info))
      }, firstToResolve.evaluate(root, args, context, info));
    }
  }
}

export class SimpleResolvable<R = any> implements Resolvable<R> {
  constructor(private resolver: ResolverFunction<R>) { }

  evaluate(root, args: {}, context: {}, info) {
    return new Promise<R>((resolve, reject) => {
      try {
        return Promise.resolve(this.resolver(root, args, context, info))
        .then(result => resolve(result), error => reject(error));
      } catch (e) {
        return reject(e);
      }
    })
  }
}