const elementSelectors = {
  // errors
  profileAddButton: ".profile__add-button",
  profileEditButton: ".profile__edit-button",
  popupInputTypeName: ".popup__input_type_name",
  popupInputTypeUrl: ".popup__input_type_url",
  popupButton: ".popup__button",
  popupNameInputErr: "[name='nameError']",
  popupDescInputErr: "[name='descriptionError']",
  popupTitleInputErr: "[name='titleError']",
  popupUrlInputErr: "[name='urlError']",
  buttonSaveProfile: "[name='saveProfile']",
  popupInputTypeCardName: ".popup__input_type_card-name",
  popupInputTypeDescription: ".popup__input_type_description",
  buttonSaveAddCard: "[name='saveAddCard']",
  errorBorder: "error__border",
  avatarImg: ".profile__image",
  avatarError: '[name="avatarError"]',
  avatarButton: "[name='saveAvatar']",
  avatarInput: ".popup__input_type_url_avatar",
};

const addButton = document.querySelector(elementSelectors.profileAddButton);
const editButton = document.querySelector(elementSelectors.profileEditButton);

const nameInput = document.querySelector(elementSelectors.popupInputTypeName);
const descriptionInput = document.querySelector(
  elementSelectors.popupInputTypeDescription,
);
const saveButtonProfile = document.querySelector(
  elementSelectors.buttonSaveProfile,
);
const nameError = document.querySelector(elementSelectors.popupNameInputErr);
const descriptionError = document.querySelector(
  elementSelectors.popupDescInputErr,
);

function validateFormProfile() {
  const nameValue = nameInput.value;
  const descriptionValue = descriptionInput.value;
  let isValid = true;

  nameError.textContent = "";
  descriptionError.textContent = "";
  nameInput.classList.remove(elementSelectors.errorBorder);
  descriptionInput.classList.remove(elementSelectors.errorBorder);

  if (nameValue.length < 2 || nameValue.length > 40) {
    nameError.textContent = "Имя должно содержать от 2 до 40 символов.";
    nameInput.classList.add(elementSelectors.errorBorder);
    isValid = false;
  } else if (!/^[A-Za-zА-Яа-яЁё\s-]+$/.test(nameValue)) {
    nameError.textContent =
      "Имя может содержать только латинские и кириллические буквы, пробелы и дефисы.";
    nameInput.classList.add(elementSelectors.errorBorder);
    isValid = false;
  }

  if (descriptionValue.length < 2 || descriptionValue.length > 200) {
    descriptionError.textContent =
      'Поле "О себе" должно содержать от 2 до 200 символов.';
    descriptionInput.classList.add(elementSelectors.errorBorder);
    isValid = false;
  } else if (!/^[A-Za-zА-Яа-яЁё\s-]+$/.test(descriptionValue)) {
    descriptionError.textContent =
      'Поле "О себе" может содержать только латинские и кириллические буквы, пробелы и дефисы.';
    descriptionInput.classList.add(elementSelectors.errorBorder);
    isValid = false;
  }

  saveButtonProfile.disabled = !isValid;
}

nameInput.addEventListener("input", validateFormProfile);
editButton.addEventListener("click", () => {
  nameError.textContent = "";
  descriptionError.textContent = "";
  nameInput.classList.remove(elementSelectors.errorBorder);
  descriptionInput.classList.remove(elementSelectors.errorBorder);
  saveButtonProfile.disabled = false;
});
descriptionInput.addEventListener("input", validateFormProfile);

const titleInput = document.querySelector(
  elementSelectors.popupInputTypeCardName,
);
const titleError = document.querySelector(elementSelectors.popupTitleInputErr);
const urlInput = document.querySelector(elementSelectors.popupInputTypeUrl);
const urlError = document.querySelector(elementSelectors.popupUrlInputErr);
const saveButtonAddCard = document.querySelector(
  elementSelectors.buttonSaveAddCard,
);

function validateFormAddCard() {
  const titleValue = titleInput.value;
  const urlValue = urlInput.value;
  let isValid = true;

  titleError.textContent = "";
  urlError.textContent = "";
  titleInput.classList.remove(elementSelectors.errorBorder);
  urlInput.classList.remove(elementSelectors.errorBorder);

  if (titleValue.length < 2 || titleValue.length > 30) {
    titleError.textContent = "Название должно содержать от 2 до 30 символов.";
    titleInput.classList.add(elementSelectors.errorBorder);
    isValid = false;
  } else if (!/^[A-Za-zА-Яа-яЁё\s-]+$/.test(titleValue)) {
    titleError.textContent =
      "Название может содержать только латинские и кириллические буквы, пробелы и дефисы.";
    titleInput.classList.add(elementSelectors.errorBorder);
    isValid = false;
  }

  if (!/^https?:\/\/.+/.test(urlValue)) {
    urlError.textContent = "Введите корректный URL.";
    urlInput.classList.add(elementSelectors.errorBorder);
    isValid = false;
  }

  saveButtonAddCard.disabled = !isValid;
}

addButton.addEventListener("click", () => {
  titleError.textContent = "";
  urlError.textContent = "";
  titleInput.classList.remove(elementSelectors.errorBorder);
  urlInput.classList.remove(elementSelectors.errorBorder);
  saveButtonAddCard.disabled = true;
});
titleInput.addEventListener("input", validateFormAddCard);
urlInput.addEventListener("input", validateFormAddCard);

const avatarImg = document.querySelector(elementSelectors.avatarImg);
const avatarErr = document.querySelector(elementSelectors.avatarError);
const avatarButton = document.querySelector(elementSelectors.avatarButton);
const avatarInput = document.querySelector(elementSelectors.avatarInput);

function validateFormEditAvatar() { 
  const avatrValue = avatarInput.value;
  let isValid = true;

  avatarErr.textContent = "";
  avatarInput.classList.remove(elementSelectors.errorBorder);
  avatarInput.textContent = "";

  if (!/^https?:\/\/.+/.test(avatrValue)) {
    avatarErr.textContent = "Введите корректный URL.";
    avatarInput.classList.add(elementSelectors.errorBorder);
    isValid = false;
  }

  avatarButton.disabled = !isValid;
}

avatarImg.addEventListener("click", () => {
  avatarErr.textContent = "";
  avatarInput.classList.remove(elementSelectors.errorBorder);
});
avatarInput.addEventListener("input", validateFormEditAvatar);
