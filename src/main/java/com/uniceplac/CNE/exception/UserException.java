package com.uniceplac.CNE.exception;

public class UserException extends RuntimeException {

  public UserException(String message) {
    super(message);
  }

  public UserException(Exception e) {
    super(e instanceof RuntimeException && e.getMessage() != null ? e.getMessage() : "User Error: " + e);
  }
}