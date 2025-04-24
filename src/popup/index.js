import { cardsPlace } from "../index.js";

const addButton = document.querySelector(".profile__add-button");
const popupAddNewCard = document.querySelector(".popup_type_new-card");
const editButton = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupButtonCloses = document.querySelectorAll(".popup__close");
const popupImage = document.querySelector(".popup_type_image")

function closePopup(element) {
  element.classList.remove("popup_is-opened");
  element.removeEventListener("click", handlerClosePopup);
  document.removeEventListener("keydown", handlerKeyClosePopup);
}

function handlerClosePopup(evt) {
  if (evt.currentTarget === evt.target) {
    closePopup(evt.target.closest(".popup"));
  }
}

function handlerKeyClosePopup(evt) {
  if (evt.keyCode === 27) {
    closePopup(document.querySelector(".popup_is-opened"));
  }
}

function openWindow(element) {
  return () => {
    element.classList.add("popup_is-opened");
    element.addEventListener("click", handlerClosePopup);
    document.addEventListener("keydown", handlerKeyClosePopup);
  };
}

export const initPopup = () => {
  addButton.addEventListener("click", openWindow(popupAddNewCard));
  editButton.addEventListener("click", openWindow(popupEditProfile));

  popupButtonCloses.forEach((element) => {
    element.addEventListener("click", handlerClosePopup);
  });

  const cardImages = document.querySelectorAll(".card__image")

  cardImages.forEach((element) => {
    element.addEventListener("click", openWindow(popupImage))

  });
};


// Находим форму в DOM
const formEditProfile = document.querySelector(".popup__form[name='edit-profile']");
const formAddCard = document.querySelector(".popup__form[name='new-place']");
// Находим поля формы в DOM;
const nameInput = document.querySelector('.popup__input_type_name');// Воспользуйтесь инструментом .querySelector()
const jobInput = document.querySelector('.popup__input_type_description');// Воспользуйтесь инструментом .querySelector()
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const urlInput = document.querySelector('.popup__input_type_url');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormEditProfile(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                          // Так мы можем определить свою логику отправки.
                          // О том, как это делать, расскажем позже.
      // Получите значение полей jobInput и nameInput из свойства value
      const profileJobValue = jobInput.value;
      const profileNameValue = nameInput.value;

      // Выберите элементы, куда должны быть вставлены значения полей
      // Вставьте новые значения с помощью textContent
      profileTitle.textContent = profileNameValue;
      profileDescription.textContent = profileJobValue;

    closePopup(evt.target.closest(".popup"));
}

function handleFormAddCard(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.

  cardsPlace.append(name, cardNameInput.value);

  cardNameInput.value = "";
  urlInput.value = "";
  closePopup(evt.target.closest(".popup"));
} 

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEditProfile.addEventListener('submit', handleFormEditProfile);
formAddCard.addEventListener('submit', handleFormAddCard);
nameInput.value = profileTitle.textContent;
jobInput.value = profileDescription.textContent;
cardNameInput.value = ''; 
urlInput.value = '';