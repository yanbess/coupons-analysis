export default class ResourceBuilder {
  constructor() {
    this.success
    this.result
  }

  setSuccess(value) {
    this.success = value
  }

  setResult(data) {
    this.result = data
  }

  getResult() {
    return this.result
  }

  isSuccess() {
    return this.success
  }
}
