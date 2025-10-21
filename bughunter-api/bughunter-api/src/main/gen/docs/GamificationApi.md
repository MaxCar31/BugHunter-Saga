# GamificationApi

All URIs are relative to */api*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**leaderboardGet**](GamificationApi.md#leaderboardGet) | **GET** /leaderboard | Obtener la tabla de clasificación |
| [**shopItemsGet**](GamificationApi.md#shopItemsGet) | **GET** /shop/items | Obtener los artículos de la tienda |
| [**shopPurchaseItemIdPost**](GamificationApi.md#shopPurchaseItemIdPost) | **POST** /shop/purchase/{itemId} | Comprar un artículo de la tienda |


<a id="leaderboardGet"></a>
# **leaderboardGet**
> LeaderboardDTO leaderboardGet()

Obtener la tabla de clasificación

Devuelve la tabla de clasificación de la liga actual del usuario para &#x60;pages/leaderboard.tsx&#x60;.

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.GamificationApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("/api");
    
    // Configure HTTP bearer authorization: bearerAuth
    HttpBearerAuth bearerAuth = (HttpBearerAuth) defaultClient.getAuthentication("bearerAuth");
    bearerAuth.setBearerToken("BEARER TOKEN");

    GamificationApi apiInstance = new GamificationApi(defaultClient);
    try {
      LeaderboardDTO result = apiInstance.leaderboardGet();
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling GamificationApi#leaderboardGet");
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

[**LeaderboardDTO**](LeaderboardDTO.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Tabla de clasificación semanal. |  -  |
| **401** | No autenticado (token no provisto o inválido). |  -  |
| **403** | El usuario aún no ha desbloqueado las clasificaciones. |  -  |

<a id="shopItemsGet"></a>
# **shopItemsGet**
> List&lt;ShopItemDTO&gt; shopItemsGet()

Obtener los artículos de la tienda

Devuelve los artículos disponibles en &#x60;pages/shop.tsx&#x60;.

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.GamificationApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("/api");
    
    // Configure HTTP bearer authorization: bearerAuth
    HttpBearerAuth bearerAuth = (HttpBearerAuth) defaultClient.getAuthentication("bearerAuth");
    bearerAuth.setBearerToken("BEARER TOKEN");

    GamificationApi apiInstance = new GamificationApi(defaultClient);
    try {
      List<ShopItemDTO> result = apiInstance.shopItemsGet();
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling GamificationApi#shopItemsGet");
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

[**List&lt;ShopItemDTO&gt;**](ShopItemDTO.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Lista de artículos. |  -  |
| **401** | No autenticado (token no provisto o inválido). |  -  |

<a id="shopPurchaseItemIdPost"></a>
# **shopPurchaseItemIdPost**
> UserStatsDTO shopPurchaseItemIdPost(itemId)

Comprar un artículo de la tienda

Permite al usuario comprar un artículo (ej. &#39;streak-freeze&#39;) usando &#39;lingots&#39;.

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.GamificationApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("/api");
    
    // Configure HTTP bearer authorization: bearerAuth
    HttpBearerAuth bearerAuth = (HttpBearerAuth) defaultClient.getAuthentication("bearerAuth");
    bearerAuth.setBearerToken("BEARER TOKEN");

    GamificationApi apiInstance = new GamificationApi(defaultClient);
    String itemId = "streak-freeze"; // String | 
    try {
      UserStatsDTO result = apiInstance.shopPurchaseItemIdPost(itemId);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling GamificationApi#shopPurchaseItemIdPost");
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
| **itemId** | **String**|  | |

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
| **200** | Compra exitosa. Devuelve el estado actualizado del perfil/inventario. |  -  |
| **400** | Fondos (lingots) insuficientes o artículo no válido. |  -  |
| **401** | No autenticado (token no provisto o inválido). |  -  |

