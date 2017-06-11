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

    @Column(name = "town_id")
    private Long townId;

    private String address;

    @Transient
    private List<Count> counts;

    @Override
    public void setBeanPropertiesFromRestUpdate(Space request) {
        setTownId(request.townId);
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

    public List<Count> getCounts() {
        return counts;
    }

    public void setCounts(List<Count> counts) {
        this.counts = counts;
    }
}
