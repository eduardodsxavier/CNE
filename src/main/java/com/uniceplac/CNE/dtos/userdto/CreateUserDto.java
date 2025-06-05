package com.uniceplac.CNE.dtos.userdto;

public record CreateUserDto(

        String RA,
        String nome,
        String email,
        boolean admin
) {
}
