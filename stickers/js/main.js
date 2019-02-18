(function(){// DOM-nodes:
const colFirst = document.querySelector('.column:first-child');
const colLast = document.querySelector('.column:last-child');
const items = document.querySelectorAll('.item');

// The shuttle creating
const shuttle = document.createElement("div");
shuttle.classList.add('shuttle', 'item');
document.querySelector('body').appendChild(shuttle);
            
// Initial values:
let isHandling = false;
let x0, y0;
let x = 0, y = 0;
let card;

// Events:
items.forEach(item => {
    item.addEventListener('mousedown', down);
});
window.addEventListener('mousemove', move);

// Functions:
function down(e) {
    if (!e.target.matches('.item')) { return; }
    e.preventDefault();

    isHandling = true;
    x = 0, y = 0;
    card = e.target;
    x0 = card.offsetLeft; y0 = card.offsetTop;
    let width = card.clientWidth;

    e.target.style.opacity = 0.3;

    shuttle.style.display = 'block';
    shuttle.style.left = `${x0}px`;
    shuttle.style.top = `${y0}px`;
    shuttle.style.width = `${width}px`;

    shuttle.addEventListener('mouseup', up);
    shuttle.addEventListener('mouseleave', up);
    console.log(e);
}

function up(e) {
    if (!e.target.matches('.item')) { return; }
    e.preventDefault();

    isHandling = false;
    shuttle.style.display = 'none';

    if (e.x > document.body.clientWidth - colLast.clientWidth && x0 < colFirst.clientWidth) {
        colFirst.removeChild(card);
        ( e.relatedTarget === null ) ? colLast.appendChild(card) : colLast.insertBefore(card, e.relatedTarget);
    }
    if (e.x < colFirst.clientWidth && x0 > document.body.clientWidth - colLast.clientWidth) {
        colLast.removeChild(card);
        ( e.relatedTarget === null ) ? colFirst.appendChild(card) : colFirst.insertBefore(card, e.relatedTarget);
    }
    
    card.style.opacity = 1;

    shuttle.removeEventListener('mouseup', up);
    shuttle.removeEventListener('mouseleave', up);
    console.log(e);
}

function move(e) {
    if (!isHandling) { return; }
    e.preventDefault();
    
    x += e.movementX; y += e.movementY;
    shuttle.style.transform = `translate(${x}px, ${y}px) rotate(15deg)`;
}
})();