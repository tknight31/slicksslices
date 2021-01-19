import { SourceNodesArgs } from 'gatsby';
import { SanityClient } from '@sanity/client';
import { SanityWebhookBody } from '../types/sanity';
import { ProcessingOptions } from './normalize';
export declare function handleWebhookEvent(args: SourceNodesArgs & {
    webhookBody?: SanityWebhookBody;
}, options: {
    client: SanityClient;
    processingOptions: ProcessingOptions;
}): Promise<boolean>;
