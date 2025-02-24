// images
import symbol1 from './assets/symbol1.png';
import symbol2 from './assets/symbol2.png';
import symbol3 from './assets/symbol3.png';
import symbol4 from './assets/symbol4.png';
// sounds
import backgroundSound from './assets/sounds/background.mp3';
import spinSound from './assets/sounds/spin.mp3';
import winSound from './assets/sounds/win.wav';

export const API_BASE_URL = "http://localhost:8000";

export const AUDIO = {
    BACKGROUND_MUSIC: backgroundSound,
    SPIN_MUSIC: spinSound,
    WIN_MUSIC: winSound,
};

export const SLOT_CONFIG = {
    REEL_WIDTH: 100,
    SYMBOL_SIZE: 100,
    REELS_COUNT: 5,
    ROWS_COUNT: 3,
    SPIN_SPEED: 300
};

export const WINNING_LINES = {
    LINES: [
        [1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0],
        [2, 2, 2, 2, 2],
        [0, 1, 2, 1, 0],
        [2, 1, 0, 1, 2],
        [1, 0, 1, 2, 1],
        [1, 2, 1, 0, 1],
        [0, 1, 1, 1, 2],
        [2, 1, 1, 1, 0],
        [0, 0, 1, 2, 2],
        [2, 2, 1, 0, 0],
        [0, 1, 0, 1, 0],
        [2, 1, 2, 1, 2],
        [1, 0, 0, 0, 1],
        [1, 2, 2, 2, 1],
        [0, 2, 1, 2, 0],
        [2, 0, 1, 0, 2],
        [1, 1, 0, 1, 1],
        [0, 2, 2, 2, 0],
        [2, 0, 0, 0, 2],
    ],
    COLOR: 0xffd700,
    LINE_WIDTH: 10
};

export const GRAPHICS = {
    BACKGROUND_IMAGE: "assets/background.jpg",
    SYMBOLS: [
        {alias: "symbol1", src: symbol1},
        {alias: "symbol2", src: symbol2},
        {alias: "symbol3", src: symbol3},
        {alias: "symbol4", src: symbol4}
    ]
};
