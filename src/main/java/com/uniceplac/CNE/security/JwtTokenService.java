package com.uniceplac.CNE.security;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;

import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;

@Service
public class JwtTokenService {

    private static final String SECRET_KEY = "4Z^XrroxR@dWxqf$mTTKwW$!@#qGr4P"; 

    private static final String ISSUER = "pizzurg-api"; 

    public String generateToken(UserDetailsImpl user) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(SECRET_KEY);
            return JWT.create()
                .withIssuer(ISSUER) 
                .withIssuedAt(creationDate()) 
                .withExpiresAt(expirationDate()) 
                .withSubject(user.getUsername()) 
                .sign(algorithm); 

        } catch (JWTVerificationException exception) {
            throw new JWTVerificationException("token inválido ou expirado");
        }
    }

    public String getSubjectFromToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(SECRET_KEY);
            return JWT.require(algorithm)
                .withIssuer(ISSUER) 
                .build()
                .verify(token) 
                .getSubject(); 
        } catch (JWTVerificationException exception){
            throw new JWTVerificationException("Token inválido ou expirado.");
        }
    }

    private Instant creationDate() {
        return ZonedDateTime.now(ZoneId.of("GMT-3")).toInstant();
    }

    private Instant expirationDate() {
        return ZonedDateTime.now(ZoneId.of("GMT-3")).plusHours(4).toInstant();
    }
}
