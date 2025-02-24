import {Graphics} from 'pixi.js';
import {WINNING_LINES} from './config.js';
import {AUDIO} from './config.js';

export default class WinningLines {
    constructor(app, reels, reelWidth, symbolSize) {
        this.app = app;
        this.reels = reels;
        this.REEL_WIDTH = reelWidth;
        this.SYMBOL_SIZE = symbolSize;

        this.graphics = new Graphics();
        this.graphics.zIndex = 1000;
        this.app.stage.addChild(this.graphics);
        this.app.stage.sortableChildren = true;

        this.lineColors = [
            0xff0000,
            0x00ff00,
            0x0000ff,
            0xffd700,
            0xff00ff,
            0x00ffff,
            0xffa500
        ];

        this.winSound = new Audio(AUDIO.WIN_MUSIC);
        this.winSound.volume = 0.8;
    }

    drawWinningLines(details) {
        console.log("🎯 Рисуем выигрышные линии...");

        this.graphics.clear();

        if (details.length > 0) {
            this.playWinSound();
        }

        details.forEach(({Line, Matches}, index) => {
            const line = WINNING_LINES.LINES[Line];
            if (!line) {
                console.error(`❌ Ошибка: Линия ${Line} не найдена в WINNING_LINES.LINES`);
                return;
            }

            const color = this.lineColors[index % this.lineColors.length];
            this.drawLine(line, Matches, color);
        });
    }

    playWinSound() {
        this.winSound.currentTime = 0;
        this.winSound.play().catch(err => console.error("Ошибка воспроизведения звука выигрыша:", err));

        setTimeout(() => {
            this.winSound.pause();
            this.winSound.currentTime = 0;
        }, 1000);
    }

    drawLine(line, matches, color) {
        console.log(`🎨 Отрисовка линии ${line} (${matches} совпадений) цветом #${color.toString(16)}`);

        this.graphics.lineStyle(10, color, 0.8, 0.5, true);

        const startX = this.reels[0].container.x + this.REEL_WIDTH / 2;
        const startY = this.reels[0].container.y + line[0] * this.SYMBOL_SIZE + this.SYMBOL_SIZE / 2;
        this.graphics.moveTo(startX, startY);

        for (let i = 1; i < matches; i++) {
            const x = this.reels[i].container.x + this.REEL_WIDTH / 2;
            const y = this.reels[i].container.y + line[i] * this.SYMBOL_SIZE + this.SYMBOL_SIZE / 2;
            this.graphics.lineTo(x, y);
        }

        this.graphics.stroke();
        console.log(`✅ Линия ${line} успешно отрисована!`);
    }

    clearWinningLines() {
        console.log("🧹 Очистка линий...");
        this.graphics.clear();
    }
}
