package com.uniceplac.CNE.dtos;

public record UserDto(

        Long RA,
        String name,
        String email,
        boolean admin,
        boolean changePassword
        ) {
}
