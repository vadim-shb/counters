package com.vdshb.security.domain.entity;


import javax.persistence.*;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Entity
@Table(name = "change_email")
public class ChangeSecurityUserEmail {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(name = "new_email")
    private String newEmail;

    @Column(name = "current_email_confirmation_token")
    private String currentEmailConfirmationToken;

    @Column(name = "new_email_confirmation_token")
    private String newEmailConfirmationToken;

    @Column(name = "current_email_confirmed")
    private boolean currentEmailConfirmed;

    @Column(name = "new_email_confirmed")
    private boolean newEmailConfirmed;

    @Column(name = "creation_date_time")
    private LocalDateTime creationDateTime;

    @ManyToOne
    @JoinColumn(name = "security_user_id")
    private SecurityUser securityUser;

    public Instant getCreationDateTime() {
        return creationDateTime.toInstant(ZoneOffset.UTC);
    }

    public void setCreationDateTime(Instant creationDateTime) {
        this.creationDateTime = LocalDateTime.ofInstant(creationDateTime, ZoneOffset.UTC);
    }

    //===========================================================
    //             Generated getters and setters
    //===========================================================

    public boolean isCurrentEmailConfirmed() {
        return currentEmailConfirmed;
    }

    public void setCurrentEmailConfirmed(boolean currentEmailConfirmed) {
        this.currentEmailConfirmed = currentEmailConfirmed;
    }

    public boolean isNewEmailConfirmed() {
        return newEmailConfirmed;
    }

    public void setNewEmailConfirmed(boolean newEmailConfirmed) {
        this.newEmailConfirmed = newEmailConfirmed;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNewEmail() {
        return newEmail;
    }

    public void setNewEmail(String newEmail) {
        this.newEmail = newEmail;
    }

    public String getCurrentEmailConfirmationToken() {
        return currentEmailConfirmationToken;
    }

    public void setCurrentEmailConfirmationToken(String currentEmailConfirmationToken) {
        this.currentEmailConfirmationToken = currentEmailConfirmationToken;
    }

    public String getNewEmailConfirmationToken() {
        return newEmailConfirmationToken;
    }

    public void setNewEmailConfirmationToken(String newEmailConfirmationToken) {
        this.newEmailConfirmationToken = newEmailConfirmationToken;
    }

    public SecurityUser getSecurityUser() {
        return securityUser;
    }

    public void setSecurityUser(SecurityUser securityUser) {
        this.securityUser = securityUser;
    }

}
