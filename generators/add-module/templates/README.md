#### 开发前的准备

1. 下载该模块依赖的运行环境项目inspinia-mean-admin(已下载可略过)
```
git clone http://gitlab.globalmarket.com/daniel/inspinia-mean-admin.git --single-branch -b master && npm install
```

2. 下载该模块项目，放置到inspinia-mean-admin的modules目录下，如modules/products
```
cd inspinia-mean-admin/modules
git clone git@gitlab.globalmarket.com:snowball/erp-product-manager.git products
```

3. 在inspinia-mean-admin根目录下运行
```
gulp
```

#### 引用angular-busi-directives组件

1. client/assets/less/[module name].less文件的内容前加上以下代码
```
@bootstrapPath: "public/lib/bootstrap";

@import "../../../../../public/lib/angular-busi-directives/lib/image-picker/image-picker"; // 要引用的组件的less样式

@import (reference) "../../../../core/client/assets/less/inspinia/variables";

```

2. 在client/config/[module name].client.routes.js中的需要用到组件的路由中加入js引用, 如以下:
```
{
  name: 'gm.imagePicker',
  files: ['lib/angular-busi-directives/lib/image-picker/image-picker.min.js']
}
```

3. 在client ctrl中加入以下代码
```
$scope.currentLang = i18n.getCurrentLang();
```

4. 在client html中引用组件, 如下:
```
<div gm-image-picker ng-model="data" gm-image-picker-lang="{{currentLang}}"></div>
```

