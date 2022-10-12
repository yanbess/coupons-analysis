import Coupons from '../../resources/Coupons'
import { calcAverage } from '../Helpers'

export default class CouponsAnalysisByType {
  constructor(type) {
    const couponsResource = new Coupons()
    this.coupons = couponsResource.getList().getResult()

    this.type = type
  }

  getDiscountGroups() {
    let groups = {}
    const type = this.type

    this.coupons.forEach(function (element) {
      if (element.promotion_type === type) {
        const index = element.value

        if (groups[index] === undefined) {
          groups[index] = {
            value: element.value,
            number: 1
          }
        } else {
          groups[index].number++
        }
      }
    })

    return Object.values(groups)
  }

  getMaxAmountDiscountGroups(coupons = []) {
    return Math.max(...coupons.map((v) => v.number))
  }

  getMinAmountDiscountGroups(coupons = []) {
    return Math.min(...coupons.map((v) => v.number))
  }

  getAvgAmountDiscountGroups(coupons = []) {
    return calcAverage(
      coupons.map((a) => a.number),
      Math.max(...coupons.map((v) => v.number))
    )
  }
}
