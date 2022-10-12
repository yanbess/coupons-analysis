import Coupons from '../../resources/Coupons'

export default class CouponsTypesAnalysis {
  constructor() {
    const couponsResource = new Coupons()
    this.coupons = couponsResource.getList().getResult()
  }
  getTypes() {
    let types = {}
    this.coupons.forEach(function (element) {
      if (types[element.promotion_type] === undefined) {
        types[element.promotion_type] = {
          name: element.promotion_type,
          number: 1
        }
      } else {
        types[element.promotion_type].number++
      }
    })

    return Object.values(types)
  }
}
