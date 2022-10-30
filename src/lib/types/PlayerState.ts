export default class PlayerState {

    public readonly name: string;

    public score = 0;

    constructor(name: string) {
        this.name = name;
    }

    addScore(increase) {
        this.score += increase;
    }

    resetScore() {
        this.score = 0;
    }
}