import React from "react";
import okPath from '../images/ok.svg'
import errorPath from '../images/error.svg'
function InfoTooltip({isOpen, result, onClose}) {
  return (
    <section className={`popup popup_type_info-tool ${isOpen ? 'popup_opened': ''}`}>
      <div className="popup__info-container">
        <button onClick={onClose} type="button" className="popup__close" aria-label="Закрыть окно"></button>
        <img className="popup__info-image" src={result ? okPath : errorPath} alt={result ? 'Успешно' : 'Что-то не так'} />
        <h2 className="popup__info-header">{result ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
        
      </div>
    </section>
  )
  
}

export default InfoTooltip;