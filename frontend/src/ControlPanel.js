import { Container, Text } from 'pixi.js';
import ApiService from './api.js';

export default class ControlPanel extends Container {
    constructor(app) {
        super();

        this.balance = 2000;
        this.bet = 100;
        this.lines = 10;

        this.balanceText = new Text(`Balance: ${this.balance}`, { fontSize: 20, fill: '#fff' });
        this.betText = new Text(`Bet: ${this.bet}`, { fontSize: 20, fill: '#fff' });
        this.linesText = new Text(`Lines: ${this.lines}`, { fontSize: 20, fill: '#fff' });

        this.balanceText.y = 10;
        this.betText.y = 40;
        this.linesText.y = 70;

        this.addChild(this.balanceText);
        this.addChild(this.betText);
        this.addChild(this.linesText);

        this.x = 20;
        this.y = app.screen.height - 100;

        this.loadBalance();
    }

    async loadBalance() {
        try {
            const data = await ApiService.getBalance();
            if (data && data.balance !== undefined) {
                this.updateBalance(data.balance);
            }
        } catch (error) {
            console.error('Ошибка загрузки баланса:', error);
        }
    }

    updateBalance(amount) {
        this.balance = amount;
        this.balanceText.text = `Balance: ${this.balance}`;
    }

    setBet(amount) {
        this.bet = amount;
        this.betText.text = `Bet: ${this.bet}`;
    }

    setLines(count) {
        this.lines = count;
        this.linesText.text = `Lines: ${this.lines}`;
    }
}
