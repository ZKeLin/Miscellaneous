
### lsof

(官方介绍)[https://linux.die.net/man/8/lsof]

查看linux/nuix那些文件被打开，可以使用改命令，由于在类unix系统中所有的东西都是文件，所以该命令可以查看常规文件，目录，库，块特殊文件，字符特殊文件，执行文本引用，甚至是流或网络文件等等。

#### 常用命令

1. ```lsof```  
列出系统所有的进程打开文件
2. ```lsof -u [userName]```  
列出某个用户下进程打开的文件
3. ```lsof -i [4/6]```  
列出基于网络地址的文件（4:IPV4,6:IPV6）
4. ```lsof -p [PID]```  
根据PID列出相应opened files
5. ```lsof -t [fileName]```  
list IDs of processes that have opened a particular file
6. ```lsof +D [directory-path]```  
search for all open instances of a directory(including all files and direcotry it contains)
7. ```lsof -f :[port/port rang(1-2014)]```  
列出基于特定端口或者是某些端口 opened files
8. ```lsof -i udp```  
list opened files based on the type of connection. For example,udp,tcp...
9. ```lsof -p [PID] -R```  
forces to list the Parent Process IDentification(PPID) about the PID in the output.