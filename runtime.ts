// tslint:disable
/**
 * Cybrid Bank API
 * # Cybrid API documentation  Welcome to Cybrid, an all-in-one crypto platform that enables you to easily **build** and **launch** white-label crypto products or services.  In these documents, you\'ll find details on how our REST API operates and generally how our platform functions.  If you\'re looking for our UI SDK Widgets for Web or Mobile (iOS/Android), generated API clients, or demo applications, head over to our [Github repo](https://github.com/Cybrid-app).  💡 We recommend bookmarking the [Cybrid LinkTree](https://linktr.ee/cybridtechnologies) which contains many helpful links to platform resources.  ## Getting Started  This is Cybrid\'s public interactive API documentation, which allows you to fully test our APIs. If you\'d like to use a different tool to exercise our APIs, you can download the [Open API 3.0 yaml](https://bank.demo.cybrid.app/api/schema/v1/swagger.yaml) for import.  If you\'re new to our APIs and the Cybrid Platform, follow the below guides to get set up and familiar with the platform:  1. [Getting Started in the Cybrid Sandbox](https://www.cybrid.xyz/guides/getting-started) 2. [Getting Ready for Trading](https://www.cybrid.xyz/guides/getting-ready-for-trading) 3. [Running the Web Demo App](https://www.cybrid.xyz/guides/running-the-cybrid-web-demo-crypto-app) (or, alternatively, [Testing with Hosted Web Demo App](https://www.cybrid.xyz/guides/testing-with-the-web-demo-crypo-app))  In [Getting Started in the Cybrid Sandbox](https://www.cybrid.xyz/guides/getting-started), we walk you through how to use the [Cybrid Sandbox](https://id.demo.cybrid.app/) to create a test bank, generate API keys, and set banks fees. In [Getting Ready for Trading](https://www.cybrid.xyz/guides/getting-ready-for-trading), we walk through creating customers, customer identities, accounts, as well as executing quotes and trades.  If you\'ve already run through the first two guides, you can follow the [Running the Web Demo App](https://www.cybrid.xyz/guides/running-the-cybrid-web-demo-crypto-app) guide to test our web SDK with your sandbox `bank` and `customer`.  ## Working with the Cybrid Platform  There are three primary ways you can interact with the Cybrid platform:  1. Directly via our RESTful API (this documentation) 2. Using our API clients available in a variety of languages ([Angular](https://github.com/Cybrid-app/cybrid-api-bank-angular), [Java](https://github.com/Cybrid-app/cybrid-api-bank-java), [Kotlin](https://github.com/Cybrid-app/cybrid-api-bank-kotlin), [Python](https://github.com/Cybrid-app/cybrid-api-bank-python), [Ruby](https://github.com/Cybrid-app/cybrid-api-bank-ruby), [Swift](https://github.com/Cybrid-app/cybrid-api-bank-swift) or [Typescript](https://github.com/Cybrid-app/cybrid-api-bank-typescript)) 3. Integrating a platform specific SDK ([Web](https://github.com/Cybrid-app/cybrid-sdk-web), [Android](https://github.com/Cybrid-app/cybrid-sdk-android), Apple-coming soon)  Our complete set of APIs allows you to manage resources across three distinct areas: your `Organization`, your `Banks` and your `Identities`. For most of your testing and interaction you\'ll be using the `Bank` API, which is where the majority of APIs reside.  *The complete set of APIs can be found on the following pages:*  | API                                                              | Description                                                 | |------------------------------------------------------------------|-------------------------------------------------------------| | [Organization API](https://organization.demo.cybrid.app/api/schema/swagger-ui)   | APIs to manage organizations                                | | [Bank API](https://bank.demo.cybrid.app/api/schema/swagger-ui)                   | APIs to manage banks (and all downstream customer activity) | | [Identities API](https://id.demo.cybrid.app/api/schema/swagger-ui)                       | APIs to manage organization and bank identities             |  For questions please contact [Support](mailto:support@cybrid.xyz) at any time for assistance, or contact the [Product Team](mailto:product@cybrid.xyz) for product suggestions.  ## Authenticating with the API  The Cybrid Platform uses OAuth 2.0 Bearer Tokens to authenticate requests to the platform. Credentials to create `Organization` and `Bank` tokens can be generated via the [Cybrid Sandbox](https://id.demo.cybrid.app). Access tokens can be generated for a `Customer` as well via the [Cybrid IdP](https://id.demo.cybrid.app) as well.  An `Organization` access token applies broadly to the whole Organization and all of its `Banks`, whereas, a `Bank` access token is specific to an individual Bank. `Customer` tokens, similarly, are scoped to a specific customer in a bank.  Both `Organization` and `Bank` tokens can be created using the OAuth Client Credential Grant flow. Each Organization and Bank has its own unique `Client ID` and `Secret` that allows for machine-to-machine authentication.  A `Bank` can then generate `Customer` access tokens via API.  <font color=\"orange\">**⚠️ Never share your Client ID or Secret publicly or in your source code repository.**</font>  Your `Client ID` and `Secret` can be exchanged for a time-limited `Bearer Token` by interacting with the Cybrid Identity Provider or through interacting with the **Authorize** button in this document.  The following curl command can be used to quickly generate a `Bearer Token` for use in testing the API or demo applications.  ``` curl -X POST https://id.demo.cybrid.app/oauth/token -d \'{     \"grant_type\": \"client_credentials\",     \"client_id\": \"<Your Client ID>\",     \"client_secret\": \"<Your Secret>\",     \"scope\": \"banks:read banks:write accounts:read accounts:execute customers:read customers:write customers:execute prices:read quotes:execute trades:execute trades:read\"   }\' -H \"Content-Type: application/json\" ``` <font color=\"orange\">**⚠️ Note: The above curl will create a bearer token with full scope access. Delete scopes if you\'d like to restrict access.**</font>  ## Authentication Scopes  The Cybrid platform supports the use of scopes to control the level of access a token is limited to. Scopes do not grant access to resources; instead, they provide limits, in support of the least privilege principal.  The following scopes are available on the platform and can be requested when generating either an Organization or a Bank token. Generally speaking, the _Read_ scope is required to read and list resources, the _Write_ scope is required to update a resource and the _Execute_ scope is required to create a resource.  | Resource               | Read scope (Token Type)                                    | Write scope (Token Type)           | Execute scope (Token Type)                      | |------------------------|------------------------------------------------------------|------------------------------------|-------------------------------------------------| | Organizations          | organizations:read (Organization)                          | organizations:write (Organization) |                                                 | | Banks                  | banks:read (Organization, Bank)                            | banks:write (Organization, Bank)   | banks:execute (Organization)                    | | Customers              | customers:read (Organization, Bank, Customer)              | customers:write (Bank)             | customers:execute (Bank)                        | | Accounts               | accounts:read (Organization, Bank, Customer)               |                                    | accounts:execute (Bank, Customer)               | | Prices                 | prices:read (Bank, Customer)                               |                                    |                                                 | | Quotes                 | quotes:read (Organization, Bank, Customer)                 |                                    | quotes:execute (Bank, Customer)                 | | Trades                 | trades:read (Organization, Bank, Customer)                 |                                    | trades:execute (Bank)                           | | Rewards                | rewards:read (Bank)                                        |                                    | rewards:execute (Bank)                          | | External bank accounts | external_bank_accounts:read (Organization, Bank, Customer) |                                    | external_bank_accounts:execute (Bank, Customer) |  ## Available Endpoints  The available APIs for the [Identity](https://id.demo.cybrid.app/api/schema/swagger-ui), [Organization](https://organization.demo.cybrid.app/api/schema/swagger-ui) and [Bank](https://bank.demo.cybrid.app/api/schema/swagger-ui) API services are listed below:  | API Service  | Model               | API Endpoint Path              | Description                                                                                       | |--------------|---------------------|--------------------------------|---------------------------------------------------------------------------------------------------| | Identity     | Bank                | /api/bank_applications         | Create and list banks                                                                             | | Identity     | Organization        | /api/organization_applications | Create and list organizations                                                                     | | Identity     | CustomerToken       | /api/customer_tokens           | Create customer JWT access tokens                                                                 | | Organization | Organization        | /api/organizations             | APIs to retrieve and update organization name                                                     | | Bank         | Asset               | /api/assets                    | Get a list of assets supported by the platform (ex: BTC, ETH)                                     | | Bank         | VerificationKey     | /api/bank_verification_keys    | Create, list and retrive verification keys, used for signing identities                           | | Bank         | Banks               | /api/banks                     | Create, update and list banks, the parent to customers, accounts, etc                             | | Bank         | FeeConfiguration    | /api/fee_configurations        | Create and list bank fees (spread or fixed)                                                       | | Bank         | Customers           | /api/customers                 | Create and list customers                                                                         | | Bank         | IdentityRecord      | /api/identity_records          | Create and list identity records, which are attached to customers for KYC                         | | Bank         | Accounts            | /api/accounts                  | Create and list accounts, which hold a specific asset for a customers                             | | Bank         | Symbols             | /api/symbols                   | Get a list of symbols supported for trade (ex: BTC-USD)                                           | | Bank         | Prices              | /api/prices                    | Get the current prices for assets on the platform                                                 | | Bank         | Quotes              | /api/quotes                    | Create and list quotes, which are required to execute trades                                      | | Bank         | Trades              | /api/trades                    | Create and list trades, which buy or sell cryptocurrency                                          | | Bank         | Rewards             | /api/rewards                   | Create a new reward (automates quote/trade for simplicity)                                        | | Bank         | ExternalBankAccount | /api/external_bank_account     | Create, get and list external bank accounts, which connect customer bank accounts to the platform |  ## Understanding Object Models & Endpoints  **Organizations**  An `Organization` is meant to represent the organization partnering with Cybrid to use our platform.  An `Organization` does not directly interact with `customers`. Instead, an Organization has one or more `banks`, which encompass the financial service offerings of the platform.  **Banks**  A `Bank` is owned by an `Organization` and can be thought of as an environment or container for `Customers` and product offerings. Banks are created in either `Sandbox` or `Production` mode, where Sandbox is the environment that you would test, prototype and build in prior to production.  An `Organization` can have multiple `banks`, in either sandbox or production environments. A sandbox Bank will be backed by stubbed data and process flows. For instance, funding source processes will be simulated rather than performed, however asset prices are representative of real-world values. You have an unlimited amout of simulated fiat currency for testing purposes.  ## Customers  `Customers` represent your banking users on the platform. At present, we offer support for `Individuals` as Customers.  `Customers` must be verified in our system before they can play any part on the platform, which means they must have an associated and valid `Identity Record`. See the Identity Records section for more details on how a customer can be verified.  `Customers` must also have an `account` to be able to transact, in the desired asset class. See the Accounts APIs for more details on setting up accounts for the customer. 
 *
 * The version of the OpenAPI document: v0.49.0
 * Contact: support@cybrid.app
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { of } from 'rxjs';
import type { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import type { AjaxConfig, AjaxResponse } from 'rxjs/ajax';
import { map, concatMap } from 'rxjs/operators';
import { servers } from './servers';

export const BASE_PATH = servers[0].getUrl();

export interface ConfigurationParameters {
    basePath?: string; // override base path
    middleware?: Middleware[]; // middleware to apply before/after rxjs requests
    username?: string; // parameter for basic security
    password?: string; // parameter for basic security
    apiKey?: string | ((name: string) => string); // parameter for apiKey security
    accessToken?: string | ((name?: string, scopes?: string[]) => string); // parameter for oauth2 security
}

export class Configuration {
    constructor(private configuration: ConfigurationParameters = {}) {}

    get basePath(): string {
        return this.configuration.basePath ?? BASE_PATH;
    }

    get middleware(): Middleware[] {
        return this.configuration.middleware ?? [];
    }

    get username(): string | undefined {
        return this.configuration.username;
    }

    get password(): string | undefined {
        return this.configuration.password;
    }

    get apiKey(): ((name: string) => string) | undefined {
        const { apiKey } = this.configuration;
        return apiKey ? (typeof apiKey === 'string' ? () => apiKey : apiKey) : undefined;
    }

    get accessToken(): ((name: string, scopes?: string[]) => string) | undefined {
        const { accessToken } = this.configuration;
        return accessToken ? (typeof accessToken === 'string' ? () => accessToken : accessToken) : undefined;
    }
}

/**
 * This is the base class for all generated API classes.
 */
export class BaseAPI {
    private middleware: Middleware[] = [];

    constructor(protected configuration = new Configuration()) {
        this.middleware = configuration.middleware;
    }

    withMiddleware = (middlewares: Middleware[]): this => {
        const next = this.clone();
        next.middleware = next.middleware.concat(middlewares);
        return next;
    };

    withPreMiddleware = (preMiddlewares: Array<Middleware['pre']>) =>
        this.withMiddleware(preMiddlewares.map((pre) => ({ pre })));

    withPostMiddleware = (postMiddlewares: Array<Middleware['post']>) =>
        this.withMiddleware(postMiddlewares.map((post) => ({ post })));

    protected request<T>(requestOpts: RequestOpts): Observable<T>
    protected request<T>(requestOpts: RequestOpts, responseOpts?: ResponseOpts): Observable<AjaxResponse<T>>
    protected request<T>(requestOpts: RequestOpts, responseOpts?: ResponseOpts): Observable<T | AjaxResponse<T>> {
        return this.rxjsRequest<T>(this.createRequestArgs(requestOpts)).pipe(
            map((res) => {
                const { status, response } = res;
                if (status >= 200 && status < 300) {
                    return responseOpts?.response === 'raw' ? res : response;
                }
                throw res;
            })
        );
    }

    private createRequestArgs = ({ url: baseUrl, query, method, headers, body, responseType }: RequestOpts): AjaxConfig => {
        // only add the queryString to the URL if there are query parameters.
        // this is done to avoid urls ending with a '?' character which buggy webservers
        // do not handle correctly sometimes.
        const url = `${this.configuration.basePath}${baseUrl}${query && Object.keys(query).length ? `?${queryString(query)}`: ''}`;

        return {
            url,
            method,
            headers,
            body: body instanceof FormData ? body : JSON.stringify(body),
            responseType: responseType ?? 'json',
        };
    }

    private rxjsRequest = <T>(params: AjaxConfig): Observable<AjaxResponse<T>> =>
        of(params).pipe(
            map((request) => {
                this.middleware.filter((item) => item.pre).forEach((mw) => (request = mw.pre!(request)));
                return request;
            }),
            concatMap((args) =>
                ajax<T>(args).pipe(
                    map((response) => {
                        this.middleware.filter((item) => item.post).forEach((mw) => (response = mw.post!(response)));
                        return response;
                    })
                )
            )
        );

    /**
     * Create a shallow clone of `this` by constructing a new instance
     * and then shallow cloning data members.
     */
    private clone = (): this =>
        Object.assign(Object.create(Object.getPrototypeOf(this)), this);
}

/**
 * @deprecated
 * export for not being a breaking change
 */
export class RequiredError extends Error {
    name: 'RequiredError' = 'RequiredError';
}

export const COLLECTION_FORMATS = {
    csv: ',',
    ssv: ' ',
    tsv: '\t',
    pipes: '|',
};

export type Json = any;
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'HEAD';
export type HttpHeaders = { [key: string]: string };
export type HttpQuery = Partial<{ [key: string]: string | number | null | boolean | Array<string | number | null | boolean> }>; // partial is needed for strict mode
export type HttpBody = Json | FormData;

export interface RequestOpts extends AjaxConfig {
    // TODO: replace custom 'query' prop with 'queryParams'
    query?: HttpQuery; // additional prop
    // the following props have improved types over AjaxRequest
    method: HttpMethod;
    headers?: HttpHeaders;
    body?: HttpBody;
}

export interface ResponseOpts {
    response?: 'raw';
}

export interface OperationOpts {
    responseOpts?: ResponseOpts;
}

export const encodeURI = (value: any) => encodeURIComponent(`${value}`);

const queryString = (params: HttpQuery): string => Object.entries(params)
    .map(([key, value]) => value instanceof Array
        ? value.map((val) => `${encodeURI(key)}=${encodeURI(val)}`).join('&')
        : `${encodeURI(key)}=${encodeURI(value)}`
    )
    .join('&');

export const throwIfNullOrUndefined = (value: any, paramName: string, nickname: string) => {
    if (value == null) {
        throw new Error(`Parameter "${paramName}" was null or undefined when calling "${nickname}".`);
    }
};

export interface Middleware {
    pre?(request: AjaxConfig): AjaxConfig;
    post?(response: AjaxResponse<any>): AjaxResponse<any>;
}
