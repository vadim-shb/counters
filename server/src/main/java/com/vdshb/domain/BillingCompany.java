package com.vdshb.domain;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "billing_company")
public class BillingCompany extends BasicEntity<BillingCompany> {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "billing_company_id_seq")
    @SequenceGenerator(name = "billing_company_id_seq", sequenceName = "billing_company_id_seq", allocationSize = 1)
    private Long id;

    private String name;

    @ManyToMany
    @JoinTable(name="billing_company_in_town",
            joinColumns = @JoinColumn(name = "billing_company_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "town_id", referencedColumnName = "id")
    )
    private List<Town> towns = new ArrayList<>(0);

    @Override
    public void setBeanPropertiesFromRestUpdate(BillingCompany request) {
        setName(request.getName());
        setTowns(request.getTowns());
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

    public List<Town> getTowns() {
        return towns;
    }

    public void setTowns(List<Town> towns) {
        this.towns = towns;
    }
}
