import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, onAddPlace, isRenderLoading}) {

const [values, setValues] = React.useState({name: '' ,link:''})

React.useEffect(() => {
    setValues({name: '', link:''})
  }, [isOpen])

const handleChange = (event) => { 
  const { name, value } = event.target
    setValues((prev) => ({ 
      ...prev, 
      [name]: value
  })) 
} 

function handleSubmit(e) {
  e.preventDefault()
    onAddPlace({
      name: values.name,
      link: values.link 
    })
}

  return (
    <PopupWithForm
      title='Новое место'
      name='add-card'
      isOpen={isOpen}
      onClose={onClose}
      buttonText={isRenderLoading ? 'Сохранение...' : 'Сохранить'}
      onSubmit={handleSubmit}>
      <input value={values.name || ''} onChange={handleChange} required minLength="2" maxLength="30" type="text" className="form__item form__item_type_place" name="name" placeholder="Название"/>
      <span className="form__error-message form__error-message_type_name"></span>
      <input  value={values.link || ''} onChange={handleChange} required type="url" className="form__item form__item_type_link" name="link" placeholder="Ссылка на картинку"/>
      <span className="form__error-message form__error-message_type_link"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;