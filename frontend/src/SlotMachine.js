import {Container, Sprite, Texture, BlurFilter, Graphics, Assets} from 'pixi.js';
import {DropShadowFilter} from '@pixi/filter-drop-shadow';
import WinningLines from './WinningLines.js';
import {SLOT_CONFIG, GRAPHICS} from './config.js';
import ApiService from './api.js';
import EventEmitter from './EventEmitter.js';

export default class SlotMachine extends Container {
    constructor(app) {
        super();
        this.app = app;
        this.reels = [];
        this.isSpinning = false;
        this.symbolSize = SLOT_CONFIG.SYMBOL_SIZE;
        this.symbols = [];
        this.REEL_WIDTH = SLOT_CONFIG.REEL_WIDTH;
        this.firstSpin = true;

        this.loadTextures().then(() => {
            this.createReels();
            this.createBorder();
            this.winningLines = new WinningLines(this.app, this.reels, this.REEL_WIDTH, this.symbolSize);
        });
    }

    async loadTextures() {
        await Assets.load(GRAPHICS.SYMBOLS);

        this.symbols = GRAPHICS.SYMBOLS.map(symbol => ({
            alias: symbol.alias,
            texture: Texture.from(symbol.alias)
        }));
    }

    createReels() {
        const totalWidth = 5 * this.REEL_WIDTH;
        const startX = (this.app.screen.width - totalWidth) / 2;
        const startY = (this.app.screen.height - 3 * this.symbolSize) / 2;

        for (let i = 0; i < 5; i++) {
            const reelContainer = new Container();
            reelContainer.x = startX + i * this.REEL_WIDTH;
            reelContainer.y = startY;
            this.addChild(reelContainer);

            const reel = {
                container: reelContainer,
                symbols: [],
                position: 0,
                previousPosition: 0,
                blur: new BlurFilter(),
            };

            reel.blur.blurX = 0;
            reel.blur.blurY = 0;
            reelContainer.filters = [reel.blur];

            for (let j = 0; j < 3; j++) {
                const sprite = new Sprite(this.getRandomSymbol());
                sprite.width = 80;
                sprite.height = 80;
                sprite.x = (this.REEL_WIDTH - sprite.width) / 2;
                sprite.y = j * this.symbolSize;
                reelContainer.addChild(sprite);
                reel.symbols.push(sprite);
            }
            this.reels.push(reel);
        }
    }

    createBorder() {
        const totalWidth = 5 * this.REEL_WIDTH;
        const totalHeight = 3 * this.symbolSize;
        const startX = (this.app.screen.width - totalWidth) / 2;
        const startY = (this.app.screen.height - totalHeight) / 2;

        const backgroundOverlay = new Graphics();
        backgroundOverlay.beginFill(0x000000, 0.5);
        backgroundOverlay.drawRect(startX, startY, totalWidth, totalHeight);
        backgroundOverlay.endFill();
        this.addChildAt(backgroundOverlay, 0);

        const border = new Graphics();
        border.lineStyle(8, 0xFFD700, 1);
        border.drawRect(startX - 5, startY - 5, totalWidth + 10, totalHeight + 10);
        this.addChildAt(border, 1);

        const shadowFilter = new DropShadowFilter({
            blur: 8,
            quality: 5,
            distance: 5,
            color: 0x000000
        });

        border.filters = [shadowFilter];
    }

    getRandomSymbol() {
        return this.symbols[Math.floor(Math.random() * this.symbols.length)];
    }

    spinReels(bet, lines) {
        if (this.isSpinning) return;
        this.isSpinning = true;
        EventEmitter.emit('spinStart');
        this.winningLines.clearWinningLines();

        ApiService.spin(bet, lines).then(data => {
            this.animateSpin(data.reels, data.details);
            EventEmitter.emit('balanceUpdated', data.balance);
            EventEmitter.emit('spinEnd');
        }).catch(error => {
            console.error("Spin API error:", error);
        });
    }

    animateSpin(newSymbols, details) {
        this.reels.forEach((reel, i) => {
            reel.symbols.forEach((sprite, j) => {
                sprite.texture = Texture.from(newSymbols[i][j]);
            });
        });
        this.isSpinning = false;
        this.winningLines.drawWinningLines(details);
    }
}
