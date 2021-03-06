import * as _ from 'lodash';
import * as React from 'react';
import { observer } from 'mobx-react';
import { get } from 'typesafe-get';

import { HtkResponse, Omit } from '../../types';
import { Theme } from '../../styles';

import { ApiExchange } from '../../model/openapi/openapi';
import { getStatusColor } from '../../exchange-colors';
import { getStatusDocs } from '../../model/http-docs';

import { Pill } from '../common/pill';
import { HeaderDetails } from './headers/header-details';
import {
    ExchangeCard,
    ContentLabelBlock,
    ExchangeCardProps,
    ContentLabel,
    ExchangeCollapsibleSummary,
    ExchangeCollapsibleBody
} from './exchange-card';
import { CollapsibleSection } from '../common/collapsible-section';
import { ExternalContent, Markdown } from '../common/external-content';
import { DocsLink } from '../common/docs-link';

interface ExchangeResponseCardProps extends Omit<ExchangeCardProps, 'children'>  {
    theme: Theme;
    requestUrl: URL;
    response: HtkResponse;
    apiExchange: ApiExchange | undefined;
}

export const ExchangeResponseCard = observer((props: ExchangeResponseCardProps) => {
    const { response, requestUrl, theme, apiExchange } = props;

    const apiResponseDescription = get(apiExchange, 'response', 'description');
    const statusDocs = getStatusDocs(response.statusCode);

    const responseDetails = [
        apiResponseDescription && <ExternalContent
            key='api-response-docs'
            content={apiResponseDescription}
        />,
        statusDocs && <Markdown
            key='status-docs'
            content={statusDocs.summary}
        />,
        statusDocs && <p key='status-link'>
            <DocsLink href={statusDocs.url}>Find out more</DocsLink>
        </p>
    ].filter(d => !!d);

    return <ExchangeCard {...props} direction='left'>
        <header>
            <Pill color={getStatusColor(response.statusCode, theme!)}>{
                response.statusCode
            }</Pill>
            <h1>Response</h1>
        </header>

        <div>
            <CollapsibleSection>
                <ExchangeCollapsibleSummary>
                    <ContentLabel>Status:</ContentLabel>{' '}
                    {response.statusCode} {response.statusMessage}
                </ExchangeCollapsibleSummary>

                {
                    responseDetails.length ?
                        <ExchangeCollapsibleBody>
                            { responseDetails }
                        </ExchangeCollapsibleBody>
                    : null
                }
            </CollapsibleSection>

            <ContentLabelBlock>Headers</ContentLabelBlock>
            <HeaderDetails headers={response.headers} requestUrl={requestUrl} />
        </div>
    </ExchangeCard>;
});