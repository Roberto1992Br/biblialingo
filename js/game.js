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
        
        // Definição de dificuldade
        let count = 15;
        if (mode === 'medium') count = 30;
        if (mode === 'hard') count = 51;
        
        this.state.qList = getQuestions(count);
        
        // Embaralhar as questões se for Prática
        if(mode === 'practice') {
            this.state.maxMistakes = Infinity;
            this.state.qList = shuffleArray(getQuestions(51));
        } else {
            this.state.maxMistakes = 3;
        }

        this.audio.playClick();
        
        UI.showScreen('game-screen');
        this.startTimer();
        this.updateHUD();
        this.loadQuestion();
    }

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

        // Renderiza UI
        UI.renderQuestion(q, (data) => {
            if (data.type === 'multi') this.state.currentMulti = data.val;
        });

        // Lógica de Ordenação (Drag/Click)
        if (q.type === 'order') {
            const bank = document.getElementById('bank');
            const slots = document.getElementById('slots');
            const blocks = shuffleArray(q.blocks.map((v, i) => ({v, i})));
            
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
                
                // Validação Fuzzy (normaliza acentos e caixa)
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
            setTimeout(() => this.loadQuestion(), 2000); // Tempo maior para ler a referência
        } else {
            this.audio.playError();
            UI.feedback(false, `Ref: ${q.ref}`);
            
            if (this.state.mode !== 'practice') {
                this.state.mistakes++;
                
                // Penalidades
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
        
        // Esconde áreas dinâmicas para resetar
        document.getElementById('highscore-area').classList.add('hidden');
        document.getElementById('certificate-area').classList.add('hidden');
        document.getElementById('cert-display').classList.add('hidden');

        const title = document.getElementById('end-title');
        
        if (completed) {
            title.innerText = "Jornada Completa!";
            title.style.color = "var(--primary)";

            if (this.state.mode === 'hard') {
                if (checkHighscore(pct, this.state.time)) {
                    document.getElementById('highscore-area').classList.remove('hidden');
                    // Pequeno delay para focar
                    setTimeout(() => document.getElementById('rank-name').focus(), 500);
                }
                if (pct >= 90 && this.state.mistakes === 0) {
                    this.audio.playWin();
                    document.getElementById('certificate-area').classList.remove('hidden');
                }
            }
        } else {
            title.innerText = "Fim da Graça";
            title.style.color = "var(--error)";
        }
    }
}