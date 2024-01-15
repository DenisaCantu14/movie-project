import { MigrationInterface, QueryRunner } from 'typeorm';

export class Intial1705407149050 implements MigrationInterface {
  name = 'Intial1705407149050';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tags" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, CONSTRAINT "UQ_d90243459a697eadb8ad56e9092" UNIQUE ("name"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "photos" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "url" varchar NOT NULL, "movieId" integer, CONSTRAINT "UQ_ea30e8239b65e1002c6e3605bae" UNIQUE ("url"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "movies" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "length" integer NOT NULL, "date_released" datetime, "available_until" datetime, "meta_title" varchar, "meta_description" varchar, "categoryId" integer)`,
    );
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "phone_number" varchar NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "movies_tags_tags" ("moviesId" integer NOT NULL, "tagsId" integer NOT NULL, PRIMARY KEY ("moviesId", "tagsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5ca2153346a50348cec77c3201" ON "movies_tags_tags" ("moviesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_21863da94b41f8391153dfef95" ON "movies_tags_tags" ("tagsId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "users_categories_categories" ("usersId" integer NOT NULL, "categoriesId" integer NOT NULL, PRIMARY KEY ("usersId", "categoriesId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ca7c470ba1ddea82ea5bf425e5" ON "users_categories_categories" ("usersId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_49f431f869d5c07df806b0ab8c" ON "users_categories_categories" ("categoriesId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "users_movies_movies" ("usersId" integer NOT NULL, "moviesId" integer NOT NULL, PRIMARY KEY ("usersId", "moviesId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d71a9d25f034499e3a454ee94e" ON "users_movies_movies" ("usersId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5039c58d6d552a11126f3fe8fa" ON "users_movies_movies" ("moviesId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_photos" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "url" varchar NOT NULL, "movieId" integer, CONSTRAINT "UQ_ea30e8239b65e1002c6e3605bae" UNIQUE ("url"), CONSTRAINT "FK_480620291b0ed4b4313f0cd5533" FOREIGN KEY ("movieId") REFERENCES "movies" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_photos"("id", "url", "movieId") SELECT "id", "url", "movieId" FROM "photos"`,
    );
    await queryRunner.query(`DROP TABLE "photos"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_photos" RENAME TO "photos"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_movies" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "length" integer NOT NULL, "date_released" datetime, "available_until" datetime, "meta_title" varchar, "meta_description" varchar, "categoryId" integer, CONSTRAINT "FK_756446d4a415245bf4e95f9a37c" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_movies"("id", "title", "length", "date_released", "available_until", "meta_title", "meta_description", "categoryId") SELECT "id", "title", "length", "date_released", "available_until", "meta_title", "meta_description", "categoryId" FROM "movies"`,
    );
    await queryRunner.query(`DROP TABLE "movies"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_movies" RENAME TO "movies"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_5ca2153346a50348cec77c3201"`);
    await queryRunner.query(`DROP INDEX "IDX_21863da94b41f8391153dfef95"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_movies_tags_tags" ("moviesId" integer NOT NULL, "tagsId" integer NOT NULL, CONSTRAINT "FK_5ca2153346a50348cec77c32013" FOREIGN KEY ("moviesId") REFERENCES "movies" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_21863da94b41f8391153dfef953" FOREIGN KEY ("tagsId") REFERENCES "tags" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("moviesId", "tagsId"))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_movies_tags_tags"("moviesId", "tagsId") SELECT "moviesId", "tagsId" FROM "movies_tags_tags"`,
    );
    await queryRunner.query(`DROP TABLE "movies_tags_tags"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_movies_tags_tags" RENAME TO "movies_tags_tags"`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5ca2153346a50348cec77c3201" ON "movies_tags_tags" ("moviesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_21863da94b41f8391153dfef95" ON "movies_tags_tags" ("tagsId") `,
    );
    await queryRunner.query(`DROP INDEX "IDX_ca7c470ba1ddea82ea5bf425e5"`);
    await queryRunner.query(`DROP INDEX "IDX_49f431f869d5c07df806b0ab8c"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_users_categories_categories" ("usersId" integer NOT NULL, "categoriesId" integer NOT NULL, CONSTRAINT "FK_ca7c470ba1ddea82ea5bf425e50" FOREIGN KEY ("usersId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_49f431f869d5c07df806b0ab8ca" FOREIGN KEY ("categoriesId") REFERENCES "categories" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("usersId", "categoriesId"))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_users_categories_categories"("usersId", "categoriesId") SELECT "usersId", "categoriesId" FROM "users_categories_categories"`,
    );
    await queryRunner.query(`DROP TABLE "users_categories_categories"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_users_categories_categories" RENAME TO "users_categories_categories"`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ca7c470ba1ddea82ea5bf425e5" ON "users_categories_categories" ("usersId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_49f431f869d5c07df806b0ab8c" ON "users_categories_categories" ("categoriesId") `,
    );
    await queryRunner.query(`DROP INDEX "IDX_d71a9d25f034499e3a454ee94e"`);
    await queryRunner.query(`DROP INDEX "IDX_5039c58d6d552a11126f3fe8fa"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_users_movies_movies" ("usersId" integer NOT NULL, "moviesId" integer NOT NULL, CONSTRAINT "FK_d71a9d25f034499e3a454ee94e3" FOREIGN KEY ("usersId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_5039c58d6d552a11126f3fe8fa0" FOREIGN KEY ("moviesId") REFERENCES "movies" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("usersId", "moviesId"))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_users_movies_movies"("usersId", "moviesId") SELECT "usersId", "moviesId" FROM "users_movies_movies"`,
    );
    await queryRunner.query(`DROP TABLE "users_movies_movies"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_users_movies_movies" RENAME TO "users_movies_movies"`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d71a9d25f034499e3a454ee94e" ON "users_movies_movies" ("usersId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5039c58d6d552a11126f3fe8fa" ON "users_movies_movies" ("moviesId") `,
    );

    await queryRunner.query(
      `INSERT INTO Users (email, phone_number) VALUES ('michael@gmail.com', '00000000');`,
    );
    await queryRunner.query(
      `INSERT INTO Users (email, phone_number) VALUES ('jack@gmail.com', '12121212');`,
    );

    await queryRunner.query(
      `INSERT INTO Categories ( name ) VALUES ('horror'), ('comedy'), ('drama');`,
    );

    await queryRunner.query(
      `INSERT INTO Tags ( name ) VALUES ('tag1'), ('tag2'), ('tag3');`,
    );

    await queryRunner.query(
      `INSERT INTO movies (title, length, date_released, available_until, meta_title, meta_description, categoryId)  VALUES ('StarWars', 60, '2015-12-17',  '2015-12-17', "title", "description", '1');`,
    );

    await queryRunner.query(
      `INSERT INTO movies (title, length, date_released, available_until, meta_title, meta_description, categoryId)  VALUES ('Something', 60, '2015-12-17',  '2015-12-17', "title", "description", '2');`,
    );

    await queryRunner.query(
      `INSERT INTO Photos ( url, movieId ) VALUES ('https://45', 1), ('https://32', 1), ('https://999', 2);`,
    );

    await queryRunner.query(
      ` INSERT INTO users_categories_categories (usersId, categoriesId) VALUES
        ((SELECT id FROM users WHERE email = 'michael@gmail.com'), (SELECT id FROM categories WHERE name = 'horror')),
        ((SELECT id FROM users WHERE email = 'jack@gmail.com'), (SELECT id FROM categories WHERE name = 'comedy'));
        ((SELECT id FROM users WHERE email = 'jack@gmail.com'), (SELECT id FROM categories WHERE name = 'drama'));
    `,
    );

    await queryRunner.query(
      ` INSERT INTO movies_tags_tags(moviesId, tagsId) VALUES
        (1, 1),
        (1, 2),
        (2, 1),
        (2, 3);
    `,
    );

    await queryRunner.query(
      ` INSERT INTO users_movies_movies (usersId, moviesId) VALUES
        ((SELECT id FROM users WHERE email = 'michael@gmail.com'), 1),
        ((SELECT id FROM users WHERE email = 'jack@gmail.com'), 2);
        ((SELECT id FROM users WHERE email = 'jack@gmail.com'), 1);
    `,
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_5039c58d6d552a11126f3fe8fa"`);
    await queryRunner.query(`DROP INDEX "IDX_d71a9d25f034499e3a454ee94e"`);
    await queryRunner.query(
      `ALTER TABLE "users_movies_movies" RENAME TO "temporary_users_movies_movies"`,
    );
    await queryRunner.query(
      `CREATE TABLE "users_movies_movies" ("usersId" integer NOT NULL, "moviesId" integer NOT NULL, PRIMARY KEY ("usersId", "moviesId"))`,
    );
    await queryRunner.query(
      `INSERT INTO "users_movies_movies"("usersId", "moviesId") SELECT "usersId", "moviesId" FROM "temporary_users_movies_movies"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_users_movies_movies"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_5039c58d6d552a11126f3fe8fa" ON "users_movies_movies" ("moviesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d71a9d25f034499e3a454ee94e" ON "users_movies_movies" ("usersId") `,
    );
    await queryRunner.query(`DROP INDEX "IDX_49f431f869d5c07df806b0ab8c"`);
    await queryRunner.query(`DROP INDEX "IDX_ca7c470ba1ddea82ea5bf425e5"`);
    await queryRunner.query(
      `ALTER TABLE "users_categories_categories" RENAME TO "temporary_users_categories_categories"`,
    );
    await queryRunner.query(
      `CREATE TABLE "users_categories_categories" ("usersId" integer NOT NULL, "categoriesId" integer NOT NULL, PRIMARY KEY ("usersId", "categoriesId"))`,
    );
    await queryRunner.query(
      `INSERT INTO "users_categories_categories"("usersId", "categoriesId") SELECT "usersId", "categoriesId" FROM "temporary_users_categories_categories"`,
    );
    await queryRunner.query(
      `DROP TABLE "temporary_users_categories_categories"`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_49f431f869d5c07df806b0ab8c" ON "users_categories_categories" ("categoriesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ca7c470ba1ddea82ea5bf425e5" ON "users_categories_categories" ("usersId") `,
    );
    await queryRunner.query(`DROP INDEX "IDX_21863da94b41f8391153dfef95"`);
    await queryRunner.query(`DROP INDEX "IDX_5ca2153346a50348cec77c3201"`);
    await queryRunner.query(
      `ALTER TABLE "movies_tags_tags" RENAME TO "temporary_movies_tags_tags"`,
    );
    await queryRunner.query(
      `CREATE TABLE "movies_tags_tags" ("moviesId" integer NOT NULL, "tagsId" integer NOT NULL, PRIMARY KEY ("moviesId", "tagsId"))`,
    );
    await queryRunner.query(
      `INSERT INTO "movies_tags_tags"("moviesId", "tagsId") SELECT "moviesId", "tagsId" FROM "temporary_movies_tags_tags"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_movies_tags_tags"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_21863da94b41f8391153dfef95" ON "movies_tags_tags" ("tagsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5ca2153346a50348cec77c3201" ON "movies_tags_tags" ("moviesId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "movies" RENAME TO "temporary_movies"`,
    );
    await queryRunner.query(
      `CREATE TABLE "movies" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "length" integer NOT NULL, "date_released" datetime, "available_until" datetime, "meta_title" varchar, "meta_description" varchar, "categoryId" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "movies"("id", "title", "length", "date_released", "available_until", "meta_title", "meta_description", "categoryId") SELECT "id", "title", "length", "date_released", "available_until", "meta_title", "meta_description", "categoryId" FROM "temporary_movies"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_movies"`);
    await queryRunner.query(
      `ALTER TABLE "photos" RENAME TO "temporary_photos"`,
    );
    await queryRunner.query(
      `CREATE TABLE "photos" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "url" varchar NOT NULL, "movieId" integer, CONSTRAINT "UQ_ea30e8239b65e1002c6e3605bae" UNIQUE ("url"))`,
    );
    await queryRunner.query(
      `INSERT INTO "photos"("id", "url", "movieId") SELECT "id", "url", "movieId" FROM "temporary_photos"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_photos"`);
    await queryRunner.query(`DROP INDEX "IDX_5039c58d6d552a11126f3fe8fa"`);
    await queryRunner.query(`DROP INDEX "IDX_d71a9d25f034499e3a454ee94e"`);
    await queryRunner.query(`DROP TABLE "users_movies_movies"`);
    await queryRunner.query(`DROP INDEX "IDX_49f431f869d5c07df806b0ab8c"`);
    await queryRunner.query(`DROP INDEX "IDX_ca7c470ba1ddea82ea5bf425e5"`);
    await queryRunner.query(`DROP TABLE "users_categories_categories"`);
    await queryRunner.query(`DROP INDEX "IDX_21863da94b41f8391153dfef95"`);
    await queryRunner.query(`DROP INDEX "IDX_5ca2153346a50348cec77c3201"`);
    await queryRunner.query(`DROP TABLE "movies_tags_tags"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "categories"`);
    await queryRunner.query(`DROP TABLE "movies"`);
    await queryRunner.query(`DROP TABLE "photos"`);
    await queryRunner.query(`DROP TABLE "tags"`);
  }
}
