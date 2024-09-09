import { ViteDevServer } from "vite";
declare function vitePluginFastTo(): ({
    name: string;
    enforce: string;
    apply(_: any, config: {
        command: any;
    }): boolean;
    resolveId(id: any): Promise<void>;
    load(id: any): Promise<void>;
    transform(code: any, id: string): any;
    configureServer(server: ViteDevServer): void;
    transformIndexHtml(html: any): void;
    configResolved(): void;
    generateBundle(): Promise<void>;
    closeBundle(): Promise<void>;
} | {
    name: string;
    enforce: string;
    apply(_: any, config: {
        command: any;
    }): boolean;
    configResolved(resolvedConfig: any): void;
    transformIndexHtml(html: any): any;
    resolveId?: undefined;
    load?: undefined;
    transform?: undefined;
    configureServer?: undefined;
    generateBundle?: undefined;
    closeBundle?: undefined;
})[];
export default vitePluginFastTo;
//# sourceMappingURL=index.d.ts.map