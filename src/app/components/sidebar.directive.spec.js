(function () {
  'use strict';

  describe('<sidebar>', function () {
    var vm;
    var users;
    var expectedUser;

    beforeEach(module('tddWorkshop.components'));

    beforeEach(inject(function ($injector) {
      users = $injector.get('users');

      expectedUser = {
        id: 1,
        username: 'bigmike',
        fullName: 'Big Mike',
        avatarUrl: '/path/to/avatar'
      };

      spyOn(users, 'getCurrentUser').and.returnValue(expectedUser);
      
      vm = $injector.get('$componentController')('sidebar');
    }));

    describe('on compilation', function () {

      beforeEach(inject(function () {
      }));

      it('binds the current user to the user property', function () {
        expect(vm.user).toEqual(expectedUser);
      });
    });
  });
})();
