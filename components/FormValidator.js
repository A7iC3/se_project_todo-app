export default class FormValidator {
  constructor(validConfig, formElement) {
    this._validConfig = validConfig;
    this._formElement = formElement;
    this._inputSelector = validConfig.inputSelector;
    this._submitSelector = validConfig.submitButtonSelector;
    this._errorClass = validConfig.errorClass;
    this._inputErrorClass = validConfig.inputErrorClass;
    this._inactiveBtnClass = validConfig.inactiveButtonClass;
    this._initialize();
  }
  _initialize() {
    //Creating an array of objects pairing of each input element and it's related error element
    const inputListTemp = this._formElement.querySelectorAll(
      this._inputSelector
    );
    this._inputList = [];
    inputListTemp.forEach((inputEleTemp) => {
      const errorEleTemp = this._formElement.querySelector(
        `#${inputEleTemp.id}-error`
      );
      this._inputList.push({
        input: inputEleTemp,
        error: errorEleTemp,
      });
    });
    //Getting the submit button element
    this._submitBtn = this._formElement.querySelector(this._submitSelector);
  }
  _showInputError(inputObj) {
    inputObj.input.classList.add(this._inputErrorClass);
    inputObj.error.textContent = inputObj.input.validationMessage;
    inputObj.error.classList.add(this._errorClass);
  }
  _hideInputError(inputObj) {
    inputObj.input.classList.remove(this._inputErrorClass);
    inputObj.error.classList.remove(this._errorClass);
    inputObj.error.textContent = "";
  }
  _checkValid(inputObj) {
    if (!inputObj.input.checkValidity()) {
      this._showInputError(inputObj);
    } else {
      this._hideInputError(inputObj);
    }
  }
  checkSubmit() {
    if (
      this._inputList.every((inputListObj) => {
        return inputListObj.input.validity.valid;
      })
    ) {
      this._submitBtn.classList.remove(this._inactiveBtnClass);
      this._submitBtn.disabled = false;
      return true;
    } else {
      this._submitBtn.classList.add(this._inactiveBtnClass);
      this._submitBtn.disabled = true;
      return false;
    }
  }
  _setEventListeners() {
    this._inputList.forEach((inputObj) => {
      inputObj.input.addEventListener("input", () => {
        this._checkValid(inputObj);
        this.checkSubmit();
      });
    });
  }
  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
    this.checkSubmit();
  }
  resetValidation() {
    this._formElement.reset();
    this._inputList.forEach((inputObj) => {
      this._hideInputError(inputObj);
    });
    this.checkSubmit();
  }
}
