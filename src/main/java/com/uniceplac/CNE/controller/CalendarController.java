package com.uniceplac.CNE.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CalendarController {
    @GetMapping("/calendar")
    private String Calendar(){
        return "calendario"; 

    }
}
