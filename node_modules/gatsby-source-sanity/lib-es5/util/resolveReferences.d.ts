import { NodePluginArgs } from 'gatsby';
interface ResolveReferencesOptions {
    maxDepth: number;
    overlayDrafts: boolean;
}
export declare function resolveReferences(obj: any, context: Pick<NodePluginArgs, 'createNodeId' | 'getNode'>, options?: Partial<ResolveReferencesOptions>, currentDepth?: number): any;
export {};
