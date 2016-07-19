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

      spyOn(users, 'getUser').and.returnValue($injector.get('$q').when(expectedUser));

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
      describe('editMode', function () {
        it('defaults to false', function () {
          expect(vm.editMode).toBe(false);
        });
      });

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
      describe('edit() is called', function () {
        it('sets editMode to true', function () {
          vm.edit();

          expect(vm.editMode).toBe(true);
        });
      });

      describe('cancelEdit() is called', function () {
        beforeEach(function () {
          vm.editMode = true;
        });

        it('calls $setPristine() on the form controller', function () {
          vm.cancelEdit();

          expect(editBleetForm.$setPristine.calls.count()).toBe(1);
        });

        it('calls $setUntouched() on the form controller', function () {
          vm.cancelEdit();

          expect(editBleetForm.$setUntouched.calls.count()).toBe(1);
        });

        it('turns off edit mode', function () {
          vm.cancelEdit();

          expect(vm.editMode).toBe(false);
        });
      });

      describe('saveBleet() is called', function () {
        beforeEach(inject(function ($q) {
          spyOn(bleets, 'updateBleet').and.returnValue($q.when());
          vm.editMode = true;
          vm.editBleetForm.text = {value: 'new bleet'};
        }));

        it('sets post text to the new text', function () {
          vm.saveBleet();

          expect(vm.post.text).toBe('new bleet');

        });

        it('calls the updateBleet() method of the bleets service', function () {
          vm.saveBleet();

          expect(bleets.updateBleet.calls.count()).toBe(1);
          expect(bleets.updateBleet.calls.argsFor(0)).toEqual([1, 'new bleet']);
        });

        describe('and the call is successful', function () {
          it('turns off editMode', inject(function ($rootScope) {
            vm.saveBleet();
            $rootScope.$apply();

            expect(vm.editMode).toBe(false);
          }));
        });

      });
    });
  });
})();
