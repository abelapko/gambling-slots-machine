import {Container, Graphics, Text} from 'pixi.js';
import ApiService from './api.js';

export default class RestartButton extends Container {
    constructor(app) {
        super();

        this.button = new Graphics()
            .beginFill(0x000000)
            .drawRoundedRect(0, 0, 120, 50, 10)
            .endFill();
        this.button.interactive = true;
        this.button.cursor = 'pointer';
        this.button.on('pointerdown', () => {
            this.clearCookiesAndReload();
        });

        this.text = new Text('RESTART', {fontSize: 20, fill: '#fff'});
        this.text.anchor.set(0.5);
        this.text.x = 60;
        this.text.y = 25;

        this.addChild(this.button);
        this.addChild(this.text);
        this.x = app.screen.width - 140;
        this.y = app.screen.height / 2 + 70;
    }

    async clearCookiesAndReload() {
        console.log('🧹 Очищаем куки и создаём новую сессию...');

        await ApiService.restartGame();

        document.cookie.split(";").forEach(cookie => {
            document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date(0).toUTCString() + ";path=/");
        });

    }

}
