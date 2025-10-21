

# LessonTileDTO

Representa un 'tile' (lección) en la UI de `learn.tsx`

## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**lessonId** | **Integer** |  |  [optional] |
|**type** | [**TypeEnum**](#TypeEnum) |  |  [optional] |
|**description** | **String** |  |  [optional] |
|**status** | [**StatusEnum**](#StatusEnum) | (Calculado por el backend basado en el progreso del usuario) |  [optional] |



## Enum: TypeEnum

| Name | Value |
|---- | -----|
| STAR | &quot;star&quot; |
| BOOK | &quot;book&quot; |
| DUMBBELL | &quot;dumbbell&quot; |
| TROPHY | &quot;trophy&quot; |
| FAST_FORWARD | &quot;fast-forward&quot; |
| TREASURE | &quot;treasure&quot; |



## Enum: StatusEnum

| Name | Value |
|---- | -----|
| LOCKED | &quot;LOCKED&quot; |
| ACTIVE | &quot;ACTIVE&quot; |
| COMPLETE | &quot;COMPLETE&quot; |



