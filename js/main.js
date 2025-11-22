import { Game } from './game.js';
import { UI } from './ui.js';
import { getLeaderboard, saveHighscore } from './utils.js';

const game = new Game();

document.addEventListener('DOMContentLoaded', () => {
    console.log("BíbliaLingo Iniciado"); // Para debug

    // 1. Seleção de Modo (O clique acontece aqui)
    const modeButtons = document.querySelectorAll('.btn-mode');
    modeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            console.log("Modo clicado:", btn.dataset.mode); // Debug
            game.start(btn.dataset.mode);
        });
    });

    // 2. Controles do Jogo
    const btnCheck = document.getElementById('btn-check');
    if(btnCheck) btnCheck.addEventListener('click', () => game.checkAnswer());
    
    const btnHint = document.getElementById('btn-hint');
    if(btnHint) btnHint.addEventListener('click', () => {
        // Penalidade de tempo
        game.state.time += 15; 
        UI.updateTimer(game.state.time);
        
        const q = game.state.qList[game.state.qIndex];
        // Mostra a referência bíblica como dica ou a dica específica
        alert(`Dica Espiritual: ${q.hint || 'Leia ' + q.ref}`);
    });

    const btnQuit = document.getElementById('btn-quit');
    if(btnQuit) btnQuit.addEventListener('click', () => {
        if(confirm("Deseja abandonar a jornada atual?")) location.reload();
    });

    const btnHome = document.getElementById('btn-home');
    if(btnHome) btnHome.addEventListener('click', () => location.reload());

    // 3. Salvar no Ranking
    const btnSave = document.getElementById('btn-save-rank');
    if(btnSave) btnSave.addEventListener('click', () => {
        const nameInput = document.getElementById('rank-name');
        const name = nameInput.value.trim();
        
        if (!name) {
            alert("Por favor, digite seu nome bíblico.");
            return;
        }

        const pct = Math.round((game.state.score / game.state.qList.length) * 100);
        const newLb = saveHighscore(name, pct, game.state.time);
        
        document.getElementById('highscore-area').innerHTML = `<p style="color:var(--gold); font-weight:bold">Seu nome foi escrito no livro dos recordes!</p>`;
    });

    // 4. Certificado
    const btnCert = document.getElementById('btn-show-cert');
    if(btnCert) btnCert.addEventListener('click', () => {
        let playerName = document.getElementById('rank-name').value.trim();
        if (!playerName) {
            playerName = prompt("Digite seu nome para o certificado:");
        }

        if (playerName) {
            UI.generateCertificate(playerName, 100, game.state.time);
            const display = document.getElementById('cert-display');
            display.classList.remove('hidden');
            display.scrollIntoView({ behavior: 'smooth' });
        }
    });

    // 5. Carregar Leaderboard na tela inicial
    const lb = getLeaderboard();
    UI.updateLeaderboard(lb);
});