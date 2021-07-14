import InputMask from 'inputmask';

class MaskInput {
  constructor(mask) {
    this.mask = mask;
    this._render();
  }

  _initialize() {
    const target = this.mask.querySelector('.js-masked__input');
    const inputMask = new InputMask('99.99.9999', { placeholder: 'ДД.ММ.ГГГГ', nullable: false }).mask(target);
  }

  _render() {
    this._initialize();
  }
}

export default MaskInput;
