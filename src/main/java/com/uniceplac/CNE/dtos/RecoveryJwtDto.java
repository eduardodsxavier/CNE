package com.uniceplac.CNE.dtos;

public record RecoveryJwtDto(

        String token,
        boolean changePassword
) {
}
