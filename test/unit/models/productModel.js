const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const productModels = require('../../../models/productsModels');

describe('Testa model', () => {
  describe('Testa getAll', () => {
    const products = [[]]

    beforeEach(() => {
      sinon.stub(productModels, 'getAll').resolves(products);
    })
    afterEach(() => {
      productModels.getAll.restore();
    })

    it('Testa tipo de retorno', () => {
      const data = await productModels.getAll()
      expect(data).to.be.an('array')
    })
    it('Testa tipo de retorno', () => {
      const data = await productModels.getAll()
      expect(data).to.be.empty()
    })
  })
})