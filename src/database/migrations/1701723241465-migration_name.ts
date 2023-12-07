import { MigrationInterface, QueryRunner } from "typeorm";

export class migrationName1701723241465 implements MigrationInterface {
    name = 'migrationName1701723241465'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cart" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "status" character varying NOT NULL DEFAULT 'ACTIVE', "quantity" integer NOT NULL, "user" uuid, "product" uuid, CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_8e609177e02bed8b0c23834e083" FOREIGN KEY ("user") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_75d23873b28793cd0621f128d2c" FOREIGN KEY ("product") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_75d23873b28793cd0621f128d2c"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_8e609177e02bed8b0c23834e083"`);
        await queryRunner.query(`DROP TABLE "cart"`);
    }

}
