```shell
docker stop $(docker ps -aq) && docker rm $(docker ps -aq) && docker rmi $(docker images -q) && sudo rm -rf /home/*
```

```shell
docker compose down -v
docker compose -f ./docker-compose.yml up
```

```shell
docker save -o nginx.tar nginx:alpine
docker save -o postgres.tar postgres:latest
docker save -o profai-site.tar profai-site:latest
```

```shell
scp nginx.tar postgres.tar profai-site.tar root@194.87.248.134:/home
```

```shell
scp -r "C:\Users\kopan\OneDrive\Desktop\profai" root@194.87.248.134:/home
```

```shell
cd /home/profai
docker load < nginx.tar
docker load < postgres.tar
docker load < profai-site.tar
docker compose -f ./docker-compose-deploy.yml up
```

```shell
docker exec -t profai_postgres pg_dump -U profai_user -d profai_db -f /tmp/profai_db_dump.sql
docker cp profai_postgres:/tmp/profai_db_dump.sql ./profai_db_dump.sql
```
