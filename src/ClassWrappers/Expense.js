export default class Expense {
  constructor(uid, company, amount, date, note, isReoccurring) {
    this.uid = uid;
    this.company = company;
    this.amount = amount;
    this.date = date;
    this.note = note;
    this.isReoccurring = isReoccurring;
  }
}