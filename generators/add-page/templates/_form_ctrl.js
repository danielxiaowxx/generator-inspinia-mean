
(function(_) {

  'use strict';

  angular.module('<%= moduleName %>').controller('<%= firstCapCamelModuleName %><%= firstCapCamelCtrlName %>Controller', ['$scope', 'i18n', '<%= firstCapCamelModuleName %>HttpService',

    function ($scope, i18n, <%= firstCapCamelModuleName %>HttpService) {

    /*========== Scope Models ==================================================*/

    $scope.i18n = i18n.getI18nData('<%= moduleName %>');

    $scope.formData = {
      field1: '',
      field2: '',
    };

    $scope.submitting = false;

    /*========== Scope Functions ==================================================*/

    $scope.submit = function() {
      if (_validForm()) {
        $scope.submitting = true;

        // TODO 请修改成实际调用的API并把该注释删掉
        <%= firstCapCamelModuleName %>HttpService.queryMockList().success(function() {

        }).finally(function() {
          $scope.submitting = false;
        });
      } else {
        $scope.data_form.submitted = true;
      }
    };

    $scope.cancel = function() {

    };

    /*========== Listeners ==================================================*/

    $scope.$on('$stateChangeSuccess', function() {
      _init();
    });

    /*========== Watches ==================================================*/

    /*========== Private Functions ==================================================*/

    function _validForm() {
      var result = $scope.data_form.$valid;
      return result;
    }

    function _init() {

    }

  }
  ]);

})(window._);