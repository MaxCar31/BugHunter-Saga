
    package com.bughuntersaga.api.application.dto;

    import lombok.Builder;
import lombok.Getter;


    @Getter
    @Builder
    public class CompleteLessonCommand {
        private final Integer lessonId;
        private final Integer correctAnswerCount;
        private final Integer incorrectAnswerCount;
        private final Long timeTakenMs;
        private final Boolean isPractice;

    }
