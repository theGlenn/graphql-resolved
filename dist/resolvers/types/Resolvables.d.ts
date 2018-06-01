import { ResolverFunction, PureResolverFunction } from './Resolvers';
export interface Resolvable<R = any> {
    evaluate(root: any, args: {}, context: {}, info: any): Promise<R>;
}
export declare function isResolvable(object: any): object is Resolvable;
export declare type ResolvableSequenceArgs = Array<Resolvable | ResolverFunction>;
export declare class ResolvableSequence<R = any> {
    resolvables: Resolvable<R>[];
    constructor(resolvers: ResolvableSequenceArgs);
    resolved(): PureResolverFunction<R>;
}
export declare class SimpleResolvable<R = any> implements Resolvable<R> {
    private resolver;
    constructor(resolver: ResolverFunction<R>);
    evaluate(root: any, args: {}, context: {}, info: any): Promise<R>;
}
