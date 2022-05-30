import React from 'react'

function ImagePopup(props) {

  return (
    <section className={`popup popup_type_view-image ${props.data.isOpen ? 'popup_opened': ''}`}>
      <div className="popup__view-container">
        <button type="button" className="popup__close" aria-label="Закрыть окно" onClick={props.onClose}></button>
        <figure className="element-view">
          <img src={props.data.card.link} alt={props.data.card.name} className="element-view__image"/>
          <figcaption className="element-view__caption">
            <h2 className="element-view__place">{props.data.card.name}</h2>
          </figcaption>
        </figure>
      </div>
  </section>)
}

export default ImagePopup;