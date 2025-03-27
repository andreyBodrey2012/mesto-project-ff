// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardPlace = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(params, deleteCard) {
    const cloneCard = cardTemplate.querySelector('.card').cloneNode(true);
    cloneCard.querySelector('.card__title').innerText = params.name;
    const cardImage = cloneCard.querySelector('.card__image');
    cardImage.src = params.link;
    cardImage.alt = params.name;
    cloneCard.querySelector('.card__delete-button').addEventListener('click', () => { deleteCard(cloneCard) });

    cardPlace.append(cloneCard);
}

// @todo: Функция удаления карточки
function deleteCard(element) {
    if (element && typeof element.remove === "function") {
        element.remove();
    }
}

// @todo: Вывести карточки на страницу
document.querySelector(".footer__copyright").innerText = `© ${(new Date).getFullYear()} Mesto Russia`;

initialCards.forEach((item)=>{
    createCard(item, deleteCard);
});