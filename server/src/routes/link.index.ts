import { healthRoute } from "./health.route.ts";
import { destroy } from "./link.destroy.route.ts";
import { exportCsv } from "./link.export-csv.route.ts";
import { incrementAccessCount } from "./link.increment-access-count.route.ts";
import { index } from "./link.index.route.ts";
import { showByShortPath } from "./link.show-by-short-url.route.ts";
import { store } from "./link.store.route.ts";

export const linkRoute = {
    destroy,
    exportCsv,
    healthRoute,
    incrementAccessCount,
    index,
    showByShortPath,
    store,
};
