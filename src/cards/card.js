import { initialCards } from "./constans";

let defautParams = {
  cardImageSelector: ".card__image",
  popupTypeImageSelector: ".popup_type_image",
  cardTemplateSelector: "#card-template",
  placesListSelector: ".places__list",
  cardSelector: ".card",
  cardTitleSelector: ".card__title",
  cardDeleteButtonSelector: ".card__delete-button",
  cardLikeButtonSelector: ".card__like-button",
  popupImageSelector: ".popup__image",
  popupCaptionSelector: ".popup__caption",
  cardLikeButtonIsActiveSelector: "card__like-button_is-active",
};

export function initCards(params={}) {
  defautParams = {
    ...defautParams, ...params
  };
  const cards = initialCards.map((item) =>
    createCard({ ...item, deleteCard, likeCard, imageCard }),
  );
  cardsPlace.append(...cards);
}

export function addNewCard(name, link, openWindow) {
  const newCard = createCard({ name, link, deleteCard, likeCard, imageCard });
  cardsPlace.prepend(newCard);
  newCard
    .querySelector(defautParams.cardImageSelector)
    .addEventListener(
      "click",
      openWindow(document.querySelector(defautParams.popupTypeImageSelector)),
    );
}

// @todo: Темплейт карточки
const cardTemplate = document.querySelector(defautParams.cardTemplateSelector).content;

// @todo: DOM узлы
export const cardsPlace = document.querySelector(defautParams.placesListSelector);

// @todo: Функция создания карточки
export function createCard(params) {
  const cloneCard = cardTemplate.querySelector(defautParams.cardSelector).cloneNode(true);
  cloneCard.querySelector(defautParams.cardTitleSelector).innerText = params.name;
  const cardImage = cloneCard.querySelector(defautParams.cardImageSelector);

  cardImage.src = params.link;
  cardImage.alt = params.name;
  cloneCard
    .querySelector(defautParams.cardDeleteButtonSelector)
    .addEventListener("click", () => {
      params.deleteCard(cloneCard);
    });

  cloneCard
    .querySelector(defautParams.cardLikeButtonSelector)
    .addEventListener("click", () => {
      params.likeCard(cloneCard.querySelector(defautParams.cardLikeButtonSelector));
    });

  cardImage.addEventListener("click", () => {
    params.imageCard(params);
  });

  return cloneCard;
}

// @todo: Функция удаления карточки
function deleteCard(element) {
  if (element && typeof element.remove === "function") {
    element.remove();
  }
}

function likeCard(element) {
  if (element.classList.contains(defautParams.cardLikeButtonIsActiveSelector)) {
    element.classList.remove(defautParams.cardLikeButtonIsActiveSelector);
  } else {
    element.classList.add(defautParams.cardLikeButtonIsActiveSelector);
  }
}

function imageCard(element) {
  document.querySelector(defautParams.popupImageSelector).src = element.link;
  document.querySelector(defautParams.popupCaptionSelector).textContent = element.name;
}
