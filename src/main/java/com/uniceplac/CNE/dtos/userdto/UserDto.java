package com.uniceplac.CNE.dtos.userdto;

public record UserDto(

        String RA,
        String name,
        String email,
        boolean admin,
        boolean changePassword
        ) {
}
