import Coupons from '../resources/Coupons'

const exceptions = ['a', 'to', 'off', 'with', 'get', 'my', 'add']

export default class RelevantKeywordsFromCoupons {
  constructor() {
    const couponsResource = new Coupons()
    this.coupons = couponsResource.getList().getResult()
  }
  getKeywords(limit) {
    const splitWords = this.splitWords
    let wordsList = {}

    this.coupons.forEach(function (obj) {
      const words = splitWords(obj.title + ' ' + obj.description)

      words.forEach(function (word) {
        if (wordsList[word] === undefined) {
          wordsList[word] = [1, word]
        } else {
          wordsList[word][0]++
        }
      })
    })

    wordsList = Object.values(wordsList)
    wordsList.sort((a, b) => b[0] - a[0])

    return wordsList.slice(0, limit)
  }

  splitWords(s) {
    s = s.replace(/(^\s*)|(\s*$)/gi, '') //exclude start and end white-space
    s = s.replace(/[ ]{2,}/gi, ' ') //2 or more space to 1
    s = s.replace(/\n /, '\n') // exclude newline with a start spacing
    return s
      .split(' ')
      .map((str) => str.trim().toLowerCase())
      .filter((str) => /^[a-zA-Z]+$/.test(str) && !exceptions.includes(str))
  }
}
