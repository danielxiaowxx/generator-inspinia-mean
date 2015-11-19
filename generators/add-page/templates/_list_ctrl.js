
(function(_) {

  'use strict';

  angular.module('<%= moduleName %>').controller('<%= firstCapCamelModuleName %><%= firstCapCamelCtrlName %>Controller', ['$scope', '$stateParams', '$location', '<%= firstCapCamelModuleName %>HttpService',

    function ($scope, $stateParams, $location, <%= firstCapCamelModuleName %>HttpService) {

      var defQueryParams = {
        param1    : '',
        param2_min: '',
        param2_max: '',
        param3_1  : '',
        param3_2  : '',
        param4    : ''
      };

      /*========== Scope Models ==================================================*/

      /**
       * 表格实例对象
       * @type {{}}
       */
      $scope.tableInstance = {};

      // -- adv search start //
      /**
       * 显示高级查询
       * @type {boolean}
       */
      $scope.showAdvSearch = false;
      // adv search end -- //

      /**
       * 可显示的所有列名
       * @type {*[]}
       */
      $scope.allTableColumns = [
        {
          label : '选择',
          value : 'checkbox',
          // -- select all start //
          checked : true
          // select all end -- //
          // -- non-select all start //
          checked : false
          // non-select all end -- //
        },
        {
          label  : '列1',
          value  : 'column1',
          checked: true
        },
        {
          label  : '列2',
          value  : 'column2',
          checked: true
        },
        {
          label  : '操作',
          value  : 'action',
          checked: true
        }
      ];

      /*========== Scope Functions ==================================================*/

      /**
       * 开始一个新的查询
       */
      $scope.startNewSearch = function() {
        $scope.tableInstance.resetSortCondition();
        $scope.search(true);
      };

      /**
       * 重置查询表单
       */
      $scope.reset = function() {
        $scope.searchParams = _.clone(defQueryParams);
        $scope.startNewSearch();
      };

      /**
       * 取得可见列总数
       * @returns {*}
       */
      $scope.getVisibleColumnTotal = function() {
        return _.filter($scope.allTableColumns, 'checked', true).length;
      };

      /**
       * 排序搜索事件
       * @param sort
       * @param field
       */
      $scope.sortSearch = function(sort, field) {
        $scope.sortFeature.sortInfo = {
          field: field,
          isDesc: sort === 'desc' ? true : false
        };
        $scope.search(true);
      };

      // -- select all start //
      /**
       * 批量删除
       */
      $scope.batchRemoveItems = function() {

      };
      // select all end -- //

      /*========== Listeners ==================================================*/

      $scope.$on('$stateChangeSuccess', function() {
        _init();
      });

      /*========== Watches ==================================================*/

      /*========== Private Functions ==================================================*/


      /**
       * 查询列表开发流程
       * @private
       */
      function _searchListDevFlow() {
        _.extend($scope, {

          // 1. 定义查询条件
          searchParams: _.clone(defQueryParams),

          // 2. 定义分页配置
          pagerOptions: {
            totalItems: 0,
            pageNum   : 1,
            pageSize  : 10
          },

          // 3. 定义显示列表数据
          listData: [],

          // 4. 查询方法
          loadingListData: false,
          search: function(isResetPageNum) {
            var self = this;

            self.loadingListData = true;

            if (isResetPageNum) self.pagerOptions.pageNum = 1;

            <%= firstCapCamelModuleName %>HttpService.queryMockList(self.searchParams, self.pagerOptions.pageNum, self.pagerOptions.pageSize, self.sortFeature.sortInfo).success(function(data) {
              self.listData = data.items;
              self.pagerOptions.totalItems = data.total;

              self.loadingListData = false;

              self.sortFeature.resetSortCondition();
            });
          },

          // 5. 排序查询特性
          sortFeature: {
            sortInfo: {},

            // 重置查询条件
            resetSortCondition: function() {
              this.sortInfo = {
                field: '',
                isDesc: true
              };
            }
          },

          // -- select all start //
          // 6. 选择特性（全选/取消选选）
          selectFeature: {
            isSelectedAll: false,
            /**
             * 全选/取消全选
             */
            selectAll    : function() {
              var self = this;
              _.each($scope.listData, function(item) {
                item.checked = self.isSelectedAll;
              });
            },
            /**
             * 选择/取消选择某一项
             */
            selectItem   : function(checked) {
              var self = this;
              if (checked) {
                // 判断当前所有项是否已选中，如果是，则全选
                var foundItem = _.find($scope.listData, function(item) {
                  return !item.checked;
                });
                if (!foundItem) {
                  self.isSelectedAll = true; // 全选
                }
              } else {
                self.isSelectedAll = false; // 取消全选
              }
            }
          }
          // select all end -- //
        });
      }

      function _init() {
        _searchListDevFlow();

        $scope.search();
      }

    }
  ]);

})(window._);