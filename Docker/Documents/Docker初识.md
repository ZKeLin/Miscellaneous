## Docker初识  -- 待完善

### 什么是Docker

维基百科: Docker是一个开放源码软件项目，让应用程序部署在软件货柜下的工作可以自动化进行，借此在Linux操作系统上，提供一个额外的软件抽象层，以及操作系统层虚拟化的自动管理机制。Docker利用Linux核心中的资源分离机制，例如cgroups，以及Linux核心名字空间，来创建独立的容器。  
Docker是由镜像(Image)、容器(Container)、仓库(Registry)等主要模块组成。  

### Image镜像

Docker 镜像是一个特殊的文件系统，除了提供容器运行时所需的程序、库、资源、配置等文件外，还包含了一些为运行时准备的一些配置参数（如匿名卷、环境变量、用户等）。镜像不包含任何动态数据，其内容在构建之后也不会被改变。

### Container容器

镜像（Image）和容器（Container）的关系，就像是面向对象程序设计中的 类 和 实例 一样，镜像是静态的定义，容器是镜像运行时的实体。容器可以被创建、启动、停止、删除、暂停等。  
容器的实质是进程，但与直接在宿主执行的进程不同，容器进程运行属于自己独立的命名空间。因此容器可以拥有自己的 root 文件系统、自己的网络配置、自己的进程空间，甚至自己的用户 ID 空间。

### Registry(仓库)

镜像构建完成后，可以很容易的在当前宿主机上运行，但是，如果需要在其它服务器上使用这个镜像，我们就需要一个集中的存储、分发镜像的服务，Docker Registry 就是这样的服务。  
一个 Docker Registry 中可以包含多个仓库（Repository）；每个仓库可以包含多个标签（Tag）；每个标签对应一个镜像。

### Docker 常见命令

```bash
docker search <image_name>
docker inspect <container_id/container_name> //查看container的详细信息
docker info 查看

docker  run -it -p 80 --name <container_name> <image_name> /bin/bash
--rm  关掉就直接关掉了，只运行一次
i: 可交互，和/bin/bash结合使用 
t: 分配一个虚拟终端
d: 后台运行
v: 内部文件映射到外部
link: 链接其他的docker容器

docker run = docker pull + docker create + docker start

docker rm <container_id>
docker rmi <image_id>
docker logs -f --tail 10 <container_name/id>
-f 持续查看
--tail 10 查看最后10条
```
