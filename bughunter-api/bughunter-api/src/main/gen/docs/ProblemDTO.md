

# ProblemDTO

Una única pregunta o pieza de contenido dentro de una lección

## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**type** | [**TypeEnum**](#TypeEnum) |  |  [optional] |
|**moduleTitle** | **String** |  |  [optional] |
|**introduction** | **String** |  |  [optional] |
|**objectives** | **List&lt;String&gt;** |  |  [optional] |
|**question** | **String** |  |  [optional] |
|**answers** | [**List&lt;ProblemDTOAnswersInner&gt;**](ProblemDTOAnswersInner.md) |  |  [optional] |
|**correctAnswer** | **Integer** |  |  [optional] |
|**answerTiles** | **List&lt;String&gt;** |  |  [optional] |
|**correctAnswerIndices** | **List&lt;Integer&gt;** |  |  [optional] |



## Enum: TypeEnum

| Name | Value |
|---- | -----|
| INFO | &quot;INFO&quot; |
| MULTIPLE_CHOICE | &quot;MULTIPLE_CHOICE&quot; |
| FILL_IN_THE_BLANK | &quot;FILL_IN_THE_BLANK&quot; |



