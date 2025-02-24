import {Application} from 'pixi.js';
import Background from './Background.js';
import Title from './Title.js';
import SlotMachine from './SlotMachine.js';
import SpinButton from './SpinButton.js';
import ControlPanel from './ControlPanel.js';
import EventEmitter from './EventEmitter.js';
import RestartButton from "./RestartButton.js";
import {AUDIO} from './config.js';

(async () => {
    const app = new Application();
    await app.init({width: 800, height: 600, backgroundColor: 0x000000});
    document.body.appendChild(app.canvas);

    const bgMusic = new Audio(AUDIO.BACKGROUND_MUSIC);
    bgMusic.loop = true;
    bgMusic.volume = 0.5;

    document.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play().catch(err => console.error("Ошибка воспроизведения музыки:", err));
        }
    }, {once: true});

    const background = new Background(app);
    app.stage.addChild(background);

    app.stage.addChild(new Title(app));
    const slotMachine = new SlotMachine(app);
    app.stage.addChild(slotMachine);
    const controlPanel = new ControlPanel(app);
    app.stage.addChild(controlPanel);

    const spinButton = new SpinButton(app, () => slotMachine.spinReels(10, 10));
    app.stage.addChild(spinButton);

    const restartButton = new RestartButton(app);
    app.stage.addChild(restartButton);

    EventEmitter.on('balanceUpdated', newBalance => {
        controlPanel.updateBalance(newBalance);
    });
})();
