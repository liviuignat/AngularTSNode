/**
 * A helper class to simplify registering Angular components and provide a consistent syntax for doing so.
 * Copied from https://raw.githubusercontent.com/michaelbromley/angular-es6/master/src/app/utils/register.js
 */
(function(angular) {
  angular.register = register;

  function register(appName) {

    var app = angular.module(appName);

    return {
      directive: directive,
      controller: controller,
      service: service,
      provider: provider,
      factory: factory
    };

    function directive(name, ConstructorFn) {

      ConstructorFn = _normalizeConstructor(ConstructorFn);

      if (!ConstructorFn.prototype.compile) {
        // create an empty compile function if none was defined.
        ConstructorFn.prototype.compile = () => {};
      }

      var originalCompileFn = _cloneFunction(ConstructorFn.prototype.compile);

      // Decorate the compile method to automatically return the link method (if it exists)
      // and bind it to the context of the constructor (so `this` works correctly).
      // This gets around the problem of a non-lexical "this" which occurs when the directive class itself
      // returns `this.link` from within the compile function.
      _override(ConstructorFn.prototype, 'compile', function () {
        return function () {
          originalCompileFn.apply(this, arguments);

          if (ConstructorFn.prototype.link) {
            return ConstructorFn.prototype.link.bind(this);
          }
        };
      });

      var factoryArray = _createFactoryArray(ConstructorFn);

      app.directive(name, factoryArray);
      return this;
    }

    function controller(name, contructorFn) {
      app.controller(name, contructorFn);
      return this;
    }

    function service(name, contructorFn) {
      app.service(name, contructorFn);
      return this;
    }

    function provider(name, ConstructorFn) {
      app.provider(name, ConstructorFn);
      return this;
    }

    function factory(name, ConstructorFn) {
      ConstructorFn = _normalizeConstructor(ConstructorFn);
      var factoryArray = _createFactoryArray(ConstructorFn);
      app.factory(name, factoryArray);
      return this;
    }

    /**
     * If the ConstructorFn is an array of type ['dep1', 'dep2', ..., constructor() {}]
     * we need to pull out the array of dependencies and add it as an $inject property of the
     * actual constructor function.
     * @param input
     * @returns {*}
     * @private
     */
    function _normalizeConstructor(input) {
      var ConstructorFn;

      if (input.constructor === Array) {
        //
        var injected = input.slice(0, input.length - 1);
        ConstructorFn = input[input.length - 1];
        ConstructorFn.$inject = injected;
      } else {
        ConstructorFn = input;
      }

      return ConstructorFn;
    }

    /**
     * Convert a constructor function into a factory function which returns a new instance of that
     * constructor, with the correct dependencies automatically injected as arguments.
     *
     * In order to inject the dependencies, they must be attached to the constructor function with the
     * `$inject` property annotation.
     *
     * @param ConstructorFn
     * @returns {Array.<T>}
     * @private
     */
    function _createFactoryArray(ConstructorFn) {
      // get the array of dependencies that are needed by this component (as contained in the `$inject` array)
      var args = ConstructorFn.$inject || [];
      var factoryArray = args.slice(); // create a copy of the array
      // The factoryArray uses Angular's array notation whereby each element of the array is the name of a
      // dependency, and the final item is the factory function itself.
      factoryArray.push((args) => {
        var instance = new ConstructorFn(args);
        for (var key in instance) {
          instance[key] = instance[key];
        }
        return instance;
      });

      return factoryArray;
    }

    /**
     * Clone a function
     * @param original
     * @returns {Function}
     */
    function _cloneFunction(original) {
      return function() {
        return original.apply(this, arguments);
      };
    }

    /**
     * Override an object's method with a new one specified by `callback`.
     * @param object
     * @param methodName
     * @param callback
     */
    function _override(object, methodName, callback) {
      object[methodName] = callback(object[methodName]);
    }
  }
})(angular);
