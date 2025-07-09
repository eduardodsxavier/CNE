package com.uniceplac.CNE.exception;

public class UserException extends RuntimeException {

  public UserException(Exception e) {
    super("User Error: " + e);
  }
}
