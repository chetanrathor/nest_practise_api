import { MigrationInterface, QueryRunner } from "typeorm";

export class signupType1692086577318 implements MigrationInterface {
    name = 'signupType1692086577318'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."unverified_users_sign_up_type_enum" AS ENUM('EMAIL', 'SOCIAL')`);
        await queryRunner.query(`ALTER TABLE "unverified_users" ADD "sign_up_type" "public"."unverified_users_sign_up_type_enum" NOT NULL DEFAULT 'EMAIL'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unverified_users" DROP COLUMN "sign_up_type"`);
        await queryRunner.query(`DROP TYPE "public"."unverified_users_sign_up_type_enum"`);
    }

}
