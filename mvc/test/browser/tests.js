var expect = chai.expect

const initData = { name: 'yyy', age: '18' }
const baseModel = new BaseModel(initData)
const baseController = new BaseController({
  model: baseModel
})
const baseView = new BaseView({
  el: '#app',
  controller: baseController,
  render(data) {
    return `name:${data.name}, age: ${data.age}`
  }
})

describe('BaseModel', () => {
  it('接收一个对象模型数据作为初始化数据', () => {
    
    expect(baseModel.data).to.be.an('object')
      .and.to.be.deep.equal(initData)
  })
})

describe('BaseController', () => {

  it('将参数对象中的model添加到自身的_model', () => {
    expect(baseController._model).to.be.equal(baseModel)
  })
  it('将自身添加到model的控制器队列中', () => {
    expect(baseModel._controllers).to.include(baseController)
  })
})

describe('BaseView', () => {
  it('view 会被添加到 controller 中', () => {
    expect(baseController._view).to.be.equal(baseView)
  })
  it('数据改变时会触发 view 的render方法', () => {
    baseController.update({ name: 'yeyiyu' })
    expect(document.getElementById('app').innerHTML).to.be.equal(baseView.render(baseModel.data))
  })
})