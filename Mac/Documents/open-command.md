### Mac open 命令简介

#### open .
将当前目录在folder中打开

#### open 指定文件夹
在folder中打开指定的文件夹，可指定多个
```bash
#依次在folder中打开~/Documents ~/Desktop ~/Downloads
open ~/Documents ~/Desktop ~/Downloads
#打开以D开头的所有文件夹
open ~/D*
```
#### open filename
使用默认的application打开指定的文件，一般为preview
```bash
#使用Xcode打开Promise.md
open Promise.md
```

#### open -a 指定Application 指定文件
将指定文件在指定应用中打开
```bash
#将Promise.md 文件用Sublime Text打开
open -a Sublime\ Text Promise.md
```

#### open -g filename
在后台打开该文件
```bash
#将Promise.md在后台打开，不会影响当前的窗口
open -g Promise.md
```

#### open -R filename
在folder中显示该文件
```bash
#Promise.md将在folder中显示
open -R Promise.md
```

#### open -e filenam
强制使用TextEdit 打开该文件
```bash
#强制使用TextEdit打开Promise.md
open -e Promise.md
```

#### open url
使用默认的浏览器打开该url
```bash
#使用默认的浏览器代开hhttps://www.google.com
open https://www.google.com
#指定浏览器打开url
open -a Firefox https://www.google.com
```