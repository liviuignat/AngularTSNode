/// <reference path="./../../../interfaces.d.ts"/>

describe('ListController', function () {
  var $scope, $q, $location;

  beforeEach(function () {
    module('app');
  });

  beforeEach(inject(function ($injector, $controller, $rootScope, _$location_, _$q_) {
    $scope = $rootScope.$new();
    $q = _$q_;
    $location = _$location_;

    $controller('ListController as model', {
      $scope: $scope,
      $location: $location
    });
  }));

  it('Scope model should be defined', function () {
    expect($scope.model).toBeDefined();
  });
});
