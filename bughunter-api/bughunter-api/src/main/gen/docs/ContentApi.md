# ContentApi

All URIs are relative to */api*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**contentModulesGet**](ContentApi.md#contentModulesGet) | **GET** /content/modules | Obtener todos los módulos |
| [**contentModulesModuleCodeProblemsGet**](ContentApi.md#contentModulesModuleCodeProblemsGet) | **GET** /content/modules/{moduleCode}/problems | Obtener todos los problemas/preguntas de un módulo |
| [**contentModulesModuleCodeUnitGet**](ContentApi.md#contentModulesModuleCodeUnitGet) | **GET** /content/modules/{moduleCode}/unit | Obtener la unidad activa para un módulo |


<a id="contentModulesGet"></a>
# **contentModulesGet**
> List&lt;ModuleSummaryDTO&gt; contentModulesGet()

Obtener todos los módulos

Devuelve la lista de todos los módulos disponibles para que el usuario elija en &#x60;pages/register.tsx&#x60;.

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.ContentApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("/api");

    ContentApi apiInstance = new ContentApi(defaultClient);
    try {
      List<ModuleSummaryDTO> result = apiInstance.contentModulesGet();
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling ContentApi#contentModulesGet");
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

[**List&lt;ModuleSummaryDTO&gt;**](ModuleSummaryDTO.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Lista de módulos. |  -  |

<a id="contentModulesModuleCodeProblemsGet"></a>
# **contentModulesModuleCodeProblemsGet**
> List&lt;ProblemDTO&gt; contentModulesModuleCodeProblemsGet(moduleCode)

Obtener todos los problemas/preguntas de un módulo

Reemplaza la carga de archivos estáticos en &#x60;stores/createQuestionsSlice.ts&#x60;. Devuelve *toda* la lista de problemas (incluyendo &#39;INFO&#39;, &#39;MULTIPLE_CHOICE&#39;, etc.) para un módulo, que &#x60;pages/lesson.tsx&#x60; consumirá.

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.ContentApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("/api");
    
    // Configure HTTP bearer authorization: bearerAuth
    HttpBearerAuth bearerAuth = (HttpBearerAuth) defaultClient.getAuthentication("bearerAuth");
    bearerAuth.setBearerToken("BEARER TOKEN");

    ContentApi apiInstance = new ContentApi(defaultClient);
    String moduleCode = "moduleB"; // String | 
    try {
      List<ProblemDTO> result = apiInstance.contentModulesModuleCodeProblemsGet(moduleCode);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling ContentApi#contentModulesModuleCodeProblemsGet");
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
| **moduleCode** | **String**|  | |

### Return type

[**List&lt;ProblemDTO&gt;**](ProblemDTO.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Lista de todos los problemas/preguntas para ese módulo. |  -  |
| **401** | No autenticado (token no provisto o inválido). |  -  |
| **404** | Recurso no encontrado. |  -  |

<a id="contentModulesModuleCodeUnitGet"></a>
# **contentModulesModuleCodeUnitGet**
> UnitDetailDTO contentModulesModuleCodeUnitGet(moduleCode)

Obtener la unidad activa para un módulo

Devuelve la estructura de la unidad actual para un módulo (basado en &#x60;utils/units.ts&#x60;, que muestra una unidad por módulo). Incluye la lista de &#39;tiles&#39; (lecciones) para renderizar en &#x60;pages/learn.tsx&#x60;.

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.ContentApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("/api");
    
    // Configure HTTP bearer authorization: bearerAuth
    HttpBearerAuth bearerAuth = (HttpBearerAuth) defaultClient.getAuthentication("bearerAuth");
    bearerAuth.setBearerToken("BEARER TOKEN");

    ContentApi apiInstance = new ContentApi(defaultClient);
    String moduleCode = "moduleA"; // String | 
    try {
      UnitDetailDTO result = apiInstance.contentModulesModuleCodeUnitGet(moduleCode);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling ContentApi#contentModulesModuleCodeUnitGet");
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
| **moduleCode** | **String**|  | |

### Return type

[**UnitDetailDTO**](UnitDetailDTO.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Detalles de la unidad y sus &#39;tiles&#39; (lecciones). |  -  |
| **401** | No autenticado (token no provisto o inválido). |  -  |
| **404** | Recurso no encontrado. |  -  |

