/// <reference path="./../../../interfaces.d.ts"/>

var $inject = [
  '$location'
];

class ListController {
  static $inject: any[];
  constructor(private $location) {
  }

  clickItem(item) {
    this.$location.path('/edit/' + item.key)
  }
}

ListController.$inject = $inject;
angular.register('app')
  .controller('ListController', ListController);
