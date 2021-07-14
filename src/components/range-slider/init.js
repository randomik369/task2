import RangeSlider from './range-slider';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-range-slider').forEach((element) => new RangeSlider(element));
});
