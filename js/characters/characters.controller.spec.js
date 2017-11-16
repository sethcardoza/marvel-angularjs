describe("CharactersController", function() {
  beforeEach(module('marvelApp'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  it('Expects this test to be true', function() {
    console.log('in here');
    expect(true).toBe(true);
  });
});
