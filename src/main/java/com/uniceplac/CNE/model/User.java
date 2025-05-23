package com.uniceplac.CNE.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Table(name = "users") 
@Entity(name = "User")
public class User {

    @Id
    private Long RA;

    @Column(unique = true, nullable = false)
    private String name;
    
    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;
    
    @Column(nullable = false)
    private boolean admin;

    private boolean changePassword;

    public User() {}
 
    public User(Long RA, String name, String email, String password, boolean admin, boolean changePassword) {
        this.RA = RA;
        this.name = name; 
        this.email = email;
        this.password = password;
        this.admin = admin;
        this.changePassword = changePassword;
    }

    public Long getRA() {
        return RA;
    }
    
    public void setRA(Long RA) {
        this.RA = RA;
    }

    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean getAdmin() {
        return admin;
    }

    public void setAdmin(Boolean admin) {
        this.admin = admin;
    }

    
    public boolean getChangePassword() {
        return changePassword;
    }

    public void setChangePassword(boolean changePassword) {
        this.changePassword = changePassword;
    }
}
