import React from 'react'

function PopupWithForm({ title, name, isOpen, onClose, buttonText, children, onSubmit, }) {
  return (
    <section className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__form-container">
        <button onClick={onClose} type="button" className="popup__close" aria-label="Закрыть окно"></button>
        <h2 className="popup__form-header">{title}</h2>
        <form action="#" className="form" name={`form-${name}`} onSubmit={onSubmit}>
          <>{children}</>
          <button type="submit" className="form__submit-button">{buttonText}</button>
        </form>
      </div>
    </section>
  )
}

export default PopupWithForm;