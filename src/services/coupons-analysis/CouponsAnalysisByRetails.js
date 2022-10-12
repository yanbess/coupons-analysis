import Coupons from '../../resources/Coupons'
import { calcAverage } from '../Helpers'

export default class CouponsAnalysisByRetails {
  constructor() {
    const couponsResource = new Coupons()
    this.coupons = couponsResource.getList().getResult()
  }

  getRetails() {
    let groups = {}

    this.coupons.forEach(function (element) {
      const index = element.webshop_id

      if (groups[index] === undefined) {
        groups[index] = {
          retail: element.webshop_id,
          number: 1
        }
      } else {
        groups[index].number++
      }
    })

    return Object.values(groups)
  }

  getMaxAmountDiscountRetail(coupons = []) {
    return Math.max(...coupons.map((v) => v.number))
  }

  getMinAmountDiscountRetail(coupons = []) {
    return Math.min(...coupons.map((v) => v.number))
  }

  getAvgAmountDiscountRetail(coupons = []) {
    return calcAverage(
      coupons.map((a) => a.number),
      Math.max(...coupons.map((v) => v.number))
    )
  }
}
