#mongodb-redis-cache

npm install express --save
npm install mongodb --save
npm install redis --save
npm install express mongodb redis --save

��Ҫ�Ȱ�װmongdb
����dataĿ¼
����binĿ¼
ִ��cmd
mongod --dbpath "d://mongodb//data" --port 27017
//mongod --dbpath=/data --port 27017

redis
redis-server --maxmemory 10mb --maxmemory-policy allkeys-lru

mongo
show dbs




