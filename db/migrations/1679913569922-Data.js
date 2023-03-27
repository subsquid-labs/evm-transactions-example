module.exports = class Data1679913569922 {
    name = 'Data1679913569922'

    async up(db) {
        await db.query(`CREATE TABLE "transaction" ("id" character varying NOT NULL, "block" integer NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "hash" text NOT NULL, "from" text NOT NULL, "to" text NOT NULL, "input" text NOT NULL, "success" boolean, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`)
    }

    async down(db) {
        await db.query(`DROP TABLE "transaction"`)
    }
}
