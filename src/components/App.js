import React from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../context/CurrentUserContext';
import {api} from '../utils/api'
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePlacePopup from './DeletePlacePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = React.useState({ isOpen:false, card:{} })
  const [selectedCard, setSelectedCard] = React.useState({ isOpen:false, card:{} });

  const [currentUser, setCurrentUser] = React.useState({})
  const [cards, setCards] = React.useState([])
  const [renderLoading, setRenderLoading] = React.useState(false)

  React.useEffect(() => {
    api.getUserData()
      .then((res) => {
        setCurrentUser(res)
      })
      .catch((err) => {
        console.log(err);
      })

    api.getInitialCards()
      .then((res) => {
      setCards(res)
    })
      .catch((err) => {
        console.log(err);
      })
  },[])

  //открытие/закрытие попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePlacePopupOpen(false)
    setSelectedCard({isOpen:false, card:{}})
  }

  function handleCardClick(card) {
    setSelectedCard({isOpen:true, card:card})
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }
    
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }  

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleDeletePlaceClick(card) {
    setIsDeletePlacePopupOpen({isOpen:true, card:card})
  }


  //функции обновления данных
  function handleUpdateUser({user, character}) {
    setRenderLoading(true)
    api.changeUserData({ user, character }) 
      .then((data) => {
         setCurrentUser(data)
         closeAllPopups()
    })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setRenderLoading(false);
      })
  }
  
  function handleUpdateAvatar(avatar) {
    setRenderLoading(true)
    api.chengeAvatar(avatar)
      .then((data) => {
        setCurrentUser({...currentUser, avatar: data.avatar})
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setRenderLoading(false);
      })
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      })
  } 

  function handleCardDelete(card) {
    setRenderLoading(true)
    api.deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter(itemCard => itemCard._id === card._id ? false : true)
        setCards(newCards)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setRenderLoading(false);
      })
  }

  function handleAddPlaceSubmit({name, link}) {
    setRenderLoading(true)
    api.addNewCard({name, link})
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setRenderLoading(false);
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      
      < Header />
      
      < Main 
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleDeletePlaceClick}
      />

      < Footer />

      <EditAvatarPopup 
        isOpen={isEditAvatarPopupOpen} 
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isRenderLoading={renderLoading}
      />

      <EditProfilePopup 
        isOpen={isEditProfilePopupOpen} 
        onClose={closeAllPopups} 
        onUpdateUser={handleUpdateUser}
        isRenderLoading={renderLoading}
      />
      
      <AddPlacePopup 
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        isRenderLoading={renderLoading}
      />

      <ImagePopup
        data={selectedCard}
        onClose={closeAllPopups}
      />

      <DeletePlacePopup
        isOpen={isDeletePlacePopupOpen.isOpen}
        card={isDeletePlacePopupOpen.card}
        onClose={closeAllPopups}
        onDelete={handleCardDelete}
        isRenderLoading={renderLoading}
      />
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
 