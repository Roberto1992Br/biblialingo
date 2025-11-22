import { getQuestions } from './questions.js';
import { UI } from './ui.js';
import { AudioManager } from './audio.js';
import { shuffleArray, checkHighscore, normalizeText, formatTime } from './utils.js';

export class Game {
    constructor() {
        this.audio = new AudioManager();
        this.state = {
            mode: 'easy',
            qList: [],
            qIndex: 0,
            mistakes: 0,
            score: 0,
            time: 0,
            timerId: null,
            maxMistakes: 3,
            parsonsUser: [],
            currentMulti: null
        };
    }

    start(mode) {
        this.state.mode = mode;
        this.state.time = 0;
        this.state.mistakes = 0;
        this.state.qIndex = 0;
        this.state.score = 0;
        this.state.parsonsUser = [];
        
        // PEGA AS PERGUNTAS ESPECÍFICAS DO MODO
        this.state.qList = getQuestions(mode);
        
        // No modo prática, embaralha tudo. Nos outros, mantém ordem pedagógica? 
        // Como as listas agora são fixas, podemos embaralhar para não ficar repetitivo se ele jogar de novo.
        if (mode !== 'practice') {
            // Embaralhar levemente as perguntas dentro do nível para replay
            this.state.qList = shuffleArray(this.state.qList); 
        } else {
            this.state.maxMistakes = Infinity;
            this.state.qList = shuffleArray(this.state.qList);
        }

        this.state.maxMistakes = (mode === 'practice') ? Infinity : 3;

        this.audio.playClick();
        
        UI.showScreen('game-screen');
        this.startTimer();
        this.updateHUD();
        this.loadQuestion();
    }

    // ... (startTimer, loadQuestion, checkAnswer, updateHUD permanecem IGUAIS ao anterior) ...
    // Vou colocar apenas as funções que não mudaram para economizar espaço, 
    // copie do código anterior ou mantenha o que já tem.
    // O importante é o método FINISH abaixo.

    startTimer() {
        if(this.state.timerId) clearInterval(this.state.timerId);
        if(this.state.mode === 'practice') {
            UI.updateTimer(0);
            return;
        }
        this.state.timerId = setInterval(() => {
            this.state.time++;
            UI.updateTimer(this.state.time);
        }, 1000);
    }

    loadQuestion() {
        if (this.state.qIndex >= this.state.qList.length) return this.finish(true);
        
        const q = this.state.qList[this.state.qIndex];
        this.state.currentMulti = null;
        this.state.parsonsUser = [];

        UI.renderQuestion(q, (data) => {
            if (data.type === 'multi') this.state.currentMulti = data.val;
        });

        if (q.type === 'order') {
            const bank = document.getElementById('bank');
            const slots = document.getElementById('slots');
            // Clonar para não estragar o original
            const blocks = shuffleArray([...q.blocks].map((v, i) => ({v, i})));
            
            blocks.forEach(item => {
                const chip = document.createElement('div');
                chip.className = 'word-chip';
                chip.innerText = item.v;
                chip.onclick = () => {
                    if (chip.classList.contains('selected')) return;
                    this.audio.playClick();
                    chip.classList.add('selected');
                    
                    const slotChip = chip.cloneNode(true);
                    slotChip.classList.remove('selected');
                    slotChip.onclick = () => {
                        slotChip.remove();
                        chip.classList.remove('selected');
                        this.state.parsonsUser = this.state.parsonsUser.filter(id => id !== item.i);
                    };
                    slots.appendChild(slotChip);
                    this.state.parsonsUser.push(item.i);
                };
                bank.appendChild(chip);
            });
        }
    }

    checkAnswer() {
        const q = this.state.qList[this.state.qIndex];
        let isCorrect = false;

        try {
            if (q.type === 'input') {
                const input = document.getElementById('text-input').value.trim();
                if (!input) return; 
                const normalizedInput = normalizeText(input);
                isCorrect = q.check.some(correct => normalizeText(correct) === normalizedInput);
            }
            else if (q.type === 'multi') {
                isCorrect = this.state.currentMulti === q.answer;
            }
            else if (q.type === 'order') {
                isCorrect = JSON.stringify(this.state.parsonsUser) === JSON.stringify(q.correct);
            }
        } catch (e) { isCorrect = false; }

        if (isCorrect) {
            this.audio.playSuccess();
            UI.feedback(true, q.ref);
            this.state.score++;
            this.state.qIndex++;
            setTimeout(() => this.loadQuestion(), 2000);
        } else {
            this.audio.playError();
            UI.feedback(false, `Ref: ${q.ref}`);
            
            if (this.state.mode !== 'practice') {
                this.state.mistakes++;
                
                // Penalidades mais severas conforme pedido
                if (this.state.mode === 'medium') this.state.qIndex = Math.max(0, this.state.qIndex - 1);
                if (this.state.mode === 'hard') this.state.qIndex = Math.max(0, this.state.qIndex - 2);
                
                if (this.state.mistakes > this.state.maxMistakes) {
                    return this.finish(false);
                }
            }
        }
        this.updateHUD();
    }

    updateHUD() {
        UI.updateProgress(this.state.qIndex, this.state.qList.length);
        UI.updateLives(this.state.maxMistakes - this.state.mistakes);
    }

    finish(completed) {
        clearInterval(this.state.timerId);
        UI.showScreen('end-screen');
        
        const pct = Math.round((this.state.score / this.state.qList.length) * 100) || 0;
        document.getElementById('res-score').innerText = `${pct}%`;
        document.getElementById('res-time').innerText = this.state.mode === 'practice' ? '--:--' : formatTime(this.state.time);
        
        // Esconde áreas
        document.getElementById('highscore-area').classList.add('hidden');
        document.getElementById('certificate-area').classList.add('hidden');
        document.getElementById('cert-display').classList.add('hidden');

        const title = document.getElementById('end-title');
        
        if (completed) {
            title.innerText = "Vitória!";
            title.style.color = "var(--primary)";

            // --- LÓGICA DE DESBLOQUEIO DE NÍVEIS ---
            if (this.state.mode === 'easy') {
                localStorage.setItem('biblia_unlock_medium', 'true');
                setTimeout(() => alert("🎉 Parabéns! Você desbloqueou o modo DISCÍPULO!"), 500);
            }
            if (this.state.mode === 'medium') {
                localStorage.setItem('biblia_unlock_hard', 'true');
                setTimeout(() => alert("🔥 Incrível! Você desbloqueou o modo TEÓLOGO (Mestre)!"), 500);
            }

            // --- LÓGICA HARD MODE (Ranking & Certificado) ---
            if (this.state.mode === 'hard') {
                
                // Ranking (Top 5)
                if (checkHighscore(pct, this.state.time)) {
                    document.getElementById('highscore-area').classList.remove('hidden');
                    setTimeout(() => document.getElementById('rank-name').focus(), 500);
                }

                // Certificado (Apenas 100% e sem erros fatais, mas como completed=true, ele sobreviveu)
                // O requisito é 100% de acertos no score.
                // Como há penalidade de recuo, score pode ser alto, mas pct é baseado em questões únicas.
                // Se ele acertou todas as 51, o score deve ser >= 51 (devido a recuos, ele pode ter acertado mais vezes a mesma pergunta? Não, o score incrementa ao passar).
                // Ajuste simples: Se pct == 100.
                if (pct === 100) {
                    this.audio.playWin();
                    document.getElementById('certificate-area').classList.remove('hidden');
                }
            }
        } else {
            title.innerText = "Não desista!";
            title.style.color = "var(--error)";
        }
    }
}