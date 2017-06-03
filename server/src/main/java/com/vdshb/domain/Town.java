package com.vdshb.domain;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "town")
public class Town {

    @Id
    @GeneratedValue(strategy= GenerationType.SEQUENCE, generator = "town_id_seq")
    @SequenceGenerator(name = "town_id_seq", sequenceName = "town_id_seq", allocationSize = 1)
    private Long id;
    private String name;

//    @ManyToMany
//    @JoinTable(name="management_companies_in_towns",
//            joinColumns = @JoinColumn(name = "town_id", referencedColumnName = "id"),
//            inverseJoinColumns = @JoinColumn(name = "management_company_id", referencedColumnName = "id")
//    )
//    private List<ManagementCompany> managementCompanies = new ArrayList<>(0);

    //===========================================================
    //             Generated getters and setters
    //===========================================================


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

//    public List<ManagementCompany> getManagementCompanies() {
//        return managementCompanies;
//    }
//
//    public void setManagementCompanies(List<ManagementCompany> managementCompanies) {
//        this.managementCompanies = managementCompanies;
//    }
}
