#mongodb-redis-cache

npm install express --save
npm install mongodb --save
npm install redis --save
npm install express mongodb redis --save

需要先安装mongdb
创建data目录
进入bin目录
执行cmd
mongod --dbpath "d://mongodb//data" --port 27017
//mongod --dbpath=/data --port 27017

redis
redis-server --maxmemory 10mb --maxmemory-policy allkeys-lru

mongo
show dbs




