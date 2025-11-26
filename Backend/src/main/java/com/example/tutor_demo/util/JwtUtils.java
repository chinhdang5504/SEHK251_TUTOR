package com.example.tutor_demo.util;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSVerifier;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;

import java.text.ParseException;
import java.util.Optional;

public class JwtUtils {

    private static final String SECRET = "1TjXchw5FloESb63Kc+DFhTARvpWL4jUGCwfGWxuG5SIf/1y/LgJxHnMqaF6A/ij";

    /**
     * Verify chữ ký & lấy claims
     */
    private static JWTClaimsSet getClaims(String token) {
        try {
            SignedJWT signedJWT = SignedJWT.parse(token);
            JWSVerifier verifier = new MACVerifier(SECRET);

            if (!signedJWT.verify(verifier)) {
                throw new RuntimeException("Invalid JWT signature");
            }

            return signedJWT.getJWTClaimsSet();

        } catch (ParseException | JOSEException e) {
            throw new RuntimeException("Invalid JWT token", e);
        }
    }

    /**
     * Lấy userId — nếu hệ thống lưu userId trong "sub"
     */
    public static String extractUserId(String token) {
        return Optional.ofNullable(getClaims(token).getSubject())
                .orElseThrow(() -> new RuntimeException("User ID (sub) not found"));
    }

    public static String extractRole(String token)throws ParseException {
        return Optional.ofNullable(getClaims(token).getStringClaim("role"))
                .orElseThrow(() -> new RuntimeException("Role not found"));
    }

    public static String extractUsername(String token) throws ParseException {
        return Optional.ofNullable(getClaims(token).getStringClaim("username"))
                .orElseThrow(() -> new RuntimeException("Username not found"));
    }
}
