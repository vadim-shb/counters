package com.vdshb.security;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "security_user")
public class SecurityUser {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(name = "access_token")
    private String accessToken;

    @Column(name = "refresh_token")
    private String refreshToken;

    @Column(name = "access_token_expiration_date_time")
    private LocalDateTime accessTokenExpirationDateTime;

    @Column(name = "refresh_token_expiration_date_time")
    private LocalDateTime refreshTokenExpirationDateTime;

    private String username;

    @Column(name = "hashed_password")
    private String hashedPassword;

    private String salt;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    private String email;


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

    public LocalDateTime getAccessTokenExpirationDateTime() {
        return accessTokenExpirationDateTime;
    }

    public void setAccessTokenExpirationDateTime(LocalDateTime accessTokenExpirationDateTime) {
        this.accessTokenExpirationDateTime = accessTokenExpirationDateTime;
    }

    public LocalDateTime getRefreshTokenExpirationDateTime() {
        return refreshTokenExpirationDateTime;
    }

    public void setRefreshTokenExpirationDateTime(LocalDateTime refreshTokenExpirationDateTime) {
        this.refreshTokenExpirationDateTime = refreshTokenExpirationDateTime;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
