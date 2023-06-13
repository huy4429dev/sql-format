import { Guid } from './guid';
let temp = `James Mary Robert Patricia John Jennifer Michael Linda David Elizabeth
            William Barbara Richard Susan Joseph Jessica Thomas Sarah Charles Karen
            Christopher Lisa Daniel Nancy Matthew Betty Anthony Margaret Mark Sandra
            Donald Ashley Steven Kimberly Paul Emily Andrew Donna Joshua Michelle Kenneth
            Carol Kevin Amanda Brian Dorothy George Melissa Timothy Deborah Ronald Stephanie
            Edward Rebecca Jason Sharon Jeffrey Laura Ryan Cynthia Jacob Kathleen Gary Amy Nicholas
            Angela Eric Shirley Jonathan Anna Stephen Brenda Larry Pamela Justin Emma Scott Nicole Brandon
            Helen Benjamin Samantha Samuel Katherine Gregory Christine Alexander Debra Frank Rachel Patrick
            Carolyn Raymond Janet Jack Catherine Dennis Maria Jerry Heather Tyler Diane Aaron Ruth Jose Julie
            Adam Olivia Nathan Joyce Henry Virginia Douglas Victoria Zachary Kelly Peter Lauren Kyle Christina
            Ethan Joan Walter Evelyn Noah Judith Jeremy Megan Christian Andrea Keith Cheryl Roger Hannah Terry
            Jacqueline Gerald Martha Harold Gloria Sean Teresa Austin Ann Carl Sara Arthur Madison Lawrence Frances
            Dylan Kathryn Jesse Janice Jordan Jean Bryan Abigail Billy Alice Joe Julia Bruce Judy Gabriel Sophia Logan
            Grace Albert Denise Willie Amber Alan Doris Juan Marilyn Wayne Danielle Elijah Beverly Randy Isabella Roy
            Theresa Vincent Diana Ralph Natalie Eugene Brittany Russell Charlotte Bobby Marie Mason Kayla Philip Alexis Louis Lori`;
export default class Faker{
  static seedData<T>(args: T, countRecord: number) {
    let data: T[] = [];
    let index = 0;
    while (index < countRecord) {
      index++;
      let record = {} as any;

      for (const key in args) {
        if (typeof args[key] === 'boolean') {
           record[key] = this.seedBoolean();
           continue;
        }
        record[key] =
        this.seedId(key) ||
        this.seedTime(key) ||
        this.seedNumber(args[key]) ||
        this.seedEmail(key) ||
        this.seedPhone(key) ||
        this.seedString(key);
      }
      data.push(record);
    }
    return data;
  }

  static seedBoolean() {
    return Math.floor(Math.random() * 10) > 5;
  }

  static seedNumber(property: any) {
    if (typeof property !== 'number') return false;
    return Math.floor(Math.random() * 100000);
  }

  static seedId(key: string) {
    if (!key.toLowerCase().includes('id')) return false;
    return Guid.newGuid();
  }

  static seedTime(key: string) {
    if (key.toLowerCase().includes('create') || key.toLowerCase().includes('update')) return new Date();
    return false;
  }

  static seedString(property: string) {
    if (typeof property !== 'string') return false;
    let name = '';
    for (let i = 0; i <= Math.floor(Math.random() * 5); i++) {
      name += this.getWord() + ' ';
    }
    return name;
  }

  static getWord(){
    const tempArr = temp.split(' ').filter((item) => item && item.length > 1);
    return tempArr[Math.floor(Math.random() * tempArr.length)];
  }

  static seedPhone(property: string) {
    if (!property.includes('phone')) return false;
    let phone = '0';
    for (let index = 0; index < 10; index++) {
      phone += Math.floor(Math.random() * 9).toString();
    }
    return phone;
  }

  static seedEmail(property: string) {
    if (!property.includes('email')) return false;
    return this.getWord().concat('@gmail.com');
  }


}
