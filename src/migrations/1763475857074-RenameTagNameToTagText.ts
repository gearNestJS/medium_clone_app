import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameTagNameToTagText1763475857074 implements MigrationInterface {
    name = 'RenameTagNameToTagText1763475857074'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tags" RENAME COLUMN "name" TO "text"`);
        await queryRunner.query(`ALTER TABLE "tags" RENAME CONSTRAINT "UQ_d90243459a697eadb8ad56e9092" TO "UQ_9322ab4669053a42f2980c3f663"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tags" RENAME CONSTRAINT "UQ_9322ab4669053a42f2980c3f663" TO "UQ_d90243459a697eadb8ad56e9092"`);
        await queryRunner.query(`ALTER TABLE "tags" RENAME COLUMN "text" TO "name"`);
    }

}
