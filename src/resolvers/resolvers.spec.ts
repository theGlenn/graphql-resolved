import * as mocha from 'mocha';
import { expect } from 'chai';
import { chain, ResolverChained, Resolvers, protect } from './';

interface User {
  id: number
  name: string
}

interface Context {
  token?: string
  user?: User
}

const extremelySafeToken = 'Emi';

const db = {
  all: [{ id: 1234, name: 'Emi' }, { id: 5678, name: 'Ken' }],
  getById: (userId) => Promise.resolve(db.all.find(id => userId))
}

const getMe = (root, args: {}, context: Context, info: {}) => {
  return db.getById(1234);
}

const getInfo = (root, args: {}, context: Context, info: {}) => {
  return 'Test api info'
}

const isAuthenticated = async (root, args: {}, context: Context, info: {}) => {
  const { token } = context;
  if(!token || token !== extremelySafeToken) {
    throw Error('Not authenticated');
  }

  context.user = await db.getById(1234);
}

const isAdmin = (root, args: {}, context: Context, info: {}) => {
  throw Error('Not allowed');
}

const executeWithToken = <R> (resolver: ResolverChained<R>) => execute(resolver, extremelySafeToken)
const execute = <R> (resolver: ResolverChained<R>, token?: string) => resolver({}, {}, {token}, {})
describe('Resolvers function', () => {
  describe('chain() Api', () => {
    it('Should throw (Not authenticated) error ', async () => {
      const resolverChain = chain([isAuthenticated, getMe]);
      try { 
        expect(await execute(resolverChain)).to.throw('Not authenticated');
      } catch(e){}
    });
  
    it('Should throw (Not allowed) error', async () => {
      const resolverChain = chain([isAuthenticated, isAdmin, getMe]);
      try { 
        expect(await executeWithToken(resolverChain)).to.throw('Not allowed');
      } catch(e){}
    });
  
    it('Should return me user', async () => {
      const resolverChain = chain<User>([isAuthenticated, getMe]);
      const me = await execute(resolverChain, extremelySafeToken);
      expect(me.id).to.equal(1234);
    });
  });

  describe('protect() Api', () => {
    it('Should throw (Not authenticated) error ', async () => {
      const getMeChained: any = protect({
        it: getMe,
        using: [isAuthenticated]
      });
      try {
        expect(getMeChained).to.be.a("function");
        expect(await execute(getMeChained)).to.throw('Not authenticated');
      } catch(e){}
    });

    
    it('Should return me user', async () => {
      try {
        const resolverChain: any = protect({
          all: { getMe, getInfo },
          using: [isAuthenticated]
        });

        expect(resolverChain).to.be.an("object");
        expect(resolverChain).to.have.property('getMe');
        expect(resolverChain).to.have.property('getInfo');
        expect(resolverChain.getMe).to.be.a('function');
        expect(resolverChain.getInfo).to.be.a('function');
        
        const me = await executeWithToken(resolverChain.getMe);
        expect(me.id).to.equal(1234);

        const info = await executeWithToken(resolverChain.getInfo);
        expect(info).to.equal('Test api info');
      } catch(e){}
    });
  });
})