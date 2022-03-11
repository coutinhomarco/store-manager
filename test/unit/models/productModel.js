const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const productModels = require('../../../models/ProductsModel');

describe('Testa model', () => {
  describe('Testa getAll vazio', () => {
    let products = [[]]

    beforeEach(() => {
      sinon.stub(productModels, 'getAll').resolves(products);
    })
    afterEach(() => {
      productModels.getAll.restore();
    })

    it('Testa tipo de retorno', async() => {
      const data = await productModels.getAll()
      expect(data).to.be.an('array')
    })
    it('Testa tipo de retorno', async() => {
      const [data] = await productModels.getAll()
      expect(data).to.be.have.length(0)
    })
  })
    describe('testa getall populado', () => {
      let products = [[
        {
            id: 1,
            name: "Martelo de Thor",
            quantity: 10
        },
        {
            id: 2,
            name: "Traje de encolhimento",
            quantity: 20
        },
        {
            id: 3,
            name: "Escudo do Capitão América",
            quantity: 30
        }
    ]];
  
    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves(products);
    })

    afterEach(() => {
      connection.execute.restore();
    });
      it('Testa tipo de retorno', async() => {
        const data = await productModels.getAll()
        expect(data).to.be.an('array')
      })
      it('Testa tipo de retorno', async () => {
        const data = await productModels.getAll()
        expect(data).to.have.length(3)
      })
      it('Testa tipo de retorno', async () => {
        const data = await productModels.getAll()
        expect(data).not.to.be.empty
      })
    })


  describe('Testa getById', () => {
    let products = 
      {
          id: 3,
          name: "Escudo do Capitão América",
          quantity: 30
      }
  

    beforeEach(() => {
      sinon.stub(productModels, 'getById').resolves(products);
    })
    afterEach(() => {
      productModels.getById.restore();
    })

    it('Testa tipo de retorno', async() => {
      const data = await productModels.getById()
      expect(data).to.be.an('object')
    })
    it('Testa tipo de retorno', async () => {
      const data = await productModels.getById()
      expect(data).not.to.be.empty
    })
  })
})