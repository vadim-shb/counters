package com.vdshb.domain;

import com.vdshb.domain.enums.ResourceType;

import javax.persistence.*;

@Entity
@Table(name = "count_point")
public class CountPoint extends BasicEntity<CountPoint> {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "count_point_id_seq")
    @SequenceGenerator(name = "count_point_id_seq", sequenceName = "count_point_id_seq", allocationSize = 1)
    private Long id;

    @Column(name = "space_id")
    private Long spaceId;

    @Column(name = "billing_company_id")
    private Long billingCompanyId;

    private String name;

    private ResourceType type;

    @Override
    public void setBeanPropertiesFromRestUpdate(CountPoint request) {
        setName(request.name);
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

    public Long getBillingCompanyId() {
        return billingCompanyId;
    }

    public void setBillingCompanyId(Long billingCompanyId) {
        this.billingCompanyId = billingCompanyId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ResourceType getType() {
        return type;
    }

    public void setType(ResourceType type) {
        this.type = type;
    }
}
