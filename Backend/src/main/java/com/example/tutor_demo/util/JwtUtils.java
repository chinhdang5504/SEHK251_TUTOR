package com.example.tutor_demo.util;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSVerifier;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;

import jakarta.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.text.ParseException;

@Component
public class JwtUtils {

    private static final Logger log = LoggerFactory.getLogger(JwtUtils.class);
    @Value("${jwt.secret}")
    private String secret;

    public String getUsername(String token) throws ParseException, JOSEException {
        SignedJWT parsedJWT = SignedJWT.parse(token);
        JWSVerifier verifier = new MACVerifier(secret.getBytes());
        boolean isValid = parsedJWT.verify(verifier);
        if (!isValid) {
            throw new JOSEException("Invalid token signature");
        }
        JWTClaimsSet parsedClaims = parsedJWT.getJWTClaimsSet();
        log.info("Parsed JWT claims: {}", parsedClaims);
        return parsedClaims.getStringClaim("sub");
    }
}
