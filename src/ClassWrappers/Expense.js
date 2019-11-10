export default class Expense {
  constructor(id, company, amount, date, note, idReoccurring) {
    this.id = id;
    this.company = company;
    this.amount = amount;
    this.date = date;
    this.note = note;
    this.idReoccurring = idReoccurring;
  }
}