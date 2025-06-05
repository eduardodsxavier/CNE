package com.uniceplac.CNE.dtos.userdto;

public record CreateUserDto(

        Long RA,
        String nome,
        String email,
        boolean admin
) {
}
