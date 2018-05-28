export const isArray = (resolvers: any) => resolvers instanceof Array
export const isApplyArgs = (args: any) => ('resolvers' in args && 'into' in args)

