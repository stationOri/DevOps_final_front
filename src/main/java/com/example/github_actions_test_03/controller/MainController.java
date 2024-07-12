package com.example.github_actions_test_03.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {
  @GetMapping("/main")
  public String main(){
    return "hello";
  }
}
