package com.vdshb.security.domain;


import javax.persistence.*;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Entity
@Table(name = "inactive_security_user")
public class InactiveSecurityUser {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String email;

    @Column(name = "hashed_password")
    private String hashedPassword;

    private String salt;

    private String name;

    @Enumerated(EnumType.STRING)
    private Language language;

    @Column(name = "email_confirmation_token")
    private String emailConfirmationToken;

    @Column(name = "creation_date_time")
    private LocalDateTime creationDateTime;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getEmailConfirmationToken() {
        return emailConfirmationToken;
    }

    public void setEmailConfirmationToken(String emailConfirmationToken) {
        this.emailConfirmationToken = emailConfirmationToken;
    }

    public Instant getCreationDateTime() {
        return creationDateTime.toInstant(ZoneOffset.UTC);
    }

    public void setCreationDateTime(Instant creationDateTime) {
        this.creationDateTime = LocalDateTime.ofInstant(creationDateTime, ZoneOffset.UTC);
    }
}
