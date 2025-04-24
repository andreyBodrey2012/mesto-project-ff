import { addNewCard } from "../cards/card.js";
// import { defautParams } from "../index.js";

let defautParams = {
  profileAddButtonSelector: ".profile__add-button",
  popupTypeNewCardSelector: ".popup_type_new-card",
  profileEditButtonSelector: ".profile__edit-button",
  popupTypeEditSelector: ".popup_type_edit",
  popupCloseSelector: ".popup__close",
  popupTypeImageSelector: ".popup_type_image",
  popupIsOpenedSelector: ".popup_is-opened",
  cardImageSelector: ".card__image",
  popupFormEditProfileSelector: ".popup__form[name='edit-profile']",
  popupFormNewPlaceSelector: ".popup__form[name='new-place']",
  popupInputTypeNameSelector: ".popup__input_type_name",
  popupInputTypeDescriptionSelector: ".popup__input_type_description",
  profileTitleSelector: ".profile__title",
  profileDescriptionSelector: ".profile__description",
  popupInputTypeCardNameSelector: ".popup__input_type_card-name",
  popupInputTypeUrlSelector: ".popup__input_type_url",
  popupSelector: ".popup",
  popupOpened: "popup_is-opened",
  popupIsAnimatedSelector: "popup_is-animated",
};

function closePopup(element) {
  element.classList.remove(defautParams.popupOpened);
  element.removeEventListener("click", handlerClosePopup);
  document.removeEventListener("keydown", handlerKeyClosePopup);
}

function handlerClosePopup(evt) {
  if (evt.currentTarget === evt.target) {
    closePopup(evt.target.closest(defautParams.popupSelector));
  }
}

function handlerKeyClosePopup(evt) {
  if (evt.keyCode === 27) {
    closePopup(document.querySelector(defautParams.popupIsOpenedSelector));
  }
}

function openWindow(element) {
  return (evt) => {
    element.classList.add(defautParams.popupOpened);
    element.addEventListener("click", handlerClosePopup);
    document.addEventListener("keydown", handlerKeyClosePopup);
  };
}

export const initPopup = (params = {}) => {
  defautParams = {
    ...defautParams,
    ...params,
  };
  const popupAddNewCard = document.querySelector(
    defautParams.popupTypeNewCardSelector,
  );
  const editButton = document.querySelector(
    defautParams.profileEditButtonSelector,
  );
  const addButton = document.querySelector(
    defautParams.profileAddButtonSelector,
  );

  const popupImage = document.querySelector(
    defautParams.popupTypeImageSelector,
  );
  // Находим форму в DOM
  const formEditProfile = document.querySelector(
    defautParams.popupFormEditProfileSelector,
  );
  const formAddCard = document.querySelector(
    defautParams.popupFormNewPlaceSelector,
  );
  const popupEditProfile = document.querySelector(
    defautParams.popupTypeEditSelector,
  );
  const popupButtonCloses = document.querySelectorAll(
    defautParams.popupCloseSelector,
  );

  const profileTitle = document.querySelector(
    defautParams.profileTitleSelector,
  );
  const profileDescription = document.querySelector(
    defautParams.profileDescriptionSelector,
  );
  const cardNameInput = document.querySelector(
    defautParams.popupInputTypeCardNameSelector,
  );
  const urlInput = document.querySelector(
    defautParams.popupInputTypeUrlSelector,
  );

  popupAddNewCard.classList.add(defautParams.popupIsAnimatedSelector);
  popupEditProfile.classList.add(defautParams.popupIsAnimatedSelector);
  popupImage.classList.add(defautParams.popupIsAnimatedSelector);
  addButton.addEventListener("click", openWindow(popupAddNewCard));
  editButton.addEventListener("click", (evt) => {
    // Находим поля формы в DOM;
    const nameInput = document.querySelector(
      defautParams.popupInputTypeNameSelector,
    ); // Воспользуйтесь инструментом .querySelector()
    const jobInput = document.querySelector(
      defautParams.popupInputTypeDescriptionSelector,
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

  const cardImages = document.querySelectorAll(defautParams.cardImageSelector);

  cardImages.forEach((element) => {
    element.addEventListener("click", openWindow(popupImage));
  });
};

/////

/////

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormEditProfile(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.
  // Получите значение полей jobInput и nameInput из свойства value
  // Находим поля формы в DOM;
  const nameInput = document.querySelector(
    defautParams.popupInputTypeNameSelector,
  ); // Воспользуйтесь инструментом .querySelector()
  const jobInput = document.querySelector(
    defautParams.popupInputTypeDescriptionSelector,
  ); // Воспользуйтесь инструментом .querySelector()
  const profileJobValue = jobInput.value;
  const profileNameValue = nameInput.value;

  // Выберите элементы, куда должны быть вставлены значения полей
  // Вставьте новые значения с помощью textContent
  profileTitle.textContent = profileNameValue;
  profileDescription.textContent = profileJobValue;

  closePopup(evt.target.closest(defautParams.popupSelector));
}

function handleFormAddCard(evt) {
  evt.preventDefault();

  addNewCard(cardNameInput.value, urlInput.value, openWindow);

  cardNameInput.value = "";
  urlInput.value = "";
  closePopup(evt.target.closest(defautParams.popupSelector));
}
