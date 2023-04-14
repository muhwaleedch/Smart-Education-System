package com.fyp.studentportal.security;

import java.util.ArrayList;
import java.util.Objects;

public class JWTDecodedData {
    private String token;
    private String subject;
    private ArrayList<String> claims;
    private String iat;
    private String exp;

    public JWTDecodedData() {
    }

    public String getToken() {
        return token;
    }

    public JWTDecodedData setToken(String token) {
        this.token = token;
        return this;
    }

    public String getSubject() {
        return subject;
    }

    public JWTDecodedData setSubject(String subject) {
        this.subject = subject;
        return this;
    }

    public ArrayList<String> getClaims() {
        return claims;
    }

    public JWTDecodedData setClaims(ArrayList<String> claims) {
        this.claims = claims;
        return this;
    }

    public String getIat() {
        return iat;
    }

    public JWTDecodedData setIat(String iat) {
        this.iat = iat;
        return this;
    }

    public String getExp() {
        return exp;
    }

    public JWTDecodedData setExp(String exp) {
        this.exp = exp;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        JWTDecodedData that = (JWTDecodedData) o;

        return Objects.equals(token, that.token);
    }

    @Override
    public int hashCode() {
        return token != null ? token.hashCode() : 0;
    }

    @Override
    public String toString() {
        return "JWTDecodedData{" +
            "token='" + token + '\'' +
            ", subject='" + subject + '\'' +
            ", claims=" + claims +
            ", iat='" + iat + '\'' +
            ", exp='" + exp + '\'' +
            '}';
    }
}
