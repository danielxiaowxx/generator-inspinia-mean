'use strict';

// Configuring the <%= firstCapCamelModuleName %> module
angular.module('<%= moduleName %>').run(['Menus', '<%= firstCapCamelModuleName %>Const',

  function (Menus, <%= firstCapCamelModuleName %>Const) {

    // Add the <%= moduleName %> dropdown item
    Menus.addMenuItem('sideBar', {
      title: <%= firstCapCamelModuleName %>Const.getMenuAndPTI18N('<%= camelModuleName %>'),
      state: '<%= moduleName %>.list',
      //position: 1, // 用于显示该菜单的排序位置
      //class: '', // 菜单的ICON样式
      //type: 'dropdown', // 有子菜单时把注释去掉
      roles: window.getMenuRoles('<%= moduleName %>.list')
    });

    // Add the subMenuItem demo
    //Menus.addSubMenuItem('sideBar', '<%= moduleName %>', {
    //  title: <%= firstCapCamelModuleName %>Const.getMenuAndPTI18N(''),
    //  state: '<%= moduleName %>.list',
    //  roles: window.getMenuRoles('<%= moduleName %>.list')
    //});
  }
]);

angular.module('<%= moduleName %>').constant('<%= firstCapCamelModuleName %>Const', {

  getMenuAndPTI18N: function(key) {
    var i18nData = {
      en: {
        <%= camelModuleName %>: '<%= firstCapCamelModuleName %>英文'
      },
      zh_CN: {
        <%= camelModuleName %>: '<%= firstCapCamelModuleName %>中文'
      }
    };
    return i18nData[window.i18nService.getCurrentLang()][key];
  },

});
