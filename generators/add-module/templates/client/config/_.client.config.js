'use strict';

// Configuring the <%= firstCapCamelModuleName %> module
angular.module('<%= moduleName %>').run(['Menus',
  function (Menus) {
    // Add the <%= moduleName %> dropdown item
    Menus.addMenuItem('sideBar', {
      title: '<%= firstCapCamelModuleName %>',
      state: '<%= moduleName %>.list',
      //type: 'dropdown', // 有子菜单时把注释去掉
      roles: ['*']
    });

    // Add the subMenuItem demo
    //Menus.addSubMenuItem('sideBar', '<%= moduleName %>', {
    //  title: 'List <%= firstCapCamelModuleName %>',
    //  state: '<%= moduleName %>.list'
    //});
  }
]);

angular.module('<%= moduleName %>').constant('<%= firstCapCamelModuleName %>Const', {
  I18N: window.<%= moduleName %>_i18n
});
