// tslint:disable
/**
 * Cybrid Bank API
 * # Cybrid API documentation  Welcome to Cybrid, an all-in-one crypto platform that enables you to easily **build** and **launch** white-lable crypto products or services.  In these documents, you\'ll find details on how our REST API operates and generally how our platform functions.  If you\'re looking for our UI SDK Widgets for Web or Mobile (iOS/Android), generated API clients, or demo applications, head over to our [Github repo](https://github.com/Cybrid-app).  💡 We recommend bookmarking the [Cybrid LinkTree](https://linktr.ee/cybridtechnologies) which contains many helpful links to platform resources.  ## Getting Started  This is Cybrid\'s public interactive API documentation, which allows you to fully test our API\'s. If you\'d like to use a different tool to exercise our API\'s, you can download the [Open API 3.0 yaml](https://bank.demo.cybrid.app/api/schema/v1/swagger.yaml) for import.  If you\'re new to our API\'s and the Cybrid Platform, follow the below guides to get set up and familiar with the platform:  1. [Getting Started in the Cybrid Sandbox](https://www.cybrid.xyz/guides/getting-started) 2. [Getting Ready for Trading](https://www.cybrid.xyz/guides/getting-ready-for-trading) 3. [Running the Web Demo App](https://www.cybrid.xyz/guides/running-the-cybrid-web-demo-crypto-app) (or, alternatively, [Testing with Hosted Web Demo App](https://www.cybrid.xyz/guides/testing-with-the-web-demo-crypo-app))  In [Getting Started in the Cybrid Sandbox](https://www.cybrid.xyz/guides/getting-started), we walk you through how to use the [Cybrid Sandbox](https://id.demo.cybrid.app/) to create a test bank, generate API keys, and set banks fees. In [Getting Ready for Trading](https://www.cybrid.xyz/guides/getting-ready-for-trading), we walk through creating customers, customer identities, accounts, as well as executing quotes and trades.  If you\'ve already run through the first two guides, you can follow the [Running the Web Demo App](https://www.cybrid.xyz/guides/running-the-cybrid-web-demo-crypto-app) guide to test our web SDK with your sandbox `bank` and `customer`.  ## Working with the Cybrid Platform  There are three primary ways you can interact with the Cybrid platform:  1. Directly via our RESTful API (this documentation) 2. Using our API Clients available in a variety of languages ([Angular](https://github.com/Cybrid-app/cybrid-api-bank-angular), [Java](https://github.com/Cybrid-app/cybrid-api-bank-java), [Kotlin](https://github.com/Cybrid-app/cybrid-api-bank-kotlin), [Python](https://github.com/Cybrid-app/cybrid-api-bank-python), [Ruby](https://github.com/Cybrid-app/cybrid-api-bank-ruby), [Swift](https://github.com/Cybrid-app/cybrid-api-bank-swift) or [Typescript](https://github.com/Cybrid-app/cybrid-api-bank-typescript)) 3. Integrating a platform specific SDK ([Web](https://github.com/Cybrid-app/cybrid-sdk-web), [Android](https://github.com/Cybrid-app/cybrid-sdk-android), Apple-coming soon)  Our complete set of APIs allows you to manage resources across three distinct areas: your `Organization`, your `Banks` and your `Identities`. For most of your testing and interaction you\'ll be using the `Bank` API, which is where the majority of API\'s reside.  *The complete set of APIs can be found on the following pages:*  | API                                                            | Description                  | |----------------------------------------------------------------|------------------------------| | [Organization API](https://organization.demo.cybrid.app/api/schema/swagger-ui) | APIs to manage organizations | | [Bank API](https://bank.demo.cybrid.app/api/schema/swagger-ui)                 | APIs to manage banks (and all downstream customer activity)        | | [Identities API](https://id.demo.cybrid.app/api/schema/swagger-ui)                     | APIs to manage organization and bank identities    |  For questions please contact [Support](mailto:support@cybrid.xyz) at any time for assistance, or contact the [Product Team](mailto:product@cybrid.xyz) for product suggestions.  ## Authenticating with the API  The Cybrid Platform uses OAuth 2.0 Bearer Tokens to authenticate requests to the platform. Credentials to create `Organization` and `Bank` tokens can be generated via the [Cybrid Sandbox](https://id.demo.cybrid.app).  An `Organization` Token applies broadly to the whole Organization and all of its `Banks`, whereas, a `Bank` Token is specific to an individual Bank.  Both `Organization` and `Bank` tokens can be created using the OAuth Client Credential Grant flow. Each Organization and Bank has its own unique `Client ID` and `Secret` that allows for machine-to-machine authentication.  <font color=\"orange\">**⚠️ Never share your Client ID or Secret publicly or in your source code repository.**</font>  Your `Client ID` and `Secret` can be exchanged for a time-limited `Bearer Token` by interacting with the Cybrid Identity Provider or through interacting with the **Authorize** button in this document.  The following curl command can be used to quickly generate a `bearer token` for use in testing the API or demo applications.  ``` curl -X POST https://id.demo.cybrid.app/oauth/token -d \'{     \"grant_type\": \"client_credentials\",     \"client_id\": \"<Your Client ID>\",     \"client_secret\": \"<Your Secret>\",     \"scope\": \"banks:read banks:write accounts:read accounts:execute customers:read customers:write customers:execute prices:read quotes:execute trades:execute trades:read\"   }\' -H \"Content-Type: application/json\" ``` <font color=\"orange\">**⚠️ Note: The above curl will create a bearer token with full scope access. Delete scopes if you\'d like to restrict access.**</font>  ## Authentication Scopes  The Cybrid platform supports the use of scopes to control the level of access a token is limited to. Scopes do not grant access to resources; instead, they provide limits, in support of the least privilege principal.  The following scopes are available on the platform and can be requested when generating either an Organization or a Bank token. Generally speaking, the _Read_ scope is required to read and list resources, the _Write_ scope is required to update a resource and the _Execute_ scope is required to create a resource.  | Resource      | Read scope         | Write scope          | Execute scope     | Token Type         | |---------------|--------------------|----------------------|-------------------|--------------------| | Organizations | organizations:read | organizations:write  |                   | Organization/ Bank | | Banks         | banks:read         | banks:write          | banks:execute     | Organization/ Bank | | Customers     | customers:read     | customers:write      | customers:execute | Bank               | | Assets        | prices:read        |                      |                   | Bank               | | Accounts      | accounts:read      |                      | accounts:execute  | Bank               | | Prices        | prices:read        |                      |                   | Bank               | | Symbols       | prices:read        |                      |                   | Bank               | | Quotes        | quotes:read        |                      | quotes:execute    | Bank               | | Trades        | trades:read        |                      | trades:execute    | Bank               | | Rewards       | rewards:read       |                      | rewards:execute   | Bank               |  ## Available Endpoints  The available API\'s for the [Identity](https://id.demo.cybrid.app/api/schema/swagger-ui), [Organization](https://organization.demo.cybrid.app/api/schema/swagger-ui) and [Bank](https://bank.demo.cybrid.app/api/schema/swagger-ui) API services are listed below:  | API Sevice   | Model            | API Endpoint Path              | Description                                                               | | ------------ | ---------------- | ------------------------------ | ------------------------------------------------------------------------- | | Identity     | Bank             | /api/bank_applications         | Create and list banks                                                     | | Identity     | Organization     | /api/organization_applications | Create and list organizations                                             | | Organization | Organization     | /api/organizations             | API\'s to retrieve and update organization name                            | | Bank         | Asset            | /api/assets                    | Get a list of assets supported by the platform (ex: BTC, ETH)             | | Bank         | VerificationKey  | /api/bank_verification_keys    | Create, list and retrive verification keys, used for signing identities   | | Bank         | Banks            | /api/banks                     | Create, update and list banks, the parent to customers, accounts, etc     | | Bank         | FeeConfiguration | /api/fee_configurations        | Create and list bank fees (spread or fixed)                               | | Bank         | Customers        | /api/customers                 | Create and list customers                                                 | | Bank         | IdentityRecord   | /api/identity_records          | Create and list identity records, which are attached to customers for KYC | | Bank         | Accounts         | /api/accounts                  | Create and list accounts, which hold a specific asset for a customers     | | Bank         | Symbols          | /api/symbols                   | Get a list of symbols supported for trade (ex: BTC-USD)                   | | Bank         | Prices           | /api/prices                    | Get the current prices for assets on the platform                         | | Bank         | Quotes           | /api/quotes                    | Create and list quotes, which are required to execute trades              | | Bank         | Trades           | /api/trades                    | Create and list trades, which buy or sell cryptocurrency                  | | Bank         | Rewards          | /api/rewards                   | Create a new reward (automates quote/trade for simplicity)                |  ## Understanding Object Models & Endpoints  **Organizations**  An `Organization` is meant to represent the organization partnering with Cybrid to use our platform.  An `Organization` does not directly interact with `customers`. Instead, an Organization has one or more `banks`, which encompass the financial service offerings of the platform.  **Banks**  A `Bank` is owned by an `Organization` and can be thought of as an environment or container for `Customers` and product offerings. Banks are created in either `Sandbox` or `Production` mode, where Sandbox is the environment that you would test, prototype and build in prior to production.  An `Organization` can have multiple `banks`, in either sandbox or production environments. A sandbox Bank will be backed by stubbed data and process flows. For instance, funding source processes will be simulated rather than performed, however asset prices are representative of real-world values. You have an unlimited amout of simulated fiat currency for testing purposes.  ## Customers  `Customers` represent your banking users on the platform. At present, we offer support for `Individuals` as Customers.  `Customers` must be verified in our system before they can play any part on the platform, which means they must have an associated and valid `Identity Record`. See the Identity Records section for more details on how a customer can be verified.  `Customers` must also have an `account` to be able to transact, in the desired asset class. See the Accounts APIs for more details on setting up accounts for the customer. 
 *
 * The version of the OpenAPI document: v0.37.26
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
    PostVerificationKeyBankModel,
    VerificationKeyBankModel,
    VerificationKeyListBankModel,
} from '../models';

export interface CreateVerificationKeyRequest {
    postVerificationKeyBankModel: PostVerificationKeyBankModel;
}

export interface GetVerificationKeyRequest {
    verificationKeyGuid: string;
}

export interface ListVerificationKeysRequest {
    page?: number;
    perPage?: number;
}

/**
 * no description
 */
export class VerificationKeysBankApi extends BaseAPI {

    /**
     * Creates a verification key.   Example code (python) for generating a Verification Key  ```python import base64  from cryptography.hazmat.primitives import hashes from cryptography.hazmat.primitives import serialization from cryptography.hazmat.primitives.asymmetric import padding from cryptography.hazmat.primitives.asymmetric import rsa  nonce = \"wen moon\" private_key = rsa.generate_private_key(public_exponent=65537, key_size=2048) signature = base64.b64encode(private_key.sign(     data=nonce.encode(\'ascii\'), padding=padding.PKCS1v15(), algorithm=hashes.SHA512())).decode(\'ascii\') public_key = base64.b64encode(private_key.public_key().public_bytes(     encoding=serialization.Encoding.DER, format=serialization.PublicFormat.SubjectPublicKeyInfo)).decode(\'ascii\')  ### DISCLAIMER:- Since NO ENCRYPTION is used in the key storage/formatting. Please DO NOT use this code in production environment. private_pem = private_key.private_bytes(encoding=serialization.Encoding.PEM, format=serialization.PrivateFormat.TraditionalOpenSSL,        encryption_algorithm=serialization.NoEncryption())  ## Store the private_key in a file verification_key.pem with open (\"verification_key.pem\", \'wb\') as pem_out:    pem_out.write(private_pem)    pem_out.close()  print(\"Public Key: \", public_key) print(\"Signature: \", signature)  ````  ## State  | State | Description | |-------|-------------| | storing | The Platform is storing the verification in our private key store | | pending | The Platform is verifying the verification key\'s signature | | verified | The Platform has verified the verification key\'s signature and the key can be used | | failed | The Platform was not able to verify the verification key\'s signature and the key cannot be used |    Required scope: **banks:write**
     * Create VerificationKey
     */
    createVerificationKey({ postVerificationKeyBankModel }: CreateVerificationKeyRequest): Observable<VerificationKeyBankModel>
    createVerificationKey({ postVerificationKeyBankModel }: CreateVerificationKeyRequest, opts?: OperationOpts): Observable<AjaxResponse<VerificationKeyBankModel>>
    createVerificationKey({ postVerificationKeyBankModel }: CreateVerificationKeyRequest, opts?: OperationOpts): Observable<VerificationKeyBankModel | AjaxResponse<VerificationKeyBankModel>> {
        throwIfNullOrUndefined(postVerificationKeyBankModel, 'postVerificationKeyBankModel', 'createVerificationKey');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', ['banks:write'])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<VerificationKeyBankModel>({
            url: '/api/bank_verification_keys',
            method: 'POST',
            headers,
            body: postVerificationKeyBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Retrieves a verification key.  Required scope: **banks:read**
     * Get VerificationKey
     */
    getVerificationKey({ verificationKeyGuid }: GetVerificationKeyRequest): Observable<VerificationKeyBankModel>
    getVerificationKey({ verificationKeyGuid }: GetVerificationKeyRequest, opts?: OperationOpts): Observable<AjaxResponse<VerificationKeyBankModel>>
    getVerificationKey({ verificationKeyGuid }: GetVerificationKeyRequest, opts?: OperationOpts): Observable<VerificationKeyBankModel | AjaxResponse<VerificationKeyBankModel>> {
        throwIfNullOrUndefined(verificationKeyGuid, 'verificationKeyGuid', 'getVerificationKey');

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', ['banks:read'])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<VerificationKeyBankModel>({
            url: '/api/bank_verification_keys/{verification_key_guid}'.replace('{verification_key_guid}', encodeURI(verificationKeyGuid)),
            method: 'GET',
            headers,
        }, opts?.responseOpts);
    };

    /**
     * Retrieves a listing of verification keys of a bank.  Required scope: **banks:read**
     * Get Verification Keys list
     */
    listVerificationKeys({ page, perPage }: ListVerificationKeysRequest): Observable<VerificationKeyListBankModel>
    listVerificationKeys({ page, perPage }: ListVerificationKeysRequest, opts?: OperationOpts): Observable<AjaxResponse<VerificationKeyListBankModel>>
    listVerificationKeys({ page, perPage }: ListVerificationKeysRequest, opts?: OperationOpts): Observable<VerificationKeyListBankModel | AjaxResponse<VerificationKeyListBankModel>> {

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', ['banks:read'])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        const query: HttpQuery = {};

        if (page != null) { query['page'] = page; }
        if (perPage != null) { query['per_page'] = perPage; }

        return this.request<VerificationKeyListBankModel>({
            url: '/api/bank_verification_keys',
            method: 'GET',
            headers,
            query,
        }, opts?.responseOpts);
    };

}
