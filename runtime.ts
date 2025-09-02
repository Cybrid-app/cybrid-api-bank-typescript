// tslint:disable
/**
 * Cybrid Bank API
 * # Cybrid API documentation  Welcome to Cybrid, an all-in-one crypto platform that enables you to easily **build** and **launch** white-label crypto products or services.  In these documents, you\'ll find details on how our REST API operates and generally how our platform functions.  If you\'re looking for our UI SDK Widgets for Web or Mobile (iOS/Android), generated API clients, or demo applications, head over to our [Github repo](https://github.com/Cybrid-app).  💡 We recommend bookmarking the [Cybrid LinkTree](https://linktr.ee/cybridtechnologies) which contains many helpful links to platform resources.  ## Getting Started  This is Cybrid\'s public interactive API documentation, which allows you to fully test our APIs. If you\'d like to use a different tool to exercise our APIs, you can download the [Open API 3.0 yaml](https://bank.production.cybrid.app/api/schema/v1/swagger.yaml) for import.  If you\'re new to our APIs and the Cybrid Platform, follow the below guides to get set up and familiar with the platform:  1. [Introduction](https://docs.cybrid.xyz/docs/introduction) 2. [Platform Introduction](https://docs.cybrid.xyz/docs/how-is-cybrid-architected) 3. [Testing with Hosted Web Demo App](https://docs.cybrid.xyz/docs/testing-with-hosted-web-demo-app)  In [Getting Started in the Cybrid Sandbox](https://docs.cybrid.xyz/docs/how-do-i-get-started-with-the-sandbox), we walk you through how to use the [Cybrid Sandbox](https://id.sandbox.cybrid.app/) to create a test bank and generate API keys. In [Getting Ready for Trading](https://kb.cybrid.xyz/getting-ready-for-trading), we walk through creating customers, customer identities, accounts, as well as executing quotes and trades.  ## Working with the Cybrid Platform  There are three primary ways you can interact with the Cybrid platform:  1. Directly via our RESTful API (this documentation) 2. Using our API clients available in a variety of languages ([Angular](https://github.com/Cybrid-app/cybrid-api-bank-angular), [Java](https://github.com/Cybrid-app/cybrid-api-bank-java), [Kotlin](https://github.com/Cybrid-app/cybrid-api-bank-kotlin), [Python](https://github.com/Cybrid-app/cybrid-api-bank-python), [Ruby](https://github.com/Cybrid-app/cybrid-api-bank-ruby), [Swift](https://github.com/Cybrid-app/cybrid-api-bank-swift) or [Typescript](https://github.com/Cybrid-app/cybrid-api-bank-typescript)) 3. Integrating a platform specific SDK ([Web](https://github.com/Cybrid-app/cybrid-sdk-web), [Android](https://github.com/Cybrid-app/cybrid-sdk-android), [iOS](https://github.com/Cybrid-app/cybrid-sdk-ios))  Our complete set of APIs allows you to manage resources across three distinct areas: your `Organization`, your `Banks` and your `Identities`. For most of your testing and interaction you\'ll be using the `Bank` API, which is where the majority of APIs reside.  *The complete set of APIs can be found on the following pages:*  | API                                                              | Description                                                 | |------------------------------------------------------------------|-------------------------------------------------------------| | [Organization API](https://organization.production.cybrid.app/api/schema/swagger-ui)   | APIs to manage organizations                                | | [Bank API](https://bank.production.cybrid.app/api/schema/swagger-ui)                   | APIs to manage banks (and all downstream customer activity) | | [Identities API](https://id.production.cybrid.app/api/schema/swagger-ui)                       | APIs to manage organization and bank identities             |  For questions please contact [Support](mailto:support@cybrid.xyz) at any time for assistance, or contact the [Product Team](mailto:product@cybrid.xyz) for product suggestions.  ## Authenticating with the API  The Cybrid Platform uses OAuth 2.0 Bearer Tokens to authenticate requests to the platform. Credentials to create `Organization` and `Bank` tokens can be generated via the [Cybrid Sandbox](https://id.production.cybrid.app). Access tokens can be generated for a `Customer` as well via the [Cybrid IdP](https://id.production.cybrid.app) as well.  An `Organization` access token applies broadly to the whole Organization and all of its `Banks`, whereas, a `Bank` access token is specific to an individual Bank. `Customer` tokens, similarly, are scoped to a specific customer in a bank.  Both `Organization` and `Bank` tokens can be created using the OAuth Client Credential Grant flow. Each Organization and Bank has its own unique `Client ID` and `Secret` that allows for machine-to-machine authentication.  A `Bank` can then generate `Customer` access tokens via API using our [Identities API](https://id.production.cybrid.app/api/schema/swagger-ui).  <font color=\"orange\">**⚠️ Never share your Client ID or Secret publicly or in your source code repository.**</font>  Your `Client ID` and `Secret` can be exchanged for a time-limited `Bearer Token` by interacting with the Cybrid Identity Provider or through interacting with the **Authorize** button in this document.  The following curl command can be used to quickly generate a `Bearer Token` for use in testing the API or demo applications.  ``` # Example request when using Bank credentials curl -X POST https://id.production.cybrid.app/oauth/token -d \'{     \"grant_type\": \"client_credentials\",     \"client_id\": \"<Your Client ID>\",     \"client_secret\": \"<Your Secret>\",     \"scope\": \"banks:read banks:write bank_applications:execute accounts:read accounts:execute counterparties:read counterparties:pii:read counterparties:write counterparties:execute customers:read customers:pii:read customers:write customers:execute prices:read quotes:execute quotes:read trades:execute trades:read transfers:execute transfers:read transfers:write external_bank_accounts:read external_bank_accounts:pii:read external_bank_accounts:write external_bank_accounts:execute external_wallets:read external_wallets:execute workflows:read workflows:execute deposit_addresses:read deposit_addresses:execute deposit_bank_accounts:read deposit_bank_accounts:execute invoices:read invoices:write invoices:execute identity_verifications:read identity_verifications:pii:read identity_verifications:write identity_verifications:execute persona_sessions:execute files:read files:pii:read files:execute\"   }\' -H \"Content-Type: application/json\"  # When using Organization credentials set `scope` to \'organizations:read organizations:write organization_applications:execute banks:read banks:write banks:execute bank_applications:execute users:read users:write users:execute counterparties:read counterparties:pii:read customers:read customers:pii:read accounts:read prices:read quotes:execute quotes:read trades:execute trades:read transfers:read transfers:write transfers:execute external_bank_accounts:read external_bank_accounts:pii:read external_wallets:read workflows:read deposit_addresses:read deposit_bank_accounts:read invoices:read subscriptions:read subscriptions:write subscriptions:execute subscription_events:read subscription_events:execute identity_verifications:read identity_verifications:pii:read identity_verifications:execute persona_sessions:execute files:read files:pii:read files:execute\' ``` <font color=\"orange\">**⚠️ Note: The above curl will create a bearer token with full scope access. Delete scopes if you\'d like to restrict access.**</font>  ## Authentication Scopes  The Cybrid platform supports the use of scopes to control the level of access a token is limited to. Scopes do not grant access to resources; instead, they provide limits, in support of the least privilege principal.  The following scopes are available on the platform and can be requested when generating either an Organization, Bank or Customer token. Generally speaking, the _Read_ scope is required to read and list resources, the _Write_ scope is required to update a resource and the _Execute_ scope is required to create a resource.  | Resource              | Read scope (Token Type)                                    | Write scope (Token Type)                      | Execute scope (Token Type)                       | |-----------------------|------------------------------------------------------------|-----------------------------------------------|--------------------------------------------------| | Account               | accounts:read (Organization, Bank, Customer)               |                                               | accounts:execute (Bank, Customer)                | | Bank                  | banks:read (Organization, Bank)                            | banks:write (Organization, Bank)              | banks:execute (Organization)                     | | Customer              | customers:read (Organization, Bank, Customer)              | customers:write (Bank, Customer)              | customers:execute (Bank)                         | | Counterparty          | counterparties:read (Organization, Bank, Customer)         | counterparties:write (Bank, Customer)         | counterparties:execute (Bank)                    | | Deposit Address       | deposit_addresses:read (Organization, Bank, Customer)      | deposit_addresses:write (Bank, Customer)      | deposit_addresses:execute (Bank, Customer)       | | External Bank Account | external_bank_accounts:read (Organization, Bank, Customer) | external_bank_accounts:write (Bank, Customer) | external_bank_accounts:execute (Bank, Customer)  | | External Wallet       | external_wallet:read (Organization, Bank, Customer)        |                                               | external_wallet:execute (Bank, Customer)         | | Organization          | organizations:read (Organization)                          | organizations:write (Organization)            |                                                  | | User                  | users:read (Organization)                                  |                                               | users:execute (Organization)                     | | Price                 | prices:read (Bank, Customer)                               |                                               |                                                  | | Quote                 | quotes:read (Organization, Bank, Customer)                 |                                               | quotes:execute (Organization, Bank, Customer)    | | Trade                 | trades:read (Organization, Bank, Customer)                 |                                               | trades:execute (Organization, Bank, Customer)    | | Transfer              | transfers:read (Organization, Bank, Customer)              |                                               | transfers:execute (Organization, Bank, Customer) | | Workflow              | workflows:read (Organization, Bank, Customer)              |                                               | workflows:execute (Bank, Customer)               | | Invoice               | invoices:read (Organization, Bank, Customer)               | invoices:write (Bank, Customer)               | invoices:execute (Bank, Customer)                |  ## Available Endpoints  The available APIs for the [Identity](https://id.production.cybrid.app/api/schema/swagger-ui), [Organization](https://organization.production.cybrid.app/api/schema/swagger-ui) and [Bank](https://bank.production.cybrid.app/api/schema/swagger-ui) API services are listed below:  | API Service  | Model                | API Endpoint Path              | Description                                                                                       | |--------------|----------------------|--------------------------------|---------------------------------------------------------------------------------------------------| | Identity     | Bank                 | /api/bank_applications         | Create and list banks                                                                             | | Identity     | CustomerToken        | /api/customer_tokens           | Create customer JWT access tokens                                                                 | | Identity     | Organization         | /api/organization_applications | Create and list organizations                                                                     | | Identity     | Organization         | /api/users                     | Create and list organization users                                                                | | Organization | Organization         | /api/organizations             | APIs to retrieve and update organization name                                                     | | Bank         | Account              | /api/accounts                  | Create and list accounts, which hold a specific asset for a customers                             | | Bank         | Asset                | /api/assets                    | Get a list of assets supported by the platform (ex: BTC, ETH)                                     | | Bank         | Bank                 | /api/banks                     | Create, update and list banks, the parent to customers, accounts, etc                             | | Bank         | Customer             | /api/customers                 | Create and list customers                                                                         | | Bank         | Counterparty         | /api/counterparties            | Create and list counterparties                                                                    | | Bank         | DepositAddress       | /api/deposit_addresses         | Create, get and list deposit addresses                                                            | | Bank         | ExternalBankAccount  | /api/external_bank_accounts    | Create, get and list external bank accounts, which connect customer bank accounts to the platform | | Bank         | ExternalWallet       | /api/external_wallets          | Create, get, list and delete external wallets, which connect customer wallets to the platform     | | Bank         | IdentityVerification | /api/identity_verifications    | Create and list identity verifications, which are performed on customers for KYC                  | | Bank         | Invoice              | /api/invoices                  | Create, get, cancel and list invoices                                                             | | Bank         | PaymentInstruction   | /api/payment_instructions      | Create, get and list payment instructions for invoices                                            | | Bank         | Price                | /api/prices                    | Get the current prices for assets on the platform                                                 | | Bank         | Quote                | /api/quotes                    | Create and list quotes, which are required to execute trades                                      | | Bank         | Symbol               | /api/symbols                   | Get a list of symbols supported for trade (ex: BTC-USD)                                           | | Bank         | Trade                | /api/trades                    | Create and list trades, which buy or sell cryptocurrency                                          | | Bank         | Transfer             | /api/transfers                 | Create, get and list transfers (e.g., funding, book)                                              | | Bank         | Workflow             | /api/workflows                 | Create, get and list workflows                                                                    |  ## Understanding Object Models & Endpoints  **Organizations**  An `Organization` is meant to represent the organization partnering with Cybrid to use our platform.  An `Organization` typically does not directly interact with `customers`. Instead, an Organization has one or more `banks`, which encompass the financial service offerings of the platform.  **Banks**  A `Bank` is owned by an `Organization` and can be thought of as an environment or container for `customers` and product offerings. Banks are created in either `Sandbox` or `Production` mode, where `Sandbox` is the environment that you would test, prototype and build in prior to moving to `Production`.  An `Organization` can have multiple `banks`, in either `Sandbox` or `Production` environments. A `Sandbox Bank` will be backed by stubbed data and process flows. For instance, funding source transfer processes as well as trades will be simulated rather than performed, however asset prices are representative of real-world values. You have an unlimited amount of simulated fiat currency for testing purposes.  **Customers**  `Customers` represent your banking users on the platform. At present, we offer support for `Individuals` as Customers.  `Customers` must be verified (i.e., KYC\'d) in our system before they can play any part on the platform, which means they must have an associated and a passing `Identity Verification`. See the Identity Verifications section for more details on how a customer can be verified.  `Customers` must also have an `Account` to be able to transact, in the desired asset class. See the Accounts APIs for more details on setting up accounts for the customer. 
 *
 * The version of the OpenAPI document: v0.124.93
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
