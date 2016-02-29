'use strict';

// Configuring the <%= firstCapCamelModuleName %> module
angular.module('<%= moduleName %>').run(['Menus', 'i18n',
  function (Menus, i18n) {

    function getTitle() {
      var titleI18n = {
        en: '<%= firstCapCamelModuleName %>英文',
        zh_CN: '<%= firstCapCamelModuleName %>中文'
      };
      return titleI18n[i18n.getCurrentLang()];
    }

    // Add the <%= moduleName %> dropdown item
    Menus.addMenuItem('sideBar', {
      title: getTitle(),
      state: '<%= moduleName %>.list',
      //position: 1, // 用于显示该菜单的排序位置
      //iconClass: '', // 菜单的ICON样式
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

});
