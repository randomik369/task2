class Like {
  constructor(likeButton) {
    this.likeButton = likeButton;
    this._render();
  }

  _initialize() {
    this.count = this.likeButton.querySelector('.js-like-button__count');
  }

  _handleButtonClick = () => {
    if (this.likeButton.classList.contains('like-button_pressed')) {
      this.count.innerHTML = parseInt(this.count.innerHTML, 10) - 1;
      this.likeButton.classList.remove('like-button_pressed');
    } else {
      this.count.innerHTML = parseInt(this.count.innerHTML, 10) + 1;
      this.likeButton.classList.add('like-button_pressed');
    }
  }

  _setEventHandlers() {
    this.likeButton.addEventListener('click', this._handleButtonClick);
  }

  _render() {
    this._initialize();
    this._setEventHandlers();
  }
}

export default Like;
