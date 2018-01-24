/* eslint-env jasmine */
describe('SeriesController', function () {
  beforeEach(module('marvelApp'));

  var $controller;
  var $rootScope;
  var $routeParams;
  var $scope;
  var SeriesController;
  var MarvelService;
  var mockPromise = {
    then: function (success) {
      success({
        count: 0,
        length: 0
      });
    }
  };

  beforeEach(angular.mock.module('marvelApp.series'));

  beforeEach(inject(function (_$controller_, _$rootScope_, _$routeParams_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $routeParams = _$routeParams_;
    SeriesController = $controller('SeriesController', {
      $scope: $rootScope,
      $routeParams: $routeParams
    });
  }));

  it('should be defined', function () {
    expect(SeriesController).toBeDefined();
  });

  describe('series details', function () {
    beforeEach(inject(function (_$controller_, _$rootScope_, _$routeParams_, _MarvelService_) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      $routeParams = _$routeParams_;
      $routeParams.id = '123';
      MarvelService = _MarvelService_;

      spyOn(MarvelService, 'getItem').and.returnValue(mockPromise);

      SeriesController = $controller('SeriesController', {
        $scope: $rootScope,
        $routeParams: $routeParams,
        MarvelService: MarvelService
      });
    }));

    it('should call the marvel service', function () {
      expect(MarvelService.getItem).toHaveBeenCalledWith('series', $routeParams.id);
    });
  });

  describe('series belonging to', function () {
    beforeEach(inject(function (_$controller_, _$rootScope_, _$routeParams_, _MarvelService_) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      $routeParams = _$routeParams_;
      $routeParams.itemType = 'creator';
      $routeParams.itemId = '123';
      MarvelService = _MarvelService_;

      spyOn(MarvelService, 'getItem').and.returnValue(mockPromise);

      SeriesController = $controller('SeriesController', {
        $scope: $rootScope,
        $routeParams: $routeParams,
        MarvelService: MarvelService
      });
    }));

    it('should call the marvel service', function () {
      expect(MarvelService.getItem).toHaveBeenCalledWith($routeParams.itemType, $routeParams.itemId);
    });
  });

  describe('series load more', function () {
    var params = {
      offset: 0,
      titleStartsWith: undefined
    };
    beforeEach(inject(function (_$controller_, _$rootScope_, _$routeParams_, _MarvelService_) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      $routeParams = _$routeParams_;
      MarvelService = _MarvelService_;

      $scope = $rootScope.$new();

      spyOn(MarvelService, 'getList').and.returnValue(mockPromise);

      SeriesController = $controller('SeriesController', {
        $scope: $rootScope,
        $routeParams: $routeParams,
        MarvelService: MarvelService
      });
    }));

    it('should call the marvel service', function () {
      $scope.loadMore();
      expect(MarvelService.getList).toHaveBeenCalledWith('series', params);
    });
  });

  describe('series load more clear startsWith param', function () {
    var params = {
      offset: 0
    };
    beforeEach(inject(function (_$controller_, _$rootScope_, _$routeParams_, _MarvelService_) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      $routeParams = _$routeParams_;
      MarvelService = _MarvelService_;

      $scope = $rootScope.$new();

      spyOn(MarvelService, 'getList').and.returnValue(mockPromise);

      SeriesController = $controller('SeriesController', {
        $scope: $scope,
        $routeParams: $routeParams,
        MarvelService: MarvelService
      });
    }));

    it('should call the marvel service', function () {
      $scope.listOptions = {
        startsWith: ''
      };
      $scope.loadMore();
      expect(MarvelService.getList).toHaveBeenCalledWith('series', params);
    });
  });

  describe('series filter', function () {
    var params = {
      offset: 0,
      titleStartsWith: undefined
    };
    beforeEach(inject(function (_$controller_, _$rootScope_, _$routeParams_, _MarvelService_) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      $routeParams = _$routeParams_;
      MarvelService = _MarvelService_;

      $scope = $rootScope.$new();

      spyOn(MarvelService, 'getList').and.returnValue(mockPromise);

      SeriesController = $controller('SeriesController', {
        $scope: $rootScope,
        $routeParams: $routeParams,
        MarvelService: MarvelService
      });
    }));

    it('should call the marvel service', function () {
      $scope.filter();
      expect(MarvelService.getList).toHaveBeenCalledWith('series', params);
    });
  });

  describe('series filter clear startsWith param', function () {
    var params = {
      offset: 0
    };
    beforeEach(inject(function (_$controller_, _$rootScope_, _$routeParams_, _MarvelService_) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      $routeParams = _$routeParams_;
      MarvelService = _MarvelService_;

      $scope = $rootScope.$new();

      spyOn(MarvelService, 'getList').and.returnValue(mockPromise);

      SeriesController = $controller('SeriesController', {
        $scope: $scope,
        $routeParams: $routeParams,
        MarvelService: MarvelService
      });
    }));

    it('should call the marvel service', function () {
      $scope.listOptions = {
        startsWith: ''
      };
      $scope.filter();
      expect(MarvelService.getList).toHaveBeenCalledWith('series', params);
    });
  });
});
