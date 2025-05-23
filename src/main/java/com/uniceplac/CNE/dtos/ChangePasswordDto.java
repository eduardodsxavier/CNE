package com.uniceplac.CNE.dtos;

public record ChangePasswordDto(

        Long RA,
        String password,
        String confirmPassword) {
}
