(function () {
  'use strict';

  describe('<post>', function () {
    var vm;
    var users, bleets;
    var editBleetForm;
    var expectedUser;

    beforeEach(module('tddWorkshop.posts'));

    beforeEach(inject(function ($injector) {
      users = $injector.get('users');
      bleets = $injector.get('bleets');

      expectedUser = {
        id: 0,
        username: 'bigmike',
        fullName: 'Big Mike',
        avatarUrl: '/path/to/avatar'
      };

      var $q = $injector.get('$q');
      spyOn(users, 'getUser').and.returnValue($q.when(expectedUser));
      spyOn(bleets, 'deleteBleet').and.returnValue($q.when());

      editBleetForm = jasmine.createSpyObj('editBleetForm', ['$setPristine', '$setUntouched']);

      vm = $injector.get('$componentController')('post', null, {
        post: {
          id: 1,
          postDate: new Date(1466791000000).toJSON(),
          text: 'Bleet text',
          author: '/api/users/0'
        },
        editBleetForm: editBleetForm
      });
    }));

    describe('when component is instantiated', function () {

      describe('author', function () {

        it('initializes author to an empty object', function () {
          expect(vm.author).toEqual({});
        });

        it('is fetched from the users service', inject(function ($rootScope) {
          $rootScope.$apply();

          expect(users.getUser.calls.count()).toBe(1);
          expect(users.getUser.calls.argsFor(0)).toEqual(['/api/users/0']);
        }));

        it('sets author name to the value of the resolved fullName', inject(function ($rootScope) {
          $rootScope.$apply();

          expect(vm.author.name).toBe(expectedUser.fullName);
        }));

        it('sets author avatar to the value returned from the users service', inject(function ($rootScope) {
          $rootScope.$apply();

          expect(vm.author.avatarUrl).toBe(expectedUser.avatarUrl);
        }));
      });
    });

    describe('when method', function () {

      describe('delete() is called', function(){
        it('calls the deleteBleet function', function(){
          vm.delete();

          expect(bleets.deleteBleet).toHaveBeenCalledWith(1);
        });

        it('publishes event on successful deletion', inject(function($rootScope){
          spyOn($rootScope, '$broadcast');

          vm.delete();
          $rootScope.$apply();

          expect($rootScope.$broadcast).toHaveBeenCalledWith('bleetDeleted');
        }));
      });
    });
  });
})();
