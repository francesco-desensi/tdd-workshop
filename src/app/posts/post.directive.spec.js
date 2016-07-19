(function () {
  'use strict';

  describe('<post>', function () {
    var vm;
    var users;
    var expectedUser;

    beforeEach(module('tddWorkshop.posts'));

    beforeEach(inject(function ($injector) {
      users = $injector.get('users');

      expectedUser = {
        id: 0,
        username: 'bigmike',
        fullName: 'Big Mike'
      };

      spyOn(users, 'getUser').and.returnValue($injector.get('$q').when(expectedUser));

      vm = $injector.get('$componentController')('post', null, {
        post: {
          id: 1,
          postDate: new Date(1466791000000).toJSON(),
          text: 'Bleet text',
          author: '/api/users/0'
        }
      });
    }));

    describe('when component is instantiated', function () {
      describe('editMode', function () {
        it('defaults to false', function () {
          expect(vm.editMode).toBe(false);
        });
      });

      describe('author', function () {

        it('defaults to null', function() {
          expect(vm.authorName).toBeNull();
        });

        it('is fetched from the users service', inject(function ($rootScope) {
          $rootScope.$apply();

          expect(users.getUser.calls.count()).toBe(1);
          expect(users.getUser.calls.argsFor(0)).toEqual(['/api/users/0']);
        }));

        it('sets authorName to the value of the resolved fullName', inject(function($rootScope) {
          $rootScope.$apply();

          expect(vm.authorName).toBe(expectedUser.fullName);
        }));
      });
    });

    describe('when method', function () {
      describe('edit() is called', function () {
        it('sets editMode to true', function() {
          vm.edit();

          expect(vm.editMode).toBe(true);
        });
      });
    });
  });
})();
