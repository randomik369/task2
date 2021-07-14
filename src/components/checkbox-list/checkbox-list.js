class Checkbox {
  constructor(outerContainerElement) {
    this.outerContainerElement = outerContainerElement;
    this._render();
  }

  _initialize() {
    this.checkboxButton = this.outerContainerElement.querySelector('.js-checkbox-list__title-button');
    this.checkboxItems = this.outerContainerElement.querySelector('.js-checkbox-list__items');
  }

  _handleCheckboxClick = () => {
    this.checkboxItems.classList.toggle('checkbox-list__items_show');
    this.checkboxButton.classList.toggle('checkbox-list__title-button_rotate');
  }

  _setEventHandlers() {
    this.checkboxButton.addEventListener('click', this._handleCheckboxClick);
  }

  _render() {
    this._initialize();
    this._setEventHandlers();
  }
}

export default Checkbox;
