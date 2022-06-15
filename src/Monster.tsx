let IDcount = 0;

class Monster implements Monster{
  private bigness: number;
  public ID: string
  protected race: string;
  private target: string
  constructor(bigness: number, target="website") {
    this.bigness = bigness;
    this.ID = String(IDcount++);
    this.race = "monster";
    this.target = target;
  }
  getBigness = (): number => this.bigness;
  setRace(race: string) {
    this.race = race;
  }
  isJohn = (): boolean => this.race === "john";
  attack() {
    if (this.bigness <= 0) {
      return `
        A ${this.race} of bigness ${this.bigness} 
        tried to attack the ${this.target}!
        \n
        However, the ${this.race} had no bigness, so it died!
      `
    }
    return `A ${this.race} of bigness
            ${this.bigness} attacked the ${this.target}!`
  }
}

class Bogieman extends Monster {
  private angryness: string;
  constructor(angryness: string) {
    super(4);
    this.angryness = angryness;
    this.race = "bogieman"
  }
  attack(): string {
    return super.attack() + `
      The bogieman is ${this.angryness} angry!`;
  }
}

export { Bogieman };
export default Monster;