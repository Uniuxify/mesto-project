import {openModal} from './popup.js'
import {TOKEN, GROUP} from './constants.js'
import { getUserData } from './user.js';

const IMAGE_POPUP = document.querySelector(".popup_type_image");
const CURR_USER_ID = await getUserData();

async function getCardsData() {
  return fetch(`https://nomoreparties.co/v1/${GROUP}/cards`, {
      headers: {
        authorization: TOKEN
      }
    })
      .then(res => res.json()); 
}

async function renderCards() {
  try {
    const cardsData = await getCardsData();
    
    cardsData.forEach(cardData => {
      const cardElement = createCard(
        cardData.name,
        cardData.link,
        IMAGE_POPUP,
        cardData.owner._id,
        cardData._id,
        cardData.likes.length,
        isUserInLikes(cardData.likes)
      );
      appendCard(cardElement);
    });
    
  } catch (error) {
    console.error(error);
  }
}


async function deleteCard(cardId, card_element) {
  return fetch(`https://nomoreparties.co/v1/${GROUP}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: TOKEN
    }
  })
  .then(res => {
    if (res.ok) {
      card_element.remove();
    }
    return res.json();
  });
}

// cardData.owner.name,
function createCard(title, imgLink, img_popup, author_id, card_id, n_likes, is_liked) {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.cloneNode(true);

  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const cardLikeButton = card.querySelector(".card__like-button");
  
  const cardLikeCounter = card.querySelector(".card__like-counter");

  cardImage.setAttribute("src", imgLink);
  cardTitle.textContent = title;

  cardLikeButton.addEventListener("click", function (event) {
    
    const isLiked = event.target.classList.contains("card__like-button_is-active");
    const method = isLiked ? 'DELETE' : 'PUT';
  
    // Отправляем запрос на сервер
    fetch(`https://nomoreparties.co/v1/${GROUP}/cards/likes/${card_id}`, {
      method: method,
      headers: {
        authorization: TOKEN,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      return res.json();
    })
    .then(updatedCard => {
      event.target.classList.toggle("card__like-button_is-active");
      cardLikeCounter.textContent = updatedCard.likes.length;
    })
    .catch(error => {
      console.error('Ошибка при обновлении лайка:', error);
    });
  });
  
  console.log('is liked', is_liked);
  if (is_liked) {
    cardLikeButton.classList.toggle('card__like-button_is-active');
  }

  const cardDeleteButton = card.querySelector(".card__delete-button");
  if (author_id == CURR_USER_ID['_id']) {
    
    cardDeleteButton.addEventListener("click", function (event) {
      const card = event.target.closest(".card");
            deleteCard(card_id, card);
    });
  } else {
    cardDeleteButton.remove();
  }

  cardImage.addEventListener("click", function (event) {
    img_popup.querySelector(".popup__image").setAttribute("src", imgLink);
      openModal(img_popup);
  });
  cardLikeCounter.textContent = n_likes || 0;
  return card;
}

function prependCard(card) {
  const cardList = document.querySelector(".places__list");
  cardList.prepend(card);
}

function isUserInLikes(likes) {
  return likes.some(user => user._id == CURR_USER_ID._id);
}
async function createAndAddCard(name, link) {
  return fetch(`https://nomoreparties.co/v1/${GROUP}/cards`, {
    method: 'POST',
    headers: {
      authorization: TOKEN,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(res => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  })
  .then(cardData => {
    const newCard = createCard(cardData.name, cardData.link, IMAGE_POPUP, cardData.owner._id, cardData._id, cardData.likes.length, isUserInLikes(cardData.likes));
    prependCard(newCard);
    return cardData;
  })
  .catch(error => {
    console.error('Ошибка при создании карточки:', error);
  });
}

function appendCard(card) {
  const cardList = document.querySelector(".places__list");
  cardList.append(card);
}


export {createAndAddCard, prependCard, appendCard, renderCards}