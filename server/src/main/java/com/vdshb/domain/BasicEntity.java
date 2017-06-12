package com.vdshb.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import java.util.Optional;

@MappedSuperclass
public abstract class BasicEntity<T extends BasicEntity> {

    @Column(name = "is_active")
    private boolean isActive = true;

    public abstract Long getId();

    /**
     * You need to ignore active and id fields when user update entity.
     * So implement this method to copy all other fields from user.
     * @param request
     */
    public abstract void setBeanPropertiesFromRestUpdate(T request);


    public boolean containedByIdIn(Iterable<T> collection) {
        return getByIdFrom(collection).isPresent();
    }

    public  Optional<T> getByIdFrom(Iterable<T> collection) {
        for (T innerItem : collection) {
            if (innerItem.getId().equals(this.getId())) {
                return Optional.of(innerItem);
            }
        }
        return Optional.empty();
    }
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
