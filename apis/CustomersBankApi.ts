// tslint:disable
/**
 * Cybrid Bank API
 * # Welcome  Welcome to the Cybrid platform; enabling turnkey crypto banking services!  In these documents, you will find information on the operations provided by our platform, as well as details on how our REST API operates more generally.  Our complete set of APIs allows you to manage all your resources: your Organization, your banks and your identities. The complete set of APIs can be found on the following pages:  | API                                                            | Description                  | |----------------------------------------------------------------|------------------------------| | [Organization API](https://organization.demo.cybrid.app/api/schema/swagger-ui) | APIs to manage organizations | | [Bank API](https://bank.demo.cybrid.app/api/schema/swagger-ui)                 | APIs to manage banks         | | [Identities API](https://id.demo.cybrid.app/api/schema/swagger-ui)                     | APIs to manage identities    |  When you\'re ready, [request access](https://www.cybrid.xyz/access) to your Dashboard to view and administer your Organization. Once you\'ve logged in, you can begin creating Banks, either for sandbox or production usage, and start enabling your customers to leverage DeFi and web3 with confidence.  If you have any questions, please contact [Support](mailto:support@cybrid.app) at any time so that we can help.  ## Authentication  The Cybrid Platform uses OAuth 2.0 Bearer Tokens to authenticate requests to the platform. Credentials to create Organization and Bank tokens can be generated via your Dashboard ([request access](https://www.cybrid.xyz/access)).  An Organization Token applies broadly to the whole Organization and all of its Banks, whereas, a Bank Token is specific to an individual Bank.  Both Organization and Bank tokens can be created using the OAuth Client Credential Grant flow. Each Organization and Bank has its own unique Client ID and Secret that allows for machine-to-machine authentication.  **Never share your Client ID or Secret publicly or in your source code repository**  Your Client ID and Secret can be exchanged for a time-limited Bearer Token by interacting with the Cybrid Identity Provider or through interacting with the **Authorize** button in this document:  ``` curl -X POST https://id.demo.cybrid.app/oauth/token -d \'{     \"grant_type\": \"client_credentials\",     \"client_id\": \"<Your Client ID>\",     \"client_secret\": \"<Your Secret>\",     \"scope\": \"<Your requested scopes -- space separated>\"   }\' -H \"Content-Type: application/json\" ```  ## Scopes  The Cybrid platform supports the use of scopes to control the level of access a token is limited to. Scopes do not grant access to resources; instead, they provide limits, in support of the least privilege principal.  The following scopes are available on the platform and can be requested when generating either an Organization or a Bank token. Generally speaking, the _Read_ scope is required to read and list resources, the _Write_ scope is required to update a resource and the _Execute_ scope is required to create a resource.  | Resource      | Read scope         | Write scope          | Execute scope     | Token Type         | |---------------|--------------------|----------------------|-------------------|--------------------| | Organizations | organizations:read | organizations:write  |                   | Organization/ Bank | | Banks         | banks:read         | banks:write          | banks:execute     | Organization/ Bank | | Customers     | customers:read     | customers:write      | customers:execute | Bank               | | Assets        | prices:read        |                      |                   | Bank               | | Accounts      | accounts:read      |                      | accounts:execute  | Bank               | | Prices        | prices:read        |                      |                   | Bank               | | Symbols       | prices:read        |                      |                   | Bank               | | Quotes        | quotes:read        |                      | quotes:execute    | Bank               | | Trades        | trades:read        |                      | trades:execute    | Bank               | | Rewards       | rewards:read       |                      | rewards:execute   | Bank               |  ## Organizations  An Organization is meant to model the organization partnering with Cybrid to use our platform.  An Organization does not directly interact with customers. Instead, an Organization has one or more banks, which encompass the financial service offerings of the platform.  ## Banks  A Bank is owned by an Organization and can be thought of as an environment or container for Customers and product offerings. An example of a Bank would be your customer facing banking website, or an internal staging environment for testing and integration.  An Organization can have multiple banks, in sandbox or production environments. A sandbox Bank will be backed by stubbed data and process flows. For instance, identity record and funding source processes will be simulated rather than performed.  ## Customers  Customers represent your banking users on the platform. At present, we offer support for Individuals as Customers.  Customers must be verified in our system before they can play any part on the platform. See the Identity Records section for more details on how a customer can be verified.  Customers must also have an account to be able to transact. See the Accounts APIs for more details on setting up accounts for the customer. 
 *
 * The version of the OpenAPI document: v0.34.32
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
    CustomerBankModel,
    CustomerListBankModel,
    ErrorResponseBankModel,
    PostCustomerBankModel,
} from '../models';

export interface CreateCustomerRequest {
    postCustomerBankModel: PostCustomerBankModel;
}

export interface GetCustomerRequest {
    customerGuid: string;
}

export interface ListCustomersRequest {
    page?: number;
    perPage?: number;
    bankGuid?: string;
    guid?: string;
}

/**
 * no description
 */
export class CustomersBankApi extends BaseAPI {

    /**
     * Creates a customer.  ## Customer Type  Customer resources are an abstraction for real world individuals and businesses on the Cybrid Platform and are used throughout the platform to perform high level operations, e.g., create a quote, execute a trade, etc..  Customers can have additional resources attached to them, e.g., identity records, accounts, etc.  At present, Customer\'s can be created with type `individual`.    Required scope: **customers:execute**
     * Create Customer
     */
    createCustomer({ postCustomerBankModel }: CreateCustomerRequest): Observable<CustomerBankModel>
    createCustomer({ postCustomerBankModel }: CreateCustomerRequest, opts?: OperationOpts): Observable<AjaxResponse<CustomerBankModel>>
    createCustomer({ postCustomerBankModel }: CreateCustomerRequest, opts?: OperationOpts): Observable<CustomerBankModel | AjaxResponse<CustomerBankModel>> {
        throwIfNullOrUndefined(postCustomerBankModel, 'postCustomerBankModel', 'createCustomer');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', ['customers:execute'])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<CustomerBankModel>({
            url: '/api/customers',
            method: 'POST',
            headers,
            body: postCustomerBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Retrieves a customer.  Required scope: **customers:read**
     * Get Customer
     */
    getCustomer({ customerGuid }: GetCustomerRequest): Observable<CustomerBankModel>
    getCustomer({ customerGuid }: GetCustomerRequest, opts?: OperationOpts): Observable<AjaxResponse<CustomerBankModel>>
    getCustomer({ customerGuid }: GetCustomerRequest, opts?: OperationOpts): Observable<CustomerBankModel | AjaxResponse<CustomerBankModel>> {
        throwIfNullOrUndefined(customerGuid, 'customerGuid', 'getCustomer');

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', ['customers:read'])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<CustomerBankModel>({
            url: '/api/customers/{customer_guid}'.replace('{customer_guid}', encodeURI(customerGuid)),
            method: 'GET',
            headers,
        }, opts?.responseOpts);
    };

    /**
     * Retrieves a listing of customers.  Required scope: **customers:read**
     * Get customers list
     */
    listCustomers({ page, perPage, bankGuid, guid }: ListCustomersRequest): Observable<CustomerListBankModel>
    listCustomers({ page, perPage, bankGuid, guid }: ListCustomersRequest, opts?: OperationOpts): Observable<AjaxResponse<CustomerListBankModel>>
    listCustomers({ page, perPage, bankGuid, guid }: ListCustomersRequest, opts?: OperationOpts): Observable<CustomerListBankModel | AjaxResponse<CustomerListBankModel>> {

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', ['customers:read'])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        const query: HttpQuery = {};

        if (page != null) { query['page'] = page; }
        if (perPage != null) { query['per_page'] = perPage; }
        if (bankGuid != null) { query['bank_guid'] = bankGuid; }
        if (guid != null) { query['guid'] = guid; }

        return this.request<CustomerListBankModel>({
            url: '/api/customers',
            method: 'GET',
            headers,
            query,
        }, opts?.responseOpts);
    };

}
