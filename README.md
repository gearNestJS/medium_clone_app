## Medium Clone

### Migrations

```bash
npx typeorm-ts-node-commonjs migration:generate ./src/migrations/RenameTagNameToTagText -d ./ormconfig-cli.ts
```

```bash
npx typeorm-ts-node-commonjs migration:run -d ./ormconfig-cli.ts
```
