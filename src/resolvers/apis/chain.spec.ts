import * as mocha from 'mocha';
import { expect } from 'chai';
import { chain, Resolvers, protect } from '../';
import { isAuthenticated, isAdmin, getMe, getInfo, executor } from './../../../test/resolvers'

describe('chain() Api', () => {
  it('Should throw (Not authenticated) error ', async () => {
    const resolverChain = chain([isAuthenticated, getMe]);
    try { 
      expect(await executor.run(resolverChain)).to.throw('Not authenticated');
    } catch(e){}
  });

  it('Should throw (Not allowed) error', async () => {
    const resolverChain = chain([isAuthenticated, isAdmin, getMe]);
    try { 
      expect(await executor.runWithToken(resolverChain)).to.throw('Not allowed');
    } catch(e){}
  });

  it('Should return me user', async () => {
    const resolverChain = chain([isAuthenticated, getMe]);
    const me = await executor.runWithToken(resolverChain);
    expect(me.id).to.equal(1234);
  });
});