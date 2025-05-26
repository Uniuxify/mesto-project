import {TOKEN, GROUP} from './constants.js'

async function getUserData() {
    return fetch(`https://nomoreparties.co/v1/${GROUP}/users/me`, {
        headers: {
          authorization: TOKEN
        }
      })
        .then(res => res.json()); 
}


function updateProfileName(name) {
    const profileTitle = document.querySelector('.profile__title');
    if (profileTitle) {
      profileTitle.textContent = name;
    }
  }
  
  function updateProfileAbout(about) {
    const profileDescription = document.querySelector('.profile__description');
    if (profileDescription) {
      profileDescription.textContent = about;
    }
  }
  
  function updateProfileAvatar(avatarUrl) {
    const profileImage = document.querySelector('.profile__image');
    if (profileImage) {
      profileImage.style.backgroundImage = `url(${avatarUrl})`;
    }
  }
  
function updateUserData() {
    getUserData()
        .then(userData => {
            updateProfileName(userData.name);
            updateProfileAbout(userData.about);
            updateProfileAvatar(userData.avatar);
        })
        .catch(error => {
            console.error('Error loading User Data:', error);
        });
}

async function updateUserProfile(name, about, avatar) {
    const bodyData = {};
  
    if (name && name.trim() !== '') {
        bodyData.name = name;
    }
    if (about && about.trim() !== '') {
        bodyData.about = about;
    }
    if (avatar && avatar.trim() !== '') {
        bodyData.avatar = avatar;
    }
    if (Object.keys(bodyData).length === 0) {
        return Promise.reject('All fields are empty');
    }

    return fetch(`https://nomoreparties.co/v1/${GROUP}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about,
        avatar: avatar
      })
    })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res}`);
      }
      return res.json();
    })
    .then(userData => {
        updateProfileName(userData.name);
        updateProfileAbout(userData.about);
        updateProfileAvatar(userData.avatar);
        return userData;
    })
    .catch(error => {
      console.error('Error during updating profile:', error);
    });
}
async function updateUserAva(avatar) {
    return fetch(`https://nomoreparties.co/v1/${GROUP}/users/me/avatar `, {
      method: 'PATCH',
      headers: {
        authorization: TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
    .then(userData => {
        updateProfileAvatar(userData.avatar);
        return userData;
    })
    .catch(error => {
      console.error('Error during updating avatar:', error);
    });
}

export {updateUserData, updateUserProfile, getUserData, updateUserAva}