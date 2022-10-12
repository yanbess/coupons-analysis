import coupons from '../../db/coupons.json'
import ResourceBuilder from './base/ResourceBuilder'

export default class Coupons {
  getList() {
    const resource = new ResourceBuilder()
    resource.setResult(coupons.coupons)
    resource.setSuccess(true)
    return resource
  }

  getListByType(type) {
    const resource = new ResourceBuilder()

    resource.setResult(
      coupons.coupons.filter((value) => value.promotion_type === type)
    )
    resource.setSuccess(true)
    return resource
  }
}
