CREATE TABLE "developers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"full_name" varchar(30) NOT NULL,
	"email" varchar(30) NOT NULL,
	"password" varchar(62) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
