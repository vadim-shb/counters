export class Town {

  public id?: number;
  public name: string;

  constructor (source?: Town) {
    if (source) {
      this.id = source.id;
      this.name = source.name;
    }
  }
}
