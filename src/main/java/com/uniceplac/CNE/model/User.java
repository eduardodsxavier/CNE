package com.uniceplac.CNE.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Table(name = "users") 
@Entity(name = "User")
public class User {

    @Id
    private String RA;

    @Column(unique = true, nullable = false)
    private String name;
    
    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;
    
    @Column(nullable = false)
    private boolean admin;

    private boolean changePassword;

    private boolean enabled;

    public User() {}
 
    public User(String RA, String name, String email, String password, boolean admin, boolean changePassword, boolean enabled) {
        this.RA = RA;
        this.name = name; 
        this.email = email;
        this.password = password;
        this.admin = admin;
        this.changePassword = changePassword;
        this.enabled = enabled;
    }

    public String getRA() {
        return RA;
    }
    
    public void setRA(String RA) {
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

    public boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }
}
