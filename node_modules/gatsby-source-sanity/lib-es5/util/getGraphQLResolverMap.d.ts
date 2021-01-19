import { CreateResolversArgs } from 'gatsby';
import { PluginConfig } from '../gatsby-node';
import { GatsbyResolverMap } from '../types/gatsby';
import { TypeMap } from './remoteGraphQLSchema';
export declare function getGraphQLResolverMap(typeMap: TypeMap, pluginConfig: PluginConfig, context: CreateResolversArgs): GatsbyResolverMap;
