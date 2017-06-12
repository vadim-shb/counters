package com.vdshb.domain;

import javax.persistence.*;

@Entity
@Table(name = "town")
public class Town extends BasicEntity<Town> {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "town_id_seq")
    @SequenceGenerator(name = "town_id_seq", sequenceName = "town_id_seq", allocationSize = 1)
    protected Long id;

    private String name;

    @Override
    public void setBeanPropertiesFromRestUpdate(Town request) {
        setName(request.getName());
    }

    //===========================================================
    //             Generated getters and setters
    //===========================================================

    @Override
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
