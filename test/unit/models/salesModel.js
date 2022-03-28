const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const salesModels = require('../../../models/SalesModel');

describe('Testa model de sales', () => {
  describe('checa vendas banco de dados vazio', () => {
    const productData = [[]];
  
      beforeEach(() => {
        sinon.stub(connection, 'execute').resolves(productData);
      })

      afterEach(() => {
        connection.execute.restore();
      });
  
      it('Retorna um array', async () => {
        const result = await salesModels.getAll();
  
        expect(result).to.be.an('array')
      })

      it('retorna um array vazio', async () => {
        const result = await salesModels.getAll()
        expect(result).to.be.empty
      })
    })
      
    describe('Checa vendas com BD populado', () => {
      const saleData = [
          [ 
            {
              sale_id: 1,
              product_id: 1,
              quantity: 5,
              id: 1,
              date: '2022-02-24T15:40:47.000Z'
            },
            {
              sale_id: 1,
              product_id: 2,
              quantity: 10,
              id: 1,
              date: '2022-02-24T15:40:47.000Z'
            },
            {
              sale_id: 2,
              product_id: 3,
              quantity: 15,
              id: 2,
              date: '2022-02-24T15:40:47.000Z'
            },
          ]
      ];
    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves(saleData);
    })

    afterEach(() => {
      connection.execute.restore();
    });

    it('Retorna um array', async () => {
      const result = await salesModels.getAll();

      expect(result).to.be.an('array')
    })

    it('retorna um array não vaio', async () => {
      const result = await salesModels.getAll()
      expect(result).not.to.be.empty
    })

    it('retorna um array com 3 items', async () => {
      const result = await salesModels.getAll()
      expect(result).to.have.length(3)
    });
  });

  describe('Procurar produto por Id', () => {
  
  const  saleData = [[
      {
        sale_id: 2,
        product_id: 3,
        quantity: 15,
        id: 2,
        date: '2022-02-24T15:40:47.000Z'
      }
    ]]

    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves(saleData)
    })
    afterEach(() => {
      connection.execute.restore();
    });

    it('Retorna um objeto', async () => {
      const result = await salesModels.getById()
      expect(result[0]).to.be.an('object')
    })

    it('Retorna uma venda não vazio', async () => {
      const result = await salesModels.getById()
      expect(result).not.to.be.empty
    })
    
  })

  describe('Quando uma venda é excluída', () => {
    const saleData = {
      id: 1,
    }
    describe('Quando a venda existe no banco', () => {
      const executeResponseSuccess = [{affectedRows: 1}];
      const modelResponseSuccess = undefined
      beforeEach(() => {
        sinon.stub(connection, 'execute').resolves(executeResponseSuccess);
      })

      afterEach(() => {connection.execute.restore()})

      it('Retorna um objeto vazio', async () => {
        const modelResponse = await salesModels.deleteSale(saleData.id)
        expect(modelResponse).to.be.deep.equal(modelResponseSuccess);
      })
    })
  })
});