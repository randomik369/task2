class DropDownBed {
  constructor(outerContainerElement) {
    this.outerContainerElement = outerContainerElement;
    this.countBed = 0;
    this.countBedRooms = 0;
    this.countBathrooms = 0;
    this.title = 'Сколько комнат';
    this._render();
  }

  _initialize() {
    this.titleButton = this.outerContainerElement.querySelector('.js-drop-down-bed__title-button');
    this.items = this.outerContainerElement.querySelector('.js-drop-down-bed__items');
  }

  _handleButtonTitleClick = () => {
    this.items.classList.toggle('drop-down-bed__body_show');
  }

  _isCount() {
    return (this.countBedRooms > 0) || (this.countBed > 0) || (this.countBathrooms > 0);
  }

  _isHaveBedRoomsAndBed() {
    return (this.countBedRooms > 0 && this.countBed > 0);
  }

  _isHaveBedRoomsOrBed() {
    return (this.countBedRooms > 0 && this.countBathrooms > 0) || (this.countBed > 0 && this.countBathrooms > 0);
  }


  _handleBodyClick = (e) => {
    const element = e.target;
    if (element.id) {
      const count = element.parentElement.querySelector('.js-drop-down-bed__item-buttons-count');
      const buttonIncrement = element.parentElement.querySelector('.js-drop-down-bed__item-buttons-increment');
      const guestName = element.parentElement.previousElementSibling.innerHTML;

      let newTitle = '';

      let bedRoomsWord = 'спален';
      let bedWord = 'кроватей';
      const bathroomsWord = '...';

      if (element.id === 'decrement') {
        count.innerHTML = parseInt(count.innerHTML, 10) + 1;
        guestName === 'спальни' ? this.countBedRooms += 1 : (guestName === 'кровати') ? this.countBed += 1 : this.countBathrooms += 1;
      } else if (count.innerHTML >= '1') {
        count.innerHTML = parseInt(count.innerHTML, 10) - 1;
        guestName === 'спальни' ? this.countBedRooms -= 1 : (guestName === 'кровати') ? this.countBed -= 1 : this.countBathrooms -= 1;
      }

      bedRoomsWord = (this.countBedRooms === 1) ? 'спальня' : (this.countBedRooms > 1 && this.countBedRooms < 4) ? 'спальни' : bedRoomsWord;

      bedWord = (this.countBed === 1) ? 'кровать ' : (this.countBed > 1 && this.countBed < 4) ? 'кровати' : bedWord;

      if (this._isCount()) {
        if (this.countBedRooms > 0) {
          newTitle += `${this.countBedRooms} ${bedRoomsWord}`;
        }

        if (this._isHaveBedRoomsAndBed()) {
          newTitle += ' , '
        }

        if (this.countBed > 0) {
          newTitle += `${this.countBed} ${bedWord}`;
        }

        if (this._isHaveBedRoomsOrBed()) {
          newTitle += ' , '
        }

        if (this.countBathrooms > 0) {
          newTitle += ` ${this.countBathrooms} ${bathroomsWord}`;
        }

        this.titleButton.innerHTML = newTitle;

      } else {
        this.titleButton.innerHTML = this.title;
      }

      if (count.innerHTML > 0) {
        buttonIncrement.classList.add('drop-down-bed__item-buttons-increment_active');
      } else {
        buttonIncrement.classList.remove('drop-down-bed__item-buttons-increment_active');
      }
    }
  }

  _setEventHandlers() {
    this.titleButton.addEventListener('click', this._handleButtonTitleClick);
    this.items.addEventListener('click', this._handleBodyClick);
  }

  _render() {
    this._initialize();
    this._setEventHandlers();
  }
}

export default DropDownBed;
