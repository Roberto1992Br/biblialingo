export function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export function normalizeText(text) {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}

export function getLeaderboard() {
    return JSON.parse(localStorage.getItem('biblia_lb_hard') || '[]');
}

export function checkHighscore(score, time) {
    const lb = getLeaderboard();
    if (lb.length < 5) return true;
    const last = lb[lb.length - 1];
    if (score > last.score) return true;
    if (score === last.score && time < last.time) return true;
    return false;
}

export function saveHighscore(name, score, time) {
    let lb = getLeaderboard();
    lb.push({ name, score, time, date: new Date().toISOString() });
    
    lb.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score; 
        return a.time - b.time; 
    });

    lb = lb.slice(0, 5);
    localStorage.setItem('biblia_lb_hard', JSON.stringify(lb));
    return lb;
}