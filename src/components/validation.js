function showError(input, errorMessage, config) {
  const errorElement = input.closest('form').querySelector(`[name='${input.name}-error']`);
  input.classList.add(config.inputErrorClass);
  if (errorElement) {
    errorElement.textContent = errorMessage;
  }
}

function hideError(input, config) {
  const errorElement = input.closest('form').querySelector(`[name='${input.name}-error']`);
  input.classList.remove(config.inputErrorClass);
  if (errorElement) {
    errorElement.textContent = "";
  }
}

function checkInputValidity(input, config) {
  if (!input.validity.valid) {
    showError(input, input.validationMessage, config);
    return false;
  } else {
    hideError(input, config);
    return true;
  }
}

function toggleButtonState(button, isActive, config) {
  if (isActive) {
    button.disabled = false;
    button.classList.remove(config.inactiveButtonClass);
  } else {
    button.disabled = true;
    button.classList.add(config.inactiveButtonClass);
  }
}

function checkFormValidity(inputs, button, config) {
  const isFormValid = inputs.every(input => input.validity.valid);
  toggleButtonState(button, isFormValid, config);
}

function setEventListeners(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);

  checkFormValidity(inputs, button, config);

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(input, config);
      checkFormValidity(inputs, button, config);
    });
  });
}

export function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach((form) => {
    setEventListeners(form, config);
  });
}

export function clearValidation(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);

  inputs.forEach((input) => {
    hideError(input, config);
  });
  checkFormValidity(inputs, button, config);
}
