import { metricsName } from "../enums";
export default function getDeviceInfo(store: any, report: any): {
    name: metricsName;
    memory: any;
    eventCounts: EventCounts;
    timing: PerformanceTiming;
    navigation: PerformanceNavigation;
    timeOrigin: number;
} | undefined;
//# sourceMappingURL=getDeviceInfo.d.ts.map