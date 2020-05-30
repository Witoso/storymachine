let icons = [
    'fas fa-ambulance',
    'fas fa-anchor',
    'fas fa-baby',
    'fas fa-baby-carriage',
    'fas fa-balance-scale',
    'fas fa-basketball-ball',
    'fas fa-bath',
    'fas fa-bed',
    'fas fa-bell',
    'fas fa-biking',
    'fas fa-birthday-cake',
    'fas fa-blender',
    'fas fa-blind',
    'fas fa-bolt',
    'fas fa-bomb',
    'fas fa-book',
    'fas fa-box-tissue',
    'fas fa-bowling-ball',
    'fas fa-box',
    'fas fa-broom',
    'fas fa-bug',
    'fas fa-bus',
    'fas fa-camera',
    'fas fa-campground',
    'fas fa-car',
    'fas fa-car-crash',
    'fas fa-carrot',
    'fas fa-cat',
    'fas fa-chair',
    'fas fa-city',
    'fas fa-cloud-rain',
    'fas fa-cocktail',
    'fas fa-coffee',
    'fas fa-compass',
    'fas fa-coins',
    'fas fa-couch',
    'fas fa-crow',
    'fas fa-crown',
    'fas fa-dice',
    'fas fa-dog',
    'fas fa-dragon',
    'fas fa-egg',
    'fas fa-feather',
    'fas fa-fire',
    'fas fa-fish',
    'fas fa-ghost',
    'fas fa-gift',
    'fas fa-glass-cheers',
    'fas fa-glasses',
    'fas fa-globe-europe',
    'fas fa-guitar',
    'fas fa-hamburger',
    'fas fa-hammer',
    'fas fa-helicopter',
    'fas fa-hiking',
    'fas fa-hippo',
    'fas fa-home',
    'fas fa-horse',
    'fas fa-hotdog',
    'fas fa-ice-cream',
    'fas fa-igloo',
    'fas fa-key',
    'fas fa-kiwi-bird',
    'fas fa-laptop',
    'fas fa-magnet',
    'fas fa-marker',
    'fas fa-mask',
    'fas fa-medal',
    'fas fa-meteor',
    'fas fa-microscope',
    'fas fa-mobile-alt',
    'fas fa-money-bill-alt',
    'fas fa-motorcycle',
    'fas fa-mountain',
    'fas fa-music',
    'fas fa-paw',
    'fas fa-people-carry',
    'fas fa-phone',
    'fas fa-pizza-slice',
    'fas fa-plane',
    'fas fa-poop',
    'fas fa-road',
    'fas fa-robot',
    'fas fa-rocket',
    'fas fa-running',
    'fas fa-ship',
    'fas fa-shopping-cart',
    'fas fa-shower',
    'fas fa-skating',
    'fas fa-skiing',
    'fas fa-snowflake',
    'fas fa-snowman',
    'fas fa-soap',
    'fas fa-socks',
    'fas fa-spider',
    'fas fa-stethoscope',
    'fas fa-swimming-pool',
    'fas fa-taxi',
    'fas fa-theater-masks',
    'fas fa-tools',
    'fas fa-tractor',
    'fas fa-trophy',
    'fas fa-umbrella',
    'fas fa-tv',
    'fas fa-umbrella-beach',
    'fas fa-utensils',
    'fas fa-water',
    'fas fa-wind',
    'far fa-angry',
    'far fa-clock',
    'far fa-credit-card',
    'far fa-envelope',
    'far fa-eye',
    'far fa-frown',
    'far fa-futbol',
    'far fa-gem',
    'far fa-grimace',
    'far fa-grin',
    'far fa-grin-tears',
    'far fa-heart',
    'far fa-hourglass',
    'far fa-kiss',
    'far fa-laugh',
    'far fa-lemon',
    'far fa-life-ring',
    'far fa-lightbulb',
    'far fa-map',
    'far fa-moon',
    'far fa-paper-plane',
    'far fa-sad-cry',
    'far fa-smile',
    'far fa-star',
    'far fa-sun'
]


const SLOTS_PER_REEL = 12;
// radius = Math.round( ( panelWidth / 2) / Math.tan( Math.PI / SLOTS_PER_REEL ) ); 
// current settings give a value of 149, rounded to 150
const REEL_RADIUS = 150;

function createSlots (ring) {

    let slotAngle = 360 / SLOTS_PER_REEL;

    for (let i = 0; i < SLOTS_PER_REEL; i ++) {
        let slot = document.createElement('div');

        slot.className = 'slot';

        // compute and assign the transform for this slot
        let transform = 'rotateX(' + (slotAngle * i) + 'deg) translateZ(' + REEL_RADIUS + 'px)';

        slot.style.transform = transform;

        let p = document.createElement('p');
        let icon = document.createElement('i');
        let iconClasses = pickIcon().split(' ');

        icon.classList.add(iconClasses[0], iconClasses[1]);

        p.appendChild(icon);
        slot.appendChild(p);
        ring.appendChild(slot);
    }
}

function getSeed() {
    // generate random number smaller than 13 then floor it to settle between 0 and 12 inclusive
    return Math.floor(Math.random()*(SLOTS_PER_REEL));
}

function spin(timer) {
    //var txt = 'seeds: ';
    for(let i = 1; i < 9; i++) {
        let oldSeed = -1;
        let ring = document.getElementById('ring' + i);

        /*
        checking that the old seed from the previous iteration is not the same as the current iteration;
        if this happens then the reel will not spin at all
        */
        let oldClass = ring.className
        console.log(oldClass)
        if(oldClass.length > 4) {
            oldSeed = parseInt(oldClass.slice(10));
        }
        var seed = getSeed();
        while(oldSeed == seed) {
            seed = getSeed();
        }

        ring.style.animation = 'back-spin 1s, spin-' + seed + ' ' + (timer + i*0.5) + 's';
        ring.className = '';
        ring.classList.add('ring','spin-' + seed);
    }
}

function pickIcon() {
    let index = Math.floor(Math.random() * icons.length);
    let icon = icons[index];
    icons.splice(index, 1);
    return icon;
}


let ready = (callback) => {
    if (document.readyState != "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
}

ready(() => {
    // initiate slots 
    createSlots(document.getElementById('ring1'));
    createSlots(document.getElementById('ring2'));
    createSlots(document.getElementById('ring3'));
    createSlots(document.getElementById('ring4'));
    createSlots(document.getElementById('ring5'));
    createSlots(document.getElementById('ring6'));
    createSlots(document.getElementById('ring7'));
    createSlots(document.getElementById('ring8'));

    // hook start button
    document.querySelector('.go').addEventListener('click',function(){
        var timer = 2;
        spin(timer);
    })

    document.querySelector('.fa-info-circle').addEventListener('click', function() {
        document.querySelector('.description').classList.toggle('hidden');
    });
});

