import { MigrationInterface, QueryRunner } from "typeorm";

export class migrationName1702493987144 implements MigrationInterface {
    name = 'migrationName1702493987144'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."transactions_transaction_statuc_enum" AS ENUM('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'CANCELED')`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "transaction_statuc" "public"."transactions_transaction_statuc_enum" NOT NULL DEFAULT 'PENDING'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "transaction_statuc"`);
        await queryRunner.query(`DROP TYPE "public"."transactions_transaction_statuc_enum"`);
    }

}
