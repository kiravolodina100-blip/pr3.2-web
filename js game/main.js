function renderHPLife() {
    this.elHP.innerText = `${this.damageHP} / ${this.defaultHP}`;
}

function renderProgressbar() {
    const percent = (this.damageHP * 100) / this.defaultHP;
    this.elProgressbar.style.width = percent + '%';
    
    const elBar = this.elProgressbar;
    elBar.classList.remove('low', 'critical');
    if (percent < 20) {
        elBar.classList.add('critical');
    } else if (percent < 50) {
        elBar.classList.add('low');
    }
}

function render() {
    this.renderHPLife();
    this.renderProgressbar();
}

const character = {
    name: 'Pikachu',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
    renderHPLife: renderHPLife,
    renderProgressbar: renderProgressbar,
    render: render
};

const enemy1 = {
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
    renderHPLife: renderHPLife,
    renderProgressbar: renderProgressbar,
    render: render
};

const enemy2 = {
    name: 'Bulbasaur',
    defaultHP: 120,
    damageHP: 120,
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
    renderHPLife: renderHPLife,
    renderProgressbar: renderProgressbar,
    render: render
};

let currentEnemy = enemy1; 

const $btnKick = document.getElementById('btn-kick');
const $btnSuperKick = document.getElementById('btn-super-kick');

function random(num) {
    return Math.floor(Math.random() * (num + 1));
}

function attack(attacker, receiver, minDamage, maxDamage) {
    const damage = random(maxDamage - minDamage) + minDamage;
    receiver.damageHP -= damage;

    if (receiver.damageHP <= 0) {
        receiver.damageHP = 0;
        alert(`${receiver.name} програв бій!`);
        $btnKick.disabled = true;
        if ($btnSuperKick)$btnSuperKick.disabled = true;
    }

    receiver.render();
}

$btnKick.addEventListener('click', function () {
    console.log('Звичайний удар!');
    attack(character, currentEnemy, 0, 15);
    
    if (currentEnemy.damageHP > 0) {
        attack(currentEnemy, character, 0, 15);
    }
});

if ($btnSuperKick) {$btnSuperKick.addEventListener('click', function () {
        console.log('Спеціальний супер-удар!');
        attack(character, currentEnemy, 10, 30);
        
        if (currentEnemy.damageHP > 0) {
            attack(currentEnemy, character, 5, 20);
        }
    });
}

window.addEventListener('DOMContentLoaded', () => {
    character.render();
    currentEnemy.render();
});