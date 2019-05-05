/**
 * 用户数据模型类
 * 通常在这里添加数据校验
 */
class UserModel extends BaseModel {

  constructor(data) {
    super(data);
  }

  // todo
  validate() {

  }

}

/**
 * 用户模块控制器
 * 通常添加一些与用户相关的业务逻辑
 */
class UserController extends BaseController {

  constructor(opts) {
    super(opts);
  }

  setUsername(name) {
    // 添加一些业务
    this.update({name})
  }

}

/**
 * 用户模块视图类
 * 包含用户模块的模板，一些事件绑定和事件处理
 */
class UserView extends BaseView {
  constructor(opts) {
    super(opts)
  }

  bindEvents() {
    document.getElementById('user-info')
      .addEventListener('change', (e) => {
        if (e.target.id === 'username') {
          this.handleChange(e)
        }
      })
  }

  handleChange(e) {
    // 方式一
    // this.controller.update({
    //   name: e.target.value
    // })

    // 方式二
    this.controller.setUsername(e.target.value)
  }

  render(data) {
    const tpl = `
      <h1>This is user info:</h1>
      <h3>user name: ${data.name}</h3>
      <h3>user age: ${data.age}</h3>
      <input type="text" id="username" value="${data.name}" autofocus>
    `
    return tpl
  }
}

const userModel = new UserModel({
  name: 'yyy',
  age: 18
});

// 下面两个视图绑定同一个数据模型
const userView = new UserView({
  el: '#user-info',
  controller:  new UserController({
    model: userModel
  }),
  // bindEvents: function () {
  //   // 由于模板会重新渲染，事件绑定全部委托给容器元素
  //   document.getElementById('user-info')
  //     .addEventListener('change', (e) => {
  //       if (e.target.id === 'username') {
  //         // this.controller.update({
  //         //   name: e.target.value
  //         // })
  //         this.controller.setUsername(e.target.value)
  //       }
  //     })

  // }
})

const msgView = new BaseView({
  el: '#message',
  controller: new BaseController({ model: userModel }),
  render(data) {
    return `message: current user is ${data.name}`
  }
})