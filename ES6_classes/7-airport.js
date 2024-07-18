export default class Airport {
  constructor(name, code) {
    this._name = this._validateName(name);
    this._code = this._validateCode(code);
  }
  _validateName(name) {
    if (typeof name !== 'string') {
      throw new TypeError('Name must be a string');
    }
    return name;
  }
  _validateCode(code) {
    if (typeof code !== 'string') {
      throw new TypeError('Code must be a string');
    }
    return code;
  }
  get name() {
    return this._name;
  }
  set name(value) {
    this._name = this._validateName(value);
  }
  get code() {
    return this._code;
  }
  set code(value) {
    this._code = this._validateCode(value);
  }
  toString() {
    return `[object ${this._code}]`;
  }
}
