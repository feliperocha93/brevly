import * as cloudflare from "@pulumi/cloudflare";

const exportLinksBucket = new cloudflare.R2Bucket("exportLinksBucket", {
    name: "export-links-bucket",
    accountId: "f4a0805829dc6a08e153fa9419f5a400",
});

export const exportLinksBucketName = exportLinksBucket.name;
