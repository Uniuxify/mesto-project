function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.getAttribute('name')}-error`);
    inputElement.classList.add('popup__iinput_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__iinput-error_active');
};

function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.getAttribute('name')}-error`);
    inputElement.classList.remove('popup__iinput_type_error');
    errorElement.classList.remove('popup__iinput-error_active');
    errorElement.textContent = '';
};

function checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
};

function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add('popup__button_state_disabled');
    } else {
      buttonElement.classList.remove('popup__button_state_disabled');
    }
};

function setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button');
  
    toggleButtonState(inputList, buttonElement);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
};

function enableValidation() {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      }
    );
      
    //   const fieldsetList = Array.from(formElement.querySelectorAll('.form__set'));
    //   fieldsetList.forEach((fieldSet) => {
    //     setEventListeners(fieldSet);
    //   }); 
  
      setEventListeners(formElement);
    });
};

function hasInvalidInput  (inputList) {
    return inputList.some((inputElement) => {
  
      return !inputElement.validity.valid;
    })
};

export {enableValidation, toggleButtonState, hideInputError}