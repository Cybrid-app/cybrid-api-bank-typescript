// tslint:disable
/**
 * Cybrid Bank API
 * # Cybrid API documentation  Welcome to Cybrid, an all-in-one crypto platform that enables you to easily **build** and **launch** white-label crypto products or services.  In these documents, you\'ll find details on how our REST API operates and generally how our platform functions.  If you\'re looking for our UI SDK Widgets for Web or Mobile (iOS/Android), generated API clients, or demo applications, head over to our [Github repo](https://github.com/Cybrid-app).  💡 We recommend bookmarking the [Cybrid LinkTree](https://linktr.ee/cybridtechnologies) which contains many helpful links to platform resources.  ## Getting Started  This is Cybrid\'s public interactive API documentation, which allows you to fully test our APIs. If you\'d like to use a different tool to exercise our APIs, you can download the [Open API 3.0 yaml](<api_platform_bank_swagger_schema_url>) for import.  If you\'re new to our APIs and the Cybrid Platform, follow the below guides to get set up and familiar with the platform:  1. [Introduction](https://docs.cybrid.xyz/docs/introduction) 2. [Platform Introduction](https://docs.cybrid.xyz/docs/how-is-cybrid-architected) 3. [Testing with Hosted Web Demo App](https://docs.cybrid.xyz/docs/testing-with-hosted-web-demo-app)  In [Getting Started in the Cybrid Sandbox](https://docs.cybrid.xyz/docs/how-do-i-get-started-with-the-sandbox), we walk you through how to use the [Cybrid Sandbox](https://id.sandbox.cybrid.app/) to create a test bank and generate API keys. In [Getting Ready for Trading](https://kb.cybrid.xyz/getting-ready-for-trading), we walk through creating customers, customer identities, accounts, as well as executing quotes and trades.  ## Working with the Cybrid Platform  There are three primary ways you can interact with the Cybrid platform:  1. Directly via our RESTful API (this documentation) 2. Using our API clients available in a variety of languages ([Angular](https://github.com/Cybrid-app/cybrid-api-bank-angular), [Java](https://github.com/Cybrid-app/cybrid-api-bank-java), [Kotlin](https://github.com/Cybrid-app/cybrid-api-bank-kotlin), [Python](https://github.com/Cybrid-app/cybrid-api-bank-python), [Ruby](https://github.com/Cybrid-app/cybrid-api-bank-ruby), [Swift](https://github.com/Cybrid-app/cybrid-api-bank-swift) or [Typescript](https://github.com/Cybrid-app/cybrid-api-bank-typescript)) 3. Integrating a platform specific SDK ([Web](https://github.com/Cybrid-app/cybrid-sdk-web), [Android](https://github.com/Cybrid-app/cybrid-sdk-android), [iOS](https://github.com/Cybrid-app/cybrid-sdk-ios))  Our complete set of APIs allows you to manage resources across three distinct areas: your `Organization`, your `Banks` and your `Identities`. For most of your testing and interaction you\'ll be using the `Bank` API, which is where the majority of APIs reside.  *The complete set of APIs can be found on the following pages:*  | API                                                              | Description                                                 | |------------------------------------------------------------------|-------------------------------------------------------------| | [Organization API](<api_platform_organization_swagger_ui_url>)   | APIs to manage organizations                                | | [Bank API](<api_platform_bank_swagger_ui_url>)                   | APIs to manage banks (and all downstream customer activity) | | [Identities API](<api_idp_swagger_ui_url>)                       | APIs to manage organization and bank identities             |  For questions please contact [Support](mailto:support@cybrid.xyz) at any time for assistance, or contact the [Product Team](mailto:product@cybrid.xyz) for product suggestions.  ## Authenticating with the API  The Cybrid Platform uses OAuth 2.0 Bearer Tokens to authenticate requests to the platform. Credentials to create `Organization` and `Bank` tokens can be generated via the [Cybrid Sandbox](<api_idp_url>). Access tokens can be generated for a `Customer` as well via the [Cybrid IdP](<api_idp_url>) as well.  An `Organization` access token applies broadly to the whole Organization and all of its `Banks`, whereas, a `Bank` access token is specific to an individual Bank. `Customer` tokens, similarly, are scoped to a specific customer in a bank.  Both `Organization` and `Bank` tokens can be created using the OAuth Client Credential Grant flow. Each Organization and Bank has its own unique `Client ID` and `Secret` that allows for machine-to-machine authentication.  A `Bank` can then generate `Customer` access tokens via API using our [Identities API](<api_idp_swagger_ui_url>).  <font color=\"orange\">**⚠️ Never share your Client ID or Secret publicly or in your source code repository.**</font>  Your `Client ID` and `Secret` can be exchanged for a time-limited `Bearer Token` by interacting with the Cybrid Identity Provider or through interacting with the **Authorize** button in this document.  The following curl command can be used to quickly generate a `Bearer Token` for use in testing the API or demo applications.  ``` # Example request when using Bank credentials curl -X POST <api_idp_url>/oauth/token -d \'{     \"grant_type\": \"client_credentials\",     \"client_id\": \"<Your Client ID>\",     \"client_secret\": \"<Your Secret>\",     \"scope\": \"<api_platform_bank_scopes>\"   }\' -H \"Content-Type: application/json\"  # When using Organization credentials set `scope` to \'<api_platform_organization_scopes>\' ``` <font color=\"orange\">**⚠️ Note: The above curl will create a bearer token with full scope access. Delete scopes if you\'d like to restrict access.**</font>  ## Authentication Scopes  The Cybrid platform supports the use of scopes to control the level of access a token is limited to. Scopes do not grant access to resources; instead, they provide limits, in support of the least privilege principal.  The following scopes are available on the platform and can be requested when generating either an Organization, Bank or Customer token. Generally speaking, the _Read_ scope is required to read and list resources, the _Write_ scope is required to update a resource and the _Execute_ scope is required to create a resource.  | Resource              | Read scope (Token Type)                                    | Write scope (Token Type)                      | Execute scope (Token Type)                       | |-----------------------|------------------------------------------------------------|-----------------------------------------------|--------------------------------------------------| | Account               | accounts:read (Organization, Bank, Customer)               |                                               | accounts:execute (Bank, Customer)                | | Bank                  | banks:read (Organization, Bank)                            | banks:write (Organization, Bank)              | banks:execute (Organization)                     | | Customer              | customers:read (Organization, Bank, Customer)              | customers:write (Bank, Customer)              | customers:execute (Bank)                         | | Counterparty          | counterparties:read (Organization, Bank, Customer)         | counterparties:write (Bank, Customer)         | counterparties:execute (Bank)                    | | Deposit Address       | deposit_addresses:read (Organization, Bank, Customer)      | deposit_addresses:write (Bank, Customer)      | deposit_addresses:execute (Bank, Customer)       | | External Bank Account | external_bank_accounts:read (Organization, Bank, Customer) | external_bank_accounts:write (Bank, Customer) | external_bank_accounts:execute (Bank, Customer)  | | External Wallet       | external_wallet:read (Organization, Bank, Customer)        |                                               | external_wallet:execute (Bank, Customer)         | | Organization          | organizations:read (Organization)                          | organizations:write (Organization)            |                                                  | | User                  | users:read (Organization)                                  |                                               | users:execute (Organization)                     | | Price                 | prices:read (Bank, Customer)                               |                                               |                                                  | | Quote                 | quotes:read (Organization, Bank, Customer)                 |                                               | quotes:execute (Organization, Bank, Customer)    | | Trade                 | trades:read (Organization, Bank, Customer)                 |                                               | trades:execute (Organization, Bank, Customer)    | | Transfer              | transfers:read (Organization, Bank, Customer)              |                                               | transfers:execute (Organization, Bank, Customer) | | Workflow              | workflows:read (Organization, Bank, Customer)              |                                               | workflows:execute (Bank, Customer)               | | Invoice               | invoices:read (Organization, Bank, Customer)               | invoices:write (Bank, Customer)               | invoices:execute (Bank, Customer)                |  ## Available Endpoints  The available APIs for the [Identity](<api_idp_swagger_ui_url>), [Organization](<api_platform_organization_swagger_ui_url>) and [Bank](<api_platform_bank_swagger_ui_url>) API services are listed below:  | API Service  | Model                | API Endpoint Path              | Description                                                                                       | |--------------|----------------------|--------------------------------|---------------------------------------------------------------------------------------------------| | Identity     | Bank                 | /api/bank_applications         | Create and list banks                                                                             | | Identity     | CustomerToken        | /api/customer_tokens           | Create customer JWT access tokens                                                                 | | Identity     | Organization         | /api/organization_applications | Create and list organizations                                                                     | | Identity     | Organization         | /api/users                     | Create and list organization users                                                                | | Organization | Organization         | /api/organizations             | APIs to retrieve and update organization name                                                     | | Bank         | Account              | /api/accounts                  | Create and list accounts, which hold a specific asset for a customers                             | | Bank         | Asset                | /api/assets                    | Get a list of assets supported by the platform (ex: BTC, ETH)                                     | | Bank         | Bank                 | /api/banks                     | Create, update and list banks, the parent to customers, accounts, etc                             | | Bank         | Customer             | /api/customers                 | Create and list customers                                                                         | | Bank         | Counterparty         | /api/counterparties            | Create and list counterparties                                                                    | | Bank         | DepositAddress       | /api/deposit_addresses         | Create, get and list deposit addresses                                                            | | Bank         | ExternalBankAccount  | /api/external_bank_accounts    | Create, get and list external bank accounts, which connect customer bank accounts to the platform | | Bank         | ExternalWallet       | /api/external_wallets          | Create, get, list and delete external wallets, which connect customer wallets to the platform     | | Bank         | IdentityVerification | /api/identity_verifications    | Create and list identity verifications, which are performed on customers for KYC                  | | Bank         | Invoice              | /api/invoices                  | Create, get, cancel and list invoices                                                             | | Bank         | PaymentInstruction   | /api/payment_instructions      | Create, get and list payment instructions for invoices                                            | | Bank         | Price                | /api/prices                    | Get the current prices for assets on the platform                                                 | | Bank         | Quote                | /api/quotes                    | Create and list quotes, which are required to execute trades                                      | | Bank         | Symbol               | /api/symbols                   | Get a list of symbols supported for trade (ex: BTC-USD)                                           | | Bank         | Trade                | /api/trades                    | Create and list trades, which buy or sell cryptocurrency                                          | | Bank         | Transfer             | /api/transfers                 | Create, get and list transfers (e.g., funding, book)                                              | | Bank         | Workflow             | /api/workflows                 | Create, get and list workflows                                                                    |  ## Understanding Object Models & Endpoints  **Organizations**  An `Organization` is meant to represent the organization partnering with Cybrid to use our platform.  An `Organization` typically does not directly interact with `customers`. Instead, an Organization has one or more `banks`, which encompass the financial service offerings of the platform.  **Banks**  A `Bank` is owned by an `Organization` and can be thought of as an environment or container for `customers` and product offerings. Banks are created in either `Sandbox` or `Production` mode, where `Sandbox` is the environment that you would test, prototype and build in prior to moving to `Production`.  An `Organization` can have multiple `banks`, in either `Sandbox` or `Production` environments. A `Sandbox Bank` will be backed by stubbed data and process flows. For instance, funding source transfer processes as well as trades will be simulated rather than performed, however asset prices are representative of real-world values. You have an unlimited amount of simulated fiat currency for testing purposes.  **Customers**  `Customers` represent your banking users on the platform. At present, we offer support for `Individuals` as Customers.  `Customers` must be verified (i.e., KYC\'d) in our system before they can play any part on the platform, which means they must have an associated and a passing `Identity Verification`. See the Identity Verifications section for more details on how a customer can be verified.  `Customers` must also have an `Account` to be able to transact, in the desired asset class. See the Accounts APIs for more details on setting up accounts for the customer. 
 *
 * The version of the OpenAPI document: v0.0.0
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
    AccountBankModel,
    AccountListBankModel,
    CounterpartyBankModel,
    CustomerBankModel,
    CustomerListBankModel,
    DepositAddressBankModel,
    DepositBankAccountBankModel,
    DepositBankAccountListBankModel,
    ErrorResponseBankModel,
    IdentityVerificationBankModel,
    InternalActivityLimitConfigurationBankModel,
    InternalActivityLimitConfigurationListBankModel,
    InternalActivityReportBankModel,
    InternalBankAccountServiceBankModel,
    InternalBankAccountServiceListBankModel,
    InternalBankBankModel,
    InternalBankListBankModel,
    InternalBusinessDetailBankModel,
    InternalComplianceDecisionBankModel,
    InternalCountryCodeConfigurationBankModel,
    InternalCreateExchangeSettlementApproval202ResponseBankModel,
    InternalCryptoAssetConfigurationBankModel,
    InternalCryptoAssetConfigurationListBankModel,
    InternalCryptoFundingDepositTransferBankModel,
    InternalCybridAccountBankModel,
    InternalCybridAccountListBankModel,
    InternalCybridGasAccountConfigurationBankModel,
    InternalExchangeAccountBankModel,
    InternalExchangeBankModel,
    InternalExchangeListBankModel,
    InternalExchangeMonitorBankModel,
    InternalExchangeOrderBankModel,
    InternalExchangeOrderListBankModel,
    InternalExchangeSettlementBankModel,
    InternalExchangeSettlementConfigurationBankModel,
    InternalExchangeSettlementConfigurationListBankModel,
    InternalExchangeSettlementObligationBankModel,
    InternalExchangeSettlementPaymentOrderBankModel,
    InternalExchangeSettlementPaymentOrderListBankModel,
    InternalExecutionBankModel,
    InternalExpectedPaymentBankModel,
    InternalExpectedPaymentListBankModel,
    InternalExternalBankAccountBankModel,
    InternalExternalBankAccountListBankModel,
    InternalExternalWalletBankModel,
    InternalExternalWalletListBankModel,
    InternalExternalWalletScreeningBankModel,
    InternalFeeChargeBankModel,
    InternalFeeChargeListBankModel,
    InternalFeeConfigurationBankModel,
    InternalFeeConfigurationListBankModel,
    InternalFiatAssetConfigurationBankModel,
    InternalFundingDepositTransferBankModel,
    InternalInternalBankAccountBankModel,
    InternalInternalBankAccountConfigurationBankModel,
    InternalInternalBankAccountListBankModel,
    InternalInternalInvoiceListBankModel,
    InternalInternalWalletBankModel,
    InternalInternalWalletConfigurationBankModel,
    InternalInternalWalletGroupBankModel,
    InternalInternalWalletListBankModel,
    InternalInvoiceBankModel,
    InternalPayoutSymbolConfigurationBankModel,
    InternalPersonDetailBankModel,
    InternalPlanBankModel,
    InternalPostAccountBankModel,
    InternalPostDepositBankAccountBankModel,
    InternalPostFeeConfigurationBankModel,
    InternalPostQuoteBankModel,
    InternalQuoteBankModel,
    InternalReconciliationBankModel,
    InternalReconciliationListBankModel,
    InternalStageBankModel,
    InternalTradeBankModel,
    InternalTradingSymbolConfigurationBankModel,
    InternalTradingSymbolConfigurationListBankModel,
    InternalTransactionMonitorBankModel,
    InternalTransactionsListBankModel,
    InternalTransferBankModel,
    InternalTransferListBankModel,
    InternalTransferRailConfigurationBankModel,
    InternalTransferScreeningBankModel,
    InternalWalletServiceBankModel,
    InternalWalletServiceListBankModel,
    PatchInternalAccountBankModel,
    PatchInternalActivityLimitConfigurationBankModel,
    PatchInternalBankAccountServiceBankModel,
    PatchInternalBankBankModel,
    PatchInternalBusinessDetailBankModel,
    PatchInternalCounterpartyBankModel,
    PatchInternalCryptoAssetConfigurationBankModel,
    PatchInternalCustomerBankModel,
    PatchInternalCybridAccountBankModel,
    PatchInternalDepositAddressBankModel,
    PatchInternalDepositBankAccountBankModel,
    PatchInternalExchangeAccountBankModel,
    PatchInternalExchangeOrderBankModel,
    PatchInternalExchangeSettlementBankModel,
    PatchInternalExecutionBankModel,
    PatchInternalExternalBankAccountBankModel,
    PatchInternalExternalWalletBankModel,
    PatchInternalExternalWalletScreeningBankModel,
    PatchInternalFeeChargeBankModel,
    PatchInternalFileBankModel,
    PatchInternalIdentityVerificationBankModel,
    PatchInternalInternalBankAccountBankModel,
    PatchInternalInternalWalletBankModel,
    PatchInternalInternalWalletGroupBankModel,
    PatchInternalInvoiceBankModel,
    PatchInternalPaymentInstructionBankModel,
    PatchInternalPersonDetailBankModel,
    PatchInternalPlanBankModel,
    PatchInternalStageBankModel,
    PatchInternalTradeBankModel,
    PatchInternalTradingSymbolConfigurationBankModel,
    PatchInternalTransferBankModel,
    PatchInternalTransferScreeningBankModel,
    PatchInternalWalletServiceBankModel,
    PatchInternalWorkflowBankModel,
    PaymentInstructionBankModel,
    PlatformFileBankModel,
    PostFileBankModel,
    PostInternalActivityLimitConfigurationBankModel,
    PostInternalActivityReportBankModel,
    PostInternalBankAccountServiceBankModel,
    PostInternalBankBankModel,
    PostInternalClaimExchangeSettlementPaymentOrderBankModel,
    PostInternalClaimExpectedPaymentBankModel,
    PostInternalComplianceDecisionBankModel,
    PostInternalCountryCodeConfigurationBankModel,
    PostInternalCryptoAssetConfigurationBankModel,
    PostInternalCryptoFundingDepositTransferBankModel,
    PostInternalCybridAccountBankModel,
    PostInternalCybridGasAccountConfigurationBankModel,
    PostInternalExchangeAccountBankModel,
    PostInternalExchangeBankModel,
    PostInternalExchangeMonitorBankModel,
    PostInternalExchangeOrderBankModel,
    PostInternalExchangeSettlementBankModel,
    PostInternalExchangeSettlementConfigurationBankModel,
    PostInternalExchangeSettlementPaymentOrderBankModel,
    PostInternalExpectedPaymentBankModel,
    PostInternalExternalBankAccountBankModel,
    PostInternalExternalWalletBankModel,
    PostInternalFeeChargeBankModel,
    PostInternalFiatAssetConfigurationBankModel,
    PostInternalFundingDepositTransferBankModel,
    PostInternalInternalBankAccountBankModel,
    PostInternalInternalBankAccountConfigurationBankModel,
    PostInternalInternalWalletBankModel,
    PostInternalInternalWalletConfigurationBankModel,
    PostInternalPayoutSymbolConfigurationBankModel,
    PostInternalReconciliationBankModel,
    PostInternalStageBankModel,
    PostInternalTradeBankModel,
    PostInternalTradingSymbolConfigurationBankModel,
    PostInternalTransactionMonitorBankModel,
    PostInternalTransferBankModel,
    PostInternalTransferRailConfigurationBankModel,
    PostInternalTransferScreeningBankModel,
    PostInternalWalletServiceBankModel,
    PostSignalInternalExternalWalletScreeningBankModel,
    PostSignalInternalIdentityVerificationBankModel,
    TradeListBankModel,
    TransferBankModel,
    WorkflowBankModel,
} from '../models';

export interface InternalClaimExchangeSettlementPaymentOrderRequest {
    guid: string;
    postInternalClaimExchangeSettlementPaymentOrderBankModel: PostInternalClaimExchangeSettlementPaymentOrderBankModel;
}

export interface InternalClaimExpectedPaymentRequest {
    guid: string;
    postInternalClaimExpectedPaymentBankModel: PostInternalClaimExpectedPaymentBankModel;
}

export interface InternalCreateAccountRequest {
    internalPostAccountBankModel: InternalPostAccountBankModel;
}

export interface InternalCreateActivityLimitConfigurationRequest {
    postInternalActivityLimitConfigurationBankModel: PostInternalActivityLimitConfigurationBankModel;
}

export interface InternalCreateActivityReportRequest {
    postInternalActivityReportBankModel: PostInternalActivityReportBankModel;
}

export interface InternalCreateBankRequest {
    postInternalBankBankModel: PostInternalBankBankModel;
}

export interface InternalCreateBankAccountServiceRequest {
    postInternalBankAccountServiceBankModel: PostInternalBankAccountServiceBankModel;
}

export interface InternalCreateComplianceDecisionRequest {
    postInternalComplianceDecisionBankModel: PostInternalComplianceDecisionBankModel;
}

export interface InternalCreateCountryCodeConfigurationRequest {
    postInternalCountryCodeConfigurationBankModel: PostInternalCountryCodeConfigurationBankModel;
}

export interface InternalCreateCryptoAssetConfigurationRequest {
    postInternalCryptoAssetConfigurationBankModel: PostInternalCryptoAssetConfigurationBankModel;
}

export interface InternalCreateCybridAccountRequest {
    postInternalCybridAccountBankModel: PostInternalCybridAccountBankModel;
}

export interface InternalCreateCybridGasAccountConfigurationRequest {
    postInternalCybridGasAccountConfigurationBankModel: PostInternalCybridGasAccountConfigurationBankModel;
}

export interface InternalCreateDepositBankAccountRequest {
    internalPostDepositBankAccountBankModel: InternalPostDepositBankAccountBankModel;
}

export interface InternalCreateExchangeRequest {
    postInternalExchangeBankModel: PostInternalExchangeBankModel;
}

export interface InternalCreateExchangeAccountRequest {
    postInternalExchangeAccountBankModel: PostInternalExchangeAccountBankModel;
}

export interface InternalCreateExchangeMonitorRequest {
    postInternalExchangeMonitorBankModel: PostInternalExchangeMonitorBankModel;
}

export interface InternalCreateExchangeOrderRequest {
    postInternalExchangeOrderBankModel: PostInternalExchangeOrderBankModel;
}

export interface InternalCreateExchangeSettlementRequest {
    postInternalExchangeSettlementBankModel: PostInternalExchangeSettlementBankModel;
}

export interface InternalCreateExchangeSettlementApprovalRequest {
    guid: string;
}

export interface InternalCreateExchangeSettlementCompletionRequest {
    guid: string;
}

export interface InternalCreateExchangeSettlementConfigurationRequest {
    postInternalExchangeSettlementConfigurationBankModel: PostInternalExchangeSettlementConfigurationBankModel;
}

export interface InternalCreateExchangeSettlementPaymentOrderRequest {
    postInternalExchangeSettlementPaymentOrderBankModel: PostInternalExchangeSettlementPaymentOrderBankModel;
}

export interface InternalCreateExpectedPaymentRequest {
    postInternalExpectedPaymentBankModel: PostInternalExpectedPaymentBankModel;
}

export interface InternalCreateExternalBankAccountRequest {
    postInternalExternalBankAccountBankModel: PostInternalExternalBankAccountBankModel;
}

export interface InternalCreateExternalWalletRequest {
    postInternalExternalWalletBankModel: PostInternalExternalWalletBankModel;
}

export interface InternalCreateFeeRequest {
    postInternalFeeChargeBankModel: PostInternalFeeChargeBankModel;
}

export interface InternalCreateFeeConfigurationRequest {
    internalPostFeeConfigurationBankModel: InternalPostFeeConfigurationBankModel;
}

export interface InternalCreateFiatAssetConfigurationRequest {
    postInternalFiatAssetConfigurationBankModel: PostInternalFiatAssetConfigurationBankModel;
}

export interface InternalCreateFileRequest {
    postFileBankModel: PostFileBankModel;
}

export interface InternalCreateInternalBankAccountRequest {
    postInternalInternalBankAccountBankModel: PostInternalInternalBankAccountBankModel;
}

export interface InternalCreateInternalBankAccountConfigurationRequest {
    postInternalInternalBankAccountConfigurationBankModel: PostInternalInternalBankAccountConfigurationBankModel;
}

export interface InternalCreateInternalWalletRequest {
    postInternalInternalWalletBankModel: PostInternalInternalWalletBankModel;
}

export interface InternalCreateInternalWalletConfigurationRequest {
    postInternalInternalWalletConfigurationBankModel: PostInternalInternalWalletConfigurationBankModel;
}

export interface InternalCreatePayoutSymbolConfigurationRequest {
    postInternalPayoutSymbolConfigurationBankModel: PostInternalPayoutSymbolConfigurationBankModel;
}

export interface InternalCreateQuoteRequest {
    internalPostQuoteBankModel: InternalPostQuoteBankModel;
}

export interface InternalCreateReconciliationRequest {
    postInternalReconciliationBankModel: PostInternalReconciliationBankModel;
}

export interface InternalCreateStageRequest {
    postInternalStageBankModel: PostInternalStageBankModel;
}

export interface InternalCreateTradeRequest {
    postInternalTradeBankModel: PostInternalTradeBankModel;
}

export interface InternalCreateTradingSymbolConfigurationRequest {
    postInternalTradingSymbolConfigurationBankModel: PostInternalTradingSymbolConfigurationBankModel;
}

export interface InternalCreateTransactionMonitorRequest {
    postInternalTransactionMonitorBankModel: PostInternalTransactionMonitorBankModel;
}

export interface InternalCreateTransferRequest {
    postInternalTransferBankModel: PostInternalTransferBankModel;
}

export interface InternalCreateTransferRailConfigurationRequest {
    postInternalTransferRailConfigurationBankModel: PostInternalTransferRailConfigurationBankModel;
}

export interface InternalCreateTransferScreeningRequest {
    postInternalTransferScreeningBankModel: PostInternalTransferScreeningBankModel;
}

export interface InternalCreateWalletServiceRequest {
    postInternalWalletServiceBankModel: PostInternalWalletServiceBankModel;
}

export interface InternalCryptoFundingDepositTransferRequest {
    postInternalCryptoFundingDepositTransferBankModel: PostInternalCryptoFundingDepositTransferBankModel;
}

export interface InternalDeleteActivityLimitConfigurationRequest {
    guid: string;
}

export interface InternalDeleteExternalBankAccountRequest {
    externalBankAccountGuid: string;
}

export interface InternalFundingDepositTransferRequest {
    postInternalFundingDepositTransferBankModel: PostInternalFundingDepositTransferBankModel;
}

export interface InternalGetBankRequest {
    bankGuid: string;
}

export interface InternalGetBankAccountServiceRequest {
    bankAccountServiceGuid: string;
}

export interface InternalGetCustomerRequest {
    customerGuid: string;
}

export interface InternalGetCybridAccountRequest {
    accountGuid: string;
}

export interface InternalGetExchangeRequest {
    exchangeGuid: string;
}

export interface InternalGetExchangeAccountRequest {
    accountGuid: string;
}

export interface InternalGetExchangeSettlementRequest {
    guid: string;
}

export interface InternalGetExchangeSettlementObligationRequest {
    guid: string;
}

export interface InternalGetExchangeSettlementPaymentOrderRequest {
    guid: string;
}

export interface InternalGetExecutionRequest {
    executionGuid: string;
}

export interface InternalGetExpectedPaymentRequest {
    guid: string;
}

export interface InternalGetExternalBankAccountRequest {
    externalBankAccountGuid: string;
    forceBalanceRefresh?: boolean;
    includeBalances?: boolean;
    includePii?: boolean;
}

export interface InternalGetExternalWalletRequest {
    externalWalletGuid: string;
}

export interface InternalGetExternalWalletScreeningRequest {
    externalWalletScreeningGuid: string;
}

export interface InternalGetFileRequest {
    fileGuid: string;
}

export interface InternalGetInternalBankAccountRequest {
    internalBankAccountGuid: string;
}

export interface InternalGetInternalWalletRequest {
    internalWalletGuid: string;
}

export interface InternalGetInvoiceRequest {
    invoiceGuid: string;
}

export interface InternalGetPlanRequest {
    planGuid: string;
}

export interface InternalGetQuoteRequest {
    quoteGuid: string;
}

export interface InternalGetReconciliationRequest {
    guid: string;
}

export interface InternalGetTradeRequest {
    tradeGuid: string;
}

export interface InternalGetTransferRequest {
    guid: string;
    includeProviderInfo?: boolean;
}

export interface InternalGetTransferScreeningRequest {
    transferScreeningGuid: string;
}

export interface InternalGetWalletServiceRequest {
    walletServiceGuid: string;
}

export interface InternalListAccountsRequest {
    page?: number;
    perPage?: number;
    owner?: string;
    guid?: string;
    customerGuid?: string;
    bankGuid?: string;
    type?: string;
    asset?: string;
}

export interface InternalListActivityLimitConfigurationsRequest {
    page?: number;
    perPage?: number;
    type?: string;
    environment?: string;
    guid?: string;
    customerGuid?: string;
    bankGuid?: string;
    audience?: string;
    countryCode?: string;
    activity?: string;
    side?: string;
}

export interface InternalListBankAccountServicesRequest {
    page?: number;
    perPage?: number;
    environment?: string;
    guid?: string;
    type?: string;
}

export interface InternalListBanksRequest {
    page?: number;
    perPage?: number;
    guid?: string;
    type?: string;
    organizationGuid?: string;
    bankGuid?: string;
}

export interface InternalListCryptoAssetConfigurationsRequest {
    page?: number;
    perPage?: number;
    guid?: string;
    assetCode?: string;
    bankGuid?: string;
    depositsEnabled?: boolean;
    environment?: string;
    invoicesEnabled?: boolean;
    storageEnabled?: boolean;
    type?: string;
}

export interface InternalListCustomersRequest {
    page?: number;
    perPage?: number;
    guid?: string;
    bankGuid?: string;
    organizationGuid?: string;
}

export interface InternalListCybridAccountsRequest {
    page?: number;
    perPage?: number;
    environment?: string;
    type?: string;
    asset?: string;
}

export interface InternalListDepositBankAccountsRequest {
    page?: number;
    perPage?: number;
    guid?: string;
    bankGuid?: string;
    customerGuid?: string;
    label?: string;
    uniqueMemoId?: string;
    type?: string;
    parentDepositBankAccountGuid?: string;
}

export interface InternalListExchangeOrdersRequest {
    page?: number;
    perPage?: number;
    guid?: string;
    state?: string;
}

export interface InternalListExchangeSettlementConfigurationsRequest {
    page?: number;
    perPage?: number;
    asset?: string;
    exchangeGuid?: string;
}

export interface InternalListExchangeSettlementPaymentOrdersRequest {
    page?: number;
    perPage?: number;
    settlementGuid?: string;
}

export interface InternalListExchangesRequest {
    page?: number;
    perPage?: number;
    provider?: string;
    environment?: string;
}

export interface InternalListExpectedPaymentsRequest {
    page?: number;
    perPage?: number;
    settlementGuid?: string;
}

export interface InternalListExternalBankAccountsRequest {
    page?: number;
    perPage?: number;
    asset?: string;
    bankGuid?: string;
    exchangeGuid?: string;
}

export interface InternalListExternalWalletsRequest {
    page?: number;
    perPage?: number;
    asset?: string;
    exchangeGuid?: string;
}

export interface InternalListFeeConfigurationsRequest {
    page?: number;
    perPage?: number;
    guid?: string;
    configurationType?: string;
    productType?: string;
    primaryAssetCode?: string;
    counterAssetCode?: string;
    bankGuid?: string;
    organizationGuid?: string;
}

export interface InternalListFeesRequest {
    page?: number;
    perPage?: number;
    guid?: string;
    state?: string;
}

export interface InternalListInternalBankAccountsRequest {
    page?: number;
    perPage?: number;
    environment?: string;
    asset?: string;
    accountKind?: string;
}

export interface InternalListInternalWalletsRequest {
    page?: number;
    perPage?: number;
    owner?: string;
    environment?: string;
    guid?: string;
    bankGuid?: string;
    customerGuid?: string;
    internalWalletGroupGuid?: string;
    type?: string;
    asset?: string;
    accountKind?: string;
}

export interface InternalListInvoicesRequest {
    page?: number;
    perPage?: number;
    guid?: string;
    bankGuid?: string;
    customerGuid?: string;
    accountGuid?: string;
    state?: string;
    asset?: string;
    environment?: InternalListInvoicesEnvironmentEnum;
    label?: string;
}

export interface InternalListReconciliationsRequest {
    page?: number;
    perPage?: number;
    category?: string;
    confidence?: string;
    direction?: string;
    transferGuid?: string;
    transactionId?: string;
}

export interface InternalListTradesRequest {
    page?: number;
    perPage?: number;
    guid?: string;
    customerGuid?: string;
    bankGuid?: string;
}

export interface InternalListTradingSymbolConfigurationsRequest {
    page?: number;
    perPage?: number;
    bankGuid?: string;
}

export interface InternalListTransactionsRequest {
    environment: InternalListTransactionsEnvironmentEnum;
    accountGuid: string;
    accountType: InternalListTransactionsAccountTypeEnum;
    cursor?: string | null;
    perPage?: number;
    includePii?: boolean;
    createdAtGte?: string;
    createdAtLt?: string;
}

export interface InternalListTransfersRequest {
    page?: number;
    perPage?: number;
    asset?: string;
    guid?: string;
    transferType?: string;
    customerGuid?: string;
    bankGuid?: string;
    accountGuid?: string;
    state?: string;
    side?: string;
    txnHash?: string;
    externalId?: string;
    amount?: number;
    estimatedAmount?: number;
    principalSourceAccountGuid?: string;
    principalDestinationAccountGuid?: string;
    createdAtGte?: string;
    createdAtLt?: string;
    updatedAtGte?: string;
    updatedAtLt?: string;
}

export interface InternalListWalletServicesRequest {
    page?: number;
    perPage?: number;
    environment?: string;
    guid?: string;
    type?: string;
}

export interface InternalPatchAccountRequest {
    accountGuid: string;
    patchInternalAccountBankModel: PatchInternalAccountBankModel;
}

export interface InternalPatchActivityLimitConfigurationRequest {
    guid: string;
    patchInternalActivityLimitConfigurationBankModel: PatchInternalActivityLimitConfigurationBankModel;
}

export interface InternalPatchBankRequest {
    bankGuid: string;
    patchInternalBankBankModel: PatchInternalBankBankModel;
}

export interface InternalPatchBankAccountServiceRequest {
    guid: string;
    patchInternalBankAccountServiceBankModel: PatchInternalBankAccountServiceBankModel;
}

export interface InternalPatchBusinessDetailRequest {
    guid: string;
    patchInternalBusinessDetailBankModel: PatchInternalBusinessDetailBankModel;
}

export interface InternalPatchCounterpartyRequest {
    counterpartyGuid: string;
    patchInternalCounterpartyBankModel: PatchInternalCounterpartyBankModel;
}

export interface InternalPatchCryptoAssetConfigurationRequest {
    guid: string;
    patchInternalCryptoAssetConfigurationBankModel: PatchInternalCryptoAssetConfigurationBankModel;
}

export interface InternalPatchCustomerRequest {
    customerGuid: string;
    patchInternalCustomerBankModel: PatchInternalCustomerBankModel;
}

export interface InternalPatchCybridAccountRequest {
    guid: string;
    patchInternalCybridAccountBankModel: PatchInternalCybridAccountBankModel;
}

export interface InternalPatchDepositAddressRequest {
    guid: string;
    patchInternalDepositAddressBankModel: PatchInternalDepositAddressBankModel;
}

export interface InternalPatchDepositBankAccountRequest {
    depositBankAccountGuid: string;
    patchInternalDepositBankAccountBankModel: PatchInternalDepositBankAccountBankModel;
}

export interface InternalPatchExchangeAccountRequest {
    guid: string;
    patchInternalExchangeAccountBankModel: PatchInternalExchangeAccountBankModel;
}

export interface InternalPatchExchangeOrderRequest {
    guid: string;
    patchInternalExchangeOrderBankModel: PatchInternalExchangeOrderBankModel;
}

export interface InternalPatchExchangeSettlementRequest {
    exchangeSettlementGuid: string;
    patchInternalExchangeSettlementBankModel: PatchInternalExchangeSettlementBankModel;
}

export interface InternalPatchExternalBankAccountRequest {
    externalBankAccountGuid: string;
    patchInternalExternalBankAccountBankModel: PatchInternalExternalBankAccountBankModel;
}

export interface InternalPatchExternalWalletRequest {
    externalWalletGuid: string;
    patchInternalExternalWalletBankModel: PatchInternalExternalWalletBankModel;
}

export interface InternalPatchExternalWalletScreeningRequest {
    externalWalletScreeningGuid: string;
    patchInternalExternalWalletScreeningBankModel: PatchInternalExternalWalletScreeningBankModel;
}

export interface InternalPatchFeeRequest {
    guid: string;
    patchInternalFeeChargeBankModel: PatchInternalFeeChargeBankModel;
}

export interface InternalPatchFilesRequest {
    fileGuid: string;
    patchInternalFileBankModel: PatchInternalFileBankModel;
}

export interface InternalPatchIdentityVerificationRequest {
    identityVerificationGuid: string;
    patchInternalIdentityVerificationBankModel: PatchInternalIdentityVerificationBankModel;
}

export interface InternalPatchInternalBankAccountRequest {
    guid: string;
    patchInternalInternalBankAccountBankModel: PatchInternalInternalBankAccountBankModel;
}

export interface InternalPatchInternalWalletRequest {
    guid: string;
    patchInternalInternalWalletBankModel: PatchInternalInternalWalletBankModel;
}

export interface InternalPatchInternalWalletGroupRequest {
    guid: string;
    patchInternalInternalWalletGroupBankModel: PatchInternalInternalWalletGroupBankModel;
}

export interface InternalPatchInvoiceRequest {
    invoiceGuid: string;
    patchInternalInvoiceBankModel: PatchInternalInvoiceBankModel;
}

export interface InternalPatchPaymentInstructionRequest {
    guid: string;
    patchInternalPaymentInstructionBankModel: PatchInternalPaymentInstructionBankModel;
}

export interface InternalPatchPersonDetailRequest {
    guid: string;
    patchInternalPersonDetailBankModel: PatchInternalPersonDetailBankModel;
}

export interface InternalPatchTradeRequest {
    tradeGuid: string;
    patchInternalTradeBankModel: PatchInternalTradeBankModel;
}

export interface InternalPatchTradingSymbolConfigurationRequest {
    guid: string;
    patchInternalTradingSymbolConfigurationBankModel: PatchInternalTradingSymbolConfigurationBankModel;
}

export interface InternalPatchTransferRequest {
    transferGuid: string;
    patchInternalTransferBankModel: PatchInternalTransferBankModel;
}

export interface InternalPatchTransferScreeningRequest {
    transferScreeningGuid: string;
    patchInternalTransferScreeningBankModel: PatchInternalTransferScreeningBankModel;
}

export interface InternalPatchWalletServiceRequest {
    guid: string;
    patchInternalWalletServiceBankModel: PatchInternalWalletServiceBankModel;
}

export interface InternalPatchWorkflowRequest {
    workflowGuid: string;
    patchInternalWorkflowBankModel: PatchInternalWorkflowBankModel;
}

export interface InternalSignalExternalWalletScreeningRequest {
    externalWalletScreeningGuid: string;
    postSignalInternalExternalWalletScreeningBankModel: PostSignalInternalExternalWalletScreeningBankModel;
}

export interface InternalSignalIdentityVerificationRequest {
    identityVerificationGuid: string;
    postSignalInternalIdentityVerificationBankModel: PostSignalInternalIdentityVerificationBankModel;
}

export interface InternalSignalInvoiceRequest {
    invoiceGuid: string;
}

export interface InternalSignalTransferRequest {
    transferGuid: string;
}

export interface PatchInternalExecutionRequest {
    executionGuid: string;
    patchInternalExecutionBankModel: PatchInternalExecutionBankModel;
}

export interface PatchInternalPlanRequest {
    planGuid: string;
    patchInternalPlanBankModel: PatchInternalPlanBankModel;
}

export interface PatchInternalStageRequest {
    stageGuid: string;
    patchInternalStageBankModel: PatchInternalStageBankModel;
}

/**
 * no description
 */
export class InternalBankApi extends BaseAPI {

    /**
     * Claim an Exchange Settlement Payment Order.  Required scope: **internal:exchange_settlements:write**
     * Claim Exchange Settlement Payment Order
     */
    internalClaimExchangeSettlementPaymentOrder({ guid, postInternalClaimExchangeSettlementPaymentOrderBankModel }: InternalClaimExchangeSettlementPaymentOrderRequest): Observable<InternalExchangeSettlementPaymentOrderBankModel>
    internalClaimExchangeSettlementPaymentOrder({ guid, postInternalClaimExchangeSettlementPaymentOrderBankModel }: InternalClaimExchangeSettlementPaymentOrderRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalExchangeSettlementPaymentOrderBankModel>>
    internalClaimExchangeSettlementPaymentOrder({ guid, postInternalClaimExchangeSettlementPaymentOrderBankModel }: InternalClaimExchangeSettlementPaymentOrderRequest, opts?: OperationOpts): Observable<InternalExchangeSettlementPaymentOrderBankModel | AjaxResponse<InternalExchangeSettlementPaymentOrderBankModel>> {
        throwIfNullOrUndefined(guid, 'guid', 'internalClaimExchangeSettlementPaymentOrder');
        throwIfNullOrUndefined(postInternalClaimExchangeSettlementPaymentOrderBankModel, 'postInternalClaimExchangeSettlementPaymentOrderBankModel', 'internalClaimExchangeSettlementPaymentOrder');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalExchangeSettlementPaymentOrderBankModel>({
            url: '/api/internal/exchange_settlement_payment_orders/{guid}/claim'.replace('{guid}', encodeURI(guid)),
            method: 'POST',
            headers,
            body: postInternalClaimExchangeSettlementPaymentOrderBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Claim an Expected Payments.  Required scope: **internal:exchange_settlements:write**
     * Claim Expected Payment
     */
    internalClaimExpectedPayment({ guid, postInternalClaimExpectedPaymentBankModel }: InternalClaimExpectedPaymentRequest): Observable<InternalExpectedPaymentBankModel>
    internalClaimExpectedPayment({ guid, postInternalClaimExpectedPaymentBankModel }: InternalClaimExpectedPaymentRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalExpectedPaymentBankModel>>
    internalClaimExpectedPayment({ guid, postInternalClaimExpectedPaymentBankModel }: InternalClaimExpectedPaymentRequest, opts?: OperationOpts): Observable<InternalExpectedPaymentBankModel | AjaxResponse<InternalExpectedPaymentBankModel>> {
        throwIfNullOrUndefined(guid, 'guid', 'internalClaimExpectedPayment');
        throwIfNullOrUndefined(postInternalClaimExpectedPaymentBankModel, 'postInternalClaimExpectedPaymentBankModel', 'internalClaimExpectedPayment');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalExpectedPaymentBankModel>({
            url: '/api/internal/expected_payments/{guid}/claim'.replace('{guid}', encodeURI(guid)),
            method: 'POST',
            headers,
            body: postInternalClaimExpectedPaymentBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Creates an account.  Required scope: **internal:accounts:execute**
     * Create Account
     */
    internalCreateAccount({ internalPostAccountBankModel }: InternalCreateAccountRequest): Observable<AccountBankModel>
    internalCreateAccount({ internalPostAccountBankModel }: InternalCreateAccountRequest, opts?: OperationOpts): Observable<AjaxResponse<AccountBankModel>>
    internalCreateAccount({ internalPostAccountBankModel }: InternalCreateAccountRequest, opts?: OperationOpts): Observable<AccountBankModel | AjaxResponse<AccountBankModel>> {
        throwIfNullOrUndefined(internalPostAccountBankModel, 'internalPostAccountBankModel', 'internalCreateAccount');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<AccountBankModel>({
            url: '/api/internal/accounts',
            method: 'POST',
            headers,
            body: internalPostAccountBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Creates a transfer rail configuration.  Required scope: **internal:banks:write**
     * Create ActivityLimitConfiguration
     */
    internalCreateActivityLimitConfiguration({ postInternalActivityLimitConfigurationBankModel }: InternalCreateActivityLimitConfigurationRequest): Observable<InternalActivityLimitConfigurationBankModel>
    internalCreateActivityLimitConfiguration({ postInternalActivityLimitConfigurationBankModel }: InternalCreateActivityLimitConfigurationRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalActivityLimitConfigurationBankModel>>
    internalCreateActivityLimitConfiguration({ postInternalActivityLimitConfigurationBankModel }: InternalCreateActivityLimitConfigurationRequest, opts?: OperationOpts): Observable<InternalActivityLimitConfigurationBankModel | AjaxResponse<InternalActivityLimitConfigurationBankModel>> {
        throwIfNullOrUndefined(postInternalActivityLimitConfigurationBankModel, 'postInternalActivityLimitConfigurationBankModel', 'internalCreateActivityLimitConfiguration');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalActivityLimitConfigurationBankModel>({
            url: '/api/internal/activity_limit_configurations',
            method: 'POST',
            headers,
            body: postInternalActivityLimitConfigurationBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Create an Activity Report.  Required scope: **internal:reports:execute**
     * Create Activity Report
     */
    internalCreateActivityReport({ postInternalActivityReportBankModel }: InternalCreateActivityReportRequest): Observable<InternalActivityReportBankModel>
    internalCreateActivityReport({ postInternalActivityReportBankModel }: InternalCreateActivityReportRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalActivityReportBankModel>>
    internalCreateActivityReport({ postInternalActivityReportBankModel }: InternalCreateActivityReportRequest, opts?: OperationOpts): Observable<InternalActivityReportBankModel | AjaxResponse<InternalActivityReportBankModel>> {
        throwIfNullOrUndefined(postInternalActivityReportBankModel, 'postInternalActivityReportBankModel', 'internalCreateActivityReport');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalActivityReportBankModel>({
            url: '/api/internal/activity_reports',
            method: 'POST',
            headers,
            body: postInternalActivityReportBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Create a bank.  Required scope: **internal:banks:execute**
     * Create Bank
     */
    internalCreateBank({ postInternalBankBankModel }: InternalCreateBankRequest): Observable<InternalBankBankModel>
    internalCreateBank({ postInternalBankBankModel }: InternalCreateBankRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalBankBankModel>>
    internalCreateBank({ postInternalBankBankModel }: InternalCreateBankRequest, opts?: OperationOpts): Observable<InternalBankBankModel | AjaxResponse<InternalBankBankModel>> {
        throwIfNullOrUndefined(postInternalBankBankModel, 'postInternalBankBankModel', 'internalCreateBank');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalBankBankModel>({
            url: '/api/internal/banks',
            method: 'POST',
            headers,
            body: postInternalBankBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Create an BankAccountService.  Required scope: **internal:bank_account_services:execute**
     * Create BankAccountService
     */
    internalCreateBankAccountService({ postInternalBankAccountServiceBankModel }: InternalCreateBankAccountServiceRequest): Observable<InternalBankAccountServiceBankModel>
    internalCreateBankAccountService({ postInternalBankAccountServiceBankModel }: InternalCreateBankAccountServiceRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalBankAccountServiceBankModel>>
    internalCreateBankAccountService({ postInternalBankAccountServiceBankModel }: InternalCreateBankAccountServiceRequest, opts?: OperationOpts): Observable<InternalBankAccountServiceBankModel | AjaxResponse<InternalBankAccountServiceBankModel>> {
        throwIfNullOrUndefined(postInternalBankAccountServiceBankModel, 'postInternalBankAccountServiceBankModel', 'internalCreateBankAccountService');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalBankAccountServiceBankModel>({
            url: '/api/internal/bank_account_services',
            method: 'POST',
            headers,
            body: postInternalBankAccountServiceBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Create an Compliance Decision.  Required scope: **internal:customers:write**
     * Create Compliance Decision
     */
    internalCreateComplianceDecision({ postInternalComplianceDecisionBankModel }: InternalCreateComplianceDecisionRequest): Observable<InternalComplianceDecisionBankModel>
    internalCreateComplianceDecision({ postInternalComplianceDecisionBankModel }: InternalCreateComplianceDecisionRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalComplianceDecisionBankModel>>
    internalCreateComplianceDecision({ postInternalComplianceDecisionBankModel }: InternalCreateComplianceDecisionRequest, opts?: OperationOpts): Observable<InternalComplianceDecisionBankModel | AjaxResponse<InternalComplianceDecisionBankModel>> {
        throwIfNullOrUndefined(postInternalComplianceDecisionBankModel, 'postInternalComplianceDecisionBankModel', 'internalCreateComplianceDecision');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalComplianceDecisionBankModel>({
            url: '/api/internal/compliance_decisions',
            method: 'POST',
            headers,
            body: postInternalComplianceDecisionBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Creates a country code configuration.  Required scope: **internal:banks:write**
     * Create CountryCodeConfiguration
     */
    internalCreateCountryCodeConfiguration({ postInternalCountryCodeConfigurationBankModel }: InternalCreateCountryCodeConfigurationRequest): Observable<InternalCountryCodeConfigurationBankModel>
    internalCreateCountryCodeConfiguration({ postInternalCountryCodeConfigurationBankModel }: InternalCreateCountryCodeConfigurationRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalCountryCodeConfigurationBankModel>>
    internalCreateCountryCodeConfiguration({ postInternalCountryCodeConfigurationBankModel }: InternalCreateCountryCodeConfigurationRequest, opts?: OperationOpts): Observable<InternalCountryCodeConfigurationBankModel | AjaxResponse<InternalCountryCodeConfigurationBankModel>> {
        throwIfNullOrUndefined(postInternalCountryCodeConfigurationBankModel, 'postInternalCountryCodeConfigurationBankModel', 'internalCreateCountryCodeConfiguration');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalCountryCodeConfigurationBankModel>({
            url: '/api/internal/country_code_configurations',
            method: 'POST',
            headers,
            body: postInternalCountryCodeConfigurationBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Creates a crypto asset configuration.  Required scope: **internal:banks:write**
     * Create CryptoAssetConfiguration
     */
    internalCreateCryptoAssetConfiguration({ postInternalCryptoAssetConfigurationBankModel }: InternalCreateCryptoAssetConfigurationRequest): Observable<InternalCryptoAssetConfigurationBankModel>
    internalCreateCryptoAssetConfiguration({ postInternalCryptoAssetConfigurationBankModel }: InternalCreateCryptoAssetConfigurationRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalCryptoAssetConfigurationBankModel>>
    internalCreateCryptoAssetConfiguration({ postInternalCryptoAssetConfigurationBankModel }: InternalCreateCryptoAssetConfigurationRequest, opts?: OperationOpts): Observable<InternalCryptoAssetConfigurationBankModel | AjaxResponse<InternalCryptoAssetConfigurationBankModel>> {
        throwIfNullOrUndefined(postInternalCryptoAssetConfigurationBankModel, 'postInternalCryptoAssetConfigurationBankModel', 'internalCreateCryptoAssetConfiguration');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalCryptoAssetConfigurationBankModel>({
            url: '/api/internal/crypto_asset_configurations',
            method: 'POST',
            headers,
            body: postInternalCryptoAssetConfigurationBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Create a CybridAccount.  Required scope: **internal:cybrid_accounts:execute**
     * Create CybridAccount
     */
    internalCreateCybridAccount({ postInternalCybridAccountBankModel }: InternalCreateCybridAccountRequest): Observable<InternalCybridAccountBankModel>
    internalCreateCybridAccount({ postInternalCybridAccountBankModel }: InternalCreateCybridAccountRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalCybridAccountBankModel>>
    internalCreateCybridAccount({ postInternalCybridAccountBankModel }: InternalCreateCybridAccountRequest, opts?: OperationOpts): Observable<InternalCybridAccountBankModel | AjaxResponse<InternalCybridAccountBankModel>> {
        throwIfNullOrUndefined(postInternalCybridAccountBankModel, 'postInternalCybridAccountBankModel', 'internalCreateCybridAccount');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalCybridAccountBankModel>({
            url: '/api/internal/cybrid_accounts',
            method: 'POST',
            headers,
            body: postInternalCybridAccountBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Creates a cybrid gas account configuration.  Required scope: **internal:accounts:write**
     * Create CybridGasAccountConfiguration
     */
    internalCreateCybridGasAccountConfiguration({ postInternalCybridGasAccountConfigurationBankModel }: InternalCreateCybridGasAccountConfigurationRequest): Observable<InternalCybridGasAccountConfigurationBankModel>
    internalCreateCybridGasAccountConfiguration({ postInternalCybridGasAccountConfigurationBankModel }: InternalCreateCybridGasAccountConfigurationRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalCybridGasAccountConfigurationBankModel>>
    internalCreateCybridGasAccountConfiguration({ postInternalCybridGasAccountConfigurationBankModel }: InternalCreateCybridGasAccountConfigurationRequest, opts?: OperationOpts): Observable<InternalCybridGasAccountConfigurationBankModel | AjaxResponse<InternalCybridGasAccountConfigurationBankModel>> {
        throwIfNullOrUndefined(postInternalCybridGasAccountConfigurationBankModel, 'postInternalCybridGasAccountConfigurationBankModel', 'internalCreateCybridGasAccountConfiguration');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalCybridGasAccountConfigurationBankModel>({
            url: '/api/internal/cybrid_gas_account_configurations',
            method: 'POST',
            headers,
            body: postInternalCybridGasAccountConfigurationBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Creates a deposit bank account.  Required scope: **internal:deposit_bank_accounts:execute**
     * Create Deposit Bank Account
     */
    internalCreateDepositBankAccount({ internalPostDepositBankAccountBankModel }: InternalCreateDepositBankAccountRequest): Observable<DepositBankAccountBankModel>
    internalCreateDepositBankAccount({ internalPostDepositBankAccountBankModel }: InternalCreateDepositBankAccountRequest, opts?: OperationOpts): Observable<AjaxResponse<DepositBankAccountBankModel>>
    internalCreateDepositBankAccount({ internalPostDepositBankAccountBankModel }: InternalCreateDepositBankAccountRequest, opts?: OperationOpts): Observable<DepositBankAccountBankModel | AjaxResponse<DepositBankAccountBankModel>> {
        throwIfNullOrUndefined(internalPostDepositBankAccountBankModel, 'internalPostDepositBankAccountBankModel', 'internalCreateDepositBankAccount');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<DepositBankAccountBankModel>({
            url: '/api/internal/deposit_bank_accounts',
            method: 'POST',
            headers,
            body: internalPostDepositBankAccountBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Create an Exchanges.  Required scope: **internal:exchanges:execute**
     * Create Exchange
     */
    internalCreateExchange({ postInternalExchangeBankModel }: InternalCreateExchangeRequest): Observable<InternalExchangeBankModel>
    internalCreateExchange({ postInternalExchangeBankModel }: InternalCreateExchangeRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalExchangeBankModel>>
    internalCreateExchange({ postInternalExchangeBankModel }: InternalCreateExchangeRequest, opts?: OperationOpts): Observable<InternalExchangeBankModel | AjaxResponse<InternalExchangeBankModel>> {
        throwIfNullOrUndefined(postInternalExchangeBankModel, 'postInternalExchangeBankModel', 'internalCreateExchange');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalExchangeBankModel>({
            url: '/api/internal/exchanges',
            method: 'POST',
            headers,
            body: postInternalExchangeBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Create an ExchangeAccount.  Required scope: **internal:exchange_accounts:execute**
     * Create ExchangeAccount
     */
    internalCreateExchangeAccount({ postInternalExchangeAccountBankModel }: InternalCreateExchangeAccountRequest): Observable<InternalExchangeAccountBankModel>
    internalCreateExchangeAccount({ postInternalExchangeAccountBankModel }: InternalCreateExchangeAccountRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalExchangeAccountBankModel>>
    internalCreateExchangeAccount({ postInternalExchangeAccountBankModel }: InternalCreateExchangeAccountRequest, opts?: OperationOpts): Observable<InternalExchangeAccountBankModel | AjaxResponse<InternalExchangeAccountBankModel>> {
        throwIfNullOrUndefined(postInternalExchangeAccountBankModel, 'postInternalExchangeAccountBankModel', 'internalCreateExchangeAccount');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalExchangeAccountBankModel>({
            url: '/api/internal/exchange_accounts',
            method: 'POST',
            headers,
            body: postInternalExchangeAccountBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Creates a ExchangeMonitor.Required scope: **internal:exchange_monitors:execute**
     * Create ExchangeMonitor
     */
    internalCreateExchangeMonitor({ postInternalExchangeMonitorBankModel }: InternalCreateExchangeMonitorRequest): Observable<InternalExchangeMonitorBankModel>
    internalCreateExchangeMonitor({ postInternalExchangeMonitorBankModel }: InternalCreateExchangeMonitorRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalExchangeMonitorBankModel>>
    internalCreateExchangeMonitor({ postInternalExchangeMonitorBankModel }: InternalCreateExchangeMonitorRequest, opts?: OperationOpts): Observable<InternalExchangeMonitorBankModel | AjaxResponse<InternalExchangeMonitorBankModel>> {
        throwIfNullOrUndefined(postInternalExchangeMonitorBankModel, 'postInternalExchangeMonitorBankModel', 'internalCreateExchangeMonitor');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalExchangeMonitorBankModel>({
            url: '/api/internal/exchange_monitors',
            method: 'POST',
            headers,
            body: postInternalExchangeMonitorBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Creates a ExchangeOrder.Required scope: **internal:exchange_orders:execute**
     * Create ExchangeOrder
     */
    internalCreateExchangeOrder({ postInternalExchangeOrderBankModel }: InternalCreateExchangeOrderRequest): Observable<InternalExchangeOrderBankModel>
    internalCreateExchangeOrder({ postInternalExchangeOrderBankModel }: InternalCreateExchangeOrderRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalExchangeOrderBankModel>>
    internalCreateExchangeOrder({ postInternalExchangeOrderBankModel }: InternalCreateExchangeOrderRequest, opts?: OperationOpts): Observable<InternalExchangeOrderBankModel | AjaxResponse<InternalExchangeOrderBankModel>> {
        throwIfNullOrUndefined(postInternalExchangeOrderBankModel, 'postInternalExchangeOrderBankModel', 'internalCreateExchangeOrder');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalExchangeOrderBankModel>({
            url: '/api/internal/exchange_orders',
            method: 'POST',
            headers,
            body: postInternalExchangeOrderBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Create an Exchange Settlements.  Required scope: **internal:exchange_settlements:execute**
     * Create Exchange Settlement
     */
    internalCreateExchangeSettlement({ postInternalExchangeSettlementBankModel }: InternalCreateExchangeSettlementRequest): Observable<InternalExchangeSettlementBankModel>
    internalCreateExchangeSettlement({ postInternalExchangeSettlementBankModel }: InternalCreateExchangeSettlementRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalExchangeSettlementBankModel>>
    internalCreateExchangeSettlement({ postInternalExchangeSettlementBankModel }: InternalCreateExchangeSettlementRequest, opts?: OperationOpts): Observable<InternalExchangeSettlementBankModel | AjaxResponse<InternalExchangeSettlementBankModel>> {
        throwIfNullOrUndefined(postInternalExchangeSettlementBankModel, 'postInternalExchangeSettlementBankModel', 'internalCreateExchangeSettlement');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalExchangeSettlementBankModel>({
            url: '/api/internal/exchange_settlements',
            method: 'POST',
            headers,
            body: postInternalExchangeSettlementBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Queue an Exchange Settlement Approval.  Required scope: **internal:exchange_settlements:write**
     * Create Exchange Settlement Approval
     */
    internalCreateExchangeSettlementApproval({ guid }: InternalCreateExchangeSettlementApprovalRequest): Observable<InternalCreateExchangeSettlementApproval202ResponseBankModel>
    internalCreateExchangeSettlementApproval({ guid }: InternalCreateExchangeSettlementApprovalRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalCreateExchangeSettlementApproval202ResponseBankModel>>
    internalCreateExchangeSettlementApproval({ guid }: InternalCreateExchangeSettlementApprovalRequest, opts?: OperationOpts): Observable<InternalCreateExchangeSettlementApproval202ResponseBankModel | AjaxResponse<InternalCreateExchangeSettlementApproval202ResponseBankModel>> {
        throwIfNullOrUndefined(guid, 'guid', 'internalCreateExchangeSettlementApproval');

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalCreateExchangeSettlementApproval202ResponseBankModel>({
            url: '/api/internal/exchange_settlements/{guid}/approval'.replace('{guid}', encodeURI(guid)),
            method: 'POST',
            headers,
        }, opts?.responseOpts);
    };

    /**
     * Queue an Exchange Settlement Completion.  Required scope: **internal:exchange_settlements:write**
     * Create Exchange Settlement Completion
     */
    internalCreateExchangeSettlementCompletion({ guid }: InternalCreateExchangeSettlementCompletionRequest): Observable<InternalCreateExchangeSettlementApproval202ResponseBankModel>
    internalCreateExchangeSettlementCompletion({ guid }: InternalCreateExchangeSettlementCompletionRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalCreateExchangeSettlementApproval202ResponseBankModel>>
    internalCreateExchangeSettlementCompletion({ guid }: InternalCreateExchangeSettlementCompletionRequest, opts?: OperationOpts): Observable<InternalCreateExchangeSettlementApproval202ResponseBankModel | AjaxResponse<InternalCreateExchangeSettlementApproval202ResponseBankModel>> {
        throwIfNullOrUndefined(guid, 'guid', 'internalCreateExchangeSettlementCompletion');

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalCreateExchangeSettlementApproval202ResponseBankModel>({
            url: '/api/internal/exchange_settlements/{guid}/completion'.replace('{guid}', encodeURI(guid)),
            method: 'POST',
            headers,
        }, opts?.responseOpts);
    };

    /**
     * Creates a configuration.  Required scope: **internal:exchanges:execute**
     * Create ExchangeSettlementConfiguration
     */
    internalCreateExchangeSettlementConfiguration({ postInternalExchangeSettlementConfigurationBankModel }: InternalCreateExchangeSettlementConfigurationRequest): Observable<InternalExchangeSettlementConfigurationBankModel>
    internalCreateExchangeSettlementConfiguration({ postInternalExchangeSettlementConfigurationBankModel }: InternalCreateExchangeSettlementConfigurationRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalExchangeSettlementConfigurationBankModel>>
    internalCreateExchangeSettlementConfiguration({ postInternalExchangeSettlementConfigurationBankModel }: InternalCreateExchangeSettlementConfigurationRequest, opts?: OperationOpts): Observable<InternalExchangeSettlementConfigurationBankModel | AjaxResponse<InternalExchangeSettlementConfigurationBankModel>> {
        throwIfNullOrUndefined(postInternalExchangeSettlementConfigurationBankModel, 'postInternalExchangeSettlementConfigurationBankModel', 'internalCreateExchangeSettlementConfiguration');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalExchangeSettlementConfigurationBankModel>({
            url: '/api/internal/exchange_settlement_configurations',
            method: 'POST',
            headers,
            body: postInternalExchangeSettlementConfigurationBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Create an Exchange Settlement Payment Orders.  Required scope: **internal:exchange_settlements:execute**
     * Create Exchange Settlement Payment Order
     */
    internalCreateExchangeSettlementPaymentOrder({ postInternalExchangeSettlementPaymentOrderBankModel }: InternalCreateExchangeSettlementPaymentOrderRequest): Observable<InternalExchangeSettlementPaymentOrderBankModel>
    internalCreateExchangeSettlementPaymentOrder({ postInternalExchangeSettlementPaymentOrderBankModel }: InternalCreateExchangeSettlementPaymentOrderRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalExchangeSettlementPaymentOrderBankModel>>
    internalCreateExchangeSettlementPaymentOrder({ postInternalExchangeSettlementPaymentOrderBankModel }: InternalCreateExchangeSettlementPaymentOrderRequest, opts?: OperationOpts): Observable<InternalExchangeSettlementPaymentOrderBankModel | AjaxResponse<InternalExchangeSettlementPaymentOrderBankModel>> {
        throwIfNullOrUndefined(postInternalExchangeSettlementPaymentOrderBankModel, 'postInternalExchangeSettlementPaymentOrderBankModel', 'internalCreateExchangeSettlementPaymentOrder');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalExchangeSettlementPaymentOrderBankModel>({
            url: '/api/internal/exchange_settlement_payment_orders',
            method: 'POST',
            headers,
            body: postInternalExchangeSettlementPaymentOrderBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Create an Expected Payments.  Required scope: **internal:exchange_settlements:execute**
     * Create Expected Payment
     */
    internalCreateExpectedPayment({ postInternalExpectedPaymentBankModel }: InternalCreateExpectedPaymentRequest): Observable<InternalExpectedPaymentBankModel>
    internalCreateExpectedPayment({ postInternalExpectedPaymentBankModel }: InternalCreateExpectedPaymentRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalExpectedPaymentBankModel>>
    internalCreateExpectedPayment({ postInternalExpectedPaymentBankModel }: InternalCreateExpectedPaymentRequest, opts?: OperationOpts): Observable<InternalExpectedPaymentBankModel | AjaxResponse<InternalExpectedPaymentBankModel>> {
        throwIfNullOrUndefined(postInternalExpectedPaymentBankModel, 'postInternalExpectedPaymentBankModel', 'internalCreateExpectedPayment');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalExpectedPaymentBankModel>({
            url: '/api/internal/expected_payments',
            method: 'POST',
            headers,
            body: postInternalExpectedPaymentBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Create an ExternalBankAccount.  Required scope: **internal:accounts:execute**
     * Create ExternalBankAccount
     */
    internalCreateExternalBankAccount({ postInternalExternalBankAccountBankModel }: InternalCreateExternalBankAccountRequest): Observable<InternalExternalBankAccountBankModel>
    internalCreateExternalBankAccount({ postInternalExternalBankAccountBankModel }: InternalCreateExternalBankAccountRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalExternalBankAccountBankModel>>
    internalCreateExternalBankAccount({ postInternalExternalBankAccountBankModel }: InternalCreateExternalBankAccountRequest, opts?: OperationOpts): Observable<InternalExternalBankAccountBankModel | AjaxResponse<InternalExternalBankAccountBankModel>> {
        throwIfNullOrUndefined(postInternalExternalBankAccountBankModel, 'postInternalExternalBankAccountBankModel', 'internalCreateExternalBankAccount');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalExternalBankAccountBankModel>({
            url: '/api/internal/external_bank_accounts',
            method: 'POST',
            headers,
            body: postInternalExternalBankAccountBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Create an ExternalWallet.  Required scope: **internal:accounts:execute**
     * Create ExternalWallet
     */
    internalCreateExternalWallet({ postInternalExternalWalletBankModel }: InternalCreateExternalWalletRequest): Observable<InternalExternalWalletBankModel>
    internalCreateExternalWallet({ postInternalExternalWalletBankModel }: InternalCreateExternalWalletRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalExternalWalletBankModel>>
    internalCreateExternalWallet({ postInternalExternalWalletBankModel }: InternalCreateExternalWalletRequest, opts?: OperationOpts): Observable<InternalExternalWalletBankModel | AjaxResponse<InternalExternalWalletBankModel>> {
        throwIfNullOrUndefined(postInternalExternalWalletBankModel, 'postInternalExternalWalletBankModel', 'internalCreateExternalWallet');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalExternalWalletBankModel>({
            url: '/api/internal/external_wallets',
            method: 'POST',
            headers,
            body: postInternalExternalWalletBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Creates a Fee.Required scope: **internal:fees:execute**
     * Create Fee
     */
    internalCreateFee({ postInternalFeeChargeBankModel }: InternalCreateFeeRequest): Observable<InternalFeeChargeBankModel>
    internalCreateFee({ postInternalFeeChargeBankModel }: InternalCreateFeeRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalFeeChargeBankModel>>
    internalCreateFee({ postInternalFeeChargeBankModel }: InternalCreateFeeRequest, opts?: OperationOpts): Observable<InternalFeeChargeBankModel | AjaxResponse<InternalFeeChargeBankModel>> {
        throwIfNullOrUndefined(postInternalFeeChargeBankModel, 'postInternalFeeChargeBankModel', 'internalCreateFee');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalFeeChargeBankModel>({
            url: '/api/internal/fees',
            method: 'POST',
            headers,
            body: postInternalFeeChargeBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Creates a fee configuration.  Required scope: **internal:banks:write**
     * Create FeeConfiguration
     */
    internalCreateFeeConfiguration({ internalPostFeeConfigurationBankModel }: InternalCreateFeeConfigurationRequest): Observable<InternalFeeConfigurationBankModel>
    internalCreateFeeConfiguration({ internalPostFeeConfigurationBankModel }: InternalCreateFeeConfigurationRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalFeeConfigurationBankModel>>
    internalCreateFeeConfiguration({ internalPostFeeConfigurationBankModel }: InternalCreateFeeConfigurationRequest, opts?: OperationOpts): Observable<InternalFeeConfigurationBankModel | AjaxResponse<InternalFeeConfigurationBankModel>> {
        throwIfNullOrUndefined(internalPostFeeConfigurationBankModel, 'internalPostFeeConfigurationBankModel', 'internalCreateFeeConfiguration');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalFeeConfigurationBankModel>({
            url: '/api/internal/fee_configurations',
            method: 'POST',
            headers,
            body: internalPostFeeConfigurationBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Creates a fiat asset configuration.  Required scope: **internal:banks:write**
     * Create FiatAssetConfiguration
     */
    internalCreateFiatAssetConfiguration({ postInternalFiatAssetConfigurationBankModel }: InternalCreateFiatAssetConfigurationRequest): Observable<InternalFiatAssetConfigurationBankModel>
    internalCreateFiatAssetConfiguration({ postInternalFiatAssetConfigurationBankModel }: InternalCreateFiatAssetConfigurationRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalFiatAssetConfigurationBankModel>>
    internalCreateFiatAssetConfiguration({ postInternalFiatAssetConfigurationBankModel }: InternalCreateFiatAssetConfigurationRequest, opts?: OperationOpts): Observable<InternalFiatAssetConfigurationBankModel | AjaxResponse<InternalFiatAssetConfigurationBankModel>> {
        throwIfNullOrUndefined(postInternalFiatAssetConfigurationBankModel, 'postInternalFiatAssetConfigurationBankModel', 'internalCreateFiatAssetConfiguration');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalFiatAssetConfigurationBankModel>({
            url: '/api/internal/fiat_asset_configurations',
            method: 'POST',
            headers,
            body: postInternalFiatAssetConfigurationBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Creates a file.  Required scope: **internal:files:execute**
     * Create File
     */
    internalCreateFile({ postFileBankModel }: InternalCreateFileRequest): Observable<PlatformFileBankModel>
    internalCreateFile({ postFileBankModel }: InternalCreateFileRequest, opts?: OperationOpts): Observable<AjaxResponse<PlatformFileBankModel>>
    internalCreateFile({ postFileBankModel }: InternalCreateFileRequest, opts?: OperationOpts): Observable<PlatformFileBankModel | AjaxResponse<PlatformFileBankModel>> {
        throwIfNullOrUndefined(postFileBankModel, 'postFileBankModel', 'internalCreateFile');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<PlatformFileBankModel>({
            url: '/api/internal/files',
            method: 'POST',
            headers,
            body: postFileBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Create an InternalBankAccount.  Required scope: **internal:accounts:execute**
     * Create InternalBankAccount
     */
    internalCreateInternalBankAccount({ postInternalInternalBankAccountBankModel }: InternalCreateInternalBankAccountRequest): Observable<InternalInternalBankAccountBankModel>
    internalCreateInternalBankAccount({ postInternalInternalBankAccountBankModel }: InternalCreateInternalBankAccountRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalInternalBankAccountBankModel>>
    internalCreateInternalBankAccount({ postInternalInternalBankAccountBankModel }: InternalCreateInternalBankAccountRequest, opts?: OperationOpts): Observable<InternalInternalBankAccountBankModel | AjaxResponse<InternalInternalBankAccountBankModel>> {
        throwIfNullOrUndefined(postInternalInternalBankAccountBankModel, 'postInternalInternalBankAccountBankModel', 'internalCreateInternalBankAccount');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalInternalBankAccountBankModel>({
            url: '/api/internal/internal_bank_accounts',
            method: 'POST',
            headers,
            body: postInternalInternalBankAccountBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Creates an internal bank account configuration.  Required scope: **internal:banks:write**
     * Create InternalBankAccountConfiguration
     */
    internalCreateInternalBankAccountConfiguration({ postInternalInternalBankAccountConfigurationBankModel }: InternalCreateInternalBankAccountConfigurationRequest): Observable<InternalInternalBankAccountConfigurationBankModel>
    internalCreateInternalBankAccountConfiguration({ postInternalInternalBankAccountConfigurationBankModel }: InternalCreateInternalBankAccountConfigurationRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalInternalBankAccountConfigurationBankModel>>
    internalCreateInternalBankAccountConfiguration({ postInternalInternalBankAccountConfigurationBankModel }: InternalCreateInternalBankAccountConfigurationRequest, opts?: OperationOpts): Observable<InternalInternalBankAccountConfigurationBankModel | AjaxResponse<InternalInternalBankAccountConfigurationBankModel>> {
        throwIfNullOrUndefined(postInternalInternalBankAccountConfigurationBankModel, 'postInternalInternalBankAccountConfigurationBankModel', 'internalCreateInternalBankAccountConfiguration');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalInternalBankAccountConfigurationBankModel>({
            url: '/api/internal/internal_bank_account_configurations',
            method: 'POST',
            headers,
            body: postInternalInternalBankAccountConfigurationBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Create an InternalWallet.  Required scope: **internal:accounts:execute**
     * Create InternalWallet
     */
    internalCreateInternalWallet({ postInternalInternalWalletBankModel }: InternalCreateInternalWalletRequest): Observable<InternalInternalWalletBankModel>
    internalCreateInternalWallet({ postInternalInternalWalletBankModel }: InternalCreateInternalWalletRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalInternalWalletBankModel>>
    internalCreateInternalWallet({ postInternalInternalWalletBankModel }: InternalCreateInternalWalletRequest, opts?: OperationOpts): Observable<InternalInternalWalletBankModel | AjaxResponse<InternalInternalWalletBankModel>> {
        throwIfNullOrUndefined(postInternalInternalWalletBankModel, 'postInternalInternalWalletBankModel', 'internalCreateInternalWallet');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalInternalWalletBankModel>({
            url: '/api/internal/internal_wallets',
            method: 'POST',
            headers,
            body: postInternalInternalWalletBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Creates an internal wallet configuration.  Required scope: **internal:banks:write**
     * Create InternalWalletConfiguration
     */
    internalCreateInternalWalletConfiguration({ postInternalInternalWalletConfigurationBankModel }: InternalCreateInternalWalletConfigurationRequest): Observable<InternalInternalWalletConfigurationBankModel>
    internalCreateInternalWalletConfiguration({ postInternalInternalWalletConfigurationBankModel }: InternalCreateInternalWalletConfigurationRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalInternalWalletConfigurationBankModel>>
    internalCreateInternalWalletConfiguration({ postInternalInternalWalletConfigurationBankModel }: InternalCreateInternalWalletConfigurationRequest, opts?: OperationOpts): Observable<InternalInternalWalletConfigurationBankModel | AjaxResponse<InternalInternalWalletConfigurationBankModel>> {
        throwIfNullOrUndefined(postInternalInternalWalletConfigurationBankModel, 'postInternalInternalWalletConfigurationBankModel', 'internalCreateInternalWalletConfiguration');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalInternalWalletConfigurationBankModel>({
            url: '/api/internal/internal_wallet_configurations',
            method: 'POST',
            headers,
            body: postInternalInternalWalletConfigurationBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Creates a payout symbol configuration.  Required scope: **internal:banks:write**
     * Create PayoutSymbolConfiguration
     */
    internalCreatePayoutSymbolConfiguration({ postInternalPayoutSymbolConfigurationBankModel }: InternalCreatePayoutSymbolConfigurationRequest): Observable<InternalPayoutSymbolConfigurationBankModel>
    internalCreatePayoutSymbolConfiguration({ postInternalPayoutSymbolConfigurationBankModel }: InternalCreatePayoutSymbolConfigurationRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalPayoutSymbolConfigurationBankModel>>
    internalCreatePayoutSymbolConfiguration({ postInternalPayoutSymbolConfigurationBankModel }: InternalCreatePayoutSymbolConfigurationRequest, opts?: OperationOpts): Observable<InternalPayoutSymbolConfigurationBankModel | AjaxResponse<InternalPayoutSymbolConfigurationBankModel>> {
        throwIfNullOrUndefined(postInternalPayoutSymbolConfigurationBankModel, 'postInternalPayoutSymbolConfigurationBankModel', 'internalCreatePayoutSymbolConfiguration');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalPayoutSymbolConfigurationBankModel>({
            url: '/api/internal/payout_symbol_configurations',
            method: 'POST',
            headers,
            body: postInternalPayoutSymbolConfigurationBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Creates a quote.  Required scope: **internal:quotes:read**
     * Create InternalQuote
     */
    internalCreateQuote({ internalPostQuoteBankModel }: InternalCreateQuoteRequest): Observable<InternalQuoteBankModel>
    internalCreateQuote({ internalPostQuoteBankModel }: InternalCreateQuoteRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalQuoteBankModel>>
    internalCreateQuote({ internalPostQuoteBankModel }: InternalCreateQuoteRequest, opts?: OperationOpts): Observable<InternalQuoteBankModel | AjaxResponse<InternalQuoteBankModel>> {
        throwIfNullOrUndefined(internalPostQuoteBankModel, 'internalPostQuoteBankModel', 'internalCreateQuote');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalQuoteBankModel>({
            url: '/api/internal/quotes',
            method: 'POST',
            headers,
            body: internalPostQuoteBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Creates a Reconciliation.Required scope: **internal:transfers:write**
     * Create Reconciliation
     */
    internalCreateReconciliation({ postInternalReconciliationBankModel }: InternalCreateReconciliationRequest): Observable<InternalReconciliationBankModel>
    internalCreateReconciliation({ postInternalReconciliationBankModel }: InternalCreateReconciliationRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalReconciliationBankModel>>
    internalCreateReconciliation({ postInternalReconciliationBankModel }: InternalCreateReconciliationRequest, opts?: OperationOpts): Observable<InternalReconciliationBankModel | AjaxResponse<InternalReconciliationBankModel>> {
        throwIfNullOrUndefined(postInternalReconciliationBankModel, 'postInternalReconciliationBankModel', 'internalCreateReconciliation');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalReconciliationBankModel>({
            url: '/api/internal/reconciliations',
            method: 'POST',
            headers,
            body: postInternalReconciliationBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Create an Stage.  Required scope: **internal:plans:write**
     * Create Stage
     */
    internalCreateStage({ postInternalStageBankModel }: InternalCreateStageRequest): Observable<InternalStageBankModel>
    internalCreateStage({ postInternalStageBankModel }: InternalCreateStageRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalStageBankModel>>
    internalCreateStage({ postInternalStageBankModel }: InternalCreateStageRequest, opts?: OperationOpts): Observable<InternalStageBankModel | AjaxResponse<InternalStageBankModel>> {
        throwIfNullOrUndefined(postInternalStageBankModel, 'postInternalStageBankModel', 'internalCreateStage');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalStageBankModel>({
            url: '/api/internal/stages',
            method: 'POST',
            headers,
            body: postInternalStageBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Creates a trade.  Required scope: **internal:trades:execute**
     * Create Internal Trade
     */
    internalCreateTrade({ postInternalTradeBankModel }: InternalCreateTradeRequest): Observable<InternalTradeBankModel>
    internalCreateTrade({ postInternalTradeBankModel }: InternalCreateTradeRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalTradeBankModel>>
    internalCreateTrade({ postInternalTradeBankModel }: InternalCreateTradeRequest, opts?: OperationOpts): Observable<InternalTradeBankModel | AjaxResponse<InternalTradeBankModel>> {
        throwIfNullOrUndefined(postInternalTradeBankModel, 'postInternalTradeBankModel', 'internalCreateTrade');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalTradeBankModel>({
            url: '/api/internal/trades',
            method: 'POST',
            headers,
            body: postInternalTradeBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Creates a trading symbol configuration.  Required scope: **internal:banks:write**
     * Create TradingSymbolConfiguration
     */
    internalCreateTradingSymbolConfiguration({ postInternalTradingSymbolConfigurationBankModel }: InternalCreateTradingSymbolConfigurationRequest): Observable<InternalTradingSymbolConfigurationBankModel>
    internalCreateTradingSymbolConfiguration({ postInternalTradingSymbolConfigurationBankModel }: InternalCreateTradingSymbolConfigurationRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalTradingSymbolConfigurationBankModel>>
    internalCreateTradingSymbolConfiguration({ postInternalTradingSymbolConfigurationBankModel }: InternalCreateTradingSymbolConfigurationRequest, opts?: OperationOpts): Observable<InternalTradingSymbolConfigurationBankModel | AjaxResponse<InternalTradingSymbolConfigurationBankModel>> {
        throwIfNullOrUndefined(postInternalTradingSymbolConfigurationBankModel, 'postInternalTradingSymbolConfigurationBankModel', 'internalCreateTradingSymbolConfiguration');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalTradingSymbolConfigurationBankModel>({
            url: '/api/internal/trading_symbol_configurations',
            method: 'POST',
            headers,
            body: postInternalTradingSymbolConfigurationBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Creates a TransactionMonitor.Required scope: **internal:transaction_monitors:execute**
     * Create TransactionMonitor
     */
    internalCreateTransactionMonitor({ postInternalTransactionMonitorBankModel }: InternalCreateTransactionMonitorRequest): Observable<InternalTransactionMonitorBankModel>
    internalCreateTransactionMonitor({ postInternalTransactionMonitorBankModel }: InternalCreateTransactionMonitorRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalTransactionMonitorBankModel>>
    internalCreateTransactionMonitor({ postInternalTransactionMonitorBankModel }: InternalCreateTransactionMonitorRequest, opts?: OperationOpts): Observable<InternalTransactionMonitorBankModel | AjaxResponse<InternalTransactionMonitorBankModel>> {
        throwIfNullOrUndefined(postInternalTransactionMonitorBankModel, 'postInternalTransactionMonitorBankModel', 'internalCreateTransactionMonitor');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalTransactionMonitorBankModel>({
            url: '/api/internal/transaction_monitors',
            method: 'POST',
            headers,
            body: postInternalTransactionMonitorBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Create an Transfer.  Required scope: **internal:transfers:execute**
     * Create Transfer
     */
    internalCreateTransfer({ postInternalTransferBankModel }: InternalCreateTransferRequest): Observable<InternalTransferBankModel>
    internalCreateTransfer({ postInternalTransferBankModel }: InternalCreateTransferRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalTransferBankModel>>
    internalCreateTransfer({ postInternalTransferBankModel }: InternalCreateTransferRequest, opts?: OperationOpts): Observable<InternalTransferBankModel | AjaxResponse<InternalTransferBankModel>> {
        throwIfNullOrUndefined(postInternalTransferBankModel, 'postInternalTransferBankModel', 'internalCreateTransfer');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalTransferBankModel>({
            url: '/api/internal/transfers',
            method: 'POST',
            headers,
            body: postInternalTransferBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Creates a transfer rail configuration.  Required scope: **internal:banks:write**
     * Create TransferRailConfiguration
     */
    internalCreateTransferRailConfiguration({ postInternalTransferRailConfigurationBankModel }: InternalCreateTransferRailConfigurationRequest): Observable<InternalTransferRailConfigurationBankModel>
    internalCreateTransferRailConfiguration({ postInternalTransferRailConfigurationBankModel }: InternalCreateTransferRailConfigurationRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalTransferRailConfigurationBankModel>>
    internalCreateTransferRailConfiguration({ postInternalTransferRailConfigurationBankModel }: InternalCreateTransferRailConfigurationRequest, opts?: OperationOpts): Observable<InternalTransferRailConfigurationBankModel | AjaxResponse<InternalTransferRailConfigurationBankModel>> {
        throwIfNullOrUndefined(postInternalTransferRailConfigurationBankModel, 'postInternalTransferRailConfigurationBankModel', 'internalCreateTransferRailConfiguration');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalTransferRailConfigurationBankModel>({
            url: '/api/internal/transfer_rail_configurations',
            method: 'POST',
            headers,
            body: postInternalTransferRailConfigurationBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Create an TransferScreening.  Required scope: **internal:accounts:execute**
     * Create TransferScreening
     */
    internalCreateTransferScreening({ postInternalTransferScreeningBankModel }: InternalCreateTransferScreeningRequest): Observable<InternalTransferScreeningBankModel>
    internalCreateTransferScreening({ postInternalTransferScreeningBankModel }: InternalCreateTransferScreeningRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalTransferScreeningBankModel>>
    internalCreateTransferScreening({ postInternalTransferScreeningBankModel }: InternalCreateTransferScreeningRequest, opts?: OperationOpts): Observable<InternalTransferScreeningBankModel | AjaxResponse<InternalTransferScreeningBankModel>> {
        throwIfNullOrUndefined(postInternalTransferScreeningBankModel, 'postInternalTransferScreeningBankModel', 'internalCreateTransferScreening');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalTransferScreeningBankModel>({
            url: '/api/internal/transfer_screenings',
            method: 'POST',
            headers,
            body: postInternalTransferScreeningBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Create an WalletService.  Required scope: **internal:wallet_services:execute**
     * Create WalletService
     */
    internalCreateWalletService({ postInternalWalletServiceBankModel }: InternalCreateWalletServiceRequest): Observable<InternalWalletServiceBankModel>
    internalCreateWalletService({ postInternalWalletServiceBankModel }: InternalCreateWalletServiceRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalWalletServiceBankModel>>
    internalCreateWalletService({ postInternalWalletServiceBankModel }: InternalCreateWalletServiceRequest, opts?: OperationOpts): Observable<InternalWalletServiceBankModel | AjaxResponse<InternalWalletServiceBankModel>> {
        throwIfNullOrUndefined(postInternalWalletServiceBankModel, 'postInternalWalletServiceBankModel', 'internalCreateWalletService');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalWalletServiceBankModel>({
            url: '/api/internal/wallet_services',
            method: 'POST',
            headers,
            body: postInternalWalletServiceBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Create a Crypto Funding Deposit Transfer.  Required scope: **internal:transfers:execute**
     * Create Crypto Funding Deposit Transfer
     */
    internalCryptoFundingDepositTransfer({ postInternalCryptoFundingDepositTransferBankModel }: InternalCryptoFundingDepositTransferRequest): Observable<InternalCryptoFundingDepositTransferBankModel>
    internalCryptoFundingDepositTransfer({ postInternalCryptoFundingDepositTransferBankModel }: InternalCryptoFundingDepositTransferRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalCryptoFundingDepositTransferBankModel>>
    internalCryptoFundingDepositTransfer({ postInternalCryptoFundingDepositTransferBankModel }: InternalCryptoFundingDepositTransferRequest, opts?: OperationOpts): Observable<InternalCryptoFundingDepositTransferBankModel | AjaxResponse<InternalCryptoFundingDepositTransferBankModel>> {
        throwIfNullOrUndefined(postInternalCryptoFundingDepositTransferBankModel, 'postInternalCryptoFundingDepositTransferBankModel', 'internalCryptoFundingDepositTransfer');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalCryptoFundingDepositTransferBankModel>({
            url: '/api/internal/crypto_funding_deposit_transfers',
            method: 'POST',
            headers,
            body: postInternalCryptoFundingDepositTransferBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Deletes an activity limit configuration.  Required scope: **internal:banks:write**
     * Delete ActivityLimitConfiguration
     */
    internalDeleteActivityLimitConfiguration({ guid }: InternalDeleteActivityLimitConfigurationRequest): Observable<InternalActivityLimitConfigurationBankModel>
    internalDeleteActivityLimitConfiguration({ guid }: InternalDeleteActivityLimitConfigurationRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalActivityLimitConfigurationBankModel>>
    internalDeleteActivityLimitConfiguration({ guid }: InternalDeleteActivityLimitConfigurationRequest, opts?: OperationOpts): Observable<InternalActivityLimitConfigurationBankModel | AjaxResponse<InternalActivityLimitConfigurationBankModel>> {
        throwIfNullOrUndefined(guid, 'guid', 'internalDeleteActivityLimitConfiguration');

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalActivityLimitConfigurationBankModel>({
            url: '/api/internal/activity_limit_configurations/{guid}'.replace('{guid}', encodeURI(guid)),
            method: 'DELETE',
            headers,
        }, opts?.responseOpts);
    };

    /**
     * Deletes an external bank account.  Required scope: **internal:accounts:execute**
     * Delete External Bank Account
     */
    internalDeleteExternalBankAccount({ externalBankAccountGuid }: InternalDeleteExternalBankAccountRequest): Observable<InternalExternalBankAccountBankModel>
    internalDeleteExternalBankAccount({ externalBankAccountGuid }: InternalDeleteExternalBankAccountRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalExternalBankAccountBankModel>>
    internalDeleteExternalBankAccount({ externalBankAccountGuid }: InternalDeleteExternalBankAccountRequest, opts?: OperationOpts): Observable<InternalExternalBankAccountBankModel | AjaxResponse<InternalExternalBankAccountBankModel>> {
        throwIfNullOrUndefined(externalBankAccountGuid, 'externalBankAccountGuid', 'internalDeleteExternalBankAccount');

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalExternalBankAccountBankModel>({
            url: '/api/internal/external_bank_accounts/{external_bank_account_guid}'.replace('{external_bank_account_guid}', encodeURI(externalBankAccountGuid)),
            method: 'DELETE',
            headers,
        }, opts?.responseOpts);
    };

    /**
     * Create a Funding Deposit Transfer.  Required scope: **internal:transfers:execute**
     * Create Funding Deposit Transfer
     */
    internalFundingDepositTransfer({ postInternalFundingDepositTransferBankModel }: InternalFundingDepositTransferRequest): Observable<InternalFundingDepositTransferBankModel>
    internalFundingDepositTransfer({ postInternalFundingDepositTransferBankModel }: InternalFundingDepositTransferRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalFundingDepositTransferBankModel>>
    internalFundingDepositTransfer({ postInternalFundingDepositTransferBankModel }: InternalFundingDepositTransferRequest, opts?: OperationOpts): Observable<InternalFundingDepositTransferBankModel | AjaxResponse<InternalFundingDepositTransferBankModel>> {
        throwIfNullOrUndefined(postInternalFundingDepositTransferBankModel, 'postInternalFundingDepositTransferBankModel', 'internalFundingDepositTransfer');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalFundingDepositTransferBankModel>({
            url: '/api/internal/funding_deposit_transfers',
            method: 'POST',
            headers,
            body: postInternalFundingDepositTransferBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Retrieves a bank.  Required scope: **internal:banks:read**
     * Get Bank
     */
    internalGetBank({ bankGuid }: InternalGetBankRequest): Observable<InternalBankBankModel>
    internalGetBank({ bankGuid }: InternalGetBankRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalBankBankModel>>
    internalGetBank({ bankGuid }: InternalGetBankRequest, opts?: OperationOpts): Observable<InternalBankBankModel | AjaxResponse<InternalBankBankModel>> {
        throwIfNullOrUndefined(bankGuid, 'bankGuid', 'internalGetBank');

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalBankBankModel>({
            url: '/api/internal/banks/{bank_guid}'.replace('{bank_guid}', encodeURI(bankGuid)),
            method: 'GET',
            headers,
        }, opts?.responseOpts);
    };

    /**
     * Retrieves a bank_account service.  Required scope: **internal:bank_account_services:read**
     * Get BankAccountService
     */
    internalGetBankAccountService({ bankAccountServiceGuid }: InternalGetBankAccountServiceRequest): Observable<InternalBankAccountServiceBankModel>
    internalGetBankAccountService({ bankAccountServiceGuid }: InternalGetBankAccountServiceRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalBankAccountServiceBankModel>>
    internalGetBankAccountService({ bankAccountServiceGuid }: InternalGetBankAccountServiceRequest, opts?: OperationOpts): Observable<InternalBankAccountServiceBankModel | AjaxResponse<InternalBankAccountServiceBankModel>> {
        throwIfNullOrUndefined(bankAccountServiceGuid, 'bankAccountServiceGuid', 'internalGetBankAccountService');

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalBankAccountServiceBankModel>({
            url: '/api/internal/bank_account_services/{bank_account_service_guid}'.replace('{bank_account_service_guid}', encodeURI(bankAccountServiceGuid)),
            method: 'GET',
            headers,
        }, opts?.responseOpts);
    };

    /**
     * Retrieves a customer.  Required scope: **internal:customers:read**
     * Get Customer
     */
    internalGetCustomer({ customerGuid }: InternalGetCustomerRequest): Observable<CustomerBankModel>
    internalGetCustomer({ customerGuid }: InternalGetCustomerRequest, opts?: OperationOpts): Observable<AjaxResponse<CustomerBankModel>>
    internalGetCustomer({ customerGuid }: InternalGetCustomerRequest, opts?: OperationOpts): Observable<CustomerBankModel | AjaxResponse<CustomerBankModel>> {
        throwIfNullOrUndefined(customerGuid, 'customerGuid', 'internalGetCustomer');

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<CustomerBankModel>({
            url: '/api/internal/customers/{customer_guid}'.replace('{customer_guid}', encodeURI(customerGuid)),
            method: 'GET',
            headers,
        }, opts?.responseOpts);
    };

    /**
     * Get an CybridAccount.  Required scope: **internal:cybrid_accounts:read**
     * Get CybridAccount
     */
    internalGetCybridAccount({ accountGuid }: InternalGetCybridAccountRequest): Observable<InternalCybridAccountBankModel>
    internalGetCybridAccount({ accountGuid }: InternalGetCybridAccountRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalCybridAccountBankModel>>
    internalGetCybridAccount({ accountGuid }: InternalGetCybridAccountRequest, opts?: OperationOpts): Observable<InternalCybridAccountBankModel | AjaxResponse<InternalCybridAccountBankModel>> {
        throwIfNullOrUndefined(accountGuid, 'accountGuid', 'internalGetCybridAccount');

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalCybridAccountBankModel>({
            url: '/api/internal/cybrid_accounts/{account_guid}'.replace('{account_guid}', encodeURI(accountGuid)),
            method: 'GET',
            headers,
        }, opts?.responseOpts);
    };

    /**
     * Get an Exchange.  Required scope: **internal:exchanges:read**
     * Get Exchange
     */
    internalGetExchange({ exchangeGuid }: InternalGetExchangeRequest): Observable<InternalExchangeBankModel>
    internalGetExchange({ exchangeGuid }: InternalGetExchangeRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalExchangeBankModel>>
    internalGetExchange({ exchangeGuid }: InternalGetExchangeRequest, opts?: OperationOpts): Observable<InternalExchangeBankModel | AjaxResponse<InternalExchangeBankModel>> {
        throwIfNullOrUndefined(exchangeGuid, 'exchangeGuid', 'internalGetExchange');

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalExchangeBankModel>({
            url: '/api/internal/exchanges/{exchange_guid}'.replace('{exchange_guid}', encodeURI(exchangeGuid)),
            method: 'GET',
            headers,
        }, opts?.responseOpts);
    };

    /**
     * Get an ExchangeAccount.  Required scope: **internal:exchange_accounts:read**
     * Get ExchangeAccount
     */
    internalGetExchangeAccount({ accountGuid }: InternalGetExchangeAccountRequest): Observable<InternalExchangeAccountBankModel>
    internalGetExchangeAccount({ accountGuid }: InternalGetExchangeAccountRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalExchangeAccountBankModel>>
    internalGetExchangeAccount({ accountGuid }: InternalGetExchangeAccountRequest, opts?: OperationOpts): Observable<InternalExchangeAccountBankModel | AjaxResponse<InternalExchangeAccountBankModel>> {
        throwIfNullOrUndefined(accountGuid, 'accountGuid', 'internalGetExchangeAccount');

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalExchangeAccountBankModel>({
            url: '/api/internal/exchange_accounts/{account_guid}'.replace('{account_guid}', encodeURI(accountGuid)),
            method: 'GET',
            headers,
        }, opts?.responseOpts);
    };

    /**
     * Get an Exchange Settlement.  Required scope: **internal:exchange_settlements:read**
     * Get Exchange Settlement
     */
    internalGetExchangeSettlement({ guid }: InternalGetExchangeSettlementRequest): Observable<InternalExchangeSettlementBankModel>
    internalGetExchangeSettlement({ guid }: InternalGetExchangeSettlementRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalExchangeSettlementBankModel>>
    internalGetExchangeSettlement({ guid }: InternalGetExchangeSettlementRequest, opts?: OperationOpts): Observable<InternalExchangeSettlementBankModel | AjaxResponse<InternalExchangeSettlementBankModel>> {
        throwIfNullOrUndefined(guid, 'guid', 'internalGetExchangeSettlement');

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalExchangeSettlementBankModel>({
            url: '/api/internal/exchange_settlements/{guid}'.replace('{guid}', encodeURI(guid)),
            method: 'GET',
            headers,
        }, opts?.responseOpts);
    };

    /**
     * Get an Exchange Settlement Obligation.  Required scope: **internal:exchange_settlements:read**
     * Get Exchange Settlement Obligation
     */
    internalGetExchangeSettlementObligation({ guid }: InternalGetExchangeSettlementObligationRequest): Observable<InternalExchangeSettlementObligationBankModel>
    internalGetExchangeSettlementObligation({ guid }: InternalGetExchangeSettlementObligationRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalExchangeSettlementObligationBankModel>>
    internalGetExchangeSettlementObligation({ guid }: InternalGetExchangeSettlementObligationRequest, opts?: OperationOpts): Observable<InternalExchangeSettlementObligationBankModel | AjaxResponse<InternalExchangeSettlementObligationBankModel>> {
        throwIfNullOrUndefined(guid, 'guid', 'internalGetExchangeSettlementObligation');

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalExchangeSettlementObligationBankModel>({
            url: '/api/internal/exchange_settlement_obligations/{guid}'.replace('{guid}', encodeURI(guid)),
            method: 'GET',
            headers,
        }, opts?.responseOpts);
    };

    /**
     * Get an Exchange Settlement Payment Order.  Required scope: **internal:exchange_settlements:read**
     * Get Exchange Settlement Payment Order
     */
    internalGetExchangeSettlementPaymentOrder({ guid }: InternalGetExchangeSettlementPaymentOrderRequest): Observable<InternalExchangeSettlementPaymentOrderBankModel>
    internalGetExchangeSettlementPaymentOrder({ guid }: InternalGetExchangeSettlementPaymentOrderRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalExchangeSettlementPaymentOrderBankModel>>
    internalGetExchangeSettlementPaymentOrder({ guid }: InternalGetExchangeSettlementPaymentOrderRequest, opts?: OperationOpts): Observable<InternalExchangeSettlementPaymentOrderBankModel | AjaxResponse<InternalExchangeSettlementPaymentOrderBankModel>> {
        throwIfNullOrUndefined(guid, 'guid', 'internalGetExchangeSettlementPaymentOrder');

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalExchangeSettlementPaymentOrderBankModel>({
            url: '/api/internal/exchange_settlement_payment_orders/{guid}'.replace('{guid}', encodeURI(guid)),
            method: 'GET',
            headers,
        }, opts?.responseOpts);
    };

    /**
     * Retrieves a execution.  Required scope: **internal:executions:read**
     * Get Execution
     */
    internalGetExecution({ executionGuid }: InternalGetExecutionRequest): Observable<InternalExecutionBankModel>
    internalGetExecution({ executionGuid }: InternalGetExecutionRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalExecutionBankModel>>
    internalGetExecution({ executionGuid }: InternalGetExecutionRequest, opts?: OperationOpts): Observable<InternalExecutionBankModel | AjaxResponse<InternalExecutionBankModel>> {
        throwIfNullOrUndefined(executionGuid, 'executionGuid', 'internalGetExecution');

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalExecutionBankModel>({
            url: '/api/internal/executions/{execution_guid}'.replace('{execution_guid}', encodeURI(executionGuid)),
            method: 'GET',
            headers,
        }, opts?.responseOpts);
    };

    /**
     * Get an Expected Payment.  Required scope: **internal:exchange_settlements:read**
     * Get Expected Payment
     */
    internalGetExpectedPayment({ guid }: InternalGetExpectedPaymentRequest): Observable<InternalExpectedPaymentBankModel>
    internalGetExpectedPayment({ guid }: InternalGetExpectedPaymentRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalExpectedPaymentBankModel>>
    internalGetExpectedPayment({ guid }: InternalGetExpectedPaymentRequest, opts?: OperationOpts): Observable<InternalExpectedPaymentBankModel | AjaxResponse<InternalExpectedPaymentBankModel>> {
        throwIfNullOrUndefined(guid, 'guid', 'internalGetExpectedPayment');

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalExpectedPaymentBankModel>({
            url: '/api/internal/expected_payments/{guid}'.replace('{guid}', encodeURI(guid)),
            method: 'GET',
            headers,
        }, opts?.responseOpts);
    };

    /**
     * Retrieves an external bank account.  Required scope: **internal:accounts:read**
     * Get ExternalBankAccount
     */
    internalGetExternalBankAccount({ externalBankAccountGuid, forceBalanceRefresh, includeBalances, includePii }: InternalGetExternalBankAccountRequest): Observable<InternalExternalBankAccountBankModel>
    internalGetExternalBankAccount({ externalBankAccountGuid, forceBalanceRefresh, includeBalances, includePii }: InternalGetExternalBankAccountRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalExternalBankAccountBankModel>>
    internalGetExternalBankAccount({ externalBankAccountGuid, forceBalanceRefresh, includeBalances, includePii }: InternalGetExternalBankAccountRequest, opts?: OperationOpts): Observable<InternalExternalBankAccountBankModel | AjaxResponse<InternalExternalBankAccountBankModel>> {
        throwIfNullOrUndefined(externalBankAccountGuid, 'externalBankAccountGuid', 'internalGetExternalBankAccount');

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        const query: HttpQuery = {};

        if (forceBalanceRefresh != null) { query['force_balance_refresh'] = forceBalanceRefresh; }
        if (includeBalances != null) { query['include_balances'] = includeBalances; }
        if (includePii != null) { query['include_pii'] = includePii; }

        return this.request<InternalExternalBankAccountBankModel>({
            url: '/api/internal/external_bank_accounts/{external_bank_account_guid}'.replace('{external_bank_account_guid}', encodeURI(externalBankAccountGuid)),
            method: 'GET',
            headers,
            query,
        }, opts?.responseOpts);
    };

    /**
     * Retrieves an internal wallet.  Required scope: **internal:accounts:read**
     * Get ExternalWallet
     */
    internalGetExternalWallet({ externalWalletGuid }: InternalGetExternalWalletRequest): Observable<InternalExternalWalletBankModel>
    internalGetExternalWallet({ externalWalletGuid }: InternalGetExternalWalletRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalExternalWalletBankModel>>
    internalGetExternalWallet({ externalWalletGuid }: InternalGetExternalWalletRequest, opts?: OperationOpts): Observable<InternalExternalWalletBankModel | AjaxResponse<InternalExternalWalletBankModel>> {
        throwIfNullOrUndefined(externalWalletGuid, 'externalWalletGuid', 'internalGetExternalWallet');

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalExternalWalletBankModel>({
            url: '/api/internal/external_wallets/{external_wallet_guid}'.replace('{external_wallet_guid}', encodeURI(externalWalletGuid)),
            method: 'GET',
            headers,
        }, opts?.responseOpts);
    };

    /**
     * Retrieves an external wallet screening.  Required scope: **internal:external_wallet_screenings:read**
     * Get ExternalWalletScreening
     */
    internalGetExternalWalletScreening({ externalWalletScreeningGuid }: InternalGetExternalWalletScreeningRequest): Observable<InternalExternalWalletScreeningBankModel>
    internalGetExternalWalletScreening({ externalWalletScreeningGuid }: InternalGetExternalWalletScreeningRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalExternalWalletScreeningBankModel>>
    internalGetExternalWalletScreening({ externalWalletScreeningGuid }: InternalGetExternalWalletScreeningRequest, opts?: OperationOpts): Observable<InternalExternalWalletScreeningBankModel | AjaxResponse<InternalExternalWalletScreeningBankModel>> {
        throwIfNullOrUndefined(externalWalletScreeningGuid, 'externalWalletScreeningGuid', 'internalGetExternalWalletScreening');

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalExternalWalletScreeningBankModel>({
            url: '/api/internal/external_wallet_screenings/{external_wallet_screening_guid}'.replace('{external_wallet_screening_guid}', encodeURI(externalWalletScreeningGuid)),
            method: 'GET',
            headers,
        }, opts?.responseOpts);
    };

    /**
     * Retrieves an file.  Required scope: **internal:files:read**
     * Get File
     */
    internalGetFile({ fileGuid }: InternalGetFileRequest): Observable<PlatformFileBankModel>
    internalGetFile({ fileGuid }: InternalGetFileRequest, opts?: OperationOpts): Observable<AjaxResponse<PlatformFileBankModel>>
    internalGetFile({ fileGuid }: InternalGetFileRequest, opts?: OperationOpts): Observable<PlatformFileBankModel | AjaxResponse<PlatformFileBankModel>> {
        throwIfNullOrUndefined(fileGuid, 'fileGuid', 'internalGetFile');

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<PlatformFileBankModel>({
            url: '/api/internal/files/{file_guid}'.replace('{file_guid}', encodeURI(fileGuid)),
            method: 'GET',
            headers,
        }, opts?.responseOpts);
    };

    /**
     * Retrieves an internal bank account.  Required scope: **internal:accounts:read**
     * Get InternalBankAccount
     */
    internalGetInternalBankAccount({ internalBankAccountGuid }: InternalGetInternalBankAccountRequest): Observable<InternalInternalBankAccountBankModel>
    internalGetInternalBankAccount({ internalBankAccountGuid }: InternalGetInternalBankAccountRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalInternalBankAccountBankModel>>
    internalGetInternalBankAccount({ internalBankAccountGuid }: InternalGetInternalBankAccountRequest, opts?: OperationOpts): Observable<InternalInternalBankAccountBankModel | AjaxResponse<InternalInternalBankAccountBankModel>> {
        throwIfNullOrUndefined(internalBankAccountGuid, 'internalBankAccountGuid', 'internalGetInternalBankAccount');

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalInternalBankAccountBankModel>({
            url: '/api/internal/internal_bank_accounts/{internal_bank_account_guid}'.replace('{internal_bank_account_guid}', encodeURI(internalBankAccountGuid)),
            method: 'GET',
            headers,
        }, opts?.responseOpts);
    };

    /**
     * Retrieves an internal wallet.  Required scope: **internal:accounts:read**
     * Get InternalWallet
     */
    internalGetInternalWallet({ internalWalletGuid }: InternalGetInternalWalletRequest): Observable<InternalInternalWalletBankModel>
    internalGetInternalWallet({ internalWalletGuid }: InternalGetInternalWalletRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalInternalWalletBankModel>>
    internalGetInternalWallet({ internalWalletGuid }: InternalGetInternalWalletRequest, opts?: OperationOpts): Observable<InternalInternalWalletBankModel | AjaxResponse<InternalInternalWalletBankModel>> {
        throwIfNullOrUndefined(internalWalletGuid, 'internalWalletGuid', 'internalGetInternalWallet');

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalInternalWalletBankModel>({
            url: '/api/internal/internal_wallets/{internal_wallet_guid}'.replace('{internal_wallet_guid}', encodeURI(internalWalletGuid)),
            method: 'GET',
            headers,
        }, opts?.responseOpts);
    };

    /**
     * Retrieves an invoice.  Required scope: **internal:invoices:read**
     * Get Invoice
     */
    internalGetInvoice({ invoiceGuid }: InternalGetInvoiceRequest): Observable<InternalInvoiceBankModel>
    internalGetInvoice({ invoiceGuid }: InternalGetInvoiceRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalInvoiceBankModel>>
    internalGetInvoice({ invoiceGuid }: InternalGetInvoiceRequest, opts?: OperationOpts): Observable<InternalInvoiceBankModel | AjaxResponse<InternalInvoiceBankModel>> {
        throwIfNullOrUndefined(invoiceGuid, 'invoiceGuid', 'internalGetInvoice');

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalInvoiceBankModel>({
            url: '/api/internal/invoices/{invoice_guid}'.replace('{invoice_guid}', encodeURI(invoiceGuid)),
            method: 'GET',
            headers,
        }, opts?.responseOpts);
    };

    /**
     * Retrieves a plan.  Required scope: **internal:plans:read**
     * Get Plan
     */
    internalGetPlan({ planGuid }: InternalGetPlanRequest): Observable<InternalPlanBankModel>
    internalGetPlan({ planGuid }: InternalGetPlanRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalPlanBankModel>>
    internalGetPlan({ planGuid }: InternalGetPlanRequest, opts?: OperationOpts): Observable<InternalPlanBankModel | AjaxResponse<InternalPlanBankModel>> {
        throwIfNullOrUndefined(planGuid, 'planGuid', 'internalGetPlan');

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalPlanBankModel>({
            url: '/api/internal/plans/{plan_guid}'.replace('{plan_guid}', encodeURI(planGuid)),
            method: 'GET',
            headers,
        }, opts?.responseOpts);
    };

    /**
     * Retrieves a quote.  Required scope: **internal:quotes:read**
     * Get Internal Quote
     */
    internalGetQuote({ quoteGuid }: InternalGetQuoteRequest): Observable<InternalQuoteBankModel>
    internalGetQuote({ quoteGuid }: InternalGetQuoteRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalQuoteBankModel>>
    internalGetQuote({ quoteGuid }: InternalGetQuoteRequest, opts?: OperationOpts): Observable<InternalQuoteBankModel | AjaxResponse<InternalQuoteBankModel>> {
        throwIfNullOrUndefined(quoteGuid, 'quoteGuid', 'internalGetQuote');

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalQuoteBankModel>({
            url: '/api/internal/quotes/{quote_guid}'.replace('{quote_guid}', encodeURI(quoteGuid)),
            method: 'GET',
            headers,
        }, opts?.responseOpts);
    };

    /**
     * Retrieves a reconciliation.  Required scope: **internal:transfers:read**
     * Get Reconciliation
     */
    internalGetReconciliation({ guid }: InternalGetReconciliationRequest): Observable<InternalReconciliationBankModel>
    internalGetReconciliation({ guid }: InternalGetReconciliationRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalReconciliationBankModel>>
    internalGetReconciliation({ guid }: InternalGetReconciliationRequest, opts?: OperationOpts): Observable<InternalReconciliationBankModel | AjaxResponse<InternalReconciliationBankModel>> {
        throwIfNullOrUndefined(guid, 'guid', 'internalGetReconciliation');

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalReconciliationBankModel>({
            url: '/api/internal/reconciliations/{guid}'.replace('{guid}', encodeURI(guid)),
            method: 'GET',
            headers,
        }, opts?.responseOpts);
    };

    /**
     * Retrieves a trade.  Required scope: **internal:trades:read**
     * Get Internal Trade
     */
    internalGetTrade({ tradeGuid }: InternalGetTradeRequest): Observable<InternalTradeBankModel>
    internalGetTrade({ tradeGuid }: InternalGetTradeRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalTradeBankModel>>
    internalGetTrade({ tradeGuid }: InternalGetTradeRequest, opts?: OperationOpts): Observable<InternalTradeBankModel | AjaxResponse<InternalTradeBankModel>> {
        throwIfNullOrUndefined(tradeGuid, 'tradeGuid', 'internalGetTrade');

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalTradeBankModel>({
            url: '/api/internal/trades/{trade_guid}'.replace('{trade_guid}', encodeURI(tradeGuid)),
            method: 'GET',
            headers,
        }, opts?.responseOpts);
    };

    /**
     * Retrieves an internal transfer.  Required scope: **internal:transfers:read**
     * Get Transfer
     */
    internalGetTransfer({ guid, includeProviderInfo }: InternalGetTransferRequest): Observable<InternalTransferBankModel>
    internalGetTransfer({ guid, includeProviderInfo }: InternalGetTransferRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalTransferBankModel>>
    internalGetTransfer({ guid, includeProviderInfo }: InternalGetTransferRequest, opts?: OperationOpts): Observable<InternalTransferBankModel | AjaxResponse<InternalTransferBankModel>> {
        throwIfNullOrUndefined(guid, 'guid', 'internalGetTransfer');

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        const query: HttpQuery = {};

        if (includeProviderInfo != null) { query['include_provider_info'] = includeProviderInfo; }

        return this.request<InternalTransferBankModel>({
            url: '/api/internal/transfers/{guid}'.replace('{guid}', encodeURI(guid)),
            method: 'GET',
            headers,
            query,
        }, opts?.responseOpts);
    };

    /**
     * Retrieves an transfer screening.  Required scope: **internal:transfer_screenings:read**
     * Get TransferScreening
     */
    internalGetTransferScreening({ transferScreeningGuid }: InternalGetTransferScreeningRequest): Observable<InternalTransferScreeningBankModel>
    internalGetTransferScreening({ transferScreeningGuid }: InternalGetTransferScreeningRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalTransferScreeningBankModel>>
    internalGetTransferScreening({ transferScreeningGuid }: InternalGetTransferScreeningRequest, opts?: OperationOpts): Observable<InternalTransferScreeningBankModel | AjaxResponse<InternalTransferScreeningBankModel>> {
        throwIfNullOrUndefined(transferScreeningGuid, 'transferScreeningGuid', 'internalGetTransferScreening');

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalTransferScreeningBankModel>({
            url: '/api/internal/transfer_screenings/{transfer_screening_guid}'.replace('{transfer_screening_guid}', encodeURI(transferScreeningGuid)),
            method: 'GET',
            headers,
        }, opts?.responseOpts);
    };

    /**
     * Retrieves a wallet service.  Required scope: **internal:wallet_services:read**
     * Get WalletService
     */
    internalGetWalletService({ walletServiceGuid }: InternalGetWalletServiceRequest): Observable<InternalWalletServiceBankModel>
    internalGetWalletService({ walletServiceGuid }: InternalGetWalletServiceRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalWalletServiceBankModel>>
    internalGetWalletService({ walletServiceGuid }: InternalGetWalletServiceRequest, opts?: OperationOpts): Observable<InternalWalletServiceBankModel | AjaxResponse<InternalWalletServiceBankModel>> {
        throwIfNullOrUndefined(walletServiceGuid, 'walletServiceGuid', 'internalGetWalletService');

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalWalletServiceBankModel>({
            url: '/api/internal/wallet_services/{wallet_service_guid}'.replace('{wallet_service_guid}', encodeURI(walletServiceGuid)),
            method: 'GET',
            headers,
        }, opts?.responseOpts);
    };

    /**
     * Retrieves a list of accounts.  Required scope: **internal:accounts:read**
     * List Accounts
     */
    internalListAccounts({ page, perPage, owner, guid, customerGuid, bankGuid, type, asset }: InternalListAccountsRequest): Observable<AccountListBankModel>
    internalListAccounts({ page, perPage, owner, guid, customerGuid, bankGuid, type, asset }: InternalListAccountsRequest, opts?: OperationOpts): Observable<AjaxResponse<AccountListBankModel>>
    internalListAccounts({ page, perPage, owner, guid, customerGuid, bankGuid, type, asset }: InternalListAccountsRequest, opts?: OperationOpts): Observable<AccountListBankModel | AjaxResponse<AccountListBankModel>> {

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        const query: HttpQuery = {};

        if (page != null) { query['page'] = page; }
        if (perPage != null) { query['per_page'] = perPage; }
        if (owner != null) { query['owner'] = owner; }
        if (guid != null) { query['guid'] = guid; }
        if (customerGuid != null) { query['customer_guid'] = customerGuid; }
        if (bankGuid != null) { query['bank_guid'] = bankGuid; }
        if (type != null) { query['type'] = type; }
        if (asset != null) { query['asset'] = asset; }

        return this.request<AccountListBankModel>({
            url: '/api/internal/accounts',
            method: 'GET',
            headers,
            query,
        }, opts?.responseOpts);
    };

    /**
     * Retrieves a listing of activity limit configurations.  Required scope: **internal:banks:read**
     * List ActivityLimitConfigurations
     */
    internalListActivityLimitConfigurations({ page, perPage, type, environment, guid, customerGuid, bankGuid, audience, countryCode, activity, side }: InternalListActivityLimitConfigurationsRequest): Observable<InternalActivityLimitConfigurationListBankModel>
    internalListActivityLimitConfigurations({ page, perPage, type, environment, guid, customerGuid, bankGuid, audience, countryCode, activity, side }: InternalListActivityLimitConfigurationsRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalActivityLimitConfigurationListBankModel>>
    internalListActivityLimitConfigurations({ page, perPage, type, environment, guid, customerGuid, bankGuid, audience, countryCode, activity, side }: InternalListActivityLimitConfigurationsRequest, opts?: OperationOpts): Observable<InternalActivityLimitConfigurationListBankModel | AjaxResponse<InternalActivityLimitConfigurationListBankModel>> {

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        const query: HttpQuery = {};

        if (page != null) { query['page'] = page; }
        if (perPage != null) { query['per_page'] = perPage; }
        if (type != null) { query['type'] = type; }
        if (environment != null) { query['environment'] = environment; }
        if (guid != null) { query['guid'] = guid; }
        if (customerGuid != null) { query['customer_guid'] = customerGuid; }
        if (bankGuid != null) { query['bank_guid'] = bankGuid; }
        if (audience != null) { query['audience'] = audience; }
        if (countryCode != null) { query['country_code'] = countryCode; }
        if (activity != null) { query['activity'] = activity; }
        if (side != null) { query['side'] = side; }

        return this.request<InternalActivityLimitConfigurationListBankModel>({
            url: '/api/internal/activity_limit_configurations',
            method: 'GET',
            headers,
            query,
        }, opts?.responseOpts);
    };

    /**
     * Retrieves a listing of bank_account services.  Required scope: **internal:bank_account_services:read**
     * List BankAccountServices
     */
    internalListBankAccountServices({ page, perPage, environment, guid, type }: InternalListBankAccountServicesRequest): Observable<InternalBankAccountServiceListBankModel>
    internalListBankAccountServices({ page, perPage, environment, guid, type }: InternalListBankAccountServicesRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalBankAccountServiceListBankModel>>
    internalListBankAccountServices({ page, perPage, environment, guid, type }: InternalListBankAccountServicesRequest, opts?: OperationOpts): Observable<InternalBankAccountServiceListBankModel | AjaxResponse<InternalBankAccountServiceListBankModel>> {

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        const query: HttpQuery = {};

        if (page != null) { query['page'] = page; }
        if (perPage != null) { query['per_page'] = perPage; }
        if (environment != null) { query['environment'] = environment; }
        if (guid != null) { query['guid'] = guid; }
        if (type != null) { query['type'] = type; }

        return this.request<InternalBankAccountServiceListBankModel>({
            url: '/api/internal/bank_account_services',
            method: 'GET',
            headers,
            query,
        }, opts?.responseOpts);
    };

    /**
     * Retrieves a listing of banks.  Required scope: **internal:banks:read**
     * List Banks
     */
    internalListBanks({ page, perPage, guid, type, organizationGuid, bankGuid }: InternalListBanksRequest): Observable<InternalBankListBankModel>
    internalListBanks({ page, perPage, guid, type, organizationGuid, bankGuid }: InternalListBanksRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalBankListBankModel>>
    internalListBanks({ page, perPage, guid, type, organizationGuid, bankGuid }: InternalListBanksRequest, opts?: OperationOpts): Observable<InternalBankListBankModel | AjaxResponse<InternalBankListBankModel>> {

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        const query: HttpQuery = {};

        if (page != null) { query['page'] = page; }
        if (perPage != null) { query['per_page'] = perPage; }
        if (guid != null) { query['guid'] = guid; }
        if (type != null) { query['type'] = type; }
        if (organizationGuid != null) { query['organization_guid'] = organizationGuid; }
        if (bankGuid != null) { query['bank_guid'] = bankGuid; }

        return this.request<InternalBankListBankModel>({
            url: '/api/internal/banks',
            method: 'GET',
            headers,
            query,
        }, opts?.responseOpts);
    };

    /**
     * Retrieves a listing of CryptoAssetConfiguration.Required scope: **internal:banks:read**
     * List CryptoAssetConfiguration
     */
    internalListCryptoAssetConfigurations({ page, perPage, guid, assetCode, bankGuid, depositsEnabled, environment, invoicesEnabled, storageEnabled, type }: InternalListCryptoAssetConfigurationsRequest): Observable<InternalCryptoAssetConfigurationListBankModel>
    internalListCryptoAssetConfigurations({ page, perPage, guid, assetCode, bankGuid, depositsEnabled, environment, invoicesEnabled, storageEnabled, type }: InternalListCryptoAssetConfigurationsRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalCryptoAssetConfigurationListBankModel>>
    internalListCryptoAssetConfigurations({ page, perPage, guid, assetCode, bankGuid, depositsEnabled, environment, invoicesEnabled, storageEnabled, type }: InternalListCryptoAssetConfigurationsRequest, opts?: OperationOpts): Observable<InternalCryptoAssetConfigurationListBankModel | AjaxResponse<InternalCryptoAssetConfigurationListBankModel>> {

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        const query: HttpQuery = {};

        if (page != null) { query['page'] = page; }
        if (perPage != null) { query['per_page'] = perPage; }
        if (guid != null) { query['guid'] = guid; }
        if (assetCode != null) { query['asset_code'] = assetCode; }
        if (bankGuid != null) { query['bank_guid'] = bankGuid; }
        if (depositsEnabled != null) { query['deposits_enabled'] = depositsEnabled; }
        if (environment != null) { query['environment'] = environment; }
        if (invoicesEnabled != null) { query['invoices_enabled'] = invoicesEnabled; }
        if (storageEnabled != null) { query['storage_enabled'] = storageEnabled; }
        if (type != null) { query['type'] = type; }

        return this.request<InternalCryptoAssetConfigurationListBankModel>({
            url: '/api/internal/crypto_asset_configurations',
            method: 'GET',
            headers,
            query,
        }, opts?.responseOpts);
    };

    /**
     * Retrieves a listing of Customers.  Required scope: **internal:customers:read**
     * List Customers
     */
    internalListCustomers({ page, perPage, guid, bankGuid, organizationGuid }: InternalListCustomersRequest): Observable<CustomerListBankModel>
    internalListCustomers({ page, perPage, guid, bankGuid, organizationGuid }: InternalListCustomersRequest, opts?: OperationOpts): Observable<AjaxResponse<CustomerListBankModel>>
    internalListCustomers({ page, perPage, guid, bankGuid, organizationGuid }: InternalListCustomersRequest, opts?: OperationOpts): Observable<CustomerListBankModel | AjaxResponse<CustomerListBankModel>> {

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        const query: HttpQuery = {};

        if (page != null) { query['page'] = page; }
        if (perPage != null) { query['per_page'] = perPage; }
        if (guid != null) { query['guid'] = guid; }
        if (bankGuid != null) { query['bank_guid'] = bankGuid; }
        if (organizationGuid != null) { query['organization_guid'] = organizationGuid; }

        return this.request<CustomerListBankModel>({
            url: '/api/internal/customers',
            method: 'GET',
            headers,
            query,
        }, opts?.responseOpts);
    };

    /**
     * Retrieves a listing of Cybrid accounts.  Required scope: **internal:cybrid_accounts:read**
     * List CybridAccounts
     */
    internalListCybridAccounts({ page, perPage, environment, type, asset }: InternalListCybridAccountsRequest): Observable<InternalCybridAccountListBankModel>
    internalListCybridAccounts({ page, perPage, environment, type, asset }: InternalListCybridAccountsRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalCybridAccountListBankModel>>
    internalListCybridAccounts({ page, perPage, environment, type, asset }: InternalListCybridAccountsRequest, opts?: OperationOpts): Observable<InternalCybridAccountListBankModel | AjaxResponse<InternalCybridAccountListBankModel>> {

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        const query: HttpQuery = {};

        if (page != null) { query['page'] = page; }
        if (perPage != null) { query['per_page'] = perPage; }
        if (environment != null) { query['environment'] = environment; }
        if (type != null) { query['type'] = type; }
        if (asset != null) { query['asset'] = asset; }

        return this.request<InternalCybridAccountListBankModel>({
            url: '/api/internal/cybrid_accounts',
            method: 'GET',
            headers,
            query,
        }, opts?.responseOpts);
    };

    /**
     * Retrieves a list of deposit bank accounts.  Required scope: **internal:deposit_bank_accounts:read**
     * List Deposit Bank Accounts
     */
    internalListDepositBankAccounts({ page, perPage, guid, bankGuid, customerGuid, label, uniqueMemoId, type, parentDepositBankAccountGuid }: InternalListDepositBankAccountsRequest): Observable<DepositBankAccountListBankModel>
    internalListDepositBankAccounts({ page, perPage, guid, bankGuid, customerGuid, label, uniqueMemoId, type, parentDepositBankAccountGuid }: InternalListDepositBankAccountsRequest, opts?: OperationOpts): Observable<AjaxResponse<DepositBankAccountListBankModel>>
    internalListDepositBankAccounts({ page, perPage, guid, bankGuid, customerGuid, label, uniqueMemoId, type, parentDepositBankAccountGuid }: InternalListDepositBankAccountsRequest, opts?: OperationOpts): Observable<DepositBankAccountListBankModel | AjaxResponse<DepositBankAccountListBankModel>> {

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
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
        if (label != null) { query['label'] = label; }
        if (uniqueMemoId != null) { query['unique_memo_id'] = uniqueMemoId; }
        if (type != null) { query['type'] = type; }
        if (parentDepositBankAccountGuid != null) { query['parent_deposit_bank_account_guid'] = parentDepositBankAccountGuid; }

        return this.request<DepositBankAccountListBankModel>({
            url: '/api/internal/deposit_bank_accounts',
            method: 'GET',
            headers,
            query,
        }, opts?.responseOpts);
    };

    /**
     * Retrieves a listing of ExchangeOrders.Required scope: **internal:exchange_orders:read**
     * List ExchangeOrder
     */
    internalListExchangeOrders({ page, perPage, guid, state }: InternalListExchangeOrdersRequest): Observable<InternalExchangeOrderListBankModel>
    internalListExchangeOrders({ page, perPage, guid, state }: InternalListExchangeOrdersRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalExchangeOrderListBankModel>>
    internalListExchangeOrders({ page, perPage, guid, state }: InternalListExchangeOrdersRequest, opts?: OperationOpts): Observable<InternalExchangeOrderListBankModel | AjaxResponse<InternalExchangeOrderListBankModel>> {

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        const query: HttpQuery = {};

        if (page != null) { query['page'] = page; }
        if (perPage != null) { query['per_page'] = perPage; }
        if (guid != null) { query['guid'] = guid; }
        if (state != null) { query['state'] = state; }

        return this.request<InternalExchangeOrderListBankModel>({
            url: '/api/internal/exchange_orders',
            method: 'GET',
            headers,
            query,
        }, opts?.responseOpts);
    };

    /**
     * Retrieves a listing of configurations.  Required scope: **internal:exchanges:read**
     * List ExchangeSettlementConfigurations
     */
    internalListExchangeSettlementConfigurations({ page, perPage, asset, exchangeGuid }: InternalListExchangeSettlementConfigurationsRequest): Observable<InternalExchangeSettlementConfigurationListBankModel>
    internalListExchangeSettlementConfigurations({ page, perPage, asset, exchangeGuid }: InternalListExchangeSettlementConfigurationsRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalExchangeSettlementConfigurationListBankModel>>
    internalListExchangeSettlementConfigurations({ page, perPage, asset, exchangeGuid }: InternalListExchangeSettlementConfigurationsRequest, opts?: OperationOpts): Observable<InternalExchangeSettlementConfigurationListBankModel | AjaxResponse<InternalExchangeSettlementConfigurationListBankModel>> {

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        const query: HttpQuery = {};

        if (page != null) { query['page'] = page; }
        if (perPage != null) { query['per_page'] = perPage; }
        if (asset != null) { query['asset'] = asset; }
        if (exchangeGuid != null) { query['exchange_guid'] = exchangeGuid; }

        return this.request<InternalExchangeSettlementConfigurationListBankModel>({
            url: '/api/internal/exchange_settlement_configurations',
            method: 'GET',
            headers,
            query,
        }, opts?.responseOpts);
    };

    /**
     * Retrieves a listing of exchange settlement payment orders.  Required scope: **internal:exchange_settlements:read**
     * List Exchange Settlement Payment Orders
     */
    internalListExchangeSettlementPaymentOrders({ page, perPage, settlementGuid }: InternalListExchangeSettlementPaymentOrdersRequest): Observable<InternalExchangeSettlementPaymentOrderListBankModel>
    internalListExchangeSettlementPaymentOrders({ page, perPage, settlementGuid }: InternalListExchangeSettlementPaymentOrdersRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalExchangeSettlementPaymentOrderListBankModel>>
    internalListExchangeSettlementPaymentOrders({ page, perPage, settlementGuid }: InternalListExchangeSettlementPaymentOrdersRequest, opts?: OperationOpts): Observable<InternalExchangeSettlementPaymentOrderListBankModel | AjaxResponse<InternalExchangeSettlementPaymentOrderListBankModel>> {

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        const query: HttpQuery = {};

        if (page != null) { query['page'] = page; }
        if (perPage != null) { query['per_page'] = perPage; }
        if (settlementGuid != null) { query['settlement_guid'] = settlementGuid; }

        return this.request<InternalExchangeSettlementPaymentOrderListBankModel>({
            url: '/api/internal/exchange_settlement_payment_orders',
            method: 'GET',
            headers,
            query,
        }, opts?.responseOpts);
    };

    /**
     * Retrieves a listing of exchanges.  Required scope: **internal:exchanges:read**
     * List Exchanges
     */
    internalListExchanges({ page, perPage, provider, environment }: InternalListExchangesRequest): Observable<InternalExchangeListBankModel>
    internalListExchanges({ page, perPage, provider, environment }: InternalListExchangesRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalExchangeListBankModel>>
    internalListExchanges({ page, perPage, provider, environment }: InternalListExchangesRequest, opts?: OperationOpts): Observable<InternalExchangeListBankModel | AjaxResponse<InternalExchangeListBankModel>> {

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        const query: HttpQuery = {};

        if (page != null) { query['page'] = page; }
        if (perPage != null) { query['per_page'] = perPage; }
        if (provider != null) { query['provider'] = provider; }
        if (environment != null) { query['environment'] = environment; }

        return this.request<InternalExchangeListBankModel>({
            url: '/api/internal/exchanges',
            method: 'GET',
            headers,
            query,
        }, opts?.responseOpts);
    };

    /**
     * Retrieves a listing of expected payments.  Required scope: **internal:exchange_settlements:read**
     * List Expected Payments
     */
    internalListExpectedPayments({ page, perPage, settlementGuid }: InternalListExpectedPaymentsRequest): Observable<InternalExpectedPaymentListBankModel>
    internalListExpectedPayments({ page, perPage, settlementGuid }: InternalListExpectedPaymentsRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalExpectedPaymentListBankModel>>
    internalListExpectedPayments({ page, perPage, settlementGuid }: InternalListExpectedPaymentsRequest, opts?: OperationOpts): Observable<InternalExpectedPaymentListBankModel | AjaxResponse<InternalExpectedPaymentListBankModel>> {

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        const query: HttpQuery = {};

        if (page != null) { query['page'] = page; }
        if (perPage != null) { query['per_page'] = perPage; }
        if (settlementGuid != null) { query['settlement_guid'] = settlementGuid; }

        return this.request<InternalExpectedPaymentListBankModel>({
            url: '/api/internal/expected_payments',
            method: 'GET',
            headers,
            query,
        }, opts?.responseOpts);
    };

    /**
     * Retrieves a listing of external bank accounts.  Required scope: **internal:accounts:read**
     * List ExternalBankAccounts
     */
    internalListExternalBankAccounts({ page, perPage, asset, bankGuid, exchangeGuid }: InternalListExternalBankAccountsRequest): Observable<InternalExternalBankAccountListBankModel>
    internalListExternalBankAccounts({ page, perPage, asset, bankGuid, exchangeGuid }: InternalListExternalBankAccountsRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalExternalBankAccountListBankModel>>
    internalListExternalBankAccounts({ page, perPage, asset, bankGuid, exchangeGuid }: InternalListExternalBankAccountsRequest, opts?: OperationOpts): Observable<InternalExternalBankAccountListBankModel | AjaxResponse<InternalExternalBankAccountListBankModel>> {

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        const query: HttpQuery = {};

        if (page != null) { query['page'] = page; }
        if (perPage != null) { query['per_page'] = perPage; }
        if (asset != null) { query['asset'] = asset; }
        if (bankGuid != null) { query['bank_guid'] = bankGuid; }
        if (exchangeGuid != null) { query['exchange_guid'] = exchangeGuid; }

        return this.request<InternalExternalBankAccountListBankModel>({
            url: '/api/internal/external_bank_accounts',
            method: 'GET',
            headers,
            query,
        }, opts?.responseOpts);
    };

    /**
     * Retrieves a listing of external wallets.  Required scope: **internal:accounts:read**
     * List ExternalWallets
     */
    internalListExternalWallets({ page, perPage, asset, exchangeGuid }: InternalListExternalWalletsRequest): Observable<InternalExternalWalletListBankModel>
    internalListExternalWallets({ page, perPage, asset, exchangeGuid }: InternalListExternalWalletsRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalExternalWalletListBankModel>>
    internalListExternalWallets({ page, perPage, asset, exchangeGuid }: InternalListExternalWalletsRequest, opts?: OperationOpts): Observable<InternalExternalWalletListBankModel | AjaxResponse<InternalExternalWalletListBankModel>> {

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        const query: HttpQuery = {};

        if (page != null) { query['page'] = page; }
        if (perPage != null) { query['per_page'] = perPage; }
        if (asset != null) { query['asset'] = asset; }
        if (exchangeGuid != null) { query['exchange_guid'] = exchangeGuid; }

        return this.request<InternalExternalWalletListBankModel>({
            url: '/api/internal/external_wallets',
            method: 'GET',
            headers,
            query,
        }, opts?.responseOpts);
    };

    /**
     * Retrieves a listing of FeeConfiguration.Required scope: **internal:banks:read**
     * List FeeConfiguration
     */
    internalListFeeConfigurations({ page, perPage, guid, configurationType, productType, primaryAssetCode, counterAssetCode, bankGuid, organizationGuid }: InternalListFeeConfigurationsRequest): Observable<InternalFeeConfigurationListBankModel>
    internalListFeeConfigurations({ page, perPage, guid, configurationType, productType, primaryAssetCode, counterAssetCode, bankGuid, organizationGuid }: InternalListFeeConfigurationsRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalFeeConfigurationListBankModel>>
    internalListFeeConfigurations({ page, perPage, guid, configurationType, productType, primaryAssetCode, counterAssetCode, bankGuid, organizationGuid }: InternalListFeeConfigurationsRequest, opts?: OperationOpts): Observable<InternalFeeConfigurationListBankModel | AjaxResponse<InternalFeeConfigurationListBankModel>> {

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        const query: HttpQuery = {};

        if (page != null) { query['page'] = page; }
        if (perPage != null) { query['per_page'] = perPage; }
        if (guid != null) { query['guid'] = guid; }
        if (configurationType != null) { query['configuration_type'] = configurationType; }
        if (productType != null) { query['product_type'] = productType; }
        if (primaryAssetCode != null) { query['primary_asset_code'] = primaryAssetCode; }
        if (counterAssetCode != null) { query['counter_asset_code'] = counterAssetCode; }
        if (bankGuid != null) { query['bank_guid'] = bankGuid; }
        if (organizationGuid != null) { query['organization_guid'] = organizationGuid; }

        return this.request<InternalFeeConfigurationListBankModel>({
            url: '/api/internal/fee_configurations',
            method: 'GET',
            headers,
            query,
        }, opts?.responseOpts);
    };

    /**
     * Retrieves a listing of Fees.Required scope: **internal:fees:read**
     * List Fees
     */
    internalListFees({ page, perPage, guid, state }: InternalListFeesRequest): Observable<InternalFeeChargeListBankModel>
    internalListFees({ page, perPage, guid, state }: InternalListFeesRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalFeeChargeListBankModel>>
    internalListFees({ page, perPage, guid, state }: InternalListFeesRequest, opts?: OperationOpts): Observable<InternalFeeChargeListBankModel | AjaxResponse<InternalFeeChargeListBankModel>> {

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        const query: HttpQuery = {};

        if (page != null) { query['page'] = page; }
        if (perPage != null) { query['per_page'] = perPage; }
        if (guid != null) { query['guid'] = guid; }
        if (state != null) { query['state'] = state; }

        return this.request<InternalFeeChargeListBankModel>({
            url: '/api/internal/fees',
            method: 'GET',
            headers,
            query,
        }, opts?.responseOpts);
    };

    /**
     * Retrieves a listing of internal bank accounts.  Required scope: **internal:accounts:read**
     * List InternalBankAccounts
     */
    internalListInternalBankAccounts({ page, perPage, environment, asset, accountKind }: InternalListInternalBankAccountsRequest): Observable<InternalInternalBankAccountListBankModel>
    internalListInternalBankAccounts({ page, perPage, environment, asset, accountKind }: InternalListInternalBankAccountsRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalInternalBankAccountListBankModel>>
    internalListInternalBankAccounts({ page, perPage, environment, asset, accountKind }: InternalListInternalBankAccountsRequest, opts?: OperationOpts): Observable<InternalInternalBankAccountListBankModel | AjaxResponse<InternalInternalBankAccountListBankModel>> {

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        const query: HttpQuery = {};

        if (page != null) { query['page'] = page; }
        if (perPage != null) { query['per_page'] = perPage; }
        if (environment != null) { query['environment'] = environment; }
        if (asset != null) { query['asset'] = asset; }
        if (accountKind != null) { query['account_kind'] = accountKind; }

        return this.request<InternalInternalBankAccountListBankModel>({
            url: '/api/internal/internal_bank_accounts',
            method: 'GET',
            headers,
            query,
        }, opts?.responseOpts);
    };

    /**
     * Retrieves a listing of internal wallets.  Required scope: **internal:accounts:read**
     * List InternalWallets
     */
    internalListInternalWallets({ page, perPage, owner, environment, guid, bankGuid, customerGuid, internalWalletGroupGuid, type, asset, accountKind }: InternalListInternalWalletsRequest): Observable<InternalInternalWalletListBankModel>
    internalListInternalWallets({ page, perPage, owner, environment, guid, bankGuid, customerGuid, internalWalletGroupGuid, type, asset, accountKind }: InternalListInternalWalletsRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalInternalWalletListBankModel>>
    internalListInternalWallets({ page, perPage, owner, environment, guid, bankGuid, customerGuid, internalWalletGroupGuid, type, asset, accountKind }: InternalListInternalWalletsRequest, opts?: OperationOpts): Observable<InternalInternalWalletListBankModel | AjaxResponse<InternalInternalWalletListBankModel>> {

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        const query: HttpQuery = {};

        if (page != null) { query['page'] = page; }
        if (perPage != null) { query['per_page'] = perPage; }
        if (owner != null) { query['owner'] = owner; }
        if (environment != null) { query['environment'] = environment; }
        if (guid != null) { query['guid'] = guid; }
        if (bankGuid != null) { query['bank_guid'] = bankGuid; }
        if (customerGuid != null) { query['customer_guid'] = customerGuid; }
        if (internalWalletGroupGuid != null) { query['internal_wallet_group_guid'] = internalWalletGroupGuid; }
        if (type != null) { query['type'] = type; }
        if (asset != null) { query['asset'] = asset; }
        if (accountKind != null) { query['account_kind'] = accountKind; }

        return this.request<InternalInternalWalletListBankModel>({
            url: '/api/internal/internal_wallets',
            method: 'GET',
            headers,
            query,
        }, opts?.responseOpts);
    };

    /**
     * Retrieves a list of invoices.  Required scope: **internal:invoices:read**
     * List Invoices
     */
    internalListInvoices({ page, perPage, guid, bankGuid, customerGuid, accountGuid, state, asset, environment, label }: InternalListInvoicesRequest): Observable<InternalInternalInvoiceListBankModel>
    internalListInvoices({ page, perPage, guid, bankGuid, customerGuid, accountGuid, state, asset, environment, label }: InternalListInvoicesRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalInternalInvoiceListBankModel>>
    internalListInvoices({ page, perPage, guid, bankGuid, customerGuid, accountGuid, state, asset, environment, label }: InternalListInvoicesRequest, opts?: OperationOpts): Observable<InternalInternalInvoiceListBankModel | AjaxResponse<InternalInternalInvoiceListBankModel>> {

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
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
        if (accountGuid != null) { query['account_guid'] = accountGuid; }
        if (state != null) { query['state'] = state; }
        if (asset != null) { query['asset'] = asset; }
        if (environment != null) { query['environment'] = environment; }
        if (label != null) { query['label'] = label; }

        return this.request<InternalInternalInvoiceListBankModel>({
            url: '/api/internal/invoices',
            method: 'GET',
            headers,
            query,
        }, opts?.responseOpts);
    };

    /**
     * Retrieves a listing of reconciliations.  Required scope: **internal:transfers:read**
     * List Reconciliations
     */
    internalListReconciliations({ page, perPage, category, confidence, direction, transferGuid, transactionId }: InternalListReconciliationsRequest): Observable<InternalReconciliationListBankModel>
    internalListReconciliations({ page, perPage, category, confidence, direction, transferGuid, transactionId }: InternalListReconciliationsRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalReconciliationListBankModel>>
    internalListReconciliations({ page, perPage, category, confidence, direction, transferGuid, transactionId }: InternalListReconciliationsRequest, opts?: OperationOpts): Observable<InternalReconciliationListBankModel | AjaxResponse<InternalReconciliationListBankModel>> {

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        const query: HttpQuery = {};

        if (page != null) { query['page'] = page; }
        if (perPage != null) { query['per_page'] = perPage; }
        if (category != null) { query['category'] = category; }
        if (confidence != null) { query['confidence'] = confidence; }
        if (direction != null) { query['direction'] = direction; }
        if (transferGuid != null) { query['transfer_guid'] = transferGuid; }
        if (transactionId != null) { query['transaction_id'] = transactionId; }

        return this.request<InternalReconciliationListBankModel>({
            url: '/api/internal/reconciliations',
            method: 'GET',
            headers,
            query,
        }, opts?.responseOpts);
    };

    /**
     * Retrieves a list of trades.  Required scope: **internal:trades:read**
     * List Trades
     */
    internalListTrades({ page, perPage, guid, customerGuid, bankGuid }: InternalListTradesRequest): Observable<TradeListBankModel>
    internalListTrades({ page, perPage, guid, customerGuid, bankGuid }: InternalListTradesRequest, opts?: OperationOpts): Observable<AjaxResponse<TradeListBankModel>>
    internalListTrades({ page, perPage, guid, customerGuid, bankGuid }: InternalListTradesRequest, opts?: OperationOpts): Observable<TradeListBankModel | AjaxResponse<TradeListBankModel>> {

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        const query: HttpQuery = {};

        if (page != null) { query['page'] = page; }
        if (perPage != null) { query['per_page'] = perPage; }
        if (guid != null) { query['guid'] = guid; }
        if (customerGuid != null) { query['customer_guid'] = customerGuid; }
        if (bankGuid != null) { query['bank_guid'] = bankGuid; }

        return this.request<TradeListBankModel>({
            url: '/api/internal/trades',
            method: 'GET',
            headers,
            query,
        }, opts?.responseOpts);
    };

    /**
     * Retrieves a listing of trading symbol configurations.  Required scope: **internal:banks:read**
     * List TradingSymbolConfigurations
     */
    internalListTradingSymbolConfigurations({ page, perPage, bankGuid }: InternalListTradingSymbolConfigurationsRequest): Observable<InternalTradingSymbolConfigurationListBankModel>
    internalListTradingSymbolConfigurations({ page, perPage, bankGuid }: InternalListTradingSymbolConfigurationsRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalTradingSymbolConfigurationListBankModel>>
    internalListTradingSymbolConfigurations({ page, perPage, bankGuid }: InternalListTradingSymbolConfigurationsRequest, opts?: OperationOpts): Observable<InternalTradingSymbolConfigurationListBankModel | AjaxResponse<InternalTradingSymbolConfigurationListBankModel>> {

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        const query: HttpQuery = {};

        if (page != null) { query['page'] = page; }
        if (perPage != null) { query['per_page'] = perPage; }
        if (bankGuid != null) { query['bank_guid'] = bankGuid; }

        return this.request<InternalTradingSymbolConfigurationListBankModel>({
            url: '/api/internal/trading_symbol_configurations',
            method: 'GET',
            headers,
            query,
        }, opts?.responseOpts);
    };

    /**
     * Retrieves a listing of transactions.  Required scope: **internal:transfers:read**
     * List Transactions
     */
    internalListTransactions({ environment, accountGuid, accountType, cursor, perPage, includePii, createdAtGte, createdAtLt }: InternalListTransactionsRequest): Observable<InternalTransactionsListBankModel>
    internalListTransactions({ environment, accountGuid, accountType, cursor, perPage, includePii, createdAtGte, createdAtLt }: InternalListTransactionsRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalTransactionsListBankModel>>
    internalListTransactions({ environment, accountGuid, accountType, cursor, perPage, includePii, createdAtGte, createdAtLt }: InternalListTransactionsRequest, opts?: OperationOpts): Observable<InternalTransactionsListBankModel | AjaxResponse<InternalTransactionsListBankModel>> {
        throwIfNullOrUndefined(environment, 'environment', 'internalListTransactions');
        throwIfNullOrUndefined(accountGuid, 'accountGuid', 'internalListTransactions');
        throwIfNullOrUndefined(accountType, 'accountType', 'internalListTransactions');

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        const query: HttpQuery = { // required parameters are used directly since they are already checked by throwIfNullOrUndefined
            'environment': environment,
            'account_guid': accountGuid,
            'account_type': accountType,
        };

        if (cursor != null) { query['cursor'] = cursor; }
        if (perPage != null) { query['per_page'] = perPage; }
        if (includePii != null) { query['include_pii'] = includePii; }
        if (createdAtGte != null) { query['created_at_gte'] = createdAtGte; }
        if (createdAtLt != null) { query['created_at_lt'] = createdAtLt; }

        return this.request<InternalTransactionsListBankModel>({
            url: '/api/internal/transactions',
            method: 'GET',
            headers,
            query,
        }, opts?.responseOpts);
    };

    /**
     * Retrieves a listing of internal transfers.  Required scope: **internal:transfers:read**
     * List Transfers
     */
    internalListTransfers({ page, perPage, asset, guid, transferType, customerGuid, bankGuid, accountGuid, state, side, txnHash, externalId, amount, estimatedAmount, principalSourceAccountGuid, principalDestinationAccountGuid, createdAtGte, createdAtLt, updatedAtGte, updatedAtLt }: InternalListTransfersRequest): Observable<InternalTransferListBankModel>
    internalListTransfers({ page, perPage, asset, guid, transferType, customerGuid, bankGuid, accountGuid, state, side, txnHash, externalId, amount, estimatedAmount, principalSourceAccountGuid, principalDestinationAccountGuid, createdAtGte, createdAtLt, updatedAtGte, updatedAtLt }: InternalListTransfersRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalTransferListBankModel>>
    internalListTransfers({ page, perPage, asset, guid, transferType, customerGuid, bankGuid, accountGuid, state, side, txnHash, externalId, amount, estimatedAmount, principalSourceAccountGuid, principalDestinationAccountGuid, createdAtGte, createdAtLt, updatedAtGte, updatedAtLt }: InternalListTransfersRequest, opts?: OperationOpts): Observable<InternalTransferListBankModel | AjaxResponse<InternalTransferListBankModel>> {

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        const query: HttpQuery = {};

        if (page != null) { query['page'] = page; }
        if (perPage != null) { query['per_page'] = perPage; }
        if (asset != null) { query['asset'] = asset; }
        if (guid != null) { query['guid'] = guid; }
        if (transferType != null) { query['transfer_type'] = transferType; }
        if (customerGuid != null) { query['customer_guid'] = customerGuid; }
        if (bankGuid != null) { query['bank_guid'] = bankGuid; }
        if (accountGuid != null) { query['account_guid'] = accountGuid; }
        if (state != null) { query['state'] = state; }
        if (side != null) { query['side'] = side; }
        if (txnHash != null) { query['txn_hash'] = txnHash; }
        if (externalId != null) { query['external_id'] = externalId; }
        if (amount != null) { query['amount'] = amount; }
        if (estimatedAmount != null) { query['estimated_amount'] = estimatedAmount; }
        if (principalSourceAccountGuid != null) { query['principal_source_account_guid'] = principalSourceAccountGuid; }
        if (principalDestinationAccountGuid != null) { query['principal_destination_account_guid'] = principalDestinationAccountGuid; }
        if (createdAtGte != null) { query['created_at_gte'] = createdAtGte; }
        if (createdAtLt != null) { query['created_at_lt'] = createdAtLt; }
        if (updatedAtGte != null) { query['updated_at_gte'] = updatedAtGte; }
        if (updatedAtLt != null) { query['updated_at_lt'] = updatedAtLt; }

        return this.request<InternalTransferListBankModel>({
            url: '/api/internal/transfers',
            method: 'GET',
            headers,
            query,
        }, opts?.responseOpts);
    };

    /**
     * Retrieves a listing of wallet services.  Required scope: **internal:wallet_services:read**
     * List WalletServices
     */
    internalListWalletServices({ page, perPage, environment, guid, type }: InternalListWalletServicesRequest): Observable<InternalWalletServiceListBankModel>
    internalListWalletServices({ page, perPage, environment, guid, type }: InternalListWalletServicesRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalWalletServiceListBankModel>>
    internalListWalletServices({ page, perPage, environment, guid, type }: InternalListWalletServicesRequest, opts?: OperationOpts): Observable<InternalWalletServiceListBankModel | AjaxResponse<InternalWalletServiceListBankModel>> {

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        const query: HttpQuery = {};

        if (page != null) { query['page'] = page; }
        if (perPage != null) { query['per_page'] = perPage; }
        if (environment != null) { query['environment'] = environment; }
        if (guid != null) { query['guid'] = guid; }
        if (type != null) { query['type'] = type; }

        return this.request<InternalWalletServiceListBankModel>({
            url: '/api/internal/wallet_services',
            method: 'GET',
            headers,
            query,
        }, opts?.responseOpts);
    };

    /**
     * Patch an account.  Required scope: **internal:accounts:write**
     * Patch Account
     */
    internalPatchAccount({ accountGuid, patchInternalAccountBankModel }: InternalPatchAccountRequest): Observable<AccountBankModel>
    internalPatchAccount({ accountGuid, patchInternalAccountBankModel }: InternalPatchAccountRequest, opts?: OperationOpts): Observable<AjaxResponse<AccountBankModel>>
    internalPatchAccount({ accountGuid, patchInternalAccountBankModel }: InternalPatchAccountRequest, opts?: OperationOpts): Observable<AccountBankModel | AjaxResponse<AccountBankModel>> {
        throwIfNullOrUndefined(accountGuid, 'accountGuid', 'internalPatchAccount');
        throwIfNullOrUndefined(patchInternalAccountBankModel, 'patchInternalAccountBankModel', 'internalPatchAccount');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<AccountBankModel>({
            url: '/api/internal/accounts/{account_guid}'.replace('{account_guid}', encodeURI(accountGuid)),
            method: 'PATCH',
            headers,
            body: patchInternalAccountBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Updates an activity limit configuration.  Required scope: **internal:banks:write**
     * Patch ActivityLimitConfiguration
     */
    internalPatchActivityLimitConfiguration({ guid, patchInternalActivityLimitConfigurationBankModel }: InternalPatchActivityLimitConfigurationRequest): Observable<InternalActivityLimitConfigurationBankModel>
    internalPatchActivityLimitConfiguration({ guid, patchInternalActivityLimitConfigurationBankModel }: InternalPatchActivityLimitConfigurationRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalActivityLimitConfigurationBankModel>>
    internalPatchActivityLimitConfiguration({ guid, patchInternalActivityLimitConfigurationBankModel }: InternalPatchActivityLimitConfigurationRequest, opts?: OperationOpts): Observable<InternalActivityLimitConfigurationBankModel | AjaxResponse<InternalActivityLimitConfigurationBankModel>> {
        throwIfNullOrUndefined(guid, 'guid', 'internalPatchActivityLimitConfiguration');
        throwIfNullOrUndefined(patchInternalActivityLimitConfigurationBankModel, 'patchInternalActivityLimitConfigurationBankModel', 'internalPatchActivityLimitConfiguration');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalActivityLimitConfigurationBankModel>({
            url: '/api/internal/activity_limit_configurations/{guid}'.replace('{guid}', encodeURI(guid)),
            method: 'PATCH',
            headers,
            body: patchInternalActivityLimitConfigurationBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Update a bank.  Required scope: **internal:banks:write**
     * Patch Bank
     */
    internalPatchBank({ bankGuid, patchInternalBankBankModel }: InternalPatchBankRequest): Observable<InternalBankBankModel>
    internalPatchBank({ bankGuid, patchInternalBankBankModel }: InternalPatchBankRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalBankBankModel>>
    internalPatchBank({ bankGuid, patchInternalBankBankModel }: InternalPatchBankRequest, opts?: OperationOpts): Observable<InternalBankBankModel | AjaxResponse<InternalBankBankModel>> {
        throwIfNullOrUndefined(bankGuid, 'bankGuid', 'internalPatchBank');
        throwIfNullOrUndefined(patchInternalBankBankModel, 'patchInternalBankBankModel', 'internalPatchBank');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalBankBankModel>({
            url: '/api/internal/banks/{bank_guid}'.replace('{bank_guid}', encodeURI(bankGuid)),
            method: 'PATCH',
            headers,
            body: patchInternalBankBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Patch an internal bank_account.  Required scope: **internal:bank_account_services:write**
     * Patch Internal BankAccount
     */
    internalPatchBankAccountService({ guid, patchInternalBankAccountServiceBankModel }: InternalPatchBankAccountServiceRequest): Observable<InternalBankAccountServiceBankModel>
    internalPatchBankAccountService({ guid, patchInternalBankAccountServiceBankModel }: InternalPatchBankAccountServiceRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalBankAccountServiceBankModel>>
    internalPatchBankAccountService({ guid, patchInternalBankAccountServiceBankModel }: InternalPatchBankAccountServiceRequest, opts?: OperationOpts): Observable<InternalBankAccountServiceBankModel | AjaxResponse<InternalBankAccountServiceBankModel>> {
        throwIfNullOrUndefined(guid, 'guid', 'internalPatchBankAccountService');
        throwIfNullOrUndefined(patchInternalBankAccountServiceBankModel, 'patchInternalBankAccountServiceBankModel', 'internalPatchBankAccountService');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalBankAccountServiceBankModel>({
            url: '/api/internal/bank_account_services/{guid}'.replace('{guid}', encodeURI(guid)),
            method: 'PATCH',
            headers,
            body: patchInternalBankAccountServiceBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Patch a business details record.  Required scope: **internal:customers:write**
     * Patch Business Details
     */
    internalPatchBusinessDetail({ guid, patchInternalBusinessDetailBankModel }: InternalPatchBusinessDetailRequest): Observable<InternalBusinessDetailBankModel>
    internalPatchBusinessDetail({ guid, patchInternalBusinessDetailBankModel }: InternalPatchBusinessDetailRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalBusinessDetailBankModel>>
    internalPatchBusinessDetail({ guid, patchInternalBusinessDetailBankModel }: InternalPatchBusinessDetailRequest, opts?: OperationOpts): Observable<InternalBusinessDetailBankModel | AjaxResponse<InternalBusinessDetailBankModel>> {
        throwIfNullOrUndefined(guid, 'guid', 'internalPatchBusinessDetail');
        throwIfNullOrUndefined(patchInternalBusinessDetailBankModel, 'patchInternalBusinessDetailBankModel', 'internalPatchBusinessDetail');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalBusinessDetailBankModel>({
            url: '/api/internal/business_details/{guid}'.replace('{guid}', encodeURI(guid)),
            method: 'PATCH',
            headers,
            body: patchInternalBusinessDetailBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Patch a counterparty.  Required scope: **internal:counterparties:write**
     * Patch Counterparty
     */
    internalPatchCounterparty({ counterpartyGuid, patchInternalCounterpartyBankModel }: InternalPatchCounterpartyRequest): Observable<CounterpartyBankModel>
    internalPatchCounterparty({ counterpartyGuid, patchInternalCounterpartyBankModel }: InternalPatchCounterpartyRequest, opts?: OperationOpts): Observable<AjaxResponse<CounterpartyBankModel>>
    internalPatchCounterparty({ counterpartyGuid, patchInternalCounterpartyBankModel }: InternalPatchCounterpartyRequest, opts?: OperationOpts): Observable<CounterpartyBankModel | AjaxResponse<CounterpartyBankModel>> {
        throwIfNullOrUndefined(counterpartyGuid, 'counterpartyGuid', 'internalPatchCounterparty');
        throwIfNullOrUndefined(patchInternalCounterpartyBankModel, 'patchInternalCounterpartyBankModel', 'internalPatchCounterparty');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<CounterpartyBankModel>({
            url: '/api/internal/counterparties/{counterparty_guid}'.replace('{counterparty_guid}', encodeURI(counterpartyGuid)),
            method: 'PATCH',
            headers,
            body: patchInternalCounterpartyBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Updates a crypto asset configuration.  Required scope: **internal:banks:write**
     * Patch CryptoAssetConfiguration
     */
    internalPatchCryptoAssetConfiguration({ guid, patchInternalCryptoAssetConfigurationBankModel }: InternalPatchCryptoAssetConfigurationRequest): Observable<InternalCryptoAssetConfigurationBankModel>
    internalPatchCryptoAssetConfiguration({ guid, patchInternalCryptoAssetConfigurationBankModel }: InternalPatchCryptoAssetConfigurationRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalCryptoAssetConfigurationBankModel>>
    internalPatchCryptoAssetConfiguration({ guid, patchInternalCryptoAssetConfigurationBankModel }: InternalPatchCryptoAssetConfigurationRequest, opts?: OperationOpts): Observable<InternalCryptoAssetConfigurationBankModel | AjaxResponse<InternalCryptoAssetConfigurationBankModel>> {
        throwIfNullOrUndefined(guid, 'guid', 'internalPatchCryptoAssetConfiguration');
        throwIfNullOrUndefined(patchInternalCryptoAssetConfigurationBankModel, 'patchInternalCryptoAssetConfigurationBankModel', 'internalPatchCryptoAssetConfiguration');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalCryptoAssetConfigurationBankModel>({
            url: '/api/internal/crypto_asset_configurations/{guid}'.replace('{guid}', encodeURI(guid)),
            method: 'PATCH',
            headers,
            body: patchInternalCryptoAssetConfigurationBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Patch a customer.  Required scope: **internal:customers:write**
     * Patch Customer
     */
    internalPatchCustomer({ customerGuid, patchInternalCustomerBankModel }: InternalPatchCustomerRequest): Observable<CustomerBankModel>
    internalPatchCustomer({ customerGuid, patchInternalCustomerBankModel }: InternalPatchCustomerRequest, opts?: OperationOpts): Observable<AjaxResponse<CustomerBankModel>>
    internalPatchCustomer({ customerGuid, patchInternalCustomerBankModel }: InternalPatchCustomerRequest, opts?: OperationOpts): Observable<CustomerBankModel | AjaxResponse<CustomerBankModel>> {
        throwIfNullOrUndefined(customerGuid, 'customerGuid', 'internalPatchCustomer');
        throwIfNullOrUndefined(patchInternalCustomerBankModel, 'patchInternalCustomerBankModel', 'internalPatchCustomer');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<CustomerBankModel>({
            url: '/api/internal/customers/{customer_guid}'.replace('{customer_guid}', encodeURI(customerGuid)),
            method: 'PATCH',
            headers,
            body: patchInternalCustomerBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Patch an cybrid account.  Required scope: **internal:accounts:write**
     * Patch Cybrid Account
     */
    internalPatchCybridAccount({ guid, patchInternalCybridAccountBankModel }: InternalPatchCybridAccountRequest): Observable<InternalCybridAccountBankModel>
    internalPatchCybridAccount({ guid, patchInternalCybridAccountBankModel }: InternalPatchCybridAccountRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalCybridAccountBankModel>>
    internalPatchCybridAccount({ guid, patchInternalCybridAccountBankModel }: InternalPatchCybridAccountRequest, opts?: OperationOpts): Observable<InternalCybridAccountBankModel | AjaxResponse<InternalCybridAccountBankModel>> {
        throwIfNullOrUndefined(guid, 'guid', 'internalPatchCybridAccount');
        throwIfNullOrUndefined(patchInternalCybridAccountBankModel, 'patchInternalCybridAccountBankModel', 'internalPatchCybridAccount');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalCybridAccountBankModel>({
            url: '/api/internal/cybrid_accounts/{guid}'.replace('{guid}', encodeURI(guid)),
            method: 'PATCH',
            headers,
            body: patchInternalCybridAccountBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Patch an deposit address.  Required scope: **internal:deposit_addresses:write**
     * Patch Deposit Address
     */
    internalPatchDepositAddress({ guid, patchInternalDepositAddressBankModel }: InternalPatchDepositAddressRequest): Observable<DepositAddressBankModel>
    internalPatchDepositAddress({ guid, patchInternalDepositAddressBankModel }: InternalPatchDepositAddressRequest, opts?: OperationOpts): Observable<AjaxResponse<DepositAddressBankModel>>
    internalPatchDepositAddress({ guid, patchInternalDepositAddressBankModel }: InternalPatchDepositAddressRequest, opts?: OperationOpts): Observable<DepositAddressBankModel | AjaxResponse<DepositAddressBankModel>> {
        throwIfNullOrUndefined(guid, 'guid', 'internalPatchDepositAddress');
        throwIfNullOrUndefined(patchInternalDepositAddressBankModel, 'patchInternalDepositAddressBankModel', 'internalPatchDepositAddress');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<DepositAddressBankModel>({
            url: '/api/internal/deposit_addresses/{guid}'.replace('{guid}', encodeURI(guid)),
            method: 'PATCH',
            headers,
            body: patchInternalDepositAddressBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Patch an deposit bank account.  Required scope: **internal:deposit_bank_accounts:write**
     * Patch DepositBankAccount
     */
    internalPatchDepositBankAccount({ depositBankAccountGuid, patchInternalDepositBankAccountBankModel }: InternalPatchDepositBankAccountRequest): Observable<DepositBankAccountBankModel>
    internalPatchDepositBankAccount({ depositBankAccountGuid, patchInternalDepositBankAccountBankModel }: InternalPatchDepositBankAccountRequest, opts?: OperationOpts): Observable<AjaxResponse<DepositBankAccountBankModel>>
    internalPatchDepositBankAccount({ depositBankAccountGuid, patchInternalDepositBankAccountBankModel }: InternalPatchDepositBankAccountRequest, opts?: OperationOpts): Observable<DepositBankAccountBankModel | AjaxResponse<DepositBankAccountBankModel>> {
        throwIfNullOrUndefined(depositBankAccountGuid, 'depositBankAccountGuid', 'internalPatchDepositBankAccount');
        throwIfNullOrUndefined(patchInternalDepositBankAccountBankModel, 'patchInternalDepositBankAccountBankModel', 'internalPatchDepositBankAccount');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<DepositBankAccountBankModel>({
            url: '/api/internal/deposit_bank_accounts/{deposit_bank_account_guid}'.replace('{deposit_bank_account_guid}', encodeURI(depositBankAccountGuid)),
            method: 'PATCH',
            headers,
            body: patchInternalDepositBankAccountBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Patch an exchange account.  Required scope: **internal:accounts:write**
     * Patch Exchange Account
     */
    internalPatchExchangeAccount({ guid, patchInternalExchangeAccountBankModel }: InternalPatchExchangeAccountRequest): Observable<InternalExchangeAccountBankModel>
    internalPatchExchangeAccount({ guid, patchInternalExchangeAccountBankModel }: InternalPatchExchangeAccountRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalExchangeAccountBankModel>>
    internalPatchExchangeAccount({ guid, patchInternalExchangeAccountBankModel }: InternalPatchExchangeAccountRequest, opts?: OperationOpts): Observable<InternalExchangeAccountBankModel | AjaxResponse<InternalExchangeAccountBankModel>> {
        throwIfNullOrUndefined(guid, 'guid', 'internalPatchExchangeAccount');
        throwIfNullOrUndefined(patchInternalExchangeAccountBankModel, 'patchInternalExchangeAccountBankModel', 'internalPatchExchangeAccount');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalExchangeAccountBankModel>({
            url: '/api/internal/exchange_accounts/{guid}'.replace('{guid}', encodeURI(guid)),
            method: 'PATCH',
            headers,
            body: patchInternalExchangeAccountBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Patches a ExchangeOrder.Required scope: **internal:exchange_orders:write**
     * Patch ExchangeOrder
     */
    internalPatchExchangeOrder({ guid, patchInternalExchangeOrderBankModel }: InternalPatchExchangeOrderRequest): Observable<InternalExchangeOrderBankModel>
    internalPatchExchangeOrder({ guid, patchInternalExchangeOrderBankModel }: InternalPatchExchangeOrderRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalExchangeOrderBankModel>>
    internalPatchExchangeOrder({ guid, patchInternalExchangeOrderBankModel }: InternalPatchExchangeOrderRequest, opts?: OperationOpts): Observable<InternalExchangeOrderBankModel | AjaxResponse<InternalExchangeOrderBankModel>> {
        throwIfNullOrUndefined(guid, 'guid', 'internalPatchExchangeOrder');
        throwIfNullOrUndefined(patchInternalExchangeOrderBankModel, 'patchInternalExchangeOrderBankModel', 'internalPatchExchangeOrder');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalExchangeOrderBankModel>({
            url: '/api/internal/exchange_orders/{guid}'.replace('{guid}', encodeURI(guid)),
            method: 'PATCH',
            headers,
            body: patchInternalExchangeOrderBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Patch an exchange settlement verification.  Required scope: **internal:exchange_settlements:write**
     * Patch Exchange Settlement
     */
    internalPatchExchangeSettlement({ exchangeSettlementGuid, patchInternalExchangeSettlementBankModel }: InternalPatchExchangeSettlementRequest): Observable<InternalCreateExchangeSettlementApproval202ResponseBankModel>
    internalPatchExchangeSettlement({ exchangeSettlementGuid, patchInternalExchangeSettlementBankModel }: InternalPatchExchangeSettlementRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalCreateExchangeSettlementApproval202ResponseBankModel>>
    internalPatchExchangeSettlement({ exchangeSettlementGuid, patchInternalExchangeSettlementBankModel }: InternalPatchExchangeSettlementRequest, opts?: OperationOpts): Observable<InternalCreateExchangeSettlementApproval202ResponseBankModel | AjaxResponse<InternalCreateExchangeSettlementApproval202ResponseBankModel>> {
        throwIfNullOrUndefined(exchangeSettlementGuid, 'exchangeSettlementGuid', 'internalPatchExchangeSettlement');
        throwIfNullOrUndefined(patchInternalExchangeSettlementBankModel, 'patchInternalExchangeSettlementBankModel', 'internalPatchExchangeSettlement');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalCreateExchangeSettlementApproval202ResponseBankModel>({
            url: '/api/internal/exchange_settlements/{exchange_settlement_guid}'.replace('{exchange_settlement_guid}', encodeURI(exchangeSettlementGuid)),
            method: 'PATCH',
            headers,
            body: patchInternalExchangeSettlementBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Patch an external bank account.  Required scope: **internal:accounts:write**
     * Patch ExternalBankAccount
     */
    internalPatchExternalBankAccount({ externalBankAccountGuid, patchInternalExternalBankAccountBankModel }: InternalPatchExternalBankAccountRequest): Observable<InternalExternalBankAccountBankModel>
    internalPatchExternalBankAccount({ externalBankAccountGuid, patchInternalExternalBankAccountBankModel }: InternalPatchExternalBankAccountRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalExternalBankAccountBankModel>>
    internalPatchExternalBankAccount({ externalBankAccountGuid, patchInternalExternalBankAccountBankModel }: InternalPatchExternalBankAccountRequest, opts?: OperationOpts): Observable<InternalExternalBankAccountBankModel | AjaxResponse<InternalExternalBankAccountBankModel>> {
        throwIfNullOrUndefined(externalBankAccountGuid, 'externalBankAccountGuid', 'internalPatchExternalBankAccount');
        throwIfNullOrUndefined(patchInternalExternalBankAccountBankModel, 'patchInternalExternalBankAccountBankModel', 'internalPatchExternalBankAccount');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalExternalBankAccountBankModel>({
            url: '/api/internal/external_bank_accounts/{external_bank_account_guid}'.replace('{external_bank_account_guid}', encodeURI(externalBankAccountGuid)),
            method: 'PATCH',
            headers,
            body: patchInternalExternalBankAccountBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Patch an transfer.  Required scope: **internal:accounts:write**
     * Patch ExternalWallet
     */
    internalPatchExternalWallet({ externalWalletGuid, patchInternalExternalWalletBankModel }: InternalPatchExternalWalletRequest): Observable<InternalExternalWalletBankModel>
    internalPatchExternalWallet({ externalWalletGuid, patchInternalExternalWalletBankModel }: InternalPatchExternalWalletRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalExternalWalletBankModel>>
    internalPatchExternalWallet({ externalWalletGuid, patchInternalExternalWalletBankModel }: InternalPatchExternalWalletRequest, opts?: OperationOpts): Observable<InternalExternalWalletBankModel | AjaxResponse<InternalExternalWalletBankModel>> {
        throwIfNullOrUndefined(externalWalletGuid, 'externalWalletGuid', 'internalPatchExternalWallet');
        throwIfNullOrUndefined(patchInternalExternalWalletBankModel, 'patchInternalExternalWalletBankModel', 'internalPatchExternalWallet');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalExternalWalletBankModel>({
            url: '/api/internal/external_wallets/{external_wallet_guid}'.replace('{external_wallet_guid}', encodeURI(externalWalletGuid)),
            method: 'PATCH',
            headers,
            body: patchInternalExternalWalletBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Patch an external wallet screening.  Required scope: **internal:external_wallet_screenings:write**
     * Patch External Wallet Screening
     */
    internalPatchExternalWalletScreening({ externalWalletScreeningGuid, patchInternalExternalWalletScreeningBankModel }: InternalPatchExternalWalletScreeningRequest): Observable<InternalExternalWalletScreeningBankModel>
    internalPatchExternalWalletScreening({ externalWalletScreeningGuid, patchInternalExternalWalletScreeningBankModel }: InternalPatchExternalWalletScreeningRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalExternalWalletScreeningBankModel>>
    internalPatchExternalWalletScreening({ externalWalletScreeningGuid, patchInternalExternalWalletScreeningBankModel }: InternalPatchExternalWalletScreeningRequest, opts?: OperationOpts): Observable<InternalExternalWalletScreeningBankModel | AjaxResponse<InternalExternalWalletScreeningBankModel>> {
        throwIfNullOrUndefined(externalWalletScreeningGuid, 'externalWalletScreeningGuid', 'internalPatchExternalWalletScreening');
        throwIfNullOrUndefined(patchInternalExternalWalletScreeningBankModel, 'patchInternalExternalWalletScreeningBankModel', 'internalPatchExternalWalletScreening');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalExternalWalletScreeningBankModel>({
            url: '/api/internal/external_wallet_screenings/{external_wallet_screening_guid}'.replace('{external_wallet_screening_guid}', encodeURI(externalWalletScreeningGuid)),
            method: 'PATCH',
            headers,
            body: patchInternalExternalWalletScreeningBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Patches a Fee.Required scope: **internal:fees:write**
     * Patch Fee
     */
    internalPatchFee({ guid, patchInternalFeeChargeBankModel }: InternalPatchFeeRequest): Observable<InternalFeeChargeBankModel>
    internalPatchFee({ guid, patchInternalFeeChargeBankModel }: InternalPatchFeeRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalFeeChargeBankModel>>
    internalPatchFee({ guid, patchInternalFeeChargeBankModel }: InternalPatchFeeRequest, opts?: OperationOpts): Observable<InternalFeeChargeBankModel | AjaxResponse<InternalFeeChargeBankModel>> {
        throwIfNullOrUndefined(guid, 'guid', 'internalPatchFee');
        throwIfNullOrUndefined(patchInternalFeeChargeBankModel, 'patchInternalFeeChargeBankModel', 'internalPatchFee');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalFeeChargeBankModel>({
            url: '/api/internal/fees/{guid}'.replace('{guid}', encodeURI(guid)),
            method: 'PATCH',
            headers,
            body: patchInternalFeeChargeBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Patch an file.  Required scope: **internal:files:write**
     * Patch Files
     */
    internalPatchFiles({ fileGuid, patchInternalFileBankModel }: InternalPatchFilesRequest): Observable<PlatformFileBankModel>
    internalPatchFiles({ fileGuid, patchInternalFileBankModel }: InternalPatchFilesRequest, opts?: OperationOpts): Observable<AjaxResponse<PlatformFileBankModel>>
    internalPatchFiles({ fileGuid, patchInternalFileBankModel }: InternalPatchFilesRequest, opts?: OperationOpts): Observable<PlatformFileBankModel | AjaxResponse<PlatformFileBankModel>> {
        throwIfNullOrUndefined(fileGuid, 'fileGuid', 'internalPatchFiles');
        throwIfNullOrUndefined(patchInternalFileBankModel, 'patchInternalFileBankModel', 'internalPatchFiles');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<PlatformFileBankModel>({
            url: '/api/internal/files/{file_guid}'.replace('{file_guid}', encodeURI(fileGuid)),
            method: 'PATCH',
            headers,
            body: patchInternalFileBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Patch an identity verification.  Required scope: **internal:identity_verifications:write**
     * Patch Identity Verification
     */
    internalPatchIdentityVerification({ identityVerificationGuid, patchInternalIdentityVerificationBankModel }: InternalPatchIdentityVerificationRequest): Observable<IdentityVerificationBankModel>
    internalPatchIdentityVerification({ identityVerificationGuid, patchInternalIdentityVerificationBankModel }: InternalPatchIdentityVerificationRequest, opts?: OperationOpts): Observable<AjaxResponse<IdentityVerificationBankModel>>
    internalPatchIdentityVerification({ identityVerificationGuid, patchInternalIdentityVerificationBankModel }: InternalPatchIdentityVerificationRequest, opts?: OperationOpts): Observable<IdentityVerificationBankModel | AjaxResponse<IdentityVerificationBankModel>> {
        throwIfNullOrUndefined(identityVerificationGuid, 'identityVerificationGuid', 'internalPatchIdentityVerification');
        throwIfNullOrUndefined(patchInternalIdentityVerificationBankModel, 'patchInternalIdentityVerificationBankModel', 'internalPatchIdentityVerification');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<IdentityVerificationBankModel>({
            url: '/api/internal/identity_verifications/{identity_verification_guid}'.replace('{identity_verification_guid}', encodeURI(identityVerificationGuid)),
            method: 'PATCH',
            headers,
            body: patchInternalIdentityVerificationBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Patch an internal bank account.  Required scope: **internal:accounts:write**
     * Patch Internal Bank Account
     */
    internalPatchInternalBankAccount({ guid, patchInternalInternalBankAccountBankModel }: InternalPatchInternalBankAccountRequest): Observable<InternalInternalBankAccountBankModel>
    internalPatchInternalBankAccount({ guid, patchInternalInternalBankAccountBankModel }: InternalPatchInternalBankAccountRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalInternalBankAccountBankModel>>
    internalPatchInternalBankAccount({ guid, patchInternalInternalBankAccountBankModel }: InternalPatchInternalBankAccountRequest, opts?: OperationOpts): Observable<InternalInternalBankAccountBankModel | AjaxResponse<InternalInternalBankAccountBankModel>> {
        throwIfNullOrUndefined(guid, 'guid', 'internalPatchInternalBankAccount');
        throwIfNullOrUndefined(patchInternalInternalBankAccountBankModel, 'patchInternalInternalBankAccountBankModel', 'internalPatchInternalBankAccount');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalInternalBankAccountBankModel>({
            url: '/api/internal/internal_bank_accounts/{guid}'.replace('{guid}', encodeURI(guid)),
            method: 'PATCH',
            headers,
            body: patchInternalInternalBankAccountBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Patch an internal wallet.  Required scope: **internal:accounts:write**
     * Patch Internal Wallet
     */
    internalPatchInternalWallet({ guid, patchInternalInternalWalletBankModel }: InternalPatchInternalWalletRequest): Observable<InternalInternalWalletBankModel>
    internalPatchInternalWallet({ guid, patchInternalInternalWalletBankModel }: InternalPatchInternalWalletRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalInternalWalletBankModel>>
    internalPatchInternalWallet({ guid, patchInternalInternalWalletBankModel }: InternalPatchInternalWalletRequest, opts?: OperationOpts): Observable<InternalInternalWalletBankModel | AjaxResponse<InternalInternalWalletBankModel>> {
        throwIfNullOrUndefined(guid, 'guid', 'internalPatchInternalWallet');
        throwIfNullOrUndefined(patchInternalInternalWalletBankModel, 'patchInternalInternalWalletBankModel', 'internalPatchInternalWallet');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalInternalWalletBankModel>({
            url: '/api/internal/internal_wallets/{guid}'.replace('{guid}', encodeURI(guid)),
            method: 'PATCH',
            headers,
            body: patchInternalInternalWalletBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Patch an internal wallet.  Required scope: **internal:accounts:write**
     * Patch Internal Wallet
     */
    internalPatchInternalWalletGroup({ guid, patchInternalInternalWalletGroupBankModel }: InternalPatchInternalWalletGroupRequest): Observable<InternalInternalWalletGroupBankModel>
    internalPatchInternalWalletGroup({ guid, patchInternalInternalWalletGroupBankModel }: InternalPatchInternalWalletGroupRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalInternalWalletGroupBankModel>>
    internalPatchInternalWalletGroup({ guid, patchInternalInternalWalletGroupBankModel }: InternalPatchInternalWalletGroupRequest, opts?: OperationOpts): Observable<InternalInternalWalletGroupBankModel | AjaxResponse<InternalInternalWalletGroupBankModel>> {
        throwIfNullOrUndefined(guid, 'guid', 'internalPatchInternalWalletGroup');
        throwIfNullOrUndefined(patchInternalInternalWalletGroupBankModel, 'patchInternalInternalWalletGroupBankModel', 'internalPatchInternalWalletGroup');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalInternalWalletGroupBankModel>({
            url: '/api/internal/internal_wallet_groups/{guid}'.replace('{guid}', encodeURI(guid)),
            method: 'PATCH',
            headers,
            body: patchInternalInternalWalletGroupBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Patch an invoice.  Required scope: **internal:invoices:write**
     * Patch Invoice
     */
    internalPatchInvoice({ invoiceGuid, patchInternalInvoiceBankModel }: InternalPatchInvoiceRequest): Observable<InternalInvoiceBankModel>
    internalPatchInvoice({ invoiceGuid, patchInternalInvoiceBankModel }: InternalPatchInvoiceRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalInvoiceBankModel>>
    internalPatchInvoice({ invoiceGuid, patchInternalInvoiceBankModel }: InternalPatchInvoiceRequest, opts?: OperationOpts): Observable<InternalInvoiceBankModel | AjaxResponse<InternalInvoiceBankModel>> {
        throwIfNullOrUndefined(invoiceGuid, 'invoiceGuid', 'internalPatchInvoice');
        throwIfNullOrUndefined(patchInternalInvoiceBankModel, 'patchInternalInvoiceBankModel', 'internalPatchInvoice');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalInvoiceBankModel>({
            url: '/api/internal/invoices/{invoice_guid}'.replace('{invoice_guid}', encodeURI(invoiceGuid)),
            method: 'PATCH',
            headers,
            body: patchInternalInvoiceBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Patch an payment instruction.  Required scope: **internal:invoices:write**
     * Patch Payment Instruction
     */
    internalPatchPaymentInstruction({ guid, patchInternalPaymentInstructionBankModel }: InternalPatchPaymentInstructionRequest): Observable<PaymentInstructionBankModel>
    internalPatchPaymentInstruction({ guid, patchInternalPaymentInstructionBankModel }: InternalPatchPaymentInstructionRequest, opts?: OperationOpts): Observable<AjaxResponse<PaymentInstructionBankModel>>
    internalPatchPaymentInstruction({ guid, patchInternalPaymentInstructionBankModel }: InternalPatchPaymentInstructionRequest, opts?: OperationOpts): Observable<PaymentInstructionBankModel | AjaxResponse<PaymentInstructionBankModel>> {
        throwIfNullOrUndefined(guid, 'guid', 'internalPatchPaymentInstruction');
        throwIfNullOrUndefined(patchInternalPaymentInstructionBankModel, 'patchInternalPaymentInstructionBankModel', 'internalPatchPaymentInstruction');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<PaymentInstructionBankModel>({
            url: '/api/internal/payment_instructions/{guid}'.replace('{guid}', encodeURI(guid)),
            method: 'PATCH',
            headers,
            body: patchInternalPaymentInstructionBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Patch a person details record.  Required scope: **internal:customers:write**
     * Patch Person Details
     */
    internalPatchPersonDetail({ guid, patchInternalPersonDetailBankModel }: InternalPatchPersonDetailRequest): Observable<InternalPersonDetailBankModel>
    internalPatchPersonDetail({ guid, patchInternalPersonDetailBankModel }: InternalPatchPersonDetailRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalPersonDetailBankModel>>
    internalPatchPersonDetail({ guid, patchInternalPersonDetailBankModel }: InternalPatchPersonDetailRequest, opts?: OperationOpts): Observable<InternalPersonDetailBankModel | AjaxResponse<InternalPersonDetailBankModel>> {
        throwIfNullOrUndefined(guid, 'guid', 'internalPatchPersonDetail');
        throwIfNullOrUndefined(patchInternalPersonDetailBankModel, 'patchInternalPersonDetailBankModel', 'internalPatchPersonDetail');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalPersonDetailBankModel>({
            url: '/api/internal/person_details/{guid}'.replace('{guid}', encodeURI(guid)),
            method: 'PATCH',
            headers,
            body: patchInternalPersonDetailBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Patch a trade.  Required scope: **internal:trades:write**
     * Patch Trade
     */
    internalPatchTrade({ tradeGuid, patchInternalTradeBankModel }: InternalPatchTradeRequest): Observable<InternalTradeBankModel>
    internalPatchTrade({ tradeGuid, patchInternalTradeBankModel }: InternalPatchTradeRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalTradeBankModel>>
    internalPatchTrade({ tradeGuid, patchInternalTradeBankModel }: InternalPatchTradeRequest, opts?: OperationOpts): Observable<InternalTradeBankModel | AjaxResponse<InternalTradeBankModel>> {
        throwIfNullOrUndefined(tradeGuid, 'tradeGuid', 'internalPatchTrade');
        throwIfNullOrUndefined(patchInternalTradeBankModel, 'patchInternalTradeBankModel', 'internalPatchTrade');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalTradeBankModel>({
            url: '/api/internal/trades/{trade_guid}'.replace('{trade_guid}', encodeURI(tradeGuid)),
            method: 'PATCH',
            headers,
            body: patchInternalTradeBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Updates an trading symbol configuration.  Required scope: **internal:banks:write**
     * Patch TradingSymbolConfiguration
     */
    internalPatchTradingSymbolConfiguration({ guid, patchInternalTradingSymbolConfigurationBankModel }: InternalPatchTradingSymbolConfigurationRequest): Observable<InternalTradingSymbolConfigurationBankModel>
    internalPatchTradingSymbolConfiguration({ guid, patchInternalTradingSymbolConfigurationBankModel }: InternalPatchTradingSymbolConfigurationRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalTradingSymbolConfigurationBankModel>>
    internalPatchTradingSymbolConfiguration({ guid, patchInternalTradingSymbolConfigurationBankModel }: InternalPatchTradingSymbolConfigurationRequest, opts?: OperationOpts): Observable<InternalTradingSymbolConfigurationBankModel | AjaxResponse<InternalTradingSymbolConfigurationBankModel>> {
        throwIfNullOrUndefined(guid, 'guid', 'internalPatchTradingSymbolConfiguration');
        throwIfNullOrUndefined(patchInternalTradingSymbolConfigurationBankModel, 'patchInternalTradingSymbolConfigurationBankModel', 'internalPatchTradingSymbolConfiguration');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalTradingSymbolConfigurationBankModel>({
            url: '/api/internal/trading_symbol_configurations/{guid}'.replace('{guid}', encodeURI(guid)),
            method: 'PATCH',
            headers,
            body: patchInternalTradingSymbolConfigurationBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Patch an transfer.  Required scope: **internal:transfers:write**
     * Patch Transfer
     */
    internalPatchTransfer({ transferGuid, patchInternalTransferBankModel }: InternalPatchTransferRequest): Observable<InternalTransferBankModel>
    internalPatchTransfer({ transferGuid, patchInternalTransferBankModel }: InternalPatchTransferRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalTransferBankModel>>
    internalPatchTransfer({ transferGuid, patchInternalTransferBankModel }: InternalPatchTransferRequest, opts?: OperationOpts): Observable<InternalTransferBankModel | AjaxResponse<InternalTransferBankModel>> {
        throwIfNullOrUndefined(transferGuid, 'transferGuid', 'internalPatchTransfer');
        throwIfNullOrUndefined(patchInternalTransferBankModel, 'patchInternalTransferBankModel', 'internalPatchTransfer');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalTransferBankModel>({
            url: '/api/internal/transfers/{transfer_guid}'.replace('{transfer_guid}', encodeURI(transferGuid)),
            method: 'PATCH',
            headers,
            body: patchInternalTransferBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Patch an transfer screening.  Required scope: **internal:transfer_screenings:write**
     * Patch External Wallet Screening
     */
    internalPatchTransferScreening({ transferScreeningGuid, patchInternalTransferScreeningBankModel }: InternalPatchTransferScreeningRequest): Observable<InternalTransferScreeningBankModel>
    internalPatchTransferScreening({ transferScreeningGuid, patchInternalTransferScreeningBankModel }: InternalPatchTransferScreeningRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalTransferScreeningBankModel>>
    internalPatchTransferScreening({ transferScreeningGuid, patchInternalTransferScreeningBankModel }: InternalPatchTransferScreeningRequest, opts?: OperationOpts): Observable<InternalTransferScreeningBankModel | AjaxResponse<InternalTransferScreeningBankModel>> {
        throwIfNullOrUndefined(transferScreeningGuid, 'transferScreeningGuid', 'internalPatchTransferScreening');
        throwIfNullOrUndefined(patchInternalTransferScreeningBankModel, 'patchInternalTransferScreeningBankModel', 'internalPatchTransferScreening');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalTransferScreeningBankModel>({
            url: '/api/internal/transfer_screenings/{transfer_screening_guid}'.replace('{transfer_screening_guid}', encodeURI(transferScreeningGuid)),
            method: 'PATCH',
            headers,
            body: patchInternalTransferScreeningBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Patch an internal wallet.  Required scope: **internal:wallet_services:write**
     * Patch Internal Wallet
     */
    internalPatchWalletService({ guid, patchInternalWalletServiceBankModel }: InternalPatchWalletServiceRequest): Observable<InternalWalletServiceBankModel>
    internalPatchWalletService({ guid, patchInternalWalletServiceBankModel }: InternalPatchWalletServiceRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalWalletServiceBankModel>>
    internalPatchWalletService({ guid, patchInternalWalletServiceBankModel }: InternalPatchWalletServiceRequest, opts?: OperationOpts): Observable<InternalWalletServiceBankModel | AjaxResponse<InternalWalletServiceBankModel>> {
        throwIfNullOrUndefined(guid, 'guid', 'internalPatchWalletService');
        throwIfNullOrUndefined(patchInternalWalletServiceBankModel, 'patchInternalWalletServiceBankModel', 'internalPatchWalletService');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalWalletServiceBankModel>({
            url: '/api/internal/wallet_services/{guid}'.replace('{guid}', encodeURI(guid)),
            method: 'PATCH',
            headers,
            body: patchInternalWalletServiceBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Patch an workflow.  Required scope: **internal:workflows:write**
     * Patch Workflow
     */
    internalPatchWorkflow({ workflowGuid, patchInternalWorkflowBankModel }: InternalPatchWorkflowRequest): Observable<WorkflowBankModel>
    internalPatchWorkflow({ workflowGuid, patchInternalWorkflowBankModel }: InternalPatchWorkflowRequest, opts?: OperationOpts): Observable<AjaxResponse<WorkflowBankModel>>
    internalPatchWorkflow({ workflowGuid, patchInternalWorkflowBankModel }: InternalPatchWorkflowRequest, opts?: OperationOpts): Observable<WorkflowBankModel | AjaxResponse<WorkflowBankModel>> {
        throwIfNullOrUndefined(workflowGuid, 'workflowGuid', 'internalPatchWorkflow');
        throwIfNullOrUndefined(patchInternalWorkflowBankModel, 'patchInternalWorkflowBankModel', 'internalPatchWorkflow');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<WorkflowBankModel>({
            url: '/api/internal/workflows/{workflow_guid}'.replace('{workflow_guid}', encodeURI(workflowGuid)),
            method: 'PATCH',
            headers,
            body: patchInternalWorkflowBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Signal an external wallet screening with a outcome.  Required scope: **internal:external_wallet_screenings:write**
     * Signal External Wallet Screening
     */
    internalSignalExternalWalletScreening({ externalWalletScreeningGuid, postSignalInternalExternalWalletScreeningBankModel }: InternalSignalExternalWalletScreeningRequest): Observable<InternalExternalWalletScreeningBankModel>
    internalSignalExternalWalletScreening({ externalWalletScreeningGuid, postSignalInternalExternalWalletScreeningBankModel }: InternalSignalExternalWalletScreeningRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalExternalWalletScreeningBankModel>>
    internalSignalExternalWalletScreening({ externalWalletScreeningGuid, postSignalInternalExternalWalletScreeningBankModel }: InternalSignalExternalWalletScreeningRequest, opts?: OperationOpts): Observable<InternalExternalWalletScreeningBankModel | AjaxResponse<InternalExternalWalletScreeningBankModel>> {
        throwIfNullOrUndefined(externalWalletScreeningGuid, 'externalWalletScreeningGuid', 'internalSignalExternalWalletScreening');
        throwIfNullOrUndefined(postSignalInternalExternalWalletScreeningBankModel, 'postSignalInternalExternalWalletScreeningBankModel', 'internalSignalExternalWalletScreening');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalExternalWalletScreeningBankModel>({
            url: '/api/internal/external_wallet_screenings/{external_wallet_screening_guid}/signal'.replace('{external_wallet_screening_guid}', encodeURI(externalWalletScreeningGuid)),
            method: 'POST',
            headers,
            body: postSignalInternalExternalWalletScreeningBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Signal an identity verification with a decision.  Required scope: **internal:identity_verifications:write**
     * Signal Identity Verification
     */
    internalSignalIdentityVerification({ identityVerificationGuid, postSignalInternalIdentityVerificationBankModel }: InternalSignalIdentityVerificationRequest): Observable<IdentityVerificationBankModel>
    internalSignalIdentityVerification({ identityVerificationGuid, postSignalInternalIdentityVerificationBankModel }: InternalSignalIdentityVerificationRequest, opts?: OperationOpts): Observable<AjaxResponse<IdentityVerificationBankModel>>
    internalSignalIdentityVerification({ identityVerificationGuid, postSignalInternalIdentityVerificationBankModel }: InternalSignalIdentityVerificationRequest, opts?: OperationOpts): Observable<IdentityVerificationBankModel | AjaxResponse<IdentityVerificationBankModel>> {
        throwIfNullOrUndefined(identityVerificationGuid, 'identityVerificationGuid', 'internalSignalIdentityVerification');
        throwIfNullOrUndefined(postSignalInternalIdentityVerificationBankModel, 'postSignalInternalIdentityVerificationBankModel', 'internalSignalIdentityVerification');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<IdentityVerificationBankModel>({
            url: '/api/internal/identity_verifications/{identity_verification_guid}/signal'.replace('{identity_verification_guid}', encodeURI(identityVerificationGuid)),
            method: 'POST',
            headers,
            body: postSignalInternalIdentityVerificationBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Signal an invoice to complete settlment.  Required scope: **internal:invoices:write**
     * Signal Invoice
     */
    internalSignalInvoice({ invoiceGuid }: InternalSignalInvoiceRequest): Observable<InternalInvoiceBankModel>
    internalSignalInvoice({ invoiceGuid }: InternalSignalInvoiceRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalInvoiceBankModel>>
    internalSignalInvoice({ invoiceGuid }: InternalSignalInvoiceRequest, opts?: OperationOpts): Observable<InternalInvoiceBankModel | AjaxResponse<InternalInvoiceBankModel>> {
        throwIfNullOrUndefined(invoiceGuid, 'invoiceGuid', 'internalSignalInvoice');

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalInvoiceBankModel>({
            url: '/api/internal/invoices/{invoice_guid}/signal'.replace('{invoice_guid}', encodeURI(invoiceGuid)),
            method: 'POST',
            headers,
        }, opts?.responseOpts);
    };

    /**
     * Signal an transfer to proceed.  Required scope: **internal:transfers:write**
     * Signal Transfer
     */
    internalSignalTransfer({ transferGuid }: InternalSignalTransferRequest): Observable<TransferBankModel>
    internalSignalTransfer({ transferGuid }: InternalSignalTransferRequest, opts?: OperationOpts): Observable<AjaxResponse<TransferBankModel>>
    internalSignalTransfer({ transferGuid }: InternalSignalTransferRequest, opts?: OperationOpts): Observable<TransferBankModel | AjaxResponse<TransferBankModel>> {
        throwIfNullOrUndefined(transferGuid, 'transferGuid', 'internalSignalTransfer');

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<TransferBankModel>({
            url: '/api/internal/transfers/{transfer_guid}/signal'.replace('{transfer_guid}', encodeURI(transferGuid)),
            method: 'POST',
            headers,
        }, opts?.responseOpts);
    };

    /**
     * Patch an execution verification.  Required scope: **internal:executions:write**
     * Patch Execution
     */
    patchInternalExecution({ executionGuid, patchInternalExecutionBankModel }: PatchInternalExecutionRequest): Observable<InternalExecutionBankModel>
    patchInternalExecution({ executionGuid, patchInternalExecutionBankModel }: PatchInternalExecutionRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalExecutionBankModel>>
    patchInternalExecution({ executionGuid, patchInternalExecutionBankModel }: PatchInternalExecutionRequest, opts?: OperationOpts): Observable<InternalExecutionBankModel | AjaxResponse<InternalExecutionBankModel>> {
        throwIfNullOrUndefined(executionGuid, 'executionGuid', 'patchInternalExecution');
        throwIfNullOrUndefined(patchInternalExecutionBankModel, 'patchInternalExecutionBankModel', 'patchInternalExecution');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalExecutionBankModel>({
            url: '/api/internal/executions/{execution_guid}'.replace('{execution_guid}', encodeURI(executionGuid)),
            method: 'PATCH',
            headers,
            body: patchInternalExecutionBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Patch an plan verification.  Required scope: **internal:plans:write**
     * Patch Plan
     */
    patchInternalPlan({ planGuid, patchInternalPlanBankModel }: PatchInternalPlanRequest): Observable<InternalPlanBankModel>
    patchInternalPlan({ planGuid, patchInternalPlanBankModel }: PatchInternalPlanRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalPlanBankModel>>
    patchInternalPlan({ planGuid, patchInternalPlanBankModel }: PatchInternalPlanRequest, opts?: OperationOpts): Observable<InternalPlanBankModel | AjaxResponse<InternalPlanBankModel>> {
        throwIfNullOrUndefined(planGuid, 'planGuid', 'patchInternalPlan');
        throwIfNullOrUndefined(patchInternalPlanBankModel, 'patchInternalPlanBankModel', 'patchInternalPlan');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalPlanBankModel>({
            url: '/api/internal/plans/{plan_guid}'.replace('{plan_guid}', encodeURI(planGuid)),
            method: 'PATCH',
            headers,
            body: patchInternalPlanBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Patch a stage.  Required scope: **internal:plans:write**
     * Patch Stage
     */
    patchInternalStage({ stageGuid, patchInternalStageBankModel }: PatchInternalStageRequest): Observable<InternalStageBankModel>
    patchInternalStage({ stageGuid, patchInternalStageBankModel }: PatchInternalStageRequest, opts?: OperationOpts): Observable<AjaxResponse<InternalStageBankModel>>
    patchInternalStage({ stageGuid, patchInternalStageBankModel }: PatchInternalStageRequest, opts?: OperationOpts): Observable<InternalStageBankModel | AjaxResponse<InternalStageBankModel>> {
        throwIfNullOrUndefined(stageGuid, 'stageGuid', 'patchInternalStage');
        throwIfNullOrUndefined(patchInternalStageBankModel, 'patchInternalStageBankModel', 'patchInternalStage');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', [])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<InternalStageBankModel>({
            url: '/api/internal/stages/{stage_guid}'.replace('{stage_guid}', encodeURI(stageGuid)),
            method: 'PATCH',
            headers,
            body: patchInternalStageBankModel,
        }, opts?.responseOpts);
    };

}

/**
 * @export
 * @enum {string}
 */
export enum InternalListInvoicesEnvironmentEnum {
    Sandbox = 'sandbox',
    Production = 'production'
}
/**
 * @export
 * @enum {string}
 */
export enum InternalListTransactionsEnvironmentEnum {
    Sandbox = 'sandbox',
    Production = 'production'
}
/**
 * @export
 * @enum {string}
 */
export enum InternalListTransactionsAccountTypeEnum {
    Wallet = 'internal_wallet',
    BankAccount = 'internal_bank_account'
}
