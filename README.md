## Medium Clone

### Запуск проекта

```bash
docker compose up --build
```

### Остановка проекта

```bash
docker compose down
```

### Migrations

Создать миграцию для новой сущности - например, User:

```bash
npm run migration:generate --name=CreateUsersTable
```

Применить все миграции к базе данных:

```bash
npm run migration:run
```

Откатить последнюю миграцию:

```bash
npm run migration:revert
```

### Выполнение psql внутри контейнера:

```bash
docker exec -it medium_clone_postgres psql -U medium_user -d medium_clone_db
```
