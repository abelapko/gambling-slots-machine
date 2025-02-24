import {Sprite, Assets} from 'pixi.js';
import {BlurFilter} from '@pixi/filter-blur';
import backgroundImage from './assets/background.jpg';

export default class Background extends Sprite {
    constructor(app) {
        super();

        Assets.load(backgroundImage).then(texture => {
            this.texture = texture;
            this.anchor.set(0.5);
            this.position.set(app.screen.width / 2, app.screen.height / 2);

            const scale = Math.max(app.screen.width / texture.width, app.screen.height / texture.height);
            this.scale.set(scale);

            this.filters = [new BlurFilter(5)];
        });
    }
}
