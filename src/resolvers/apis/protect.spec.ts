import * as mocha from 'mocha';
import { expect } from 'chai';
import { chain, Resolvers, protect } from '../';
import { isAuthenticated, isAdmin, getMe, getInfo, executor } from './../../../test/resolvers'

describe('protect() Api', () => {
  it('Should throw (Not authenticated) error ', async () => {
    const getMeChained: any = protect({
      it: getMe,
      using: [isAuthenticated]
    });
    try {
      expect(getMeChained).to.be.a("function");
      expect(await executor.run(getMeChained)).to.throw('Not authenticated');
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
      
      const me = await executor.runWithToken(resolverChain.getMe);
      expect(me.id).to.equal(1234);
      const info = await executor.runWithToken(resolverChain.getInfo);
      expect(info).to.equal('Test api info');
    } catch(e){}
  });
});