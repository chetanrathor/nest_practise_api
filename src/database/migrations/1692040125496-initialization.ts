import { MigrationInterface, QueryRunner } from "typeorm";

export class initialization1692040125496 implements MigrationInterface {
    name = 'initialization1692040125496'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "adresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "status" character varying NOT NULL, "is_default" boolean NOT NULL, "title" character varying NOT NULL, "recipient_name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "state" character varying NOT NULL, "city" character varying NOT NULL, "zip" character varying NOT NULL, "street_address" character varying NOT NULL, "user_id" uuid, CONSTRAINT "PK_2787c84f7433e390ff8961d552d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."MeetingStatus" AS ENUM('ReadyToJoinCall', 'Done')`);
        await queryRunner.query(`CREATE TYPE "public"."ConsultancyStatus" AS ENUM('Connecting', 'Processing', 'Complete', 'Failed')`);
        await queryRunner.query(`CREATE TABLE "consultations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "status" character varying NOT NULL, "start_time" date NOT NULL, "end_time" date NOT NULL, "total" numeric NOT NULL, "meeting_status" "public"."MeetingStatus" NOT NULL, "consultancy_status" "public"."ConsultancyStatus" NOT NULL, "vet_id" uuid, "appointment_id" uuid, CONSTRAINT "REL_590a17c3e9eeda5c69cb7bd594" UNIQUE ("appointment_id"), CONSTRAINT "PK_c5b78e9424d9bc68464f6a12103" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_ratings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "status" character varying NOT NULL, "overall" numeric NOT NULL, "average" numeric NOT NULL, "reviews" numeric NOT NULL, "product" uuid, CONSTRAINT "REL_7bb7a4ae8975831bfcfda398c5" UNIQUE ("product"), CONSTRAINT "PK_f8bd94404fc1d160bdb075dc435" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "brands" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "status" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_b0c437120b624da1034a81fc561" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "status" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "species" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "status" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_ae6a87f2423ba6c25dc43c32770" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_image" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "status" character varying NOT NULL, "link" character varying NOT NULL, "product" uuid, CONSTRAINT "PK_99d98a80f57857d51b5f63c8240" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."products_breed_type_enum" AS ENUM('SMALL', 'MEDIUM', 'LARGE')`);
        await queryRunner.query(`CREATE TYPE "public"."products_in_stock_enum" AS ENUM('AVAILABLE', 'UNAVAILABLE')`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "status" character varying NOT NULL, "name" character varying NOT NULL, "discount" numeric NOT NULL, "mrp" numeric NOT NULL, "selling_price" numeric NOT NULL, "breed_type" "public"."products_breed_type_enum" NOT NULL, "description" character varying NOT NULL, "is_on_sale" boolean NOT NULL, "in_stock" "public"."products_in_stock_enum" NOT NULL, "brand" uuid, "category" uuid, "specy" uuid, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "status" character varying NOT NULL, "quantity" numeric NOT NULL, "product_id" uuid, "order_id" uuid, CONSTRAINT "PK_005269d8574e6fac0493715c308" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "status" character varying NOT NULL, "total" numeric NOT NULL, "shipping_charge" numeric NOT NULL, "payment_type" character varying NOT NULL, "user_id" uuid, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "status" character varying NOT NULL, "stripe_key" character varying NOT NULL, "amount" numeric NOT NULL, "user_id" uuid, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "appointments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "status" character varying NOT NULL, "full_name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "city" character varying NOT NULL, "problem" character varying NOT NULL, "user_id" uuid, CONSTRAINT "PK_4a437a9a27e948726b8bb3e36ad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "blogs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "status" character varying NOT NULL, "is_updated" boolean NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "sub_title" character varying NOT NULL, "hero_image" character varying NOT NULL, CONSTRAINT "PK_e113335f11c926da929a625f118" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "first_name"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "last_name"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" ADD "status" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "full_name" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "auth_token" character varying(80)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "device_token" character varying(80)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "mobile_number" character varying(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "country_code" character varying(4) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "is_mobile_verified" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" ADD "is_email_verified" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" ADD "is_tnc_accepted" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" ADD "is_logged_in" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`CREATE TYPE "public"."users_sign_up_type_enum" AS ENUM('EMAIL', 'SOCIAL')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "sign_up_type" "public"."users_sign_up_type_enum" NOT NULL DEFAULT 'EMAIL'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "social_id" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "avatar"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "avatar" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying(80)`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "adresses" ADD CONSTRAINT "FK_8549d17ae3508635410b4fa4fb1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "consultations" ADD CONSTRAINT "FK_575f4a33bfec109149f0122f775" FOREIGN KEY ("vet_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "consultations" ADD CONSTRAINT "FK_590a17c3e9eeda5c69cb7bd594b" FOREIGN KEY ("appointment_id") REFERENCES "appointments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
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
        await queryRunner.query(`ALTER TABLE "consultations" DROP CONSTRAINT "FK_590a17c3e9eeda5c69cb7bd594b"`);
        await queryRunner.query(`ALTER TABLE "consultations" DROP CONSTRAINT "FK_575f4a33bfec109149f0122f775"`);
        await queryRunner.query(`ALTER TABLE "adresses" DROP CONSTRAINT "FK_8549d17ae3508635410b4fa4fb1"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "avatar"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "avatar" character varying`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "social_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "sign_up_type"`);
        await queryRunner.query(`DROP TYPE "public"."users_sign_up_type_enum"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "is_logged_in"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "is_tnc_accepted"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "is_email_verified"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "is_mobile_verified"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "country_code"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "mobile_number"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "device_token"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "auth_token"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "full_name"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "last_name" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "first_name" character varying`);
        await queryRunner.query(`DROP TABLE "blogs"`);
        await queryRunner.query(`DROP TABLE "appointments"`);
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
        await queryRunner.query(`DROP TABLE "consultations"`);
        await queryRunner.query(`DROP TYPE "public"."ConsultancyStatus"`);
        await queryRunner.query(`DROP TYPE "public"."MeetingStatus"`);
        await queryRunner.query(`DROP TABLE "adresses"`);
    }

}
