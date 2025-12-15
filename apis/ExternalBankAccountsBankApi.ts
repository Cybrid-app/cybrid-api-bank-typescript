// tslint:disable
/**
 * Cybrid Bank API
 * # Cybrid API documentation  Welcome to Cybrid, an all-in-one crypto platform that enables you to easily **build** and **launch** white-label crypto products or services.  In these documents, you\'ll find details on how our REST API operates and generally how our platform functions.  If you\'re looking for our UI SDK Widgets for Web or Mobile (iOS/Android), generated API clients, or demo applications, head over to our [Github repo](https://github.com/Cybrid-app).  💡 We recommend bookmarking the [Cybrid LinkTree](https://linktr.ee/cybridtechnologies) which contains many helpful links to platform resources.  ## Getting Started  This is Cybrid\'s public interactive API documentation, which allows you to fully test our APIs. If you\'d like to use a different tool to exercise our APIs, you can download the [Open API 3.0 yaml](https://bank.production.cybrid.app/api/schema/v1/swagger.yaml) for import.  If you\'re new to our APIs and the Cybrid Platform, follow the below guides to get set up and familiar with the platform:  1. [Introduction](https://docs.cybrid.xyz/docs/introduction) 2. [Platform Overview](https://docs.cybrid.xyz/docs/platform-overview) 3. [Testing with Hosted Web Demo App](https://docs.cybrid.xyz/docs/hosted-demo-app)  In [Getting Started in the Cybrid Sandbox](https://docs.cybrid.xyz/docs/cybrid-sandbox), we walk you through how to use the [Cybrid Sandbox](https://id.sandbox.cybrid.app/) to create a test bank and generate API keys. In [Getting Ready for Trading](https://docs.cybrid.xyz/docs/trade-process), we walk through creating customers, customer identities, accounts, as well as executing quotes and trades.  ## Working with the Cybrid Platform  There are three primary ways you can interact with the Cybrid platform:  1. Directly via our RESTful API (this documentation) 2. Using our API clients available in a variety of languages ([Angular](https://github.com/Cybrid-app/cybrid-api-bank-angular), [Java](https://github.com/Cybrid-app/cybrid-api-bank-java), [Kotlin](https://github.com/Cybrid-app/cybrid-api-bank-kotlin), [Python](https://github.com/Cybrid-app/cybrid-api-bank-python), [Ruby](https://github.com/Cybrid-app/cybrid-api-bank-ruby), [Swift](https://github.com/Cybrid-app/cybrid-api-bank-swift) or [Typescript](https://github.com/Cybrid-app/cybrid-api-bank-typescript)) 3. Integrating a platform specific SDK ([Web](https://github.com/Cybrid-app/cybrid-sdk-web), [Android](https://github.com/Cybrid-app/cybrid-sdk-android), [iOS](https://github.com/Cybrid-app/cybrid-sdk-ios))  Our complete set of APIs allows you to manage resources across three distinct areas: your `Organization`, your `Banks` and your `Identities`. For most of your testing and interaction you\'ll be using the `Bank` API, which is where the majority of APIs reside.  *The complete set of APIs can be found on the following pages:*  | API                                                              | Description                                                 | |------------------------------------------------------------------|-------------------------------------------------------------| | [Organization API](https://organization.production.cybrid.app/api/schema/swagger-ui)   | APIs to manage organizations                                | | [Bank API](https://bank.production.cybrid.app/api/schema/swagger-ui)                   | APIs to manage banks (and all downstream customer activity) | | [Identities API](https://id.production.cybrid.app/api/schema/swagger-ui)                       | APIs to manage organization and bank identities             |  For questions please contact [Support](mailto:support@cybrid.xyz) at any time for assistance, or contact the [Product Team](mailto:product@cybrid.xyz) for product suggestions.  ## Authenticating with the API  The Cybrid Platform uses OAuth 2.0 Bearer Tokens to authenticate requests to the platform. Credentials to create `Organization` and `Bank` tokens can be generated via the [Cybrid Sandbox](https://id.production.cybrid.app). Access tokens can be generated for a `Customer` as well via the [Cybrid IdP](https://id.production.cybrid.app) as well.  An `Organization` access token applies broadly to the whole Organization and all of its `Banks`, whereas, a `Bank` access token is specific to an individual Bank. `Customer` tokens, similarly, are scoped to a specific customer in a bank.  Both `Organization` and `Bank` tokens can be created using the OAuth Client Credential Grant flow. Each Organization and Bank has its own unique `Client ID` and `Secret` that allows for machine-to-machine authentication.  A `Bank` can then generate `Customer` access tokens via API using our [Identities API](https://id.production.cybrid.app/api/schema/swagger-ui).  <font color=\"orange\">**⚠️ Never share your Client ID or Secret publicly or in your source code repository.**</font>  Your `Client ID` and `Secret` can be exchanged for a time-limited `Bearer Token` by interacting with the Cybrid Identity Provider or through interacting with the **Authorize** button in this document.  The following curl command can be used to quickly generate a `Bearer Token` for use in testing the API or demo applications.  ``` # Example request when using Bank credentials curl -X POST https://id.production.cybrid.app/oauth/token -d \'{     \"grant_type\": \"client_credentials\",     \"client_id\": \"<Your Client ID>\",     \"client_secret\": \"<Your Secret>\",     \"scope\": \"banks:read banks:write bank_applications:execute accounts:read accounts:execute counterparties:read counterparties:pii:read counterparties:write counterparties:execute customers:read customers:pii:read customers:write customers:execute prices:read quotes:execute quotes:read trades:execute trades:read transfers:execute transfers:read transfers:write external_bank_accounts:read external_bank_accounts:pii:read external_bank_accounts:write external_bank_accounts:execute external_wallets:read external_wallets:execute workflows:read workflows:execute deposit_addresses:read deposit_addresses:execute deposit_bank_accounts:read deposit_bank_accounts:execute invoices:read invoices:write invoices:execute identity_verifications:read identity_verifications:pii:read identity_verifications:write identity_verifications:execute persona_sessions:execute plans:execute plans:read executions:execute executions:read files:read files:pii:read files:execute\"   }\' -H \"Content-Type: application/json\"  # When using Organization credentials set `scope` to \'organizations:read organizations:write organization_applications:execute banks:read banks:write banks:execute bank_applications:execute users:read users:write users:execute counterparties:read counterparties:pii:read customers:read customers:pii:read accounts:read prices:read quotes:execute quotes:read trades:execute trades:read transfers:read transfers:write transfers:execute external_bank_accounts:read external_bank_accounts:pii:read external_wallets:read workflows:read deposit_addresses:read deposit_bank_accounts:read invoices:read subscriptions:read subscriptions:write subscriptions:execute subscription_events:read subscription_events:execute identity_verifications:read identity_verifications:pii:read identity_verifications:execute persona_sessions:execute plans:execute plans:read executions:execute executions:read files:read files:pii:read files:execute\' ``` <font color=\"orange\">**⚠️ Note: The above curl will create a bearer token with full scope access. Delete scopes if you\'d like to restrict access.**</font>  ## Authentication Scopes  The Cybrid platform supports the use of scopes to control the level of access a token is limited to. Scopes do not grant access to resources; instead, they provide limits, in support of the least privilege principal.  The following scopes are available on the platform and can be requested when generating either an Organization, Bank or Customer token. Generally speaking, the _Read_ scope is required to read and list resources, the _Write_ scope is required to update a resource and the _Execute_ scope is required to create a resource.  | Resource              | Read scope (Token Type)                                    | Write scope (Token Type)                      | Execute scope (Token Type)                       | |-----------------------|------------------------------------------------------------|-----------------------------------------------|--------------------------------------------------| | Account               | accounts:read (Organization, Bank, Customer)               |                                               | accounts:execute (Bank, Customer)                | | Bank                  | banks:read (Organization, Bank)                            | banks:write (Organization, Bank)              | banks:execute (Organization)                     | | Customer              | customers:read (Organization, Bank, Customer)              | customers:write (Bank, Customer)              | customers:execute (Bank)                         | | Counterparty          | counterparties:read (Organization, Bank, Customer)         | counterparties:write (Bank, Customer)         | counterparties:execute (Bank)                    | | Deposit Address       | deposit_addresses:read (Organization, Bank, Customer)      | deposit_addresses:write (Bank, Customer)      | deposit_addresses:execute (Bank, Customer)       | | External Bank Account | external_bank_accounts:read (Organization, Bank, Customer) | external_bank_accounts:write (Bank, Customer) | external_bank_accounts:execute (Bank, Customer)  | | External Wallet       | external_wallet:read (Organization, Bank, Customer)        |                                               | external_wallet:execute (Bank, Customer)         | | Organization          | organizations:read (Organization)                          | organizations:write (Organization)            |                                                  | | User                  | users:read (Organization)                                  |                                               | users:execute (Organization)                     | | Price                 | prices:read (Bank, Customer)                               |                                               |                                                  | | Quote                 | quotes:read (Organization, Bank, Customer)                 |                                               | quotes:execute (Organization, Bank, Customer)    | | Trade                 | trades:read (Organization, Bank, Customer)                 |                                               | trades:execute (Organization, Bank, Customer)    | | Transfer              | transfers:read (Organization, Bank, Customer)              |                                               | transfers:execute (Organization, Bank, Customer) | | Workflow              | workflows:read (Organization, Bank, Customer)              |                                               | workflows:execute (Bank, Customer)               | | Invoice               | invoices:read (Organization, Bank, Customer)               | invoices:write (Bank, Customer)               | invoices:execute (Bank, Customer)                |  ## Available Endpoints  The available APIs for the [Identity](https://id.production.cybrid.app/api/schema/swagger-ui), [Organization](https://organization.production.cybrid.app/api/schema/swagger-ui) and [Bank](https://bank.production.cybrid.app/api/schema/swagger-ui) API services are listed below:  | API Service  | Model                | API Endpoint Path              | Description                                                                                       | |--------------|----------------------|--------------------------------|---------------------------------------------------------------------------------------------------| | Identity     | Bank                 | /api/bank_applications         | Create and list banks                                                                             | | Identity     | CustomerToken        | /api/customer_tokens           | Create customer JWT access tokens                                                                 | | Identity     | Organization         | /api/organization_applications | Create and list organizations                                                                     | | Identity     | Organization         | /api/users                     | Create and list organization users                                                                | | Organization | Organization         | /api/organizations             | APIs to retrieve and update organization name                                                     | | Bank         | Account              | /api/accounts                  | Create and list accounts, which hold a specific asset for a customers                             | | Bank         | Asset                | /api/assets                    | Get a list of assets supported by the platform (ex: BTC, ETH)                                     | | Bank         | Bank                 | /api/banks                     | Create, update and list banks, the parent to customers, accounts, etc                             | | Bank         | Customer             | /api/customers                 | Create and list customers                                                                         | | Bank         | Counterparty         | /api/counterparties            | Create and list counterparties                                                                    | | Bank         | DepositAddress       | /api/deposit_addresses         | Create, get and list deposit addresses                                                            | | Bank         | ExternalBankAccount  | /api/external_bank_accounts    | Create, get and list external bank accounts, which connect customer bank accounts to the platform | | Bank         | ExternalWallet       | /api/external_wallets          | Create, get, list and delete external wallets, which connect customer wallets to the platform     | | Bank         | IdentityVerification | /api/identity_verifications    | Create and list identity verifications, which are performed on customers for KYC                  | | Bank         | Invoice              | /api/invoices                  | Create, get, cancel and list invoices                                                             | | Bank         | PaymentInstruction   | /api/payment_instructions      | Create, get and list payment instructions for invoices                                            | | Bank         | Price                | /api/prices                    | Get the current prices for assets on the platform                                                 | | Bank         | Quote                | /api/quotes                    | Create and list quotes, which are required to execute trades                                      | | Bank         | Symbol               | /api/symbols                   | Get a list of symbols supported for trade (ex: BTC-USD)                                           | | Bank         | Trade                | /api/trades                    | Create and list trades, which buy or sell cryptocurrency                                          | | Bank         | Transfer             | /api/transfers                 | Create, get and list transfers (e.g., funding, book)                                              | | Bank         | Workflow             | /api/workflows                 | Create, get and list workflows                                                                    |  ## Understanding Object Models & Endpoints  **Organizations**  An `Organization` is meant to represent the organization partnering with Cybrid to use our platform.  An `Organization` typically does not directly interact with `customers`. Instead, an Organization has one or more `banks`, which encompass the financial service offerings of the platform.  **Banks**  A `Bank` is owned by an `Organization` and can be thought of as an environment or container for `customers` and product offerings. Banks are created in either `Sandbox` or `Production` mode, where `Sandbox` is the environment that you would test, prototype and build in prior to moving to `Production`.  An `Organization` can have multiple `banks`, in either `Sandbox` or `Production` environments. A `Sandbox Bank` will be backed by stubbed data and process flows. For instance, funding source transfer processes as well as trades will be simulated rather than performed, however asset prices are representative of real-world values. You have an unlimited amount of simulated fiat currency for testing purposes.  **Customers**  `Customers` represent your banking users on the platform. At present, we offer support for `Individuals` as Customers.  `Customers` must be verified (i.e., KYC\'d) in our system before they can play any part on the platform, which means they must have an associated and a passing `Identity Verification`. See the Identity Verifications section for more details on how a customer can be verified.  `Customers` must also have an `Account` to be able to transact, in the desired asset class. See the Accounts APIs for more details on setting up accounts for the customer. 
 *
 * The version of the OpenAPI document: v0.125.312
 * Contact: support@cybrid.app
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import type { Observable } from 'rxjs';
import type { AjaxResponse } from 'rxjs/ajax';
import { BaseAPI, throwIfNullOrUndefined, encodeURI } from '../runtime';
import type { OperationOpts, HttpHeaders, HttpQuery } from '../runtime';
import type {
    ErrorResponseBankModel,
    ExternalBankAccountBankModel,
    ExternalBankAccountListBankModel,
    PatchExternalBankAccountBankModel,
    PostExternalBankAccountBankModel,
} from '../models';

export interface CreateExternalBankAccountRequest {
    postExternalBankAccountBankModel: PostExternalBankAccountBankModel;
}

export interface DeleteExternalBankAccountRequest {
    externalBankAccountGuid: string;
}

export interface GetExternalBankAccountRequest {
    externalBankAccountGuid: string;
    forceBalanceRefresh?: boolean;
    includeBalances?: boolean;
    includePii?: boolean;
}

export interface ListExternalBankAccountsRequest {
    page?: number;
    perPage?: number;
    guid?: string;
    bankGuid?: string;
    customerGuid?: string;
    counterpartyGuid?: string;
    asset?: string;
    state?: string;
}

export interface PatchExternalBankAccountRequest {
    externalBankAccountGuid: string;
    patchExternalBankAccountBankModel: PatchExternalBankAccountBankModel;
}

/**
 * no description
 */
export class ExternalBankAccountsBankApi extends BaseAPI {

    /**
     * Create an ExternalBankAccount.  ## Account creation  Accounts can be created for a Bank or a Customer.  To create accounts for your Bank, omit the `customer_guid` parameter in the request body. To create accounts for your Customers, include the `customer_guid` parameter in the request body.  ## State  | State | Description | |-------|-------------| | storing | The Platform is storing the external bank account details in our private store | | completed | The Platform has created the external bank account | | unverified | The external bank account is created, but it has not yet been verified | | failed | The Platform was not able to successfully create the external bank account | | refresh_required | The Platform has created the external bank account, but needs to be refreshed | | deleting | The Platform is deleting the external bank account | | deleted | The Platform has deleted the external bank account |  ## Failure codes  | Code | Description | |------|-------------| | invalid_routing_number | The provided routing number is invalid | | invalid_account_number | The account number is invalid | | invalid_account_type | The account type is invalid | | duplicate | An account with the same details already exists | | plaid_processor_token | An account could not be created due to an invalid Plaid processor token or an error with Plaid | | plaid_multiple_accounts | The supplied Plaid token is associated with multiple accounts. Must only be a single account. | | create_failed | The bank account and associated holder could not be created correctly | | unverified_counterparty | The counterparty account is unverified |    Required scope: **external_bank_accounts:execute**
     * Create ExternalBankAccount
     */
    createExternalBankAccount({ postExternalBankAccountBankModel }: CreateExternalBankAccountRequest): Observable<ExternalBankAccountBankModel>
    createExternalBankAccount({ postExternalBankAccountBankModel }: CreateExternalBankAccountRequest, opts?: OperationOpts): Observable<AjaxResponse<ExternalBankAccountBankModel>>
    createExternalBankAccount({ postExternalBankAccountBankModel }: CreateExternalBankAccountRequest, opts?: OperationOpts): Observable<ExternalBankAccountBankModel | AjaxResponse<ExternalBankAccountBankModel>> {
        throwIfNullOrUndefined(postExternalBankAccountBankModel, 'postExternalBankAccountBankModel', 'createExternalBankAccount');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', ['external_bank_accounts:execute'])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<ExternalBankAccountBankModel>({
            url: '/api/external_bank_accounts',
            method: 'POST',
            headers,
            body: postExternalBankAccountBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Deletes an external bank account.  Required scope: **external_bank_accounts:execute**
     * Delete External Bank Account
     */
    deleteExternalBankAccount({ externalBankAccountGuid }: DeleteExternalBankAccountRequest): Observable<ExternalBankAccountBankModel>
    deleteExternalBankAccount({ externalBankAccountGuid }: DeleteExternalBankAccountRequest, opts?: OperationOpts): Observable<AjaxResponse<ExternalBankAccountBankModel>>
    deleteExternalBankAccount({ externalBankAccountGuid }: DeleteExternalBankAccountRequest, opts?: OperationOpts): Observable<ExternalBankAccountBankModel | AjaxResponse<ExternalBankAccountBankModel>> {
        throwIfNullOrUndefined(externalBankAccountGuid, 'externalBankAccountGuid', 'deleteExternalBankAccount');

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', ['external_bank_accounts:execute'])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<ExternalBankAccountBankModel>({
            url: '/api/external_bank_accounts/{external_bank_account_guid}'.replace('{external_bank_account_guid}', encodeURI(externalBankAccountGuid)),
            method: 'DELETE',
            headers,
        }, opts?.responseOpts);
    };

    /**
     * Retrieves an external bank account.  ## ExternalBankAccount retrieval  When retrieving an external bank account and include_balances is set to true, the Platform will attempt to retrieve the balance from the account\'s financial institution.  If force_balance_refresh is set to true, the Platform will always attempt to retrieve the most up to date balance from the account\'s financial institution. If force_balance_refresh is set to false, the Platform will return the cached balance.  If while getting the balance the Platform determines that the account needs to be refreshed, the Platform will return a 422 status code with the message \"Bank account refresh required\" and the ExternalBankAccount will be put into the refresh_required state.  If while getting the balance the Platform determines that the account is no longer valid, the Platform will return a 422 status code with the message \"Bank account can no longer be used and is being deleted. It must be re-added\" and the ExternalBankAccount will be deleted.  When retrieving an external bank account and include_pii is set to true, the Platform will include the account holder\'s information in the response.    Required scope: **external_bank_accounts:read** Optional scope: **external_bank_accounts:pii:read**.
     * Get External Bank Account
     */
    getExternalBankAccount({ externalBankAccountGuid, forceBalanceRefresh, includeBalances, includePii }: GetExternalBankAccountRequest): Observable<ExternalBankAccountBankModel>
    getExternalBankAccount({ externalBankAccountGuid, forceBalanceRefresh, includeBalances, includePii }: GetExternalBankAccountRequest, opts?: OperationOpts): Observable<AjaxResponse<ExternalBankAccountBankModel>>
    getExternalBankAccount({ externalBankAccountGuid, forceBalanceRefresh, includeBalances, includePii }: GetExternalBankAccountRequest, opts?: OperationOpts): Observable<ExternalBankAccountBankModel | AjaxResponse<ExternalBankAccountBankModel>> {
        throwIfNullOrUndefined(externalBankAccountGuid, 'externalBankAccountGuid', 'getExternalBankAccount');

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', ['external_bank_accounts:read'])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        const query: HttpQuery = {};

        if (forceBalanceRefresh != null) { query['force_balance_refresh'] = forceBalanceRefresh; }
        if (includeBalances != null) { query['include_balances'] = includeBalances; }
        if (includePii != null) { query['include_pii'] = includePii; }

        return this.request<ExternalBankAccountBankModel>({
            url: '/api/external_bank_accounts/{external_bank_account_guid}'.replace('{external_bank_account_guid}', encodeURI(externalBankAccountGuid)),
            method: 'GET',
            headers,
            query,
        }, opts?.responseOpts);
    };

    /**
     * Retrieves a listing of external bank accounts. Records are sorted by creation date in descending order.  Required scope: **external_bank_accounts:read**
     * Get external bank accounts list
     */
    listExternalBankAccounts({ page, perPage, guid, bankGuid, customerGuid, counterpartyGuid, asset, state }: ListExternalBankAccountsRequest): Observable<ExternalBankAccountListBankModel>
    listExternalBankAccounts({ page, perPage, guid, bankGuid, customerGuid, counterpartyGuid, asset, state }: ListExternalBankAccountsRequest, opts?: OperationOpts): Observable<AjaxResponse<ExternalBankAccountListBankModel>>
    listExternalBankAccounts({ page, perPage, guid, bankGuid, customerGuid, counterpartyGuid, asset, state }: ListExternalBankAccountsRequest, opts?: OperationOpts): Observable<ExternalBankAccountListBankModel | AjaxResponse<ExternalBankAccountListBankModel>> {

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', ['external_bank_accounts:read'])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        const query: HttpQuery = {};

        if (page != null) { query['page'] = page; }
        if (perPage != null) { query['per_page'] = perPage; }
        if (guid != null) { query['guid'] = guid; }
        if (bankGuid != null) { query['bank_guid'] = bankGuid; }
        if (customerGuid != null) { query['customer_guid'] = customerGuid; }
        if (counterpartyGuid != null) { query['counterparty_guid'] = counterpartyGuid; }
        if (asset != null) { query['asset'] = asset; }
        if (state != null) { query['state'] = state; }

        return this.request<ExternalBankAccountListBankModel>({
            url: '/api/external_bank_accounts',
            method: 'GET',
            headers,
            query,
        }, opts?.responseOpts);
    };

    /**
     * Patch an external bank account.  Required scope: **external_bank_accounts:write**
     * Patch ExternalBankAccount
     */
    patchExternalBankAccount({ externalBankAccountGuid, patchExternalBankAccountBankModel }: PatchExternalBankAccountRequest): Observable<ExternalBankAccountBankModel>
    patchExternalBankAccount({ externalBankAccountGuid, patchExternalBankAccountBankModel }: PatchExternalBankAccountRequest, opts?: OperationOpts): Observable<AjaxResponse<ExternalBankAccountBankModel>>
    patchExternalBankAccount({ externalBankAccountGuid, patchExternalBankAccountBankModel }: PatchExternalBankAccountRequest, opts?: OperationOpts): Observable<ExternalBankAccountBankModel | AjaxResponse<ExternalBankAccountBankModel>> {
        throwIfNullOrUndefined(externalBankAccountGuid, 'externalBankAccountGuid', 'patchExternalBankAccount');
        throwIfNullOrUndefined(patchExternalBankAccountBankModel, 'patchExternalBankAccountBankModel', 'patchExternalBankAccount');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', ['external_bank_accounts:write'])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<ExternalBankAccountBankModel>({
            url: '/api/external_bank_accounts/{external_bank_account_guid}'.replace('{external_bank_account_guid}', encodeURI(externalBankAccountGuid)),
            method: 'PATCH',
            headers,
            body: patchExternalBankAccountBankModel,
        }, opts?.responseOpts);
    };

}
