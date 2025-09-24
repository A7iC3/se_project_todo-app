class Popup {
  constructor(selector) {
    this._element = document.querySelector(selector);
    this._closeButton = this._element.querySelector(".popup__close");
  }
  _handleEscapeClose(event) {
    if (
      event.key === "Escape" &&
      this._element.classList.contains("popup_visible")
    ) {
      this.close();
    }
  }
  setEventListeners() {
    this._closeButton.addEventListener("click", () => {
      this.close();
    });
    this.addEventListener("click", (event) => {
      if (event.target === this) {
        this.close();
      }
    });
  }
  open() {
    this._element._classList.add("popup_visible");
  }
  close() {
    this._element.classList.remove("popup_visible");
  }
}

class PopupWithForm extends Popup {
  constructor(selector, submitHandler) {
    super(selector);
    this._form = this._element.querySelector("form");
    this._formInputs = this._form.querySelectorAll(".popup__input");
    this._submitButton = this._form.querySelector('button[type="submit"]');
    this._submitHandler = submitHandler;
  }
  _getInputValues() {
    const formInputValues = {};
    this._formInputs.forEach((input) => {
      formInputValues[input.name] = input.value;
    });
    return formInputValues;
  }
  setEventListeners() {
    super();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._submitHandler(this._getInputValues);
    });
  }
  _submitHandler(values) {
    const inputValues = values;
    this._form.reset();
    this.close();
  }
}
