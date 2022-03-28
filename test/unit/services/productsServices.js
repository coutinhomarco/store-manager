const sinon = require('sinon');
const { expect } = require('chai');
const productsModels = require('../../../models/ProductsModel')
const productsService = require('../../../services/products.service');


describe('Testa listagem de produtos', () => {
  describe('Testa produtos presentes no banco', () => {
    const modelResponse = [
      { id: 1, name: 'Martelo de Thor', quantity: 10 },
      { id: 2, name: 'Traje de encolhimento', quantity: 20 },
      { id: 3, name: 'Escudo do Capitão América', quantity: 30 }
    ];
    const servicesResponse = {
      code: 200,
      data: [
        { id: 1, name: 'Martelo de Thor', quantity: 10 },
        { id: 2, name: 'Traje de encolhimento', quantity: 20 },
        { id: 3, name: 'Escudo do Capitão América', quantity: 30 }
      ]
    }
      beforeEach(() => {
        sinon.stub(productsModels, 'getAll').resolves(modelResponse);
      })
      afterEach(() => {
      productsModels.getAll.restore();
      });
      it('testa tipo do retorno', async () => {
        const data = await productsService.getAll();
        expect(data).to.be.an('object');
      })
      it('testa código do retorno', async () => {
        const data = await productsService.getAll();
        expect(data.code).to.be.equal(200)
      })
      it('Testa igualdade do retorno', async () => {
        const data = await productsService.getAll();
        expect(data).to.be.deep.equal(servicesResponse)
      })
  })
  describe('Testa retorno de busca por id', async () => {
    describe('Testa produto que existe', async() =>{
      const modelResponse = [
        { id: 1, name: 'Martelo de Thor', quantity: 10 },
      ];
      const servicesResponse = {
        code: 200,
        data:
          { id: 1, name: 'Martelo de Thor', quantity: 10 },
      }
      beforeEach(() => {
        sinon.stub(productsModels, 'getById').resolves(modelResponse);
      })
  
      afterEach(() => {
      productsModels.getById.restore();
      });
      it('Testa igualdade do retorno', async () => {
        const result = await productsService.getOne();
  
        expect(result).to.be.deep.equal(servicesResponse)
      })
      it('Testa tipo do retorno', async () => {
        const result = await productsService.getOne();
  
        expect(result).to.be.an('object')
      })
      it('testa chaves do retorno', async() => {
        const result = await productsService.getOne();
        expect(result).to.have.property('code')
        expect(result).to.have.property('data')
      })

    })
    describe('Testa produto que NÃO existe', async() =>{
      const modelResponse = [];
      const servicesResponse = {
        code: 404,
        data: {
          message:  'Product not found' 
        }
      }
      beforeEach(() => {
        sinon.stub(productsModels, 'getById').resolves(modelResponse);
      })
  
      afterEach(() => {
      productsModels.getById.restore();
      });
      it('Testa igualdade do retorno', async () => {
        const result = await productsService.getOne();
  
        expect(result).to.be.deep.equal(servicesResponse)
      })
      it('Testa tipo do retorno', async () => {
        const result = await productsService.getOne();
  
        expect(result).to.be.an('object')
      })
      it('testa chaves do retorno', async() => {
        const result = await productsService.getOne();
        expect(result).to.have.property('code')
        expect(result).to.have.property('data')
      })
  
    })
  })
  describe('Adicionar produtos ao banco', async () => {
    const product = {name:"JBL", quantity: 666}
    describe('produto não existe', async() => {
      const modelResponse = {
        id: 1,
        name: 'JBL',
        quantity: 666
      };
      const servicesResponse = {
        code: 201,
        data: modelResponse
      }
      const getAllReturn = [{id: 2, name: 'bloco', quantity: 100}]

      beforeEach(() => {
        sinon.stub(productsModels, 'getAll').resolves(getAllReturn);
        sinon.stub(productsModels, 'postProduct').resolves(modelResponse)
      })
      afterEach(() => {
        productsModels.getAll.restore();
        productsModels.postProduct.restore();
      })
      it('testa chaves do retorno', async() => {
        const data = await productsService.postProducts(product.name, product.quantity)
        expect(data).to.have.property('code')
        expect(data).to.have.property('data')
      })
    })
    describe('quando o produto existe', async () => {
      const modelResponse = {
        id: 1,
        name: 'JBL',
        quantity: 666
      };
      const getAllReturn = [{id: 1, name: 'JBL', quantity: 666}]

      const servicesResponse = {
        code: 409, 
        data: {message: 'Product already exists'} 
      }

      beforeEach(() => {
        sinon.stub(productsModels, 'getAll').resolves(getAllReturn);
        sinon.stub(productsModels, 'postProduct').resolves(modelResponse)
      })

      afterEach(() => {
        productsModels.getAll.restore();
        productsModels.postProduct.restore();
      })
      it('testa igualdade do retorno', async() => {
        const data = await productsService.postProducts(product.name, product.quantity)
        expect(data).to.be.deep.equal(servicesResponse)
      })
    })
  })
  describe('Testa atualizar produto', async() => {
    const product = {
      id: 1,
      name: 'JBL',
      quantity: 666
    }
    describe('Produto não existente', async () => {

      const modelResponse = []

      const servicesResponse = { code: 404, data: { message: 'Product not found' } }

      beforeEach(() => {
        sinon.stub(productsModels, 'modifyProduct').resolves(servicesResponse)
        sinon.stub(productsModels, 'getAll').resolves(modelResponse)
      })

      afterEach(() => {
        productsModels.modifyProduct.restore();
        productsModels.getAll.restore()
      })
      it('Testa igualdade do retorno', async () => {
        const data= await productsService.modifyProduct(product.id, product.name, product.quantity)
        expect(data).to.be.deep.equal(servicesResponse);
      })
      it('testa chaves do retorno', async() => {
        const data= await productsService.modifyProduct(product.id, product.name, product.quantity)
        expect(data).to.have.property('code')
        expect(data).to.have.property('data')
      })
    })
    describe('Produto existente', async () => {
      const getAllResponse = [{
        id: 1,
        name: 'JBL',
        quantity: 666
      }];
      const modifyResponse = {
        id: 1,
        name: 'JBL',
        quantity: 666
      }
      const servicesResponse = {
        code: 200,
        data: modifyResponse
      }

      beforeEach(() => {
        sinon.stub(productsModels, 'modifyProduct').resolves(modifyResponse)
        sinon.stub(productsModels, 'getAll').resolves(getAllResponse)
      })

      afterEach(() => {
        productsModels.modifyProduct.restore();
        productsModels.getAll.restore()
      })
      it('Testa igualdade do retorno', async () => {
        const modifyResponse = await productsService.modifyProduct(product.id, product.name, product.quantity)
        expect(modifyResponse).to.be.deep.equal(servicesResponse);
      })
      it('testa chaves do retorno', async() => {
        const data = await productsService.modifyProduct(product.id, product.name, product.quantity)
        expect(data).to.have.property('code')
        expect(data).to.have.property('data')
      })
    })
  })
  describe('Deletar produto', () => {
    const product = {
      id: 1,
      name: 'JBL',
      quantity: 666
    }
    const getAllResponse = [{
      id: 1,
      name: 'JBL',
      quantity: 666
    }];
    describe('produto existe no banco', () => {
      const servicesResponse = {
        code: 204, data:{}
      }
      const modelSuccess = {};

      beforeEach(() => {
        sinon.stub(productsModels, 'deleteProduct').resolves(modelSuccess)
        sinon.stub(productsModels, 'getAll').resolves(getAllResponse)
      })

      afterEach(() => {
        productsModels.deleteProduct.restore();
        productsModels.getAll.restore();
      })

      it('Testa retorno', async () => {
        const modelResponse = await productsService.deleteOne(product.id)
        expect(modelResponse).to.be.deep.equal(servicesResponse);
      })
      it('testa chaves do retorno', async() => {
        const data = await productsService.deleteOne(product.id)
        expect(data).to.have.property('code')
        expect(data).to.have.property('data')
      })
    })
    describe('produto NÃO existe no banco', () => {

      const modelResponse = {message: 'Product not found' };
      const servicesResponse = {
      code: 404, 
      data: {message: 'Product not found'}  
    }

      beforeEach(() => {
        sinon.stub(productsModels, 'deleteProduct').resolves(modelResponse)
        sinon.stub(productsModels, 'getAll').resolves([])
      })

      afterEach(() => {
        productsModels.deleteProduct.restore();
        productsModels.getAll.restore();
      })
      it('Testa retorno', async () => {
        const modelResponse = await productsService.deleteOne(product.id)
        expect(modelResponse).to.be.deep.equal(servicesResponse);
      })
      it('testa chaves do retorno', async() => {
        const data = await productsService.deleteOne(product.id)
        expect(data).to.have.property('code')
        expect(data).to.have.property('data')
      })
    })
  })
})