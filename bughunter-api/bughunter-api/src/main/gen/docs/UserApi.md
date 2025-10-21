# UserApi

All URIs are relative to */api*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**usersMeAccountPut**](UserApi.md#usersMeAccountPut) | **PUT** /users/me/account | Actualizar datos de la cuenta (nombre/username) |
| [**usersMeProfileGet**](UserApi.md#usersMeProfileGet) | **GET** /users/me/profile | Obtener el perfil completo del usuario |
| [**usersMeSettingsPut**](UserApi.md#usersMeSettingsPut) | **PUT** /users/me/settings | Actualizar configuraciones del usuario (meta, sonido) |
| [**usersMeStatsGet**](UserApi.md#usersMeStatsGet) | **GET** /users/me/stats | Obtener estadísticas de gamificación del usuario |


<a id="usersMeAccountPut"></a>
# **usersMeAccountPut**
> UserInfoDTO usersMeAccountPut(userAccountUpdateDTO)

Actualizar datos de la cuenta (nombre/username)

Usado por &#x60;pages/settings/account.tsx&#x60; para guardar cambios.

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.UserApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("/api");
    
    // Configure HTTP bearer authorization: bearerAuth
    HttpBearerAuth bearerAuth = (HttpBearerAuth) defaultClient.getAuthentication("bearerAuth");
    bearerAuth.setBearerToken("BEARER TOKEN");

    UserApi apiInstance = new UserApi(defaultClient);
    UserAccountUpdateDTO userAccountUpdateDTO = new UserAccountUpdateDTO(); // UserAccountUpdateDTO | 
    try {
      UserInfoDTO result = apiInstance.usersMeAccountPut(userAccountUpdateDTO);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling UserApi#usersMeAccountPut");
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
| **userAccountUpdateDTO** | [**UserAccountUpdateDTO**](UserAccountUpdateDTO.md)|  | |

### Return type

[**UserInfoDTO**](UserInfoDTO.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Cuenta actualizada. |  -  |
| **400** | Solicitud inválida (e.g., falta un campo, email inválido, username ya existe). |  -  |
| **401** | No autenticado (token no provisto o inválido). |  -  |

<a id="usersMeProfileGet"></a>
# **usersMeProfileGet**
> UserProfileDTO usersMeProfileGet()

Obtener el perfil completo del usuario

Devuelve toda la información del usuario autenticado, incluyendo datos personales y configuraciones.

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.UserApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("/api");
    
    // Configure HTTP bearer authorization: bearerAuth
    HttpBearerAuth bearerAuth = (HttpBearerAuth) defaultClient.getAuthentication("bearerAuth");
    bearerAuth.setBearerToken("BEARER TOKEN");

    UserApi apiInstance = new UserApi(defaultClient);
    try {
      UserProfileDTO result = apiInstance.usersMeProfileGet();
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling UserApi#usersMeProfileGet");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**UserProfileDTO**](UserProfileDTO.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Perfil completo del usuario. |  -  |
| **401** | No autenticado (token no provisto o inválido). |  -  |

<a id="usersMeSettingsPut"></a>
# **usersMeSettingsPut**
> UserProfileDTO usersMeSettingsPut(userSettingsUpdateDTO)

Actualizar configuraciones del usuario (meta, sonido)

Usado por &#x60;pages/settings/coach.tsx&#x60; y &#x60;pages/settings/sound.tsx&#x60;.

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.UserApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("/api");
    
    // Configure HTTP bearer authorization: bearerAuth
    HttpBearerAuth bearerAuth = (HttpBearerAuth) defaultClient.getAuthentication("bearerAuth");
    bearerAuth.setBearerToken("BEARER TOKEN");

    UserApi apiInstance = new UserApi(defaultClient);
    UserSettingsUpdateDTO userSettingsUpdateDTO = new UserSettingsUpdateDTO(); // UserSettingsUpdateDTO | 
    try {
      UserProfileDTO result = apiInstance.usersMeSettingsPut(userSettingsUpdateDTO);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling UserApi#usersMeSettingsPut");
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
| **userSettingsUpdateDTO** | [**UserSettingsUpdateDTO**](UserSettingsUpdateDTO.md)|  | |

### Return type

[**UserProfileDTO**](UserProfileDTO.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Configuraciones actualizadas. |  -  |
| **400** | Solicitud inválida (e.g., falta un campo, email inválido, username ya existe). |  -  |
| **401** | No autenticado (token no provisto o inválido). |  -  |

<a id="usersMeStatsGet"></a>
# **usersMeStatsGet**
> UserStatsDTO usersMeStatsGet()

Obtener estadísticas de gamificación del usuario

Endpoint optimizado para &#x60;RightBar.tsx&#x60; y &#x60;TopBar.tsx&#x60;, proporciona todos los datos dinámicos.

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.UserApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("/api");
    
    // Configure HTTP bearer authorization: bearerAuth
    HttpBearerAuth bearerAuth = (HttpBearerAuth) defaultClient.getAuthentication("bearerAuth");
    bearerAuth.setBearerToken("BEARER TOKEN");

    UserApi apiInstance = new UserApi(defaultClient);
    try {
      UserStatsDTO result = apiInstance.usersMeStatsGet();
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling UserApi#usersMeStatsGet");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**UserStatsDTO**](UserStatsDTO.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Estadísticas del usuario. |  -  |
| **401** | No autenticado (token no provisto o inválido). |  -  |

