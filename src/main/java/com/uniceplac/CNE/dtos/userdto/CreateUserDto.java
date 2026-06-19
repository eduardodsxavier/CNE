package com.uniceplac.CNE.dtos.userdto;

import jakarta.validation.constraints.NotBlank;

public record CreateUserDto(

        @NotBlank(message = "RA é obrigatório")
        String RA,
        @NotBlank(message = "Nome é obrigatório")
        String nome,
        @NotBlank(message = "Email é obrigatório")
        String email,
        boolean admin
) {
}
