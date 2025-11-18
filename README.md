## Medium Clone

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
