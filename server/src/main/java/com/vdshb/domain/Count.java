package com.vdshb.domain;

import com.vdshb.domain.enums.CountType;

import javax.persistence.*;

@Entity
@Table(name = "count")
public class Count extends BasicEntity<Count> {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "count_id_seq")
    @SequenceGenerator(name = "count_id_seq", sequenceName = "count_id_seq", allocationSize = 1)
    private Long id;

    @Column(name = "space_id")
    private Long spaceId;

    private String name;

    private CountType type;

    @Override
    public void setBeanPropertiesFromRestUpdate(Count request) {
        setName(request.name);
        setType(request.type);
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

    public Long getSpaceId() {
        return spaceId;
    }

    public void setSpaceId(Long spaceId) {
        this.spaceId = spaceId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public CountType getType() {
        return type;
    }

    public void setType(CountType type) {
        this.type = type;
    }
}
