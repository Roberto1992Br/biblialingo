import { Game } from './game.js';
import { UI } from './ui.js';
import { getLeaderboard, saveHighscore, formatTime } from './utils.js';

const game = new Game();

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. ATUALIZAR UI DE PROGRESSÃO (LOCKS) ---
    updateModeLocks();

    // --- 2. SELEÇÃO DE MODO ---
    document.querySelectorAll('.btn-mode').forEach(btn => {
        btn.addEventListener('click', () => {
            const mode = btn.dataset.mode;
            
            // Verificar Bloqueio
            if (btn.classList.contains('locked')) {
                alert("🔒 Modo Bloqueado!\nComplete o nível anterior para liberar.");
                return;
            }

            game.start(mode);
        });
    });

    // --- 3. CONTROLES DO JOGO ---
    document.getElementById('btn-check').addEventListener('click', () => game.checkAnswer());
    
    document.getElementById('btn-hint').addEventListener('click', () => {
        game.state.time += 15; 
        UI.updateTimer(game.state.time);
        const q = game.state.qList[game.state.qIndex];
        alert(`💡 DICA DIVINA:\nLeia em: ${q.ref}`);
    });

    document.getElementById('btn-quit').addEventListener('click', () => {
        if(confirm("Deseja encerrar sua jornada agora?")) location.reload();
    });

    document.getElementById('btn-home').addEventListener('click', () => location.reload());

    // --- 4. SALVAR RANKING ---
    document.getElementById('btn-save-rank').addEventListener('click', () => {
        const nameInput = document.getElementById('rank-name');
        const name = nameInput.value.trim();
        
        if (!name) return alert("Por favor, digite seu nome bíblico.");

        const pct = Math.round((game.state.score / game.state.qList.length) * 100);
        const newLb = saveHighscore(name, pct, game.state.time);
        
        document.getElementById('highscore-area').innerHTML = `<p style="color:var(--gold); font-weight:bold; margin-top:10px">✨ Seu nome foi escrito no Livro dos Sábios! ✨</p>`;
    });

    // --- 5. CERTIFICADO ---
    document.getElementById('btn-show-cert').addEventListener('click', () => {
        let playerName = document.getElementById('rank-name').value.trim();
        if (!playerName) playerName = prompt("Qual nome deve constar no certificado?");
        
        if (playerName) {
            UI.generateCertificate(playerName, 100, game.state.time);
            const display = document.getElementById('cert-display');
            display.classList.remove('hidden');
            display.scrollIntoView({ behavior: 'smooth' });
        }
    });

    // --- 6. LEADERBOARD ---
    const lb = getLeaderboard();
    UI.updateLeaderboard(lb);
});

// Função Auxiliar para gerenciar Cadeados
function updateModeLocks() {
    const mediumUnlocked = localStorage.getItem('biblia_unlock_medium') === 'true';
    const hardUnlocked = localStorage.getItem('biblia_unlock_hard') === 'true';

    const btnMedium = document.querySelector('[data-mode="medium"]');
    const btnHard = document.querySelector('[data-mode="hard"]');

    // Configurar botão Médio
    if (!mediumUnlocked) {
        lockButton(btnMedium, "Complete o modo Iniciante");
    } else {
        unlockButton(btnMedium);
    }

    // Configurar botão Difícil
    if (!hardUnlocked) {
        lockButton(btnHard, "Complete o modo Discípulo");
    } else {
        unlockButton(btnHard);
    }
}

function lockButton(btn, msg) {
    btn.classList.add('locked');
    btn.style.opacity = "0.6";
    btn.style.filter = "grayscale(1)";
    // Adicionar ícone de cadeado se não tiver
    if (!btn.querySelector('.fa-lock')) {
        const iconDiv = btn.querySelector('.mode-icon');
        iconDiv.innerHTML = '<i class="fas fa-lock"></i>';
        const infoP = btn.querySelector('.mode-info p');
        infoP.innerText = "🔒 " + msg;
    }
}

function unlockButton(btn) {
    btn.classList.remove('locked');
    btn.style.opacity = "1";
    btn.style.filter = "none";
    // (O ícone original está no HTML estático, ao recarregar a página ele volta, 
    // mas se quiséssemos dinâmica total teríamos que restaurar o ícone aqui)
}