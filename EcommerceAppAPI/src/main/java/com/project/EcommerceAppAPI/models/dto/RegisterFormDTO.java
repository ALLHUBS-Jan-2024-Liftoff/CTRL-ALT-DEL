package com.project.EcommerceAppAPI.models.dto;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

public class RegisterFormDTO extends LoginFormDTO {
    @NotNull
    @GeneratedValue( strategy = GenerationType.AUTO )
    private int id;
    @NotNull
    @Valid
    private String verifyPassword;
    @NotNull
    private String firstName;
    @NotNull
    private String lastName;
    @NotNull
    @Valid
    @Email
    private String email;

    private boolean wantToBeSeller = false;

    public String getVerifyPassword() {
        return verifyPassword;
    }

    public void setVerifyPassword(String verifyPassword) {
        this.verifyPassword = verifyPassword;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public boolean isWantToBeSeller() {
        return wantToBeSeller;
    }

    public void setWantToBeSeller(boolean wantToBeSeller) {
        this.wantToBeSeller = wantToBeSeller;
    }
}
