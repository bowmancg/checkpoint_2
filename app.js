let runes = 0

const boss = {
    name: 'Malenia',
    health: 1000,
    maxHealth: 1000,
    damage: 30,
    currentWeapon: 'Hand of Malenia'
}

const player = {
    name: 'The Tarnished',
    health: 100,
    damage: 10,
    currentWeapon: 'Longsword',
}

let clickWeapon = [
    {
        name: 'Greatsword',
        price: 100,
        damage: 50,
        quantity: 0,
    },
    {
        name: 'Carian Longsword',
        price: 50,
        damage: 30,
        quantity: 0
    }
]


function acquireWeapon(name) {
    let currentWeapon = weapon.find(w => w.name == name)
    if (runes >= currentWeapon.price) {
        currentWeapon++
        runes -= currentWeapon.price
        drawPlayerStats()
    }
}

function playerAttacksBoss() {
    let tarnishedDamage = player.damage
    if (boss.maxHealth <= 1000) {
        boss.maxHealth -= tarnishedDamage
    }
    drawBossStats()
}

function acquireRunes() {
    if (boss.maxHealth != 1000) 
        runes += 30
    playerAttacksBoss()
    drawRunes()
}

function bossAttacksPlayer() {
    setInterval(() => {
        player.health -= boss.damage
        drawPlayerStats()
    }, 3000)
}

function drawPlayerStats() {
    let runeElem = document.getElementById('runes')
    let playerHealthElem = document.getElementById('playerHealth-elem')
    let playerDamageElem = document.getElementById('playerDamage-elem')
    if (player.health <= 0) {
        stopInterval()
        setTimeout(() => {
            window.alert('You Died')
        }, 200)
    }
}

function drawBossStats() {
    let bossStatsTemplate = ''
    bossStatsTemplate += `
    <div class="card-body text-danger fs-5 text-center">
                    <span id="health-bar">${boss.maxHealth}</span>
                </div>
    `
    document.getElementById('health-bar').innerHTML = bossStatsTemplate
    if (boss.maxHealth <= 0) {
        stopInterval()
        setTimeout(() => {
            window.alert('Demigod Slain')
        }, 200)
    }
}

function bossHit() {
    if (boss.maxHealth > 0) {
        boss.maxHealth -= 10
        runes += 25
        drawBossStats()
        drawPlayerStats()
    }
}

function stopInterval() {
    clearInterval(bossHit())
}

drawBossStats()
drawPlayerStats()