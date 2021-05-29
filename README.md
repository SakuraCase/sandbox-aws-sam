## 参考
https://qiita.com/navitime_tech/items/70432345d930c2bc1a14    
https://gist.github.com/heitorlessa/a087f4394b38562e1a0aa128386b38b8   
https://qiita.com/speaktech/items/d71dc06cbde97c57f01c   


## docker netwark
`docker network create sam-cli`

## sam local起動
`sam local start-api -p 3001 -t ./template.yaml -n ./.env.json --docker-network sam-cli`

## 実行
`curl -X GET http://127.0.0.1:3001/ping`   
`curl -X GET http://127.0.0.1:3001/msg/1`    
`curl -X POST http://127.0.0.1:3001/msg  -d '{"contents": "test"}'`