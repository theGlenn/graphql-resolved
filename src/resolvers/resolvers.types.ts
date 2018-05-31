export interface ResolverFunction<Result> {
  (root, args: {}, context: {}, info: {}): Promise<Result> | Result | never
}

// A type that define composed resolvers it has to return a Promise
export interface ChainedFunction<FinalResult> extends ResolverFunction<FinalResult | any> {
  (root, args: {}, context: {}, info: {}): Promise<FinalResult | any>
}

export type Resolvers = Array<ResolverFunction<any>>

export interface ResolversMap {
  [key:string]: ResolverFunction<any>
}