import { createCard, deleteCard, likeCard } from "./components/card";
import { openPopup, handlerClosePopup, closePopup } from "./components/modal";
import { validationConfig } from "./constants";
import {
  fetchProfileApi,
  fetchCards,
  editAvatarApi,
  editProfileApi,
  serverAddCard,
} from "./components/api";
import "./components/validation";
import "./css/index.css";
import { enableValidation, clearValidation } from "./components/validation";

let userInfo = {};

document.addEventListener("DOMContentLoaded", function () {
  enableValidation(validationConfig);
});

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
  cardButtonDeleteDisplayNone: "card__delete-display_none",
  cardButtonDeleteDisplayBlock: "card__delete-display_block",
  likesCount: ".likes__count",
  // modals
  profileAddButton: ".profile__add-button",
  popupTypeNewCard: ".popup_type_new-card",
  popupTypeDelete: ".popup_type_delete",
  profileEditButton: ".profile__edit-button",
  popupTypeEdit: ".popup_type_edit",
  popupClose: ".popup__close",
  popupTypeImage: ".popup_type_image",
  popupIsOpened: ".popup_is-opened",
  cardImage: ".card__image",
  popupFormEditProfile: ".popup__form[name='edit-profile']",
  popupFormNewPlace: ".popup__form[name='new-place']",
  popupDeleteCard: "popup_delete_card",
  popupInputTypeName: ".popup__input_type_name",
  popupInputTypeDescription: ".popup__input_type_description",
  profileTitle: ".profile__title",
  profileDescription: ".profile__description",
  popupInputTypeCardName: ".popup__input_type_card-name",
  popupInputTypeUrl: ".popup__input_type_url",
  popup: ".popup",
  popupOpened: "popup_is-opened",
  popupIsAnimated: "popup_is-animated",
  avatarImg: ".profile__image",
  popupEditAvatar: ".popup_type_avatar",
  popupFormEditAvatar: ".popup__form[name='edit-avatar']",
  popupInputTypeAvatar: ".popup__input_type_url_avatar",
  // errors
  popupButton: ".popup__button",
  popupError: ".error__message",
  popupNameInputErr: "[name='nameError']",
  popupDescInputErr: "[name='descriptionError']",
  popupTitleInputErr: "[name='titleError']",
  popupUrlInputErr: "[name='urlError']",
  buttonSaveProfile: "[name='saveProfile']",
  buttonSaveAddCard: "[name='saveAddCard']",
  errorBorder: "error__border",
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
const deleteButton = document.querySelector(elementSelectors.cardDeleteButton);
const deletePopup = document.querySelector(elementSelectors.popupTypeDelete);
const popupEditProfile = document.querySelector(elementSelectors.popupTypeEdit);
const popupImage = document.querySelector(elementSelectors.popupTypeImage);
const formEditProfile = document.querySelector(
  elementSelectors.popupFormEditProfile,
);
const popupEditAvatar = document.querySelector(
  elementSelectors.popupEditAvatar,
);
const avatarButton = document.querySelector(elementSelectors.avatarImg);
const popupInputAvatar = document.querySelector(
  elementSelectors.popupFormEditAvatar,
);
const formAddCard = document.querySelector(elementSelectors.popupFormNewPlace);
const profileTitle = document.querySelector(elementSelectors.profileTitle);
const profileDescription = document.querySelector(
  elementSelectors.profileDescription,
);
const avatarImg = document.querySelector(elementSelectors.avatarImg);
const avatarInput = document.querySelector(
  elementSelectors.popupInputTypeAvatar,
);

const openPopupImage = openPopup(popupImage);

let openPopupDeleteFn;
let openPopupDeleteCallbackSucces;

const handleOpenPopupDelete = (callbackSucces = () => {}) => {
  if (!openPopupDeleteFn) {
    document
      .querySelector('[name="deleteCard"]')
      .addEventListener("click", () => {
        openPopupDeleteCallbackSucces();
        closePopup(document.querySelector(".popup_type_delete"));
      });
    openPopupDeleteFn = true;
  }

  openPopupDeleteCallbackSucces = callbackSucces;

  return openPopup(document.querySelector(".popup_type_delete"))();
};

function handleClickImage(data) {
  return () => {
    document.querySelector(elementSelectors.popupImage).src = data.link;
    document.querySelector(elementSelectors.popupImage).alt = data.name
    document.querySelector(elementSelectors.popupCaption).textContent =
      data.name;
    openPopupImage();
  };
}

function addCard(data) {
  return createCard(data, {
    template: cardTemplate.querySelector(elementSelectors.card),
    titleSelecor: elementSelectors.cardTitle,
    imageSelector: elementSelectors.cardImage,
    cardDeleteButtonSelector: elementSelectors.cardDeleteButton,
    cardLikeButtonSelector: elementSelectors.cardLikeButton,
    cardLikeButtonIsActive: elementSelectors.cardLikeButtonIsActive,
    cardButtonDeleteDisplayNone: elementSelectors.cardButtonDeleteDisplayNone,
    cardLikesCountSelector: elementSelectors.likesCount,
    onDeleteCard: deleteCard,
    onLikeCard: likeCard,
    onClickImageCard: handleClickImage,
    onPopupDelete: handleOpenPopupDelete,
  });
}

function displayCards(cards) {
  const cardsContainer = document.querySelector(elementSelectors.placesList);
  if (!cardsContainer) {
    console.error("Контейнер для карточек не найден");
    return;
  }
  if (!Array.isArray(cards)) {
    console.error("Полученные данные не являются массивом:", cards);
    return;
  }

  cards.forEach((card) => {
    const serverCard = addCard({
      id: card.id,
      name: card.name,
      link: card.link,
      likes: card.likes,
      myId: userInfo.id,
      isOwner: card.ownerId === userInfo.id,
    });

    cardsContainer.appendChild(serverCard);
  });
}

function loadProfileData() {
  return fetchProfileApi()
    .then((user) => {
      const userInfo = {
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        id: user._id,
      };
      return userInfo;
    })
    .then((user) => {
      if (user.name) {
        profileTitle.textContent = user.name;
      }
      if (user.about) {
        profileDescription.textContent = user.about;
      }
      if (user.avatar) {
        avatarImg.style.backgroundImage = `url(${user.avatar})`;
      }
      userInfo = { ...user };
    }).catch(error => {
      console.error("Ошибка при загрузки профиля:", error);
    });
}

function initCards() {
  Promise.all([
    fetchCards().then((data) => {
      return data.map((card) => ({
        name: card.name,
        link: card.link,
        likes: card.likes,
        ownerId: card.owner._id,
        id: card._id,
      }));
    }),
  ])
    .then(([cards]) => {
      profileTitle.textContent = userInfo.name;
      profileDescription.textContent = userInfo.about;
      avatarImg.style.backgroundImage = `url(${userInfo.avatar})`;

      displayCards(cards);
    })
    .catch((error) => {
      console.error("Ошибка при выполнении запроса:", error);
    });
}

function initPopups() {
  popupAddNewCard.classList.add(elementSelectors.popupIsAnimated);
  popupEditProfile.classList.add(elementSelectors.popupIsAnimated);
  popupEditAvatar.classList.add(elementSelectors.popupIsAnimated);
  avatarButton.addEventListener("click", openPopup(popupEditAvatar));
  popupImage.classList.add(elementSelectors.popupIsAnimated);
  deletePopup.classList.add(elementSelectors.popupIsAnimated);

  addButton.addEventListener("click", openPopup(popupAddNewCard))

  editButton.addEventListener("click", (evt) => {
    const nameInput = document.querySelector(elementSelectors.popupInputTypeName);
    const jobInput = document.querySelector(elementSelectors.popupInputTypeDescription);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(popupEditProfile)(popupImage);
  });

  popupInputAvatar.addEventListener("submit", handleFormEditAvatar);
  formEditProfile.addEventListener("submit", handleFormEditProfile);
  formAddCard.addEventListener("submit", handleFormAddCard);

  popupButtonCloses.forEach((element) => {
    element.addEventListener("click", handlerClosePopup);
  });
}

function handleFormEditAvatar(evt) {
  evt.preventDefault();

  const avatarInput = document.querySelector(elementSelectors.popupInputTypeAvatar);
  const avatarImg = document.querySelector(elementSelectors.avatarImg);

  editAvatarApi(avatarInput, avatarImg)
    .then(() => {
      closePopup(popupEditAvatar);
    })
    .catch(error => {
      console.error("Ошибка при редактировании аватара:", error);
    });
}

function handleFormEditProfile(evt) {
  evt.preventDefault();
  const nameInput = document.querySelector(elementSelectors.popupInputTypeName);
  const jobInput = document.querySelector(elementSelectors.popupInputTypeDescription);

  editProfileApi(jobInput.value, nameInput.value)
    .then(() => {
      profileTitle.textContent = nameInput.value;
      profileDescription.textContent = jobInput.value;
      closePopup(popupEditProfile)
    })
    .catch(error => {
      console.error("Ошибка при редактировании профиля:", error);
    });
}

function handleFormAddCard(evt) {
  evt.preventDefault();
  const cardNameInput = document.querySelector(elementSelectors.popupInputTypeCardName);
  const urlInput = document.querySelector(elementSelectors.popupInputTypeUrl);

  serverAddCard(cardNameInput.value, urlInput.value)
    .then(data => {
      const newCard = addCard({
        id: data._id,
        name: data.name,
        likes: data.likes,
        link: data.link,
        myId: userInfo.id,
        isOwner: data.owner._id === userInfo.id,
      });
      cardsPlace.prepend(newCard);
      
      cardNameInput.value = "";
      urlInput.value = "";
      
      clearValidation(formAddCard, validationConfig);

      closePopup(evt.target.closest(elementSelectors.popup));
    })
    .catch(error => {
      console.error("Ошибка при добавлении карточки:", error);
    });
}

document.querySelector(".footer__copyright").innerText =
  `© ${new Date().getFullYear()} Mesto Russia`;

window.addEventListener("load", () => {
  loadProfileData().then(() => {
    // @todo: Вывести карточки на страницу
    initCards();

    // @todo: Функция открытия модального окна
    initPopups();
  });
});
