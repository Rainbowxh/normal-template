/**
 * store metrics
 *
 * @class
 * */
declare class metricsStore {
    state: Map<any | string, any>;
    constructor();
    set(key: any | string, value: any): void;
    get(key: any | string): any;
    has(key: any | string): boolean;
    clear(): void;
    getValues(): any;
}
export default metricsStore;
//# sourceMappingURL=store.d.ts.map