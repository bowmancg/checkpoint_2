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

const weapons = [
    {
        name: 'Longsword',
        price: 0,
        damage: 10,
    },
    {
        name: 'Greatsword',
        price: 100,
        damage: 50,
        image: 'https://static.miraheze.org/eldenringwiki/7/7c/Greatsword_Full.png?20220601085645'
    },
    {
        name: 'Carian Longsword',
        price: 50,
        damage: 30,
        image: 'https://static.miraheze.org/eldenringwiki/7/76/Carian_Knight%27s_Sword_Full.png'
    },
    {
        name: 'Marika\'s Hammer',
        price: 180,
        damage: 150,
        image: 'https://static.miraheze.org/eldenringwiki/e/e7/Marika%27s_Hammer_Full.png'
    },
    {
        name: 'Moonveil Katana',
        price: 120,
        damage: 90,
        image: 'https://static.miraheze.org/eldenringwiki/2/2c/Moonveil_Full.png'
    }
]


function acquireWeapon(weaponName) {
    let currentWeapon = weapons.find(w => w.name == weaponName)
    if (runes >= currentWeapon.price) {
        runes -= currentWeapon.price
        player.currentWeapon = currentWeapon.name
        player.damage = currentWeapon.damage
        drawPlayerStats()
    }
}

function playerAttacksBoss() {
    if (boss.maxHealth <= 1000) {
        boss.maxHealth -= player.damage
    }
    hitBoss()
}

// function acquireRunes() {
//     if (boss.maxHealth != 1000) runes += 30
//     playerAttacksBoss()
// }

let bossAttack = setInterval(() => {
    player.health -= boss.damage
    if (player.health < 0) player.health = 0
    drawPlayerStats()
}, 3000)

function drawPlayerStats() {
    let runeElem = document.getElementById('runes')
    let playerWeaponElem = document.getElementById('current-weapon')
    let playerHealthElem = document.getElementById('playerHealth-elem')
    let playerDamageElem = document.getElementById('playerDamage-elem')
    runeElem.innerText = runes
    playerHealthElem.innerText = player.health.toString()
    playerWeaponElem.innerText = player.currentWeapon
    playerDamageElem.innerText = player.damage.toString()
    if (player.health <= 0) {
        stopInterval()
        setTimeout(() => {
            // window.alert('You Died')
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

function hitBoss() {
    if (boss.maxHealth >= 0) {
        runes += 30
        drawBossStats()
        drawPlayerStats()
    }
}

function stopInterval() {
    clearInterval(bossAttack)
}

drawBossStats()
drawPlayerStats()