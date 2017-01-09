(function () {
  'use strict';

  angular
    .module('app.person')
    .run(run);

  run.$inject = ['routerHelper'];

  function run(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        name: 'personList',
        config: {
          url: '/person/list?page',
          templateUrl: 'app/features/person/templates/list.html',
          controller: 'PersonController',
          controllerAs: 'vm',
          settings: {
            nav: {
              order: 2,
              display: 'Persons'
            }
          }
        }

      },

      {
        name: 'personView',
        config: {
          url: '/person/view/:id',
          templateUrl: 'app/features/person/templates/view.html',
          controller: 'PersonEditController',
          controllerAs: 'vm'
        }
      },
      {
        name: 'personEdit',
        config: {
          url: '/person/edit/:id',
          templateUrl: 'app/features/person/templates/edit.html',
          controller: 'PersonEditController',
          controllerAs: 'vm'
        }
      }
    ];
  }
})();


// 'use strict';

// (function (angular) {

//   angular
//     .module('app.person')
//     .config(PersonConfig);

//   PersonConfig.$inject = ['$stateProvider'];

//   function PersonConfig($stateProvider) {
//     $stateProvider

//       .state('personList', {
//         url: '/person/list?page',
//         templateUrl: 'modules/views/person/templates/list.html',
//         controller: 'PersonController',
//         controllerAs: 'vm',
//         settings: {
//           nav: {
//             order: 2,
//             display: "Persons"
//           }
//         }
//       })

//       .state('personView', {
//         url: '/person/view/:id',
//         templateUrl: 'modules/views/person/templates/view.html',
//         controller: 'PersonEditController',
//         controllerAs: 'vm'
//       })

//       .state('personEdit', {
//         url: '/person/edit/:id',
//         templateUrl: 'modules/views/person/templates/edit.html',
//         controller: 'PersonEditController',
//         controllerAs: 'vm'
//       });

//   }

// })(angular);
