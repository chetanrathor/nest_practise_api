import { MigrationInterface, QueryRunner } from "typeorm";

export class isUpdated1692217145947 implements MigrationInterface {
    name = 'isUpdated1692217145947'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blogs" ALTER COLUMN "is_updated" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blogs" ALTER COLUMN "is_updated" DROP DEFAULT`);
    }

}
