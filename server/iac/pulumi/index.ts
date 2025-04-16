import * as cloudflare from ".pnpm/@pulumi+cloudflare@6.0.0_typescript@5.8.3/node_modules/@pulumi/cloudflare";

const exportLinksBucket = new cloudflare.R2Bucket("exportLinksBucket", {
    name: "export-links",
    accountId: "f4a0805829dc6a08e153fa9419f5a400",
});

export const exportLinksBucketName = exportLinksBucket.name;
