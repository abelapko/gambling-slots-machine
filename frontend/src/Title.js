import { Text, Ticker } from 'pixi.js';

export default class Title {
    constructor(app) {
        const title = new Text('Burning Love', { fontSize: 36, fill: 'red', fontWeight: 'bold' });
        title.anchor.set(0.5);
        title.x = app.screen.width / 2;
        title.y = 50;

        let scaleDirection = 1;
        Ticker.shared.add(() => {
            title.scale.set(title.scale.x + 0.005 * scaleDirection);
            if (title.scale.x > 1.1 || title.scale.x < 0.9) {
                scaleDirection *= -1;
            }
        });

        return title;
    }
}
