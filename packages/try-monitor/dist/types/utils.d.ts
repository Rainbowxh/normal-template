export declare const observe: (type: string, callback: any) => PerformanceObserver | undefined;
export declare const onHidden: (callback: any, once?: boolean) => void;
export declare const onActivated: (initAnalytics: any) => void;
export declare const onIdle: (stop: () => void) => void;
export declare const getFirstHiddenTime: () => {
    readonly timeStamp: number;
};
export declare const onOperate: (callback: () => void, once?: boolean) => void;
export declare const getNavigationEntry: () => any;
//# sourceMappingURL=utils.d.ts.map