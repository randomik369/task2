import 'jquery';
import 'jquery-ui/ui/widgets/slider';

class RangeSlider {
  constructor(outerContainerElement) {
    this.outerContainerElement = outerContainerElement;
    this._render();
  }

  _initialize() {
    const $outerContainerElement = $('html').find(this.outerContainerElement);
    this.$element = $outerContainerElement.find('.js-slider-range');
    this.$amount = $outerContainerElement.find('#amount');
  }

  _initializeSlider() {
    const _this = this;

    this.$element.slider({
      range: true,
      min: 1000,
      max: 16000,
      values: [5000, 10000],
      slide(event, ui) {
        _this.$amount.val(`${ui.values[0]}₽ - ${ui.values[1]}₽`);
      },
    });
    this.$amount.val(`${this.$element.slider('values', 0)} ₽`
      + ` - ${this.$element.slider('values', 1)} ₽`);
  }

  _render() {
    this._initialize();
    this._initializeSlider();
  }
}

export default RangeSlider;
