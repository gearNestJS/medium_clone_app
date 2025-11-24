import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPasswordBioImageIdFieldsAndReplaceNameToUsernameToUsersTable1763585417931 implements MigrationInterface {
    name = 'AddPasswordBioImageIdFieldsAndReplaceNameToUsernameToUsersTable1763585417931'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "username" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "bio" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "users" ADD "image" character varying NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "bio"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "name" character varying NOT NULL`);
    }

}
