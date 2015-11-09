'use strict';

// Configuring the <%= firstCapCamelModuleName %> module
angular.module('<%= moduleName %>').run(['Menus',
  function (Menus) {
    // Add the <%= moduleName %> dropdown item
    Menus.addMenuItem('topbar', {
      title: '<%= firstCapCamelModuleName %>',
      state: '<%= moduleName %>.list',
      //type: 'dropdown', // 有子菜单时把注释去掉
      roles: ['*']
    });

    // Add the subMenuItem demo
    //Menus.addSubMenuItem('topbar', '<%= moduleName %>', {
    //  title: 'List <%= firstCapCamelModuleName %>',
    //  state: '<%= moduleName %>.list'
    //});
  }
]);
