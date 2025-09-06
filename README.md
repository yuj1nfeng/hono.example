# hono.example

To install dependencies:

```bash
bun install
```

To init:

``` env
# app
PORT=9999
TEST_PORT=12345

# redis
REDIS_URL='redis://127.0.0.1:6379'

# mongo
MONGO_URL='mongodb://127.0.0.1:27017/test'

# etcd 
ETCD_HOSTS='http://127.0.0.1:2379'

# pgsql 
POSTGRES_URL='postgresql://test:test@127.0.0.1:5432/test'

# mysql
MYSQL_URL='mysql://root:123456@127.0.0.1:3306/test'

# rabbit
RABBITMQ_URL='amqp://test:test@127.0.0.1:5672'

# sequelize
SEQUELIZE_URL=${POSTGRES_URL}
SEQUELIZE_DIALECT='postgres'
SEQUELIZE_SCHEMA_DIR='.db'

# s3
S3_ENDPOINT='http://127.0.0.1:9000'
S3_ACCESS_KEY='rustfs'
S3_SECRET_KEY='rustfs'
S3_BUCKET='tete'
S3_REGION='us-east-1'
```


```bash
bun run init
```



To run:

```bash
bun run index.ts
```
