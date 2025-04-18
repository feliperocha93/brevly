import { destroy } from "./link.destroy.route.ts";
import { exportCsv } from "./link.export-csv.route.ts";
import { incrementAccessCount } from "./link.increment-access-count.route.ts";
import { index } from "./link.index.route.ts";
import { store } from "./link.store.route.ts";

export const linkRoute = {
    destroy,
    exportCsv,
    incrementAccessCount,
    index,
    store,
};
