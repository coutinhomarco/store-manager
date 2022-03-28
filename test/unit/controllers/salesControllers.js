const sinon = require('sinon');
const { expect } = require('chai');
const salesServices = require('../../../services/sales.service');
const salesControllers = require('../../../controllers/Sales');

describe('Testa controller de sales', () => {
  
  const request = {};
  const response = {};
  let next = () => {};
  beforeEach(() => {
    request.body = {}
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns()
    next = sinon.stub().returns();
  })

  describe('checa vendas no  banco de dados', () => {
    const serviceResponse =  {
      code: 200,
      data: [
        {
          saleId: 1,
          date: '2022-02-24T15:40:47.000Z',
          productId: 1,
          quantity: 5
        },
        {
          saleId: 1,
          date: '2022-02-24T15:40:47.000Z',
          productId: 2,
          quantity: 10
        },
        {
          saleId: 2,
          date: '2022-02-24T15:40:47.000Z',
          productId: 3,
          quantity: 15
        }
      ]
    }
      beforeEach(() => {
        sinon.stub(salesServices, 'getAll').resolves(serviceResponse);
      });

      afterEach(() => {
        salesServices.getAll.restore();
      });


      it('Chama o response.status com o valor da propriedade "code" do serviceResponse', async () =>{
        await salesControllers.getAll(request, response, next)

        expect(response.status.calledWith(serviceResponse.code));
      })

      it('Chama o response.json com o valor da propriedade "data" do serviceResponse ', async () =>{
        await salesControllers.getAll(request, response, next)

        expect(response.json.calledWith(serviceResponse.data));
      })
    })

    describe('Procurar produto por Id que existe no BD', () => {
      const serviceResponse =  {
        code: 200,
        data: [ { date: '2022-02-24T15:40:47.000Z', 
        productId: 3, 
        quantity: 15 } ]
      }
        beforeEach(() => {
          request.params = {id: 1}
          sinon.stub(salesServices, 'getById').resolves(serviceResponse);
        });
  
        afterEach(() => {
          salesServices.getById.restore();
        });
        it('Chama o response.status com o valor da propriedade "code" do serviceResponse', async () =>{
          await salesControllers.getById(request, response, next)
  
          expect(response.status.calledWith(serviceResponse.code));
        })
  
        it('Chama o response.json com o valor da propriedade "data" do serviceResponse ', async () =>{
          await salesControllers.getById(request, response, next)
  
          expect(response.json.calledWith(serviceResponse.data));
        })
    })

    describe('Procurar produto por Id que não existe no BD', () => {
      const serviceResponse =  { code: 404, message: 'Sale not found' }
      
        beforeEach(() => {
          request.params = {id: 60}
          sinon.stub(salesServices, 'getById').resolves(serviceResponse);
        });
  
        afterEach(() => {
          salesServices.getById.restore();
        });
        it('Chama o response.status com o valor da propriedade "code" do serviceResponse', async () =>{
          await salesControllers.getById(request, response, next)
  
          expect(response.status.calledWith(serviceResponse.code));
        })
  
        it('Chama o response.json com o valor da propriedade "message" dentro do data do serviceResponse ', async () =>{
          await salesControllers.getById(request, response, next)
  
          expect(response.json.calledWith(serviceResponse.data));
        })
    })
    describe('Cria uma venda no banco', () => {
      describe('Cadastrado com sucesso', () => {
      const serviceResponse =  { code: 201,  data: { id: 1, itemsSold: [{productId: 1, quantity: 300 }]}}
      beforeEach(() => {
        request.params = [{ "productId": 1, "quantity": 3 }];
        sinon.stub(salesServices, 'create').resolves(serviceResponse);
      })

        afterEach(() => {
          salesServices.create.restore()
        })

        it('Chama o response.status com o valor da propriedade "code" do serviceResponse', async () =>{
          await salesControllers.create(request, response, next)
  
          expect(response.status.calledWith(serviceResponse.code));
        })
  
        it('Chama o response.json com o valor da propriedade "data" do serviceResponse ', async () =>{
          await salesControllers.create(request, response, next)
  
          expect(response.json.calledWith(serviceResponse.data));
        })
      })
      describe('Cadastrar a venda, e a quantidade produto não é suficiente', () => {
        const serviceResponse =  { code: 422,  message: 'Such amount is not permitted to sell'}
        beforeEach(() => {
          request.params = [{ "productId": 1, "quantity": 300 }];
          sinon.stub(salesServices, 'create').resolves(serviceResponse);
        })
  
          afterEach(() => {
            salesServices.create.restore()
          })
  
          it('Chama o response.status com o valor da propriedade "code" do serviceResponse', async () =>{
            await salesControllers.create(request, response, next)
    
            expect(response.status.calledWith(serviceResponse.code));
          })
    
          it('Chama o response.json com o valor da propriedade "data" do serviceResponse ', async () =>{
            await salesControllers.create(request, response, next)
    
            expect(response.json.calledWith({message: serviceResponse.message}));
          })
        })
    })
  })
