package com.vdshb.domain;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "space")
public class Space extends BasicEntity<Space> {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "space_id_seq")
    @SequenceGenerator(name = "space_id_seq", sequenceName = "space_id_seq", allocationSize = 1)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "town_id")
    private Long townId;

    private String address;

    @Transient
    private List<CountPoint> countPoints;

    @Override
    public void setBeanPropertiesFromRestUpdate(Space request) {
        setAddress(request.address);
    }

    //===========================================================
    //             Generated getters and setters
    //===========================================================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getTownId() {
        return townId;
    }

    public void setTownId(Long townId) {
        this.townId = townId;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public List<CountPoint> getCountPoints() {
        return countPoints;
    }

    public void setCountPoints(List<CountPoint> countPoints) {
        this.countPoints = countPoints;
    }
}
