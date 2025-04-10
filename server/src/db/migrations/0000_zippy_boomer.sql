CREATE TABLE "links" (
	"id" text PRIMARY KEY NOT NULL,
	"original_url" text NOT NULL,
	"shortened_url" text NOT NULL,
	"access_count" integer DEFAULT 0,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "links_shortened_url_unique" UNIQUE("shortened_url")
);
