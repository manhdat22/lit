import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="l-header">
        <p className="l-header__title">#Lít</p>
        <button className="l-header__add-button">+</button>
      </header>

      <div className="c-seperator"></div>

      <section className="l-body">

        <div className="c-card">
          <div className="c-card__header">
            <p className="c-card__title">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="c-card__body">
            <div className="c-card__body">
              <ul className="l-checklist">
                <li className="l-checklist__item">
                  <div className="c-checkbox">
                    <input id="option_1" type="checkbox" name="checkbox" className="c-checkbox__input"/>
                    <label className="c-checkbox__label">Quisque sit amet nulla fermentum, placerat nulla id, mollis orci.</label>
                  </div>
                </li>

                <li className="l-checklist__item">
                  <div className="c-checkbox">
                    <input id="option_2" type="checkbox" name="checkbox" className="c-checkbox__input"/>
                    <label className="c-checkbox__label">Fusce sed finibus lectus.</label>
                  </div>
                </li>

                <li className="l-checklist__item">
                  <div className="c-checkbox">
                    <input id="option_3" type="checkbox" name="checkbox" className="c-checkbox__input"/>
                    <label className="c-checkbox__label">Vestibulum hendrerit arcu at ornare viverra. Vivamus eget molestie diam. Suspendisse a sagittis nulla, eget tincidunt odio.</label>
                  </div>
                </li>

                <li className="l-checklist__item">
                  <div className="c-checkbox">
                    <input id="option_4" type="checkbox" name="checkbox" className="c-checkbox__input"/>
                    <label className="c-checkbox__label">Donec nulla orci, sollicitudin eu diam ut.</label>
                  </div>
                </li>

                <li className="l-checklist__item">
                  <div className="c-checkbox">
                    <input id="option_4" type="checkbox" name="checkbox" className="c-checkbox__input"/>
                    <label className="c-checkbox__label">Etiam semper rhoncus urna, a vehicula nisi ultrices eget. Aenean faucibus ipsum quis laoreet eleifend. Donec laoreet malesuada maximus. Cras quis magna nec nunc elementum commodo rutrum nec tellus.</label>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="c-seperator"></div>
      </section>
    </div>
  );
}

export default App;
