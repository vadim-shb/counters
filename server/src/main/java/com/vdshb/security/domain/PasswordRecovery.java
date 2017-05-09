package com.vdshb.security.domain;

import javax.persistence.*;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Entity
@Table(name = "password_recovery")
public class PasswordRecovery {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "security_user_id")
    private SecurityUser securityUser;

    @Column(name = "email_confirmation_token")
    private String emailConfirmationToken;

    private String salt;

    @Column(name = "hashed_password")
    private String hashedPassword;

    @Column(name = "creation_date_time")
    private LocalDateTime creationDateTime;




    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public SecurityUser getSecurityUser() {
        return securityUser;
    }

    public void setSecurityUser(SecurityUser securityUser) {
        this.securityUser = securityUser;
    }

    public String getEmailConfirmationToken() {
        return emailConfirmationToken;
    }

    public void setEmailConfirmationToken(String emailConfirmationToken) {
        this.emailConfirmationToken = emailConfirmationToken;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }

    public String getHashedPassword() {
        return hashedPassword;
    }

    public void setHashedPassword(String hashedPassword) {
        this.hashedPassword = hashedPassword;
    }

    public Instant getCreationDateTime() {
        return creationDateTime.toInstant(ZoneOffset.UTC);
    }

    public void setCreationDateTime(Instant creationDateTime) {
        this.creationDateTime = LocalDateTime.ofInstant(creationDateTime, ZoneOffset.UTC);
    }
}
