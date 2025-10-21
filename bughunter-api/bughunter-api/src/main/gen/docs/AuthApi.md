# AuthApi

All URIs are relative to */api*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**authForgotPasswordPost**](AuthApi.md#authForgotPasswordPost) | **POST** /auth/forgot-password | Recuperación de contraseña (placeholder) |
| [**authLoginPost**](AuthApi.md#authLoginPost) | **POST** /auth/login | Iniciar sesión |
| [**authRegisterPost**](AuthApi.md#authRegisterPost) | **POST** /auth/register | Registrar un nuevo usuario |


<a id="authForgotPasswordPost"></a>
# **authForgotPasswordPost**
> authForgotPasswordPost(authForgotPasswordPostRequest)

Recuperación de contraseña (placeholder)

Inicia el flujo de recuperación de contraseña (lógica a implementar).

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.AuthApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("/api");

    AuthApi apiInstance = new AuthApi(defaultClient);
    AuthForgotPasswordPostRequest authForgotPasswordPostRequest = new AuthForgotPasswordPostRequest(); // AuthForgotPasswordPostRequest | 
    try {
      apiInstance.authForgotPasswordPost(authForgotPasswordPostRequest);
    } catch (ApiException e) {
      System.err.println("Exception when calling AuthApi#authForgotPasswordPost");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
```

### Parameters

| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **authForgotPasswordPostRequest** | [**AuthForgotPasswordPostRequest**](AuthForgotPasswordPostRequest.md)|  | |

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Instrucciones enviadas (si el email existe). |  -  |

<a id="authLoginPost"></a>
# **authLoginPost**
> AuthResponseDTO authLoginPost(userLoginDTO)

Iniciar sesión

Autentica al usuario y devuelve un token de acceso e información básica.

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.AuthApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("/api");

    AuthApi apiInstance = new AuthApi(defaultClient);
    UserLoginDTO userLoginDTO = new UserLoginDTO(); // UserLoginDTO | 
    try {
      AuthResponseDTO result = apiInstance.authLoginPost(userLoginDTO);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling AuthApi#authLoginPost");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
```

### Parameters

| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **userLoginDTO** | [**UserLoginDTO**](UserLoginDTO.md)|  | |

### Return type

[**AuthResponseDTO**](AuthResponseDTO.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Inicio de sesión exitoso. |  -  |
| **401** | No autenticado (token no provisto o inválido). |  -  |

<a id="authRegisterPost"></a>
# **authRegisterPost**
> AuthResponseDTO authRegisterPost(userRegistrationDTO)

Registrar un nuevo usuario

Crea una nueva cuenta de usuario y su perfil inicial.

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.AuthApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("/api");

    AuthApi apiInstance = new AuthApi(defaultClient);
    UserRegistrationDTO userRegistrationDTO = new UserRegistrationDTO(); // UserRegistrationDTO | 
    try {
      AuthResponseDTO result = apiInstance.authRegisterPost(userRegistrationDTO);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling AuthApi#authRegisterPost");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
```

### Parameters

| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **userRegistrationDTO** | [**UserRegistrationDTO**](UserRegistrationDTO.md)|  | |

### Return type

[**AuthResponseDTO**](AuthResponseDTO.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Usuario registrado exitosamente. |  -  |
| **400** | Solicitud inválida (e.g., falta un campo, email inválido, username ya existe). |  -  |

