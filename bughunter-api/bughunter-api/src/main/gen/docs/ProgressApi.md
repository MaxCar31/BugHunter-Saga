# ProgressApi

All URIs are relative to */api*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**progressLessonPost**](ProgressApi.md#progressLessonPost) | **POST** /progress/lesson | Registrar finalización de una lección |
| [**progressTreasureLessonIdPost**](ProgressApi.md#progressTreasureLessonIdPost) | **POST** /progress/treasure/{lessonId} | Reclamar un cofre de tesoro |


<a id="progressLessonPost"></a>
# **progressLessonPost**
> LessonCompletionResponseDTO progressLessonPost(lessonResultDTO)

Registrar finalización de una lección

Se llama desde &#x60;LessonComplete&#x60; en &#x60;lesson.tsx&#x60;. El backend debe: 1. Registrar la lección en &#x60;user_lesson_progress&#x60;. 2. Calcular y registrar el XP en &#x60;user_xp_history&#x60;. 3. Calcular y actualizar la racha en &#x60;user_streaks&#x60;. 4. Otorga lingots/Puntos QA (si no es práctica) y actualizar &#x60;user_profiles&#x60;.

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.ProgressApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("/api");
    
    // Configure HTTP bearer authorization: bearerAuth
    HttpBearerAuth bearerAuth = (HttpBearerAuth) defaultClient.getAuthentication("bearerAuth");
    bearerAuth.setBearerToken("BEARER TOKEN");

    ProgressApi apiInstance = new ProgressApi(defaultClient);
    LessonResultDTO lessonResultDTO = new LessonResultDTO(); // LessonResultDTO | 
    try {
      LessonCompletionResponseDTO result = apiInstance.progressLessonPost(lessonResultDTO);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling ProgressApi#progressLessonPost");
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
| **lessonResultDTO** | [**LessonResultDTO**](LessonResultDTO.md)|  | |

### Return type

[**LessonCompletionResponseDTO**](LessonCompletionResponseDTO.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Progreso guardado, devuelve recompensas. |  -  |
| **400** | Solicitud inválida (e.g., falta un campo, email inválido, username ya existe). |  -  |
| **401** | No autenticado (token no provisto o inválido). |  -  |

<a id="progressTreasureLessonIdPost"></a>
# **progressTreasureLessonIdPost**
> ProgressTreasureLessonIdPost200Response progressTreasureLessonIdPost(lessonId)

Reclamar un cofre de tesoro

Se llama desde &#x60;pages/learn.tsx&#x60; al hacer clic en un cofre activo. El backend otorga lingots/Puntos QA.

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.ProgressApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("/api");
    
    // Configure HTTP bearer authorization: bearerAuth
    HttpBearerAuth bearerAuth = (HttpBearerAuth) defaultClient.getAuthentication("bearerAuth");
    bearerAuth.setBearerToken("BEARER TOKEN");

    ProgressApi apiInstance = new ProgressApi(defaultClient);
    Integer lessonId = 56; // Integer | ID de la lección (o tile) que representa el tesoro.
    try {
      ProgressTreasureLessonIdPost200Response result = apiInstance.progressTreasureLessonIdPost(lessonId);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling ProgressApi#progressTreasureLessonIdPost");
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
| **lessonId** | **Integer**| ID de la lección (o tile) que representa el tesoro. | |

### Return type

[**ProgressTreasureLessonIdPost200Response**](ProgressTreasureLessonIdPost200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Recompensa reclamada. |  -  |
| **400** | Tesoro ya reclamado o no desbloqueado. |  -  |
| **401** | No autenticado (token no provisto o inválido). |  -  |

