import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import * as auth from '../utils/auth';
import accessDenied from '../images/denied.png';
import acception from '../images/accepted.png';

function App() {
  const navigate = useNavigate();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [emailName, setEmailName] = useState(null);
  const [popupAccessImage, setPopupAccessImage] = useState('');
  const [popupAccessTitle, setPopupAccessTitle] = useState('');
  const [infoTooltip, setInfoTooltip] = useState(false);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setEmailName(res.user.email);
          }
        })
        .catch((err) => {
          console.log(`Не удалось получить токен: ${err}`);
        });
    }
  }, []);

  function onRegister(email, password) {
    auth.registerUser(email, password)
      .then(() => {
        setPopupAccessImage(acception);
        setPopupAccessTitle("Вы успешно зарегистрировались!");
        navigate("/signin");
      })
      .catch(() => {

        setPopupAccessImage(accessDenied);
        setPopupAccessTitle("Что-то пошло не так! Попробуйте ещё раз.");
      })
      .finally(handleInfoTooltip);
  }

  function onLogin(email, password) {
    auth.loginUser(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setIsLoggedIn(true);
        setEmailName(email);
        navigate('/');
      })
      .catch(() => {
        setPopupAccessImage(accessDenied);
        setPopupAccessTitle("Что-то пошло не так! Попробуйте ещё раз.");
        handleInfoTooltip();
      })
  }

  useEffect(() => {
    if (isLoggedIn === true) {
      Promise.all([api.getUserInfoApi(), api.getInitialCards()])
        .then(([user, cards]) => {
          setCurrentUser(user.user);
          setCards(cards);
          
        })
        .catch((err) => {
          console.log(err);
        });
        
    return    
      
    }
  }, [isLoggedIn]);

  function handleUpdateUser(data) {
    api.editPageUserInfo(data)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleAvatarUpdate(data) {
    api.editUserAvatar(data)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleAddPlaceSubmit(data) {
    api.addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    if (!isLiked) {
      api.addLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      api.removeLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  function handleCardDelete(card) {
    api.deleteCard(card)
      .then(() => {
        setCards((items) => items.filter((c) => c !== card && c));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleInfoTooltip() {
    setInfoTooltip(true)
  }

  function handlePopupCloseClick(evt) {
    if (evt.target.classList.contains('popup')) {
      closeAllPopups();
    }
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setInfoTooltip(false);
    setSelectedCard(null)
  }

  useEffect(() => {
    if (isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isImagePopupOpen || selectedCard || infoTooltip) {
      function handleEsc(evt) {
        if (evt.key === 'Escape') {
          closeAllPopups();
        }
      }

      document.addEventListener('keydown', handleEsc);

      return () => {
        document.removeEventListener('keydown', handleEsc);
      }
    }
  }, [isEditAvatarPopupOpen, isEditProfilePopupOpen, isAddPlacePopupOpen, selectedCard, isImagePopupOpen, infoTooltip]);

  function onSignOut() {
    setIsLoggedIn(false);
    setEmailName(null);
    navigate('/signin');
    localStorage.removeItem('jwt');
    setEmailName('');

  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path="/signin"
            element={
              <>
                <Navigate to={isLoggedIn ? "/" : "/signin"}/>
                <Header title="Регистрация" route="/signup" />
                <Login onLogin={onLogin} />
              </>
            }
          />
          <Route
            path="signup"
            element={
              <>
                <Navigate to={isLoggedIn ? "/" : "/signup"}/>
                <Header title="Войти" route="/signin" />
                <Register onRegister={onRegister} />          
              </>
            }
          />
          <Route
            exact path="/"
            element={
              <>
                <Header title="Выйти" email={emailName} onClick={onSignOut} route="" />
                <ProtectedRoute
                  component={Main}
                  isLogged={isLoggedIn}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
                <Footer />
              </>
            }
          />
          <Route
            path="*"
            element={<Navigate to={isLoggedIn ? "/" : "/signin"} />}
          />

        </Routes>

        <EditProfilePopup
          onCloseClick={handlePopupCloseClick}
          onClose={closeAllPopups}
          isOpen={isEditProfilePopupOpen}
          onSubmit={handleUpdateUser}
        />
        <EditAvatarPopup
          onCloseClick={handlePopupCloseClick}
          onClose={closeAllPopups}
          isOpen={isEditAvatarPopupOpen}
          onSubmit={handleAvatarUpdate}
        />
        <AddPlacePopup
          onCloseClick={handlePopupCloseClick}
          onClose={closeAllPopups}
          isOpen={isAddPlacePopupOpen}
          onSubmit={handleAddPlaceSubmit}
        />
        <PopupWithForm
          name={'element-delete'}
          form={'delete-form'}
          formId={'delete-element-form'}
          title={'Вы уверены?'}
          buttonText={'Да'}
        />
        <ImagePopup
          onCloseClick={handlePopupCloseClick}
          isOpen={isImagePopupOpen}
          name={'image-opening'}
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          image={popupAccessImage}
          title={popupAccessTitle}
          isOpen={infoTooltip}
          onCloseClick={handlePopupCloseClick}
          onClose={closeAllPopups}
          name={'info'}
        />
      </div>
    </CurrentUserContext.Provider >
  );
}

export default App;
