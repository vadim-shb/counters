package com.vdshb.security.domain.entity;


import com.vdshb.security.domain.enums.Language;

import javax.persistence.*;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Entity
@Table(name = "security_user")
public class SecurityUser {

    @Id
    @GeneratedValue(strategy= GenerationType.SEQUENCE, generator = "security_user_id_seq")
    @SequenceGenerator(name = "security_user_id_seq", sequenceName = "security_user_id_seq", allocationSize = 1)
    private Long id;

    @Column(name = "access_token")
    private String accessToken;

    @Column(name = "refresh_token")
    private String refreshToken;

    @Column(name = "access_token_expiration_date_time")
    private LocalDateTime accessTokenExpirationDateTime;

    @Column(name = "refresh_token_expiration_date_time")
    private LocalDateTime refreshTokenExpirationDateTime;

    @Column(name = "email")
    private String email;

    @Column(name = "hashed_password")
    private String hashedPassword;

    private String salt;

    private String name;

    @Enumerated(EnumType.STRING)
    private Language language;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public Instant getAccessTokenExpirationDateTime() {
        return accessTokenExpirationDateTime.toInstant(ZoneOffset.UTC);
    }

    public void setAccessTokenExpirationDateTime(Instant accessTokenExpirationDateTime) {
        this.accessTokenExpirationDateTime = LocalDateTime.ofInstant(accessTokenExpirationDateTime, ZoneOffset.UTC);
    }

    public Instant getRefreshTokenExpirationDateTime() {
        return refreshTokenExpirationDateTime.toInstant(ZoneOffset.UTC);
    }

    public void setRefreshTokenExpirationDateTime(Instant refreshTokenExpirationDateTime) {
        this.refreshTokenExpirationDateTime = LocalDateTime.ofInstant(refreshTokenExpirationDateTime, ZoneOffset.UTC);
    }

    public String getHashedPassword() {
        return hashedPassword;
    }

    public void setHashedPassword(String hashedPassword) {
        this.hashedPassword = hashedPassword;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Language getLanguage() {
        return language;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }
}
