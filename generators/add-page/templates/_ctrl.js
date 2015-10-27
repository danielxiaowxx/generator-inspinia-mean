/**
 * Created by danielxiao on 15/1/28.
 */

(function() {

  angular.module('<%= moduleName %>').controller('<%= firstCapCamelCtrlName %>Controller', ['$scope', '$stateParams', '$location', '<%= firstCapCamelModuleName %>',

    function <%= firstCapCamelCtrlName %>Controller($scope, $stateParams, $location, <%= firstCapCamelModuleName %>) {

      /*========== Scope Models ==================================================*/

      /*========== Scope Functions ==================================================*/

      /*========== Listeners ==================================================*/

      $scope.$on('$stateChangeSuccess', function() {
        _init();
      });

      /*========== Watches ==================================================*/

      /*========== Private Functions ==================================================*/

      function _init() {
      }

    }
  ]);

})();