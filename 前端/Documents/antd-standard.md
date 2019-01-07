## [ant-design-standard](https://github.com/ant-design/ant-design/wiki/Ant-Design-%E8%AE%BE%E8%AE%A1%E5%9F%BA%E7%A1%80%E7%AE%80%E7%89%88)

#### Base

```less
/*字体大小*/
@font-size-base : 14px;
@font-size-lg : @font-size-base + 2px;
@font-size-sm : 12px;

/*字体*/
@font-family : "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif,
"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
@code-family : "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;

/*行高*/
@line-height-base : 1.5;

/*border color*/
@border-width-base : 1px; 
@border-style-base : solid; 
@border-color-base : hsv(0, 0, 85%);
@border-color-split : hsv(0, 0, 91%);
@border-color-inverse: @white;

/*border radius*/
@border-radius-base : 4px;
@border-radius-sm : 2px;

/*padding*/
@padding-lg : 24px; // containers
@padding-md : 16px; // small containers and buttons
@padding-sm : 12px; // Form controls and items
@padding-xs : 8px; // small items

/*color*/
@primary-color : @blue-6;

@info-color : #91d5ff;
@info-color-bg: #e6f7ff;

@success-color : #b7eb8f;
@success-color-bg: #f6ffed;

@error-color : #ffa39e;
@error-color-bg: #fff1f0;

@highlight-color : @red-6;

@warning-color : #ffe58f;
@warning-color-bg: #fffbe6;

@normal-color : #d9d9d9;
@white : #fff;
@black : #000;
```

#### Button

```less
.default{
	padding: 0 15px;
}

@btn-font-color: rgba(0,0,0,0.65);
@btn-height-base : 32px;
@btn-height-lg : 40px;
@btn-height-sm : 24px;


```