const CARD_POPUP = document.querySelector(".popup_type_new-card");
const PROFILE_POPUP = document.querySelector(".popup_type_edit");
const IMAGE_POPUP = document.querySelector(".popup_type_image");

const POPUS = document.querySelectorAll(".popup");
POPUS.forEach((popup) => {
    popup.querySelector(".popup__close").addEventListener("click", (event) => {
        closePopup(event.target.closest(".popup"));
    });
    popup.addEventListener("click", (event) => {
        if (event.target === popup) {
            closePopup(event.target.closest(".popup"));
        }
    });

    popup.classList.add('popup_is-animated');
});


function closePopup(popup) {
    popup.classList.remove("popup_is-opened");
}



function onEditProfile(event) {
    const nameInput = PROFILE_POPUP.querySelector(".popup__input_type_name");
    const descriptionInput = PROFILE_POPUP.querySelector(".popup__input_type_description");

    nameInput.value = PROFILE.querySelector(".profile__title").textContent;
    descriptionInput.value = PROFILE.querySelector(".profile__description").textContent;

    openModal(PROFILE_POPUP);
}

function onSubmitEditProfileForm(event) {
    event.preventDefault();

    const nameInputValue = PROFILE_POPUP.querySelector(".popup__input_type_name").value;
    const descriptionInputValue = PROFILE_POPUP.querySelector(".popup__input_type_description").value;

    PROFILE.querySelector(".profile__title").textContent = nameInputValue;
    PROFILE.querySelector(".profile__description").textContent = descriptionInputValue;

    closePopup(PROFILE_POPUP);
}

const PROFILE = document.querySelector(".profile");
PROFILE_POPUP.querySelector('.popup__form').addEventListener('submit', onSubmitEditProfileForm); 

PROFILE.querySelector(".profile__edit-button").addEventListener(
    "click",
    onEditProfile
);



function onNewCard(event) {
    
    CARD_POPUP.querySelector(".popup__input_type_card-name").value = '';
    CARD_POPUP.querySelector(".popup__input_type_url").value = '';

    openModal(CARD_POPUP);
}

function onSubmitNewCardForm(event) {
    event.preventDefault();
    const nameInput = CARD_POPUP.querySelector(".popup__input_type_card-name").value;
    const linkInput = CARD_POPUP.querySelector(".popup__input_type_url").value;
    
    const newCard = createCard(nameInput, linkInput);
    prependCard(newCard);
    closePopup(CARD_POPUP);
}

PROFILE.querySelector(".profile__add-button").addEventListener(
    "click",
    onNewCard
);

CARD_POPUP.querySelector('.popup__form').addEventListener('submit', onSubmitNewCardForm); 

function openModal(popup) {
    const formElement = popup.querySelector('.popup__form')
    if (formElement) {
        const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
        const buttonElement = formElement.querySelector('.popup__button');

        inputList.forEach((inputElement) => {
            hideInputError(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    }
    popup.classList.add("popup_is-opened");
}

function createCard(title, imgLink) {
    const cardTemplate = document.querySelector("#card-template").content;
    const card = cardTemplate.cloneNode(true);

    const cardImage = card.querySelector(".card__image");
    const cardTitle = card.querySelector(".card__title");
    const cardLikeButton = card.querySelector(".card__like-button");
    const cardDeleteButotn = card.querySelector(".card__delete-button");

    cardImage.setAttribute("src", imgLink);
    cardTitle.textContent = title;

    cardLikeButton.addEventListener("click", function (event) {
        event.target.classList.toggle("card__like-button_is-active");
    });

    cardDeleteButotn.addEventListener("click", function (event) {
        const card = event.target.closest(".card");
        card.remove();
    });

    cardImage.addEventListener("click", function (event) {
        IMAGE_POPUP.querySelector(".popup__image").setAttribute("src", imgLink);
        openModal(IMAGE_POPUP);
    });
    return card;
}

function prependCard(card) {
    const cardList = document.querySelector(".places__list");
    cardList.prepend(card);
}

function appendCard(card) {
    const cardList = document.querySelector(".places__list");
    cardList.append(card);
}

initialCards.forEach((card) => {
    appendCard(createCard(card.name, card.link));
});


// Form validation

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.getAttribute('name')}-error`);
    inputElement.classList.add('popup__iinput_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__iinput-error_active');
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.getAttribute('name')}-error`);
    inputElement.classList.remove('popup__iinput_type_error');
    errorElement.classList.remove('popup__iinput-error_active');
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
};

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add('popup__button_state_disabled');
    } else {
      buttonElement.classList.remove('popup__button_state_disabled');
    }
};

const setEventListeners = (formElement) => {
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

const enableValidation = () => {
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

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
  
      return !inputElement.validity.valid;
    })
  };
  
enableValidation();