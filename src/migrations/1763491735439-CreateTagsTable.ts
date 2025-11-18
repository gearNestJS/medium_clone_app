import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTagsTable1763491735439 implements MigrationInterface {
    name = 'CreateTagsTable1763491735439'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tags" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, CONSTRAINT "UQ_9322ab4669053a42f2980c3f663" UNIQUE ("text"), CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tags"`);
    }

}
