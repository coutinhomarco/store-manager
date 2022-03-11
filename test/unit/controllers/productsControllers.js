const sinon = require('sinon');
const { expect } = require('chai');
const productsService = require('../../../services/productsService');
const productsController = require('../../../controllers/Products');

describe('Testa controller dos products', () => {
  let next = () => {};
  const request = {};
  const response = {};

  beforeEach(() => {
    response.json = sinon.stub().returns()
    next = sinon.stub().returns();
    response.status = sinon.stub().returns(response);
  })
  describe('checa produtos no  banco de dados', () => {
    const Response =  {
      code: 200,
      data: [
        { id: 1, name: 'Martelo de Thor', quantity: 10 },
        { id: 2, name: 'Traje de encolhimento', quantity: 20 },
        { id: 3, name: 'Escudo do Capitão América', quantity: 30 }
      ]
    }
      beforeEach(() => {
        sinon.stub(productsService, 'getAll').resolves(Response);
      });
      afterEach(() => {
        productsService.getAll.restore();
      });

      it('Testa se o response status vem com o code', async () =>{
        await productsController.getAll(request, response, next)
        expect(response.status.calledWith(Response.code)).to.be.true;
      })
      it('Testa se o response status vem com o data ', async () =>{
        await productsController.getAll(request, response, next)
        expect(response.json.calledWith(Response.data)).to.be.true;
      })
    })
    describe('busca produto que existe no banco', () => {
      const Response =  {
        code: 200,
        data: 
          { id: 1, name: 'Martelo de Thor', quantity: 10 },
      }
        beforeEach(() => {
          request.params = {id: 1}
          sinon.stub(productsService, 'getOne').resolves(Response);
        });

        afterEach(() => {
          productsService.getOne.restore();
        });
        it('Testa se o response status vem com o code', async () =>{
          await productsController.getById(request, response, next)

          expect(response.status.calledWith(Response.code)).to.be.true;
        })
        it('Testa se o response status vem com o data', async () =>{
          await productsController.getById(request, response, next)
          expect(response.json.calledWith(Response.data)).to.be.true;
        })
        it('Testa se o response status vem com o code = 200', async () =>{
          await productsController.getById(request, response, next)
          expect(response.status.calledWith(200)).to.be.true;
        })

    })

    describe('busca produto que não existe', () => {
      const Response =  { code: 404, message: 'Product not found' }

        beforeEach(() => {
          request.params = {id: 60}
          sinon.stub(productsService, 'getOne').resolves(Response);
        });
        afterEach(() => {
          productsService.getOne.restore();
        });
        it('Testa se o response status vem com o code', async () =>{
          await productsController.getById(request, response, next)
          expect(response.status.calledWith(Response.code)).to.be.true;
        })
    })
    describe('Adicionar um produto', () => { 
      describe('produto não existe no  banco de dados',  () => {
  
        const Response = { 
          code: 201, 
          data: {
            id: 1,
            name: 'JBL',
            quantity: 666
          } 
        }
  
        beforeEach(() => {
          request.body = {
            id: 1,
            name: 'JBL',
            quantity: 666
          }
          sinon.stub(productsService, 'postProducts').resolves(Response);
        });
  
        afterEach(() => {
          productsService.postProducts.restore();
        });
  
        it('Testa se o response status vem com o code', async () =>{
          await productsController.PostProducts(request, response, next)
  
          expect(response.status.calledWith(Response.code)).to.be.true;
        })
  
        it('Testa se o response status vem com o data', async () =>{
          await productsController.PostProducts(request, response, next)
  
          expect(response.json.calledWith( Response.data)).to.be.true;
        })
      })
    })
})