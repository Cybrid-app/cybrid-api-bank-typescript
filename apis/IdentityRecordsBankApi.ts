// tslint:disable
/**
 * Cybrid Bank API
 * # Welcome  Welcome to the Cybrid platform; enabling turnkey crypto banking services!  In these documents, you will find information on the operations provided by our platform, as well as details on how our REST API operates more generally.  Our complete set of APIs allows you to manage all your resources: your Organization, your banks and your identities. The complete set of APIs can be found on the following pages:  | API                                                            | Description                  | |----------------------------------------------------------------|------------------------------| | [Organization API](https://organization.demo.cybrid.app/api/schema/swagger-ui) | APIs to manage organizations | | [Bank API](https://bank.demo.cybrid.app/api/schema/swagger-ui)                 | APIs to manage banks         | | [Identities API](https://id.demo.cybrid.app/api/schema/swagger-ui)                     | APIs to manage identities    |  When you\'re ready, [request access](https://www.cybrid.xyz/access) to your Dashboard to view and administer your Organization. Once you\'ve logged in, you can begin creating Banks, either for sandbox or production usage, and start enabling your customers to leverage DeFi and web3 with confidence.  If you have any questions, please contact [Support](mailto:support@cybrid.app) at any time so that we can help.  ## Authentication  The Cybrid Platform uses OAuth 2.0 Bearer Tokens to authenticate requests to the platform. Credentials to create Organization and Bank tokens can be generated via your Dashboard ([request access](https://www.cybrid.xyz/access)).  An Organization Token applies broadly to the whole Organization and all of its Banks, whereas, a Bank Token is specific to an individual Bank.  Both Organization and Bank tokens can be created using the OAuth Client Credential Grant flow. Each Organization and Bank has its own unique Client ID and Secret that allows for machine-to-machine authentication.  **Never share your Client ID or Secret publicly or in your source code repository**  Your Client ID and Secret can be exchanged for a time-limited Bearer Token by interacting with the Cybrid Identity Provider or through interacting with the **Authorize** button in this document:  ``` curl -X POST https://id.demo.cybrid.app/oauth/token -d \'{     \"grant_type\": \"client_credentials\",     \"client_id\": \"<Your Client ID>\",     \"client_secret\": \"<Your Secret>\",     \"scope\": \"<Your requested scopes -- space separated>\"   }\' -H \"Content-Type: application/json\" ```  ## Scopes  The Cybrid platform supports the use of scopes to control the level of access a token is limited to. Scopes do not grant access to resources; instead, they provide limits, in support of the least privilege principal.  The following scopes are available on the platform and can be requested when generating either an Organization or a Bank token. Generally speaking, the _Read_ scope is required to read and list resources, the _Write_ scope is required to update a resource and the _Execute_ scope is required to create a resource.  | Resource      | Read scope         | Write scope          | Execute scope     | Token Type         | |---------------|--------------------|----------------------|-------------------|--------------------| | Organizations | organizations:read | organizations:write  |                   | Organization/ Bank | | Banks         | banks:read         | banks:write          | banks:execute     | Organization/ Bank | | Customers     | customers:read     | customers:write      | customers:execute | Bank               | | Assets        | prices:read        |                      |                   | Bank               | | Accounts      | accounts:read      |                      | accounts:execute  | Bank               | | Prices        | prices:read        |                      |                   | Bank               | | Symbols       | prices:read        |                      |                   | Bank               | | Quotes        | quotes:read        |                      | quotes:execute    | Bank               | | Trades        | trades:read        |                      | trades:execute    | Bank               | | Rewards       | rewards:read       |                      | rewards:execute   | Bank               |  ## Organizations  An Organization is meant to model the organization partnering with Cybrid to use our platform.  An Organization does not directly interact with customers. Instead, an Organization has one or more banks, which encompass the financial service offerings of the platform.  ## Banks  A Bank is owned by an Organization and can be thought of as an environment or container for Customers and product offerings. An example of a Bank would be your customer facing banking website, or an internal staging environment for testing and integration.  An Organization can have multiple banks, in sandbox or production environments. A sandbox Bank will be backed by stubbed data and process flows. For instance, identity record and funding source processes will be simulated rather than performed.  ## Customers  Customers represent your banking users on the platform. At present, we offer support for Individuals as Customers.  Customers must be verified in our system before they can play any part on the platform. See the Identity Records section for more details on how a customer can be verified.  Customers must also have an account to be able to transact. See the Accounts APIs for more details on setting up accounts for the customer. 
 *
 * The version of the OpenAPI document: v0.35.6
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
    IdentityRecordBankModel,
    IdentityRecordListBankModel,
    PostIdentityRecordBankModel,
} from '../models';

export interface CreateIdentityRecordRequest {
    postIdentityRecordBankModel: PostIdentityRecordBankModel;
}

export interface GetIdentityRecordRequest {
    identityRecordGuid: string;
}

export interface ListIdentityRecordsRequest {
    customerGuid?: string;
    page?: number;
    perPage?: number;
}

/**
 * no description
 */
export class IdentityRecordsBankApi extends BaseAPI {

    /**
     * Creates an identity record.  ## Identity Records  Identity Records verify an individual for inclusion on the platform. This know-your-customer (KYC) process is a requirement for individuals to be able to transact. At present, we offer support for Attestation Identity Records.  Once an Identity Record has been submitted, it will be reviewed by our system and transit through a lifecycle before ultimately being `verified` or `failed`. If an Identity Record is ends up `failed`, contextual information as to the reason may be provided on the resource and additional attempts can be made.  ## Attestation Identity Records  An Attestation Identity Record is a confirmation of fact that the Organization has completed their own KYC process and can vouch for its correctness.  Prior to uploading `verified` attestation identity records, an Organization must register their signing public key with their Bank through the create Verification Key API.  To create an attestation identity record, a signed JWT is required as proof that the Customer\'s identity has been verified by the Organization. When creating the JWT, the Organization must use the RS512 signing algorithm.  The JWT must contain the following headers:  - **alg**: The RS512 algorithm value, e.g., \'RS512\'. - **kid**: Set to the guid of the verification key that has been registered for the Bank  The JWT must contain the following claims:  - **iss**: Set to http://api.cybrid.app/banks/{bank_guid} - **aud**: Set to http://api.cybrid.app - **sub**: Set to http://api.cybrid.app/customers/{customer_guid} - **iat**: Set to the time at which the JWT was issued - **exp**: Set to the time after which the JWT expires - **jti**: Set to a unique identifier for the JWT  Example code (python) for generating an Attestation Identity Record JWT token:  ```python # Assumes an RSA private key has been generated (`private_key`), a Verification Key has been created and a `verification_key_guid` is available. # # `customer_guid` should be set to the guid assigned to a Customer that has been created. # `bank_guid` should be set to the guid of your bank #  import uuid  from datetime import datetime, timezone, timedelta from jwcrypto import jwt, jwk from cryptography.hazmat.primitives import serialization from cryptography.hazmat.primitives.serialization import load_pem_private_key  algorithm = \'RS512\' issued_at = datetime.now(timezone.utc) expired_at = issued_at + timedelta(days=365)  with open(\"verification_key.pem\", \'rb\') as pem_in:   pem_lines = pem_in.read()  private_key = load_pem_private_key(pem_lines, None)  ### DISCLAIMER:- Since NO ENCRYPTION is used in the key storage/formatting. Please DO NOT use this code in production environment. signing_key = jwk.JWK.from_pem(     private_key.private_bytes(         encoding=serialization.Encoding.PEM,         format=serialization.PrivateFormat.PKCS8,         encryption_algorithm=serialization.NoEncryption()     ) ) signing_key.update({\"kid\": verification_key_guid})  attestation_jwt = jwt.JWT(     header={         \"alg\": algorithm,         \"kid\": verification_key_guid     },     claims={         \"iss\": f\"http://api.cybrid.app/banks/{bank_guid}\",         \"aud\": \"http://api.cybrid.app\",         \"sub\": f\"http://api.cybrid.app/customers/{customer_guid}\",         \"iat\": int(issued_at.timestamp()),         \"exp\": int(expired_at.timestamp()),         \"jti\": str(uuid.uuid4())     },     key=signing_key,     algs=[algorithm] ) attestation_jwt.make_signed_token(signing_key)  token = attestation_jwt.serialize(compact=True) print(\"Token is : \", token) ```  ## Default Attestation Signing Key  The Cybrid Sandbox environment comes provisioned with a default signing key that can be used to perform identity record attestation. The default identity signing key provides a convenient starting point for testing Sandbox flows that require identity attestation, such as executing trades.  The signing key can be loaded directly into a client application by passing its PEM encoded value as an environment variable.  ``` -----BEGIN PRIVATE KEY----- MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDZ75nSfJy/eeuj 4f7EK7i+n4FUDE8BsD/acCdk9Pn56suuDc3SFcMoyjBIoDLZkbRsVfmBEcPDNJOp GNqzoaXa7qe7Yw0qpK9MbNbAYxiyAfxwVHM+ZpwP6M/r3LmsCRFXgNdCjfOzok7u V59hDjfHMMQm/M9ztGVhaJpgozY/7DKk+R6qY/DEBs63eXwfcHE0u0NbS8Y9Qp+6 7cB2f1iuy++5Uut1vx4qdgZ4UFMkwIdTWl/e6LDcdXhk3///T5WOnDlI+S4rhGUO xsAOfOa+T9uqYBr2hbQR9emTEYmwF1lgZ7VU4S9sSjAMKpB/TVlVVOsNhdNSGg6f 6hu7fuadAgMBAAECggEBAMUJL1VyfHVRUY5VoPTTYrBVnaPTjQrFwrVHeRZ5thgS BBxVNqSeMFgMlSLUU6UJasoX4QCkgw1V17qmUfTeTQlnhBaTMzA+vI6oSHCgJ4+o 5AbbE2Zzdt2ba4Cfiu7TM+6c+gGePZtHP32Vku84340jtfRZ1WWSz6YF4K1GYqHe y7I4POotHu2WcSTXYKs2zTu5KAO7gvx7yITVytaiUGUHk9FNyZPDIh0u7e9CAEti BangdYTfvbXAIx9lrg3XQ4gtFXTd0aY/3R9K3SE+s5iWh/SabjV4U7x+MuHZS5kv 8rcLCPQ5kUgiF4bQMy7QznUuNso65SbRJKHaU8UAuIECgYEA7+bNdz/uiN/JxUJY 3xwjD+CG4vXOyEmCioBjllYBeXQyB/VrsdzVrdF2JiECnStPRH6/6nd7/wUcLORv NyrQqnCa5/O8Kv9Z3t4TmxYf+ECIgx+gazehQHptUkr8QWtxceorUC9pu4cUJ8z3 nQLCggHYQ3g7xj73LLZ+5QQBC8kCgYEA6I91Dgs+HZWDMMcGbKV2cMkXK8BTOgZZ 6B6i6flO4tf9U2CPBZsjYLBN5EEuxxy9Yl7rlV7CxAhnnjdIKk2jQbzTPI0qmJfp 397rvdR8bur1OkALj2Tb39fz8z1Qy7AcN8siqXuortZZ5OI9XRWgnG/3B4gUFOnW 4Mr0dhfaxjUCgYEAmVcricehjneMnrtz1thDSQi47yUzES57dE/wV82Nj7ZHrHKg bcW8ByhVnrWG2DMwrZVe0l2hMjZv9fnlZJvHWMo1GYHfipRBO4UzfvO7Z5DIMRfs D9w1A+O9MNahOqeUkb2eBdjoemcy6OXId+Gltje7phSaEHN6xme34GaYzJECgYBP eRbLYdQsT/exJ5JudmzvRgkBDoxie+EljbKmumfW5XDQmWLGy6lfVWCI7C2MJaoi f8WKGgP88dJXIxUqP7XWtSyKuMMhumhV9Nwi1wZe8TQ0X8aTjigFassXCJEfymMa PfTubi/K771wlk/aC5YDX8/PZxVVwEOKNlEsOiKtMQKBgQDqRv5AUHhabqcMfbs7 DTeo/fS/eXJv8MN+CUU2RSrNUKjEdHT2R5KP550TyXr1JXLKpEEZu8wvvaQDV4Dw p0Eij6bKsh03X38NR+C5SxonXPosdvoiXR8uUgya2f/aJYV+aWZ9euFgYZAXf/0Q MnWdKylfZlV50XP2KFn07wPs7w== -----END PRIVATE KEY----- ```  A corresponding public verification key can be retrieved from the Cybrid Banks API using the `/api/bank_verification_keys` endpoint. Performing a `get` request to this endpoint returns the available Verification Key records, the first of which is the provisioned default. The endpoint can be hit directly or by using the Cybrid Banks API client:  ```python ... api_client = cybrid_api_bank.ApiClient(configuration) api_instance = verification_keys_bank_api.VerificationKeysBankApi(api_client) verification_keys = api_instance.list_verification_keys() verification_key = verification_keys.objects[0] ```  Once available to the application, the signing key and Verification Key record can be used in conjunction to create the attestation JWT. The Verification Key\'s GUID is passed as the JWT\'s `kid` while the signing key is used to sign the JWT.  ## Attestation State  | State | Description | |-------|-------------| | storing | The Platform is storing the attestation in our private store | | pending | The Platform is verifying the attestation\'s JWT | | verified | The Platform has verified the attestation and the customer is able to transact | | failed | The Platform was not able to verify the attestation and the customer is not able to transact |    Required scope: **customers:write**
     * Create Identity Record
     */
    createIdentityRecord({ postIdentityRecordBankModel }: CreateIdentityRecordRequest): Observable<IdentityRecordBankModel>
    createIdentityRecord({ postIdentityRecordBankModel }: CreateIdentityRecordRequest, opts?: OperationOpts): Observable<AjaxResponse<IdentityRecordBankModel>>
    createIdentityRecord({ postIdentityRecordBankModel }: CreateIdentityRecordRequest, opts?: OperationOpts): Observable<IdentityRecordBankModel | AjaxResponse<IdentityRecordBankModel>> {
        throwIfNullOrUndefined(postIdentityRecordBankModel, 'postIdentityRecordBankModel', 'createIdentityRecord');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
            // oauth required
            ...(this.configuration.accessToken != null
                ? { Authorization: typeof this.configuration.accessToken === 'function'
                    ? this.configuration.accessToken('oauth2', ['customers:write'])
                    : this.configuration.accessToken }
                : undefined
            ),
        };

        return this.request<IdentityRecordBankModel>({
            url: '/api/identity_records',
            method: 'POST',
            headers,
            body: postIdentityRecordBankModel,
        }, opts?.responseOpts);
    };

    /**
     * Retrieves an identity record.  Required scope: **customers:read**
     * Get Identity Record
     */
    getIdentityRecord({ identityRecordGuid }: GetIdentityRecordRequest): Observable<IdentityRecordBankModel>
    getIdentityRecord({ identityRecordGuid }: GetIdentityRecordRequest, opts?: OperationOpts): Observable<AjaxResponse<IdentityRecordBankModel>>
    getIdentityRecord({ identityRecordGuid }: GetIdentityRecordRequest, opts?: OperationOpts): Observable<IdentityRecordBankModel | AjaxResponse<IdentityRecordBankModel>> {
        throwIfNullOrUndefined(identityRecordGuid, 'identityRecordGuid', 'getIdentityRecord');

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

        return this.request<IdentityRecordBankModel>({
            url: '/api/identity_records/{identity_record_guid}'.replace('{identity_record_guid}', encodeURI(identityRecordGuid)),
            method: 'GET',
            headers,
        }, opts?.responseOpts);
    };

    /**
     * Retrieves a listing of identity records for a bank.  Required scope: **customers:read**
     * List Identity Records
     */
    listIdentityRecords({ customerGuid, page, perPage }: ListIdentityRecordsRequest): Observable<IdentityRecordListBankModel>
    listIdentityRecords({ customerGuid, page, perPage }: ListIdentityRecordsRequest, opts?: OperationOpts): Observable<AjaxResponse<IdentityRecordListBankModel>>
    listIdentityRecords({ customerGuid, page, perPage }: ListIdentityRecordsRequest, opts?: OperationOpts): Observable<IdentityRecordListBankModel | AjaxResponse<IdentityRecordListBankModel>> {

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

        if (customerGuid != null) { query['customer_guid'] = customerGuid; }
        if (page != null) { query['page'] = page; }
        if (perPage != null) { query['per_page'] = perPage; }

        return this.request<IdentityRecordListBankModel>({
            url: '/api/identity_records',
            method: 'GET',
            headers,
            query,
        }, opts?.responseOpts);
    };

}
