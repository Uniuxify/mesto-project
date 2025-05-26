import './pages/index.css';
import {initialCards} from './components/cards.js'
import {enableValidation, toggleButtonState, hideInputError} from './components/validation.js'
import { updateUserData } from './components/user.js';
import { renderCards } from './components/cards.js';



enableValidation();
updateUserData();
renderCards();