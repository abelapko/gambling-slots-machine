import {API_BASE_URL} from './config.js';

const ApiService = {
    async spin(bet, lines) {
        const formData = new FormData();
        formData.append("bet", bet);
        formData.append("lines", lines);

        const response = await fetch(`${API_BASE_URL}/spin`, {
            method: "POST",
            body: formData,
            credentials: "include"
        });

        return response.json();
    },

    async getBalance() {
        const response = await fetch(`${API_BASE_URL}/balance`, {
            credentials: "include"
        });

        return response.json();
    },

    async restartGame() {
        fetch(`${API_BASE_URL}/restart`, {method: 'POST', credentials: 'include'})
            .then(() => location.reload());
    },
};

export default ApiService;
