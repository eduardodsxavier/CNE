package com.uniceplac.CNE.dtos.userdto;

public record UserDto(

        Long RA,
        String name,
        String email,
        boolean admin,
        boolean changePassword
        ) {
}
