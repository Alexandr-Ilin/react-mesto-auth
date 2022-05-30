import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../context/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser, isRenderLoading}) {
  const currentUser = React.useContext(CurrentUserContext); 

  const [values, setValues] = React.useState({user: currentUser.name , character: currentUser.about})

  React.useEffect(() => {
    setValues({user: currentUser.name, character: currentUser.about})
}, [isOpen, currentUser])
  
function handleSubmit(e) {
  // Запрещаем браузеру переходить по адресу формы
  e.preventDefault();
  // Передаём значения управляемых компонентов во внешний обработчик
  onUpdateUser({
    user: values.user,
    character: values.character,
  });
}

const handleChange = (event) => { 
  const { name, value } = event.target
    setValues((prev) => ({ 
      ...prev, 
      [name]: value
  })) 
} 

  return (
    <PopupWithForm
      title='Редактировать профиль'
      name='edit-profile'
      isOpen={isOpen}
      onClose={onClose}
      buttonText={isRenderLoading ? 'Сохранение...' : 'Сохранить'}
      onSubmit={handleSubmit}>
      <input value={values.user || ''} onChange={handleChange} required minLength="2" maxLength="40" type="text" className="form__item form__item_type_name" name="user" placeholder="Имя"/>
      <span className="form__error-message form__error-message_type_user"> </span>
      <input value={values.character || ''} onChange={handleChange} required minLength="2" maxLength="200" type="text" className="form__item form__item_type_about" name="character" placeholder="О себе"/>
      <span className="form__error-message form__error-message_type_character"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;