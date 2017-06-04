package com.vdshb.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class BasicEntity<T extends BasicEntity> {

    @Column(name = "is_active")
    private boolean isActive = true;

    public abstract Long getId();

    /**
     * You need to ignore active and id fields when user update entity.
     * So implement this method to copy all other fields rotm user.
     * @param request
     */
    public abstract void setBeanPropertiesFromREST(T request);

    //===========================================================
    //             Generated getters and setters
    //===========================================================

    @JsonIgnore
    public boolean isActive() {
        return isActive;
    }

    @JsonIgnore
    public void setActive(boolean active) {
        isActive = active;
    }

}
