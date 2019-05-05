class BaseModel {
  constructor(data) {
    this.data = data || {}
    this._controllers = []
  }

  create(data) {
    this.data = data
    this.notify()
  }

  update(data) {
    this.data = {
      ...this.data,
      ...data
    }
    this.notify()
  }

  delete() {
    this.data = {}
    this.notify()
  }

  notify() {
    this._controllers.forEach((v) => v.updateView(this.data))
  }

  addController(controller) {
    this._controllers.push(controller)
  }

  removeController() {
    
  }
}

class BaseController {

  constructor(opts) {
    this._model = opts.model
    this.init()
  }

  init() {
    this._model.addController(this)
  }

  update(data) {
    this._model.update(data)
  }

  addView(view) {
    this._view = view
  }

  updateView(data) {
    this._view._render(data)
  }
}

class BaseView {

  constructor(opts) {
    this.el = document.querySelector(opts.el)
    this.controller = opts.controller
    opts.controller.addView(this)
    this.render = opts.render || this.render

    // view完成初始化
    Promise.resolve().then(() => {
      opts.controller._model.notify()
      // 此时页面元素已经挂载
      const bindEvents = opts.bindEvents || this.bindEvents
      bindEvents.call(this)
    })
  }

  /**
   * abstract
   */
  bindEvents() {

  }

  /**
   * abstract
   */
  render() {
  }

  _render(data) {
    this.el.innerHTML = this.render(data)
  }
}

if (module && module.exports) {
  module.exports = {
    BaseModel,
    BaseController,
    BaseView
  }
}
