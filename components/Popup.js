class Popup {
  constructor(selector) {
    this._element = document.querySelector(selector);
    this._closeButton = this._element.querySelector(".popup__close");
    this._handleEscapeClose = this._handleEscapeClose.bind(this);
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
    this._element.addEventListener("click", (event) => {
      if (event.target === this._element) {
        this.close();
      }
    });
  }
  open() {
    this._element.classList.add("popup_visible");
    document.addEventListener("keydown", this._handleEscapeClose);
  }
  close() {
    this._element.classList.remove("popup_visible");
    document.removeEventListener("keydown", this._handleEscapeClose);
  }
}

class PopupWithForm extends Popup {
  constructor(selector, submitFunction) {
    super(selector);
    this.formElement = this._element.querySelector("form");
    this._formInputs = this.formElement.querySelectorAll(".popup__input");
    this._submitButton = this.formElement.querySelector(
      'button[type="submit"]'
    );
    this._submitFunction = submitFunction;
  }
  _getInputValues() {
    const formInputValues = {};
    this._formInputs.forEach((input) => {
      formInputValues[input.name] = input.value;
    });
    return formInputValues;
  }
  setEventListeners() {
    super.setEventListeners();
    this.formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      this._submitHandler();
    });
  }
  _submitHandler() {
    this._submitFunction(this._getInputValues());
    this.formElement.reset();
    this.close();
  }
}

export { PopupWithForm };
