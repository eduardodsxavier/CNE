package com.uniceplac.CNE.dtos;

import com.uniceplac.CNE.enums.RoleName;

public record CreateUserDto(

        Long RA,
        String nome,
        String email,
        String password,
        RoleName role
) {
}
