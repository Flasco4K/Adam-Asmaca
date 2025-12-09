const word_el = document.getElementById('word');
const popup = document.getElementById('popup-container');
const message_el = document.getElementById('success-message');
const wrongLetters_el = document.getElementById('wrong-letters');
const items = document.querySelectorAll('.item');
const message = document.getElementById('message');
const PlayAgainbtn = document.getElementById('play-again');

const correctLetters = []; //Doğru Harfler
const wrongLetters = [] //Hatalı Harfler
let selectedWord = getRandomWord(); //İlk Kelimeyi Getirme



function getRandomWord() { //Rastgele Kelime Getirecek
    const words = ["ankara", "antalya", "malatya", "van", "obez"]
    return words[Math.floor(Math.random() * words.length)];
}


function displayWord() {
    word_el.innerHTML = ` 
        ${selectedWord.split('').map(letter => ` 
            <div class="letter">
            ${correctLetters.includes(letter) ? letter : ''} 
            </div>
            `).join('')}
    `;

    const w = word_el.innerText.replace(/\n/g, '');
    if (w === selectedWord) {
        popup.style.display = 'flex';
        message_el.innerText = 'Tebrikler Kazandiniz';
    }
}
function updateWrongLetter() {
    wrongLetters_el.innerHTML = `
            ${wrongLetters.length > 0 ? '<h3> HATALI HARFLER </h3>' : ''}
            ${wrongLetters.map(letter => `<span>${letter}</span>`)}
        `;
    items.forEach((item, index) => {
        const errorCount = wrongLetters.length; //Hatalı Harfler gelicek

        if (index < errorCount) {
            item.style.display = 'block'; //Hatalı Harf varsa Şekil Çıkar
        } else {
            item.style.display = 'none'; //Hatalı Harf yoksa Şekil Çıkmaz
        }

    })

    if (wrongLetters.length === items.length) { //Girilen Harf Eğer doğru değilse Hata Mesajı verir
        popup.style.display = 'flex';
        message_el.innerText = 'Maalesef Kaybettiniz';
    }

}
function displayMessage() {
    message.classList.add('show');

    setTimeout(function () {
        message.classList.remove('show');
    }, 2000);
}

PlayAgainbtn.addEventListener('click', function () {
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = getRandomWord();
    displayWord();
    updateWrongLetter();

    popup.style.display = 'none';
});
window.addEventListener('keydown', function (e) {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if (selectedWord.includes(letter)) { // Girilen Harf var mı 
            if (!correctLetters.includes(letter)) { // Girilen Harf Yoksa
                correctLetters.push(letter);
                displayWord();
            } else {
                displayMessage();
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLetter();
            } else {
                displayMessage();
            }
        }
    }
});



displayWord();