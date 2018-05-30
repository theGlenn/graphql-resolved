import * as mocha from 'mocha';
import { expect } from 'chai';
import { Resolvers, apply } from '../';
import { isAuthenticated, isAdmin, getMe, getInfo, executor } from './../../../test/resolvers'

describe('apply() Api', () => {
  it('Should throw (Not authenticated) error ', async () => {
    const resolversMap: any = apply({
      resolvers: [isAuthenticated],
      to: {
        getMe
      }
    })
    try {
      expect(resolversMap).to.be.an("object");
      expect(resolversMap).to.have.property('getMe');
      expect(resolversMap.getMe).to.be.a('function');
      expect(await executor.run(resolversMap.getMe)).to.throw('Not authenticated');
    } catch(e){}
  });
  
  it('Should return me user', async () => {
    try {
      const resolverChain: any = apply({
        resolvers: [isAuthenticated],
        to: { getMe, getInfo },
      });
      expect(resolverChain).to.have.property('getMe');
      expect(resolverChain).to.have.property('getInfo');
      
      const me = await executor.runWithToken(resolverChain.getMe);
      expect(me.id).to.equal(1234);
      const info = await executor.runWithToken(resolverChain.getInfo);
      expect(info).to.equal('Test api info');
    } catch(e){}
  });
});