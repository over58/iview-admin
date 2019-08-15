# 变量定义
Port := 8083
Repos :=  iview-admin
restart:
	git pull origin master
	cnpm install
	cnpm run build
	docker rm -f ${Repos}
	docker rmi ${Repos}:latest
	docker build -t ${Repos}:latest  .
	docker run -d -p ${Port}:80 --name ${Repos} ${Repos}:latest

start:
	git pull origin master
	cnpm install
	cnpm run build
	docker build -t ${Repos}:latest  .
	docker run -d -p ${Port}:80 --name ${Repos} ${Repos}:latest
rm:	
	docker rm -f ${Repos}
rmi:
	docker rmi ${Repos}:latest
commit-update:
	git add .
	git commit -m 'update'
	git push origin master
commit-add:
	git add .
	git commit -m 'add'
	git push origin master

