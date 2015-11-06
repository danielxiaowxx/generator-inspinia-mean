'use strict';

// Configuring the <%= firstCapCamelModuleName %> module
angular.module('<%= moduleName %>').run(['Menus',
  function (Menus) {
    // Add the <%= moduleName %> dropdown item
    Menus.addMenuItem('topbar', {
      title: '<%= firstCapCamelModuleName %>',
      state: '<%= moduleName %>',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the subMenuItem demo
    //Menus.addSubMenuItem('topbar', '<%= moduleName %>', {
    //  title: 'List <%= firstCapCamelModuleName %>',
    //  state: '<%= moduleName %>.list'
    //});
  }
]);
