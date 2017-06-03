package com.vdshb.domain;

import javax.persistence.*;

@MappedSuperclass
public abstract class BasicEntity {

    @Column(name = "is_active")
    private boolean isActive = true;

    public abstract Long getId();

    //===========================================================
    //             Generated getters and setters
    //===========================================================

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

}
