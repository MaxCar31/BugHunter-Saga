
package com.bughuntersaga.api.domain.model;

import lombok.*;

import java.util.List;


@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Unit {
    private Integer id;
    private Integer unitNumber;
    private String description;
    private List<Lesson> lessons;
}
