package com.uniceplac.CNE.dtos;

public record CreateUserDto(

        Long RA,
        String nome,
        String email,
        String password,
        boolean admin
) {
}
