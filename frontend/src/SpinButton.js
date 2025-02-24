import {Container, Graphics, Text} from 'pixi.js';
import EventEmitter from './EventEmitter.js';
import {AUDIO} from './config.js';

export default class SpinButton extends Container {
    constructor(app, onClick) {
        super();

        this.button = new Graphics()
            .beginFill(0xff0000)
            .drawRoundedRect(0, 0, 120, 50, 10)
            .endFill();
        this.button.interactive = true;
        this.button.cursor = 'pointer';

        this.spinSound = new Audio(AUDIO.SPIN_MUSIC);
        this.spinSound.volume = 0.7;

        this.button.on('pointerdown', () => {
            if (this.button.interactive) {
                this.playSpinSound();
                this.disableButton();
                onClick();
            }
        });

        this.text = new Text('SPIN', {fontSize: 20, fill: '#fff'});
        this.text.anchor.set(0.5);
        this.text.x = 60;
        this.text.y = 25;

        this.addChild(this.button);
        this.addChild(this.text);
        this.x = app.screen.width - 140;
        this.y = app.screen.height / 2;

        EventEmitter.on('balanceUpdated', this.updateButtonState.bind(this));
        EventEmitter.on('spinStart', this.disableButton.bind(this));
        EventEmitter.on('spinEnd', this.updateButtonState.bind(this));
    }

    playSpinSound() {
        this.spinSound.currentTime = 0;
        this.spinSound.play().catch(err => console.error("Ошибка воспроизведения звука:", err));

        setTimeout(() => {
            this.spinSound.pause();
            this.spinSound.currentTime = 0;
        }, 500);
    }

    disableButton() {
        this.button.interactive = false;
        this.button.alpha = 0.5;
    }

    enableButton() {
        this.button.interactive = true;
        this.button.alpha = 1;
    }

    updateButtonState(newBalance) {
        if (newBalance < 100) {
            this.disableButton();
        } else {
            this.enableButton();
        }
    }
}
