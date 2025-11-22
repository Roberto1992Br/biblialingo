import { formatTime } from './utils.js';

export const UI = {
    elements: {
        screens: document.querySelectorAll('.screen'),
        container: document.getElementById('game-container'),
        timer: document.getElementById('timer'),
        progressFill: document.getElementById('progress-fill'),
        lives: document.getElementById('lives-count'),
        lbList: document.getElementById('lb-list')
    },

    showScreen(id) {
        this.elements.screens.forEach(s => s.classList.remove('active-screen'));
        document.getElementById(id).classList.add('active-screen');
    },

    updateTimer(seconds) {
        this.elements.timer.innerText = formatTime(seconds);
    },

    updateProgress(current, total) {
        const pct = Math.max(0, Math.min(100, (current / total) * 100));
        this.elements.progressFill.style.width = `${pct}%`;
    },

    updateLives(lives) {
        const safeLives = Math.max(0, lives);
        this.elements.lives.innerText = safeLives;
        const container = this.elements.lives.parentElement;
        if(safeLives <= 1) container.classList.add('animate__animated', 'animate__heartBeat', 'animate__infinite');
        else container.classList.remove('animate__animated', 'animate__heartBeat');
    },

    renderQuestion(q, onInteract) {
        const container = this.elements.container;
        container.innerHTML = '';
        
        // Header Mascote
        const header = document.createElement('div');
        header.className = 'mascot-row animate__animated animate__fadeInLeft';
        header.innerHTML = `
            <div style="font-size:3rem; color:var(--primary); width:60px; text-align:center">
                <i class="fas fa-book-open"></i>
            </div>
            <div class="speech-bubble">
                <h3 style="margin-bottom:5px;color:var(--gold)">${q.title}</h3>
                <p>${q.text}</p>
            </div>
        `;
        container.appendChild(header);

        // Área Interativa
        const area = document.createElement('div');
        area.className = 'animate__animated animate__fadeInUp';
        
        if (q.type === 'input') {
            area.innerHTML = `<input type="text" id="text-input" class="text-input" placeholder="Digite sua resposta..." autocomplete="off">`;
        } 
        else if (q.type === 'multi') {
            q.options.forEach((opt, i) => {
                const btn = document.createElement('button');
                btn.className = 'option-card';
                btn.innerText = opt;
                btn.onclick = () => {
                    document.querySelectorAll('.option-card').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    onInteract({ type: 'multi', val: i });
                };
                area.appendChild(btn);
            });
        }
        else if (q.type === 'order') {
            area.innerHTML = `<div id="slots" class="word-slots"></div><div id="bank" class="word-slots" style="border:none;background:transparent;padding:0"></div>`;
        }

        container.appendChild(area);
        
        // Auto-focus no input
        if(q.type === 'input') setTimeout(() => document.getElementById('text-input').focus(), 500);
    },

    feedback(isCorrect, ref) {
        const container = this.elements.container;
        
        // Toast
        const toast = document.createElement('div');
        toast.style.position = 'absolute';
        toast.style.top = '50%';
        toast.style.left = '50%';
        toast.style.transform = 'translate(-50%, -50%)';
        toast.style.padding = '20px';
        toast.style.borderRadius = '10px';
        toast.style.background = isCorrect ? 'var(--primary)' : 'var(--error)';
        toast.style.color = 'white';
        toast.style.fontWeight = 'bold';
        toast.style.boxShadow = '0 5px 15px rgba(0,0,0,0.5)';
        toast.style.zIndex = '1000';
        toast.style.textAlign = 'center';
        toast.innerHTML = isCorrect ? 
            `<i class="fas fa-check"></i> Correto!<br><small style="font-weight:normal">${ref}</small>` : 
            `<i class="fas fa-times"></i> Incorreto!<br><small style="font-weight:normal">${ref}</small>`;
        
        container.appendChild(toast);
        
        if (!isCorrect) {
            container.classList.add('shake');
            setTimeout(() => container.classList.remove('shake'), 500);
        } else {
            confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 }, colors: ['#ffd700', '#ffffff'] });
        }

        setTimeout(() => {
            if(toast.parentNode) toast.parentNode.removeChild(toast);
        }, 1800);
    },

    updateLeaderboard(scores) {
        const list = this.elements.lbList;
        if(scores.length === 0) {
            list.innerHTML = '<li style="text-align:center;color:var(--text-muted)">Nenhum registro. Seja o primeiro sábio!</li>';
            return;
        }
        list.innerHTML = scores.map((s, i) => {
            let medal = i===0 ? '🥇' : i===1 ? '🥈' : i===2 ? '🥉' : `#${i+1}`;
            return `<li><span>${medal} <strong>${s.name}</strong></span> <span><span style="color:var(--primary)">${s.score}%</span> <small style="color:var(--text-muted)">(${formatTime(s.time)})</small></span></li>`;
        }).join('');
    },

    generateCertificate(name, score, time) {
        const canvas = document.getElementById('cert-canvas');
        const ctx = canvas.getContext('2d');
        
        // Background
        ctx.fillStyle = "#fdf6e3"; ctx.fillRect(0,0,800,600);
        
        // Borda
        ctx.lineWidth = 10; 
        ctx.strokeStyle = "#b58900"; 
        ctx.strokeRect(20,20,760,560);
        ctx.strokeRect(30,30,740,540);
        
        // Texto
        ctx.textAlign = "center";
        ctx.fillStyle = "#b58900"; ctx.font = "bold 50px serif"; ctx.fillText("CERTIFICADO DE SÁBIO", 400, 120);
        
        ctx.fillStyle = "#434c5e"; ctx.font = "30px sans-serif"; ctx.fillText("Concedido ao estudante das Escrituras", 400, 220);
        
        ctx.fillStyle = "#268bd2"; ctx.font = "bold 60px sans-serif"; ctx.fillText(name, 400, 320);
        
        ctx.fillStyle = "#434c5e"; ctx.font = "25px sans-serif"; ctx.fillText("Por concluir o Desafio Mestre do BíbliaLingo", 400, 400);
        
        ctx.fillStyle = "#657b83"; ctx.font = "20px sans-serif"; 
        ctx.fillText(`Sabedoria: ${score}% | Tempo: ${formatTime(time)}`, 400, 470);
        ctx.fillText(`"Lâmpada para os meus pés é a tua palavra." (Sl 119:105)`, 400, 530);

        document.getElementById('download-link').href = canvas.toDataURL();
        document.getElementById('download-link').download = `Certificado-BibliaLingo-${name}.png`;
    }
};