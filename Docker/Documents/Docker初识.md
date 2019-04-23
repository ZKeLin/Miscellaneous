docker search `image_name`
docker inspect `container_id/container_name` //查看container的详细信息
docker info 查看

docker  run -it -p 80 --name `container_name` `image_name` /bin/bash
--rm  关掉就直接关掉了，只运行一次
i: 可交互，和/bin/bash结合使用 
t: 分配一个虚拟终端
d: 后台运行

docker run = docker pull + docker create + docker start

docker rm `container_id`
docker rmi `image_id`
docker logs -f --tail 10 `container_name/id`
-f 持续查看
--tail 10 查看最后10条
