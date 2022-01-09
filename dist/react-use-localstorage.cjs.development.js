'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');

var isJson = function isJson(s) {
  if (!s) return false;

  try {
    var o = JSON.parse(s);
    if (o && typeof o === 'object') return true;
  } catch (e) {}

  return false;
};

function useLocalStorage(key, initialValue) {
  if (initialValue === void 0) {
    initialValue = '';
  }

  if (!window.localStorage.getItem(key)) {
    if (typeof (initialValue) == 'object') window.localStorage.setItem(key, JSON.stringify(initialValue));else window.localStorage.setItem(key, initialValue);
  }

  var _useState = react.useState(function () {
    var i = window.localStorage.getItem(key);
    if (i && isJson(i)) return JSON.parse(i);else return i;
  }),
      value = _useState[0],
      setValue = _useState[1];

  var setItem = function setItem(newValue) {
    setValue(newValue);
    if (typeof (newValue) == 'object') return window.localStorage.setItem(key, JSON.stringify(newValue));else window.localStorage.setItem(key, newValue);
  };

  react.useEffect(function () {
    var newValue = window.localStorage.getItem(key);

    if (value !== newValue) {
      setValue(newValue || initialValue);
    }
  });
  var handleStorage = react.useCallback(function (event) {
    if (event.key === key && event.newValue !== value) {
      setValue(event.newValue || initialValue);
    }
  }, [value]);
  react.useEffect(function () {
    window.addEventListener('storage', handleStorage);
    return function () {
      return window.removeEventListener('storage', handleStorage);
    };
  }, [handleStorage]);
  return [value, setItem];
}

exports.default = useLocalStorage;
//# sourceMappingURL=react-use-localstorage.cjs.development.js.map
