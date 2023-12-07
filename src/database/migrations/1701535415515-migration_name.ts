import { MigrationInterface, QueryRunner } from "typeorm";

export class migrationName1701535415515 implements MigrationInterface {
    name = 'migrationName1701535415515'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."admin_role_enum" AS ENUM('USER', 'VET', 'ADMIN')`);
        await queryRunner.query(`CREATE TABLE "admin" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "status" character varying NOT NULL DEFAULT 'ACTIVE', "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."admin_role_enum" NOT NULL DEFAULT 'ADMIN', CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "adresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "status" character varying NOT NULL DEFAULT 'ACTIVE', "is_default" boolean NOT NULL, "title" character varying NOT NULL, "recipient_name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "state" character varying NOT NULL, "city" character varying NOT NULL, "zip" character varying NOT NULL, "street_address" character varying NOT NULL, "user_id" uuid, CONSTRAINT "PK_2787c84f7433e390ff8961d552d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_ratings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "status" character varying NOT NULL DEFAULT 'ACTIVE', "overall" numeric NOT NULL, "average" numeric NOT NULL, "reviews" numeric NOT NULL, "product" uuid, CONSTRAINT "REL_7bb7a4ae8975831bfcfda398c5" UNIQUE ("product"), CONSTRAINT "PK_f8bd94404fc1d160bdb075dc435" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "brands" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "status" character varying NOT NULL DEFAULT 'ACTIVE', "name" character varying NOT NULL, CONSTRAINT "PK_b0c437120b624da1034a81fc561" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "status" character varying NOT NULL DEFAULT 'ACTIVE', "name" character varying NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "species" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "status" character varying NOT NULL DEFAULT 'ACTIVE', "name" character varying NOT NULL, CONSTRAINT "PK_ae6a87f2423ba6c25dc43c32770" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_image" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "status" character varying NOT NULL DEFAULT 'ACTIVE', "link" character varying NOT NULL, "product" uuid, CONSTRAINT "PK_99d98a80f57857d51b5f63c8240" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."products_breed_type_enum" AS ENUM('SMALL', 'MEDIUM', 'LARGE')`);
        await queryRunner.query(`CREATE TYPE "public"."products_in_stock_enum" AS ENUM('AVAILABLE', 'UNAVAILABLE')`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "status" character varying NOT NULL DEFAULT 'ACTIVE', "name" character varying NOT NULL, "discount" numeric NOT NULL, "mrp" numeric NOT NULL, "selling_price" numeric NOT NULL, "breed_type" "public"."products_breed_type_enum" NOT NULL, "description" character varying NOT NULL, "is_on_sale" boolean NOT NULL, "in_stock" "public"."products_in_stock_enum" NOT NULL, "brand" uuid, "category" uuid, "specy" uuid, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "status" character varying NOT NULL DEFAULT 'ACTIVE', "quantity" numeric NOT NULL, "product_id" uuid, "order_id" uuid, CONSTRAINT "PK_005269d8574e6fac0493715c308" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "status" character varying NOT NULL DEFAULT 'ACTIVE', "total" numeric NOT NULL, "shipping_charge" numeric NOT NULL, "payment_type" character varying NOT NULL, "user_id" uuid, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "status" character varying NOT NULL DEFAULT 'ACTIVE', "stripe_key" character varying NOT NULL, "amount" numeric NOT NULL, "user_id" uuid, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('USER', 'VET', 'ADMIN')`);
        await queryRunner.query(`CREATE TYPE "public"."users_sign_up_type_enum" AS ENUM('EMAIL', 'SOCIAL')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "status" character varying NOT NULL DEFAULT 'ACTIVE', "full_name" character varying(255), "avatar" character varying(255), "email" character varying(80) NOT NULL, "auth_token" character varying(80), "device_token" character varying(80), "mobile_number" character varying(20), "country_code" character varying(4), "password" character varying(255) NOT NULL, "is_mobile_verified" boolean NOT NULL DEFAULT false, "is_tnc_accepted" boolean NOT NULL DEFAULT false, "is_logged_in" boolean NOT NULL DEFAULT false, "role" "public"."users_role_enum" NOT NULL DEFAULT 'USER', "sign_up_type" "public"."users_sign_up_type_enum" NOT NULL DEFAULT 'EMAIL', "social_id" character varying(255), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "appointments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "status" character varying NOT NULL DEFAULT 'ACTIVE', "full_name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "city" character varying NOT NULL, "problem" character varying NOT NULL, "user_id" uuid, CONSTRAINT "PK_4a437a9a27e948726b8bb3e36ad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."MeetingStatus" AS ENUM('ReadyToJoinCall', 'Done')`);
        await queryRunner.query(`CREATE TYPE "public"."ConsultancyStatus" AS ENUM('Connecting', 'Processing', 'Complete', 'Failed')`);
        await queryRunner.query(`CREATE TABLE "consultations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "status" character varying NOT NULL DEFAULT 'ACTIVE', "start_time" date NOT NULL, "end_time" date NOT NULL, "total" numeric NOT NULL, "meeting_status" "public"."MeetingStatus" NOT NULL, "consultancy_status" "public"."ConsultancyStatus" NOT NULL, "vet_id" uuid, "appointment_id" uuid, CONSTRAINT "REL_590a17c3e9eeda5c69cb7bd594" UNIQUE ("appointment_id"), CONSTRAINT "PK_c5b78e9424d9bc68464f6a12103" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "blogs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "status" character varying NOT NULL DEFAULT 'ACTIVE', "is_updated" boolean NOT NULL DEFAULT false, "title" character varying NOT NULL, "description" character varying NOT NULL, "sub_title" character varying NOT NULL, "hero_image" character varying NOT NULL, CONSTRAINT "PK_e113335f11c926da929a625f118" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."unverified_users_role_enum" AS ENUM('USER', 'VET', 'ADMIN')`);
        await queryRunner.query(`CREATE TYPE "public"."unverified_users_sign_up_type_enum" AS ENUM('EMAIL', 'SOCIAL')`);
        await queryRunner.query(`CREATE TABLE "unverified_users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "status" character varying NOT NULL DEFAULT 'ACTIVE', "full_name" character varying(255), "email" character varying(80) NOT NULL, "password" character varying(255) NOT NULL, "otp" character varying(255) NOT NULL, "role" "public"."unverified_users_role_enum" NOT NULL DEFAULT 'USER', "sign_up_type" "public"."unverified_users_sign_up_type_enum" NOT NULL DEFAULT 'EMAIL', CONSTRAINT "PK_de5836c473242a607e8330870c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_otps" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "status" character varying NOT NULL DEFAULT 'ACTIVE', "otp" numeric NOT NULL, "user_id" uuid, CONSTRAINT "PK_058cf61bf2024c3a3c3bfc4e1b7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "adresses" ADD CONSTRAINT "FK_8549d17ae3508635410b4fa4fb1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_ratings" ADD CONSTRAINT "FK_7bb7a4ae8975831bfcfda398c5d" FOREIGN KEY ("product") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_image" ADD CONSTRAINT "FK_846d71f9bd15b4afcca0117432c" FOREIGN KEY ("product") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_61fac54950763ae56ee51f17fd6" FOREIGN KEY ("brand") REFERENCES "brands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_c3932231d2385ac248d0888d955" FOREIGN KEY ("category") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_3daf9d935fa774975fd8c5b3e0a" FOREIGN KEY ("specy") REFERENCES "species"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD CONSTRAINT "FK_9263386c35b6b242540f9493b00" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD CONSTRAINT "FK_145532db85752b29c57d2b7b1f1" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_a922b820eeef29ac1c6800e826a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_e9acc6efa76de013e8c1553ed2b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_66dee3bea82328659a4db8e54b7" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "consultations" ADD CONSTRAINT "FK_575f4a33bfec109149f0122f775" FOREIGN KEY ("vet_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "consultations" ADD CONSTRAINT "FK_590a17c3e9eeda5c69cb7bd594b" FOREIGN KEY ("appointment_id") REFERENCES "appointments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_otps" ADD CONSTRAINT "FK_e91ac77ead5e7f97b11a6fba6b3" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_otps" DROP CONSTRAINT "FK_e91ac77ead5e7f97b11a6fba6b3"`);
        await queryRunner.query(`ALTER TABLE "consultations" DROP CONSTRAINT "FK_590a17c3e9eeda5c69cb7bd594b"`);
        await queryRunner.query(`ALTER TABLE "consultations" DROP CONSTRAINT "FK_575f4a33bfec109149f0122f775"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_66dee3bea82328659a4db8e54b7"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_e9acc6efa76de013e8c1553ed2b"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_a922b820eeef29ac1c6800e826a"`);
        await queryRunner.query(`ALTER TABLE "order_items" DROP CONSTRAINT "FK_145532db85752b29c57d2b7b1f1"`);
        await queryRunner.query(`ALTER TABLE "order_items" DROP CONSTRAINT "FK_9263386c35b6b242540f9493b00"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_3daf9d935fa774975fd8c5b3e0a"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_c3932231d2385ac248d0888d955"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_61fac54950763ae56ee51f17fd6"`);
        await queryRunner.query(`ALTER TABLE "product_image" DROP CONSTRAINT "FK_846d71f9bd15b4afcca0117432c"`);
        await queryRunner.query(`ALTER TABLE "product_ratings" DROP CONSTRAINT "FK_7bb7a4ae8975831bfcfda398c5d"`);
        await queryRunner.query(`ALTER TABLE "adresses" DROP CONSTRAINT "FK_8549d17ae3508635410b4fa4fb1"`);
        await queryRunner.query(`DROP TABLE "user_otps"`);
        await queryRunner.query(`DROP TABLE "unverified_users"`);
        await queryRunner.query(`DROP TYPE "public"."unverified_users_sign_up_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."unverified_users_role_enum"`);
        await queryRunner.query(`DROP TABLE "blogs"`);
        await queryRunner.query(`DROP TABLE "consultations"`);
        await queryRunner.query(`DROP TYPE "public"."ConsultancyStatus"`);
        await queryRunner.query(`DROP TYPE "public"."MeetingStatus"`);
        await queryRunner.query(`DROP TABLE "appointments"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_sign_up_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "order_items"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TYPE "public"."products_in_stock_enum"`);
        await queryRunner.query(`DROP TYPE "public"."products_breed_type_enum"`);
        await queryRunner.query(`DROP TABLE "product_image"`);
        await queryRunner.query(`DROP TABLE "species"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "brands"`);
        await queryRunner.query(`DROP TABLE "product_ratings"`);
        await queryRunner.query(`DROP TABLE "adresses"`);
        await queryRunner.query(`DROP TABLE "admin"`);
        await queryRunner.query(`DROP TYPE "public"."admin_role_enum"`);
    }

}
