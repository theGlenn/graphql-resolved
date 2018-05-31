export interface ResolverFunction<Result> {
    (root: any, args: {}, context: {}, info: {}): Promise<Result> | Result | never;
}
export interface ChainedFunction<FinalResult> extends ResolverFunction<FinalResult | any> {
    (root: any, args: {}, context: {}, info: {}): Promise<FinalResult | any>;
}
export declare type Resolvers = Array<ResolverFunction<any>>;
export interface ResolversMap {
    [key: string]: ResolverFunction<any>;
}
