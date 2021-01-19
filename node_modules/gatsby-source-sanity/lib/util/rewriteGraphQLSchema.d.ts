import { Reporter } from 'gatsby';
import { PluginConfig } from '../gatsby-node';
interface AstRewriterContext {
    reporter: Reporter;
    config: PluginConfig;
}
export declare const rewriteGraphQLSchema: (schemaSdl: string, context: AstRewriterContext) => string;
export {};
