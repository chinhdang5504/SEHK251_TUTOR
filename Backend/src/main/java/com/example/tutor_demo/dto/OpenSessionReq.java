package com.example.tutor_demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class OpenSessionReq {
    String tutorId;
    String subjectName;
    String desiredDate; // YYYY-MM-DD
    String note;
}
