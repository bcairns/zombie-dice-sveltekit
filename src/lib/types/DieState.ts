export default class DieState {

    /**
     * easy|medium|hard
     */
    public readonly type: string;

    /**
     * brain|shotgun|footprints
     */
    public result: string;

    /**
     * define dice types (# of brain/shotgun symbols)
     */
    private readonly static TYPES = {
        easy: {
            brains: 3,
            shotguns: 1
        },
        medium: {
            brains: 2,
            shotguns: 2
        },
        hard: {
            brains: 1,
            shotguns: 3
        }
    }

    constructor(type: string) {
        this.type = type;
        // this.roll();
    }

    public roll() {
        this.result = DieState.getRandomResult(this.type);
    }

    /**
     * randomly return one of 'brain', 'shotgun', 'footsteps', depending on type
     * @param type 'easy', 'medium', or 'hard'
     */
    private static getRandomResult(type) {
        const roll = Math.floor(Math.random() * 6); // 0..5

        if (roll < this.TYPES[type].brains) {
            return 'brain';
        }

        if (roll - this.TYPES[type].brains < this.TYPES[type].shotguns) {
            return 'shotgun';
        }

        return 'footsteps';
    }
}