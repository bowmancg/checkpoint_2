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
    weaponInventory: []
}

const weapons = [
    {
        name: 'Longsword',
        price: 0,
        damage: 10,
        image: 'https://static.miraheze.org/eldenringwiki/4/48/Longsword_Full.png'
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
        name: 'Marikas Hammer',
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

function drawWeapons() {
    let template = ''


    weapons.forEach(w => {
        template += `
        <div class="card bg-dark border border-secondary">
                    <img onclick="acquireWeapon('${w.name}')" class="card-img-top" src="${w.image}" alt="">
                    <div class="card-body">
                        <h5 class="card-title">${w.name}</h5>
                    </div>
                    <div class="card-footer">${w.price} runes</div>
                </div>
        `
    })
    document.getElementById('weapon-cards').innerHTML = template
}

function acquireWeapon(weaponName) {
    let currentWeapon = weapons.find(w => w.name == weaponName)
    if (!player.weaponInventory.some(w => w.name == weaponName)) {
        if (runes >= currentWeapon.price) {
            runes -= currentWeapon.price
            currentWeapon.price = Math.floor(currentWeapon.price * 1.1)
            player.currentWeapon = currentWeapon.name
            player.damage = currentWeapon.damage
            player.weaponInventory.push(currentWeapon)
            console.log(player);
            drawPlayerStats()
            drawInventory()
            drawWeapons()
        }
    }
}

function playerAttacksBoss() {
    if (boss.maxHealth <= 1000) {
        boss.maxHealth -= player.damage
    }
    else {
     boss.maxHealth = 0
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

let bleedInterval = null

function purchaseBleedEffect(){
    //purchase bleed for 100 runes
    if (runes >= 100) {
        runes -= 100
        bleedInterval = setInterval(() => {
            runes += 30
            boss.maxHealth -= 30
            if (boss.maxHealth <= 0){
                boss.maxHealth = 0  
                clearInterval(bleedInterval)
            } 
            drawBossStats()
            drawPlayerStats()
        }, 3000) 
    }
}

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

function drawInventory() {
    let template = ''
    player.weaponInventory.forEach(w => {
        template += `${w.name} `    
    })
    document.getElementById('inventory').innerHTML = template
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

drawInventory()
drawWeapons()
drawBossStats()
drawPlayerStats()