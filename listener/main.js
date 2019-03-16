const input = document.querySelector('.input');
const output = document.querySelector('.output');

subscribeOnLetter(input, 'a', inputHandler);
subscribeOnLetter(input, 'b', inputHandler);
subscribeOnLetter(input, 'c', function () {
    alert('Please don`t type C!');
});

function inputHandler (e) {
    output.textContent += e;
}

function subscribeOnLetter (el, letter, callback) {
    
    let prevLen = 0;

    function check () {

        let val = el.value,
            len = val.length;

        if (len !== prevLen && val[len-1] === letter) {
            prevLen = len;
            callback(letter);
        };
    }

    setInterval(check, 100);
}