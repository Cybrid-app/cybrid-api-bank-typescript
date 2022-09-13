// tslint:disable
/**
 * Cybrid Bank API
 * # Cybrid API documentation  Welcome to Cybrid, an all-in-one crypto platform that enables you to easily **build** and **launch** white-lable crypto products or services.  In these documents, you\'ll find details on how our REST API operates and generally how our platform functions.  If you\'re looking for our UI SDK Widgets for Web or Mobile (iOS/Android), generated API clients, or demo applications, head over to our [Github repo](https://github.com/Cybrid-app).  💡 We recommend bookmarking the [Cybrid LinkTree](https://linktr.ee/cybridtechnologies) which contains many helpful links to platform resources.  ## Getting Started  This is Cybrid\'s public interactive API documentation, which allows you to fully test our API\'s. If you\'d like to use a different tool to exercise our API\'s, you can download the [Open API 3.0 yaml](https://bank.demo.cybrid.app/api/schema/v1/swagger.yaml) for import.  If you\'re new to our API\'s and the Cybrid Platform, follow the below guides to get set up and familiar with the platform:  1. [Getting Started in the Cybrid Sandbox](https://www.cybrid.xyz/guides/getting-started) 2. [Getting Ready for Trading](https://www.cybrid.xyz/guides/getting-ready-for-trading) 3. [Running the Web Demo App](https://www.cybrid.xyz/guides/running-the-cybrid-web-demo-crypto-app) (or, alternatively, [Testing with Hosted Web Demo App](https://www.cybrid.xyz/guides/testing-with-the-web-demo-crypo-app))  In [Getting Started in the Cybrid Sandbox](https://www.cybrid.xyz/guides/getting-started), we walk you through how to use the [Cybrid Sandbox](https://id.demo.cybrid.app/) to create a test bank, generate API keys, and set banks fees. In [Getting Ready for Trading](https://www.cybrid.xyz/guides/getting-ready-for-trading), we walk through creating customers, customer identities, accounts, as well as executing quotes and trades.  If you\'ve already run through the first two guides, you can follow the [Running the Web Demo App](https://www.cybrid.xyz/guides/running-the-cybrid-web-demo-crypto-app) guide to test our web SDK with your sandbox `bank` and `customer`.  ## Working with the Cybrid Platform  There are three primary ways you can interact with the Cybrid platform:  1. Directly via our RESTful API (this documentation) 2. Using our API Clients available in a variety of languages ([Angular](https://github.com/Cybrid-app/cybrid-api-bank-angular), [Java](https://github.com/Cybrid-app/cybrid-api-bank-java), [Kotlin](https://github.com/Cybrid-app/cybrid-api-bank-kotlin), [Python](https://github.com/Cybrid-app/cybrid-api-bank-python), [Ruby](https://github.com/Cybrid-app/cybrid-api-bank-ruby), [Swift](https://github.com/Cybrid-app/cybrid-api-bank-swift) or [Typescript](https://github.com/Cybrid-app/cybrid-api-bank-typescript)) 3. Integrating a platform specific SDK ([Web](https://github.com/Cybrid-app/cybrid-sdk-web), [Android](https://github.com/Cybrid-app/cybrid-sdk-android), Apple-coming soon)  Our complete set of APIs allows you to manage resources across three distinct areas: your `Organization`, your `Banks` and your `Identities`. For most of your testing and interaction you\'ll be using the `Bank` API, which is where the majority of API\'s reside.  *The complete set of APIs can be found on the following pages:*  | API                                                            | Description                  | |----------------------------------------------------------------|------------------------------| | [Organization API](https://organization.demo.cybrid.app/api/schema/swagger-ui) | APIs to manage organizations | | [Bank API](https://bank.demo.cybrid.app/api/schema/swagger-ui)                 | APIs to manage banks (and all downstream customer activity)        | | [Identities API](https://id.demo.cybrid.app/api/schema/swagger-ui)                     | APIs to manage organization and bank identities    |  For questions please contact [Support](mailto:support@cybrid.xyz) at any time for assistance, or contact the [Product Team](mailto:product@cybrid.xyz) for product suggestions.  ## Authenticating with the API  The Cybrid Platform uses OAuth 2.0 Bearer Tokens to authenticate requests to the platform. Credentials to create `Organization` and `Bank` tokens can be generated via the [Cybrid Sandbox](https://id.demo.cybrid.app).  An `Organization` Token applies broadly to the whole Organization and all of its `Banks`, whereas, a `Bank` Token is specific to an individual Bank.  Both `Organization` and `Bank` tokens can be created using the OAuth Client Credential Grant flow. Each Organization and Bank has its own unique `Client ID` and `Secret` that allows for machine-to-machine authentication.  <font color=\"orange\">**⚠️ Never share your Client ID or Secret publicly or in your source code repository.**</font>  Your `Client ID` and `Secret` can be exchanged for a time-limited `Bearer Token` by interacting with the Cybrid Identity Provider or through interacting with the **Authorize** button in this document.  The following curl command can be used to quickly generate a `bearer token` for use in testing the API or demo applications.  ``` curl -X POST https://id.demo.cybrid.app/oauth/token -d \'{     \"grant_type\": \"client_credentials\",     \"client_id\": \"<Your Client ID>\",     \"client_secret\": \"<Your Secret>\",     \"scope\": \"banks:read banks:write accounts:read accounts:execute customers:read customers:write customers:execute prices:read quotes:execute trades:execute trades:read\"   }\' -H \"Content-Type: application/json\" ``` <font color=\"orange\">**⚠️ Note: The above curl will create a bearer token with full scope access. Delete scopes if you\'d like to restrict access.**</font>  ## Authentication Scopes  The Cybrid platform supports the use of scopes to control the level of access a token is limited to. Scopes do not grant access to resources; instead, they provide limits, in support of the least privilege principal.  The following scopes are available on the platform and can be requested when generating either an Organization or a Bank token. Generally speaking, the _Read_ scope is required to read and list resources, the _Write_ scope is required to update a resource and the _Execute_ scope is required to create a resource.  | Resource      | Read scope         | Write scope          | Execute scope     | Token Type         | |---------------|--------------------|----------------------|-------------------|--------------------| | Organizations | organizations:read | organizations:write  |                   | Organization/ Bank | | Banks         | banks:read         | banks:write          | banks:execute     | Organization/ Bank | | Customers     | customers:read     | customers:write      | customers:execute | Bank               | | Assets        | prices:read        |                      |                   | Bank               | | Accounts      | accounts:read      |                      | accounts:execute  | Bank               | | Prices        | prices:read        |                      |                   | Bank               | | Symbols       | prices:read        |                      |                   | Bank               | | Quotes        | quotes:read        |                      | quotes:execute    | Bank               | | Trades        | trades:read        |                      | trades:execute    | Bank               | | Rewards       | rewards:read       |                      | rewards:execute   | Bank               |  ## Available Endpoints  The available API\'s for the [Identity](https://id.demo.cybrid.app/api/schema/swagger-ui), [Organization](https://organization.demo.cybrid.app/api/schema/swagger-ui) and [Bank](https://bank.demo.cybrid.app/api/schema/swagger-ui) API services are listed below:  | API Sevice   | Model            | API Endpoint Path              | Description                                                               | | ------------ | ---------------- | ------------------------------ | ------------------------------------------------------------------------- | | Identity     | Bank             | /api/bank_applications         | Create and list banks                                                     | | Identity     | Organization     | /api/organization_applications | Create and list organizations                                             | | Organization | Organization     | /api/organizations             | API\'s to retrieve and update organization name                            | | Bank         | Asset            | /api/assets                    | Get a list of assets supported by the platform (ex: BTC, ETH)             | | Bank         | VerificationKey  | /api/bank_verification_keys    | Create, list and retrive verification keys, used for signing identities   | | Bank         | Banks            | /api/banks                     | Create, update and list banks, the parent to customers, accounts, etc     | | Bank         | FeeConfiguration | /api/fee_configurations        | Create and list bank fees (spread or fixed)                               | | Bank         | Customers        | /api/customers                 | Create and list customers                                                 | | Bank         | IdentityRecord   | /api/identity_records          | Create and list identity records, which are attached to customers for KYC | | Bank         | Accounts         | /api/accounts                  | Create and list accounts, which hold a specific asset for a customers     | | Bank         | Symbols          | /api/symbols                   | Get a list of symbols supported for trade (ex: BTC-USD)                   | | Bank         | Prices           | /api/prices                    | Get the current prices for assets on the platform                         | | Bank         | Quotes           | /api/quotes                    | Create and list quotes, which are required to execute trades              | | Bank         | Trades           | /api/trades                    | Create and list trades, which buy or sell cryptocurrency                  | | Bank         | Rewards          | /api/rewards                   | Create a new reward (automates quote/trade for simplicity)                |  ## Understanding Object Models & Endpoints  **Organizations**  An `Organization` is meant to represent the organization partnering with Cybrid to use our platform.  An `Organization` does not directly interact with `customers`. Instead, an Organization has one or more `banks`, which encompass the financial service offerings of the platform.  **Banks**  A `Bank` is owned by an `Organization` and can be thought of as an environment or container for `Customers` and product offerings. Banks are created in either `Sandbox` or `Production` mode, where Sandbox is the environment that you would test, prototype and build in prior to production.  An `Organization` can have multiple `banks`, in either sandbox or production environments. A sandbox Bank will be backed by stubbed data and process flows. For instance, funding source processes will be simulated rather than performed, however asset prices are representative of real-world values. You have an unlimited amout of simulated fiat currency for testing purposes.  ## Customers  `Customers` represent your banking users on the platform. At present, we offer support for `Individuals` as Customers.  `Customers` must be verified in our system before they can play any part on the platform, which means they must have an associated and valid `Identity Record`. See the Identity Records section for more details on how a customer can be verified.  `Customers` must also have an `account` to be able to transact, in the desired asset class. See the Accounts APIs for more details on setting up accounts for the customer. 
 *
 * The version of the OpenAPI document: v0.37.46
 * Contact: support@cybrid.app
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

/**
 * @export
 * @interface TradeBankModel
 */
export interface TradeBankModel {
    /**
     * Auto-generated unique identifier for the trade.
     * @type {string}
     * @memberof TradeBankModel
     */
    guid?: string;
    /**
     * The associated customer\'s identifier.
     * @type {string}
     * @memberof TradeBankModel
     */
    customer_guid?: string;
    /**
     * The associated quote\'s identifier.
     * @type {string}
     * @memberof TradeBankModel
     */
    quote_guid?: string;
    /**
     * The trade symbol the pricing is related to. Format is asset-counter_asset, e.g., BTC-USD.
     * @type {string}
     * @memberof TradeBankModel
     */
    symbol?: string;
    /**
     * The direction of the quote: either \'buy\' or \'sell\'.
     * @type {string}
     * @memberof TradeBankModel
     */
    side?: TradeBankModelSideEnum;
    /**
     * The trade\'s state
     * @type {string}
     * @memberof TradeBankModel
     */
    state?: TradeBankModelStateEnum;
    /**
     * The amount to be received in base units of the currency: currency is \"asset\" for buy and \"counter_asset\" for sell.
     * @type {number}
     * @memberof TradeBankModel
     */
    receive_amount?: number;
    /**
     * The amount to be delivered in base units of the currency: currency is \"counter_asset\" for buy and \"asset\" for sell.
     * @type {number}
     * @memberof TradeBankModel
     */
    deliver_amount?: number;
    /**
     * The fee associated with the trade. Denominated in \"counter_asset\" base units
     * @type {number}
     * @memberof TradeBankModel
     */
    fee?: number;
    /**
     * ISO8601 datetime the bank was created at.
     * @type {string}
     * @memberof TradeBankModel
     */
    created_at?: string;
}

/**
 * @export
 * @enum {string}
 */
export enum TradeBankModelSideEnum {
    Buy = 'buy',
    Sell = 'sell'
}
/**
 * @export
 * @enum {string}
 */
export enum TradeBankModelStateEnum {
    Storing = 'storing',
    Initiating = 'initiating',
    Pending = 'pending',
    Settling = 'settling',
    Completed = 'completed',
    Failed = 'failed'
}

