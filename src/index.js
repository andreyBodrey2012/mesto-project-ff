import { createCard, deleteCard, likeCard } from "./cards/card";
import { initialCards } from "./cards/cards";
import { openWindow, handlerClosePopup, closePopup } from "./popup/modal";
import "./css/index.css";

const elementSelectors = {
  // cards
  cardImage: ".card__image",
  popupTypeImage: ".popup_type_image",
  cardTemplate: "#card-template",
  placesList: ".places__list",
  card: ".card",
  cardTitle: ".card__title",
  cardDeleteButton: ".card__delete-button",
  cardLikeButton: ".card__like-button",
  popupImage: ".popup__image",
  popupCaption: ".popup__caption",
  cardLikeButtonIsActive: "card__like-button_is-active",
  // modals
  profileAddButton: ".profile__add-button",
  popupTypeNewCard: ".popup_type_new-card",
  profileEditButton: ".profile__edit-button",
  popupTypeEdit: ".popup_type_edit",
  popupClose: ".popup__close",
  popupTypeImage: ".popup_type_image",
  popupIsOpened: ".popup_is-opened",
  cardImage: ".card__image",
  popupFormEditProfile: ".popup__form[name='edit-profile']",
  popupFormNewPlace: ".popup__form[name='new-place']",
  popupInputTypeName: ".popup__input_type_name",
  popupInputTypeDescription: ".popup__input_type_description",
  profileTitle: ".profile__title",
  profileDescription: ".profile__description",
  popupInputTypeCardName: ".popup__input_type_card-name",
  popupInputTypeUrl: ".popup__input_type_url",
  popup: ".popup",
  popupOpened: "popup_is-opened",
  popupIsAnimated: "popup_is-animated",
};

const cardsPlace = document.querySelector(elementSelectors.placesList);
const cardTemplate = document.querySelector(
  elementSelectors.cardTemplate,
).content;
const popupButtonCloses = document.querySelectorAll(
  elementSelectors.popupClose,
);
const popupAddNewCard = document.querySelector(
  elementSelectors.popupTypeNewCard,
);
const editButton = document.querySelector(elementSelectors.profileEditButton);
const addButton = document.querySelector(elementSelectors.profileAddButton);
const popupEditProfile = document.querySelector(elementSelectors.popupTypeEdit);
const popupImage = document.querySelector(elementSelectors.popupTypeImage);
const formEditProfile = document.querySelector(
  elementSelectors.popupFormEditProfile,
);
const formAddCard = document.querySelector(elementSelectors.popupFormNewPlace);
const profileTitle = document.querySelector(elementSelectors.profileTitle);
const profileDescription = document.querySelector(
  elementSelectors.profileDescription,
);

const openPopupImage = openWindow(popupImage);

function handleClickImage(data) {
  return (evt) => {
    document.querySelector(elementSelectors.popupImage).src = data.link;
    document.querySelector(elementSelectors.popupCaption).textContent =
      data.name;
    openPopupImage(evt);
  };
}

function addListenersForCard(data) {
  const template = cardTemplate.querySelector(elementSelectors.card);
  const card = createCard(data, {
    template,
    titleSelecor: elementSelectors.cardTitle,
    imageSelector: elementSelectors.cardImage,
  });
  card
    .querySelector(elementSelectors.cardDeleteButton)
    .addEventListener("click", () => {
      deleteCard(card);
    });
  card
    .querySelector(elementSelectors.cardLikeButton)
    .addEventListener("click", () => {
      likeCard(
        card.querySelector(elementSelectors.cardLikeButton),
        elementSelectors.cardLikeButtonIsActive,
      );
    });

  card
    .querySelector(elementSelectors.cardImage)
    .addEventListener("click", handleClickImage(data));

  return card;
}

function initCards() {
  cardsPlace.append(...initialCards.map((item) => addListenersForCard(item)));
}

function initPopup() {
  popupAddNewCard.classList.add(elementSelectors.popupIsAnimated);
  popupEditProfile.classList.add(elementSelectors.popupIsAnimated);
  popupImage.classList.add(elementSelectors.popupIsAnimated);
  addButton.addEventListener("click", openWindow(popupAddNewCard));
  editButton.addEventListener("click", (evt) => {
    // Находим поля формы в DOM;
    const nameInput = document.querySelector(
      elementSelectors.popupInputTypeName,
    ); // Воспользуйтесь инструментом .querySelector()
    const jobInput = document.querySelector(
      elementSelectors.popupInputTypeDescription,
    ); // Воспользуйтесь инструментом .querySelector()
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openWindow(popupEditProfile)(evt);
  });
  // Прикрепляем обработчик к форме:
  // он будет следить за событием “submit” - «отправка»
  formEditProfile.addEventListener("submit", handleFormEditProfile);
  formAddCard.addEventListener("submit", handleFormAddCard);

  popupButtonCloses.forEach((element) => {
    element.addEventListener("click", handlerClosePopup);
  });

  const cardImages = document.querySelectorAll(elementSelectors.cardImage);

  cardImages.forEach((element) => {
    element.addEventListener("click", openWindow(popupImage));
  });

  popupButtonCloses.forEach((element) => {
    element.addEventListener("click", handlerClosePopup);
  });
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormEditProfile(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.
  // Получите значение полей jobInput и nameInput из свойства value
  // Находим поля формы в DOM;
  const nameInput = document.querySelector(elementSelectors.popupInputTypeName); // Воспользуйтесь инструментом .querySelector()
  const jobInput = document.querySelector(
    elementSelectors.popupInputTypeDescription,
  ); // Воспользуйтесь инструментом .querySelector()
  const profileJobValue = jobInput.value;
  const profileNameValue = nameInput.value;

  // Выберите элементы, куда должны быть вставлены значения полей
  // Вставьте новые значения с помощью textContent
  profileTitle.textContent = profileNameValue;
  profileDescription.textContent = profileJobValue;

  closePopup(evt.target.closest(elementSelectors.popup));
}

function handleFormAddCard(evt) {
  evt.preventDefault();
  const cardNameInput = document.querySelector(
    elementSelectors.popupInputTypeCardName,
  );
  const urlInput = document.querySelector(elementSelectors.popupInputTypeUrl);

  const newCard = addListenersForCard({
    name: cardNameInput.value,
    link: urlInput.value,
  });
  cardsPlace.prepend(newCard);

  cardNameInput.value = "";
  urlInput.value = "";
  closePopup(evt.target.closest(elementSelectors.popup));
}

document.querySelector(".footer__copyright").innerText =
  `© ${new Date().getFullYear()} Mesto Russia`;

// @todo: Вывести карточки на страницу
initCards();

// @todo: Функция открытия модального окна
initPopup();
