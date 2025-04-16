import { store } from "./link.store.route.ts";
import { index } from "./link.index.route.ts";
import { destroy } from "./link.destroy.route.ts";
import { incrementAccessCount } from "./link.increment-access-count.route.ts";

export const linkRoute = {
    store,
    index,
    destroy,
    incrementAccessCount,
};
