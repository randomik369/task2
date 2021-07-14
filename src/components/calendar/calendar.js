import 'air-datepicker';
import 'air-datepicker/dist/css/datepicker.css';

class Calendar {
  constructor(outerContainerElement) {
    this.outerContainerElement = outerContainerElement;
    this._initialize();
    this._selectDatepicker();
  }

  _initialize() {
    const $outerContainerElement = $('html').find(this.outerContainerElement);
    this.$containerElement = $outerContainerElement;
    this.$dateInputs = this.$containerElement.find('.js-calendar__input');
    this.isDouble = this.$containerElement.hasClass('js-calendar_double');
    this.isWithRange = this.$containerElement.hasClass('js-calendar_range');
  }

  _selectDatepicker() {
    if (this.isDouble) {
      this._doubleDatepicker();
    } else if (this.isWithRange) {
      this._oneDatepickerWithRange();
    } else {
      this._oneDatepicker();
    }
  }

  _oneDatepicker() {
    this.$targetInput = this.$dateInputs.eq(0);
    this.$targetInput.datepicker({
      navTitles: {
        days: 'MM yyyy',
      },
      // inline: true,
      onShow: this._handleDatepickerShow,
      onSelect: this._handleDoubleInputSelectRange,
    });
  }

  _doubleDatepicker() {
    this.$oneInput = this.$dateInputs.eq(0);
    this.$twoInput = this.$dateInputs.eq(1);

    this.datepickerInstance = this.$oneInput.datepicker({
      navTitles: {
        days: 'MM yyyy',
      },
      range: true,
      minDate: new Date(),
      onShow: this._handleDatepickerShow,
      onSelect: this._handleDoubleInputSelectRange,
    }).data('datepicker');

    this.datepickerInstance.show();
    this.datepickerInstance.hide();
  }

  _oneDatepickerWithRange() {
    this.$targetInput = this.$dateInputs.eq(0);
    this.$targetInput.datepicker({
      navTitles: {
        days: 'MM yyyy',
      },
      range: true,
      dateFormat: 'dd M',
      multipleDatesSeparator: ' - ',
      onShow: this._handleDatepickerShow,
      onSelect: this._handleDoubleInputSelectRange,
    });
  }

  _calendarButtonsIsHave(inst, animationCompleted) {
    return !inst.$datepicker.find('.calendar__buttons').html() && !animationCompleted;
  }

  _handleDatepickerShow = (inst, animationCompleted) => {
    if (this._calendarButtonsIsHave(inst, animationCompleted)) {
      inst.$datepicker.append(
        `<div class="calendar__buttons">
            <p class="calendar__clear-button js-calendar__clear-button">очистить</p>
            <p class="calendar__apply-button js-calendar__apply-button">применить</p>
          </div>`,
      );

      this.clearButton = inst.$datepicker.find('.js-calendar__clear-button');
      this.clearButton.click(this._handleClearButtonClick.bind(this, inst));

      this.applyButton = inst.$datepicker.find('.js-calendar__apply-button');
      this.applyButton.click(this._handleApplyButtonClick.bind(this, inst));

      if (this.$twoInput) {
        this.$twoInput.bind('click', inst.show.bind(inst));
      }
    }
  }

  _handleDoubleInputSelectRange = (formattedDate) => {
    this.clearButton.show();
    const addDate = formattedDate.split(',');
    if (addDate.length === 2) {
      this.$oneInput.val(addDate[0]);
      this.$twoInput.val(addDate[1]);
    }
  }

  _handleApplyButtonClick(inst) {
    inst.hide();
  }

  _handleClearButtonClick(inst) {
    inst.clear();
    this.$dateInputs.each((_, element) => { element.value = ''; });
    this.clearButton.hide();
  }
}

export default Calendar;
