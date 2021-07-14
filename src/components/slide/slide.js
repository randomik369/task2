import 'slick-carousel';
import 'slick-carousel/slick/slick.css';

class Slider {
  constructor(outerContainerElement) {
    this.outerContainerElement = outerContainerElement;
    this._render();
  }

  _initialize() {
    const $outerContainerElement = $('html').find(this.outerContainerElement);
    this.$element = $outerContainerElement.find('.slick__slide');
  }

  _initializeSlick() {
    this.$element.slick({ dots: true });
  }

  _render() {
    this._initialize();
    this._initializeSlick();
  }
}

export default Slider;
