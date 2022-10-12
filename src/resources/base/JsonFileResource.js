//import RestApi from '../../services/JsonFileReader'
//import ResourceBuilder from './ResourceBuilder'

export default class JsonFileResource {
  constructor() {
    //this.restApi = new RestApi()
  }

  buildResource(result) {
    const resource = new ResourceBuilder()
    resource.setResult(result)
    resource.setSuccess(true)
    return resource
  }
}
