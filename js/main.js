// создаем переменную cards, включающую массив DOM элементов с классом .memory_card
const cards = document.querySelectorAll(".memory_card");
// переменная hasFlippedCard говорит, есть ли у нас одна перевернутая карточка, или нет. в дальнейшем мы с помощью нее присваиваем значение либо первой карточке, либо второй (строки кода 21 и 25)
let hasFlippedCard = false;
// boardLocked - переменная, блокирует карточки до окончания поворота карт
let boardLocked = false;
// переменные fisrtCard и secondCard, в них мы сохраняем все наши DOM элементы
let fisrtCard, secondCard;
// функция flipCard принимает в себя event-элемент. И в дальнейшем мы ищем parentElement, его заключаем в переменную target (это наша кликнутая карточка)
const flipCard = e => {
    // если доска закрыта для действий, return, дальнейшее выполнение функции прекращается
    if (boardLocked) return;
    
    const target = e.target.parentElement;
// тут исправлен баг повторного клика по одной и той же карточки, чтобы она не добавлялась в сравнение, дальнейшее выполнение функции прекращается
    if(target === fisrtCard) return;
// добавляем карточке, на которую кликнули класс flip
    target.classList.add("flip");
// с помощью hasFlippedCard проверяем, это была первая карточка для сравнения или вторая? И присваиваем наш target. Если вторая, выполняем функцию по проверке на совместимость checkForMatch()
    if (!hasFlippedCard) {
        // First click

        hasFlippedCard = true;
        fisrtCard = target;
    } else {
        // Second click
        hasFlippedCard = false;
        secondCard = target;

        // Check for match
        checkForMatch();
    }
};

const checkForMatch = () => {
    // вводим переменную , где у первой и второй карточки совпадают dataset
    const isEqual = fisrtCard.dataset.framework === secondCard.dataset.framework;
    // if (fisrtCard.dataset.framework === secondCard.dataset.framework) {
    //     disableCards();
    // } else {
    //     unflipCards();
    // }
    // ниже то же самое, только с использованием тернарного оператора
    // если isEqual true, выполняется disableCards(), если false - unflipCards()
    isEqual ? disableCards() : unflipCards();
    // строчка выше - тернарный оператор - - если true или false
};
// если isEqual true, выполняется disableCards: убираем событие с обеих карточек
const disableCards = () => {
    fisrtCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
};
// если isEqual false, блокируем доску на 1000мс, удаляем классы с обеих карточек, они переворачиваются обратно. Доска снова работает благодаря resetBoard.
const unflipCards = () => {
    // блокировка доски:
    boardLocked = true;

    setTimeout(() => {
        fisrtCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        resetBoard();
    }, 1000);
};
// тут обнуляем доску, вернее, обнуляем 
const resetBoard = () => {
    // SPREAD-оператор:
    // нет перевернутой карточки hasFlippedCard - false, доска не закрыта boardLocked - false
    [hasFlippedCard, boardLocked] = [false, false];
    // первая и вторая карточки nullб их нет, нет DOM элементов
    [fisrtCard, secondCard] = [null, null];
    // более короткая запись строк выше (Двойное присваивание):
    // hasFlippedCard = boardLocked = false;
    // fisrtCard = secondCard = null;
}

cards.forEach(card => {
    // Add Event Listener to every card. Создали eventListener по клику. По клику будет выполняться функция flipCard
    card.addEventListener('click', flipCard);
    // к итерации каждой карточки (выше), сы вычисляем случайный индекс, исходя из длины массива cards.length. Пользовались фукнцией Math.random() и Math.floor() - Math.floor, чтобы индекс был целым числом
    const randomIndex = Math.floor(Math.random() * cards.length);
    console.log('RANDOM INDEX', randomIndex);
    // присваивание order к каждой карточке с помощью стилей:
    card.style.order = randomIndex;
})