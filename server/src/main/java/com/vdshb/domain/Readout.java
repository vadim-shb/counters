package com.vdshb.domain;

import javax.persistence.*;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Entity
@Table(name = "readout")
public class Readout extends BasicEntity<Readout> {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "readout_id_seq")
    @SequenceGenerator(name = "readout_id_seq", sequenceName = "readout_id_seq", allocationSize = 1)
    private Long id;

    @Column(name = "count_id")
    private Long countId;

    private Integer readout;

    @Column(name = "creation_date_time")
    private LocalDateTime creationDateTime;

    @Override
    public void setBeanPropertiesFromRestUpdate(Readout request) {
    }

    public Instant getCreationDateTime() {
        return creationDateTime.toInstant(ZoneOffset.UTC);
    }

    public void setCreationDateTime(Instant creationDateTime) {
        this.creationDateTime = LocalDateTime.ofInstant(creationDateTime, ZoneOffset.UTC);
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

    public Long getCountId() {
        return countId;
    }

    public void setCountId(Long countId) {
        this.countId = countId;
    }

    public Integer getReadout() {
        return readout;
    }

    public void setReadout(Integer readout) {
        this.readout = readout;
    }

}
