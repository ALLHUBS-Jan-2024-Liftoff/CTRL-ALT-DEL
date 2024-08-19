package com.project.EcommerceAppAPI.models.dto;

public class UserBadgeDTO {
    private String initials;
    private boolean isSeller;
    private boolean isVerifiedSeller;

    public UserBadgeDTO(String initials, boolean isSeller, boolean isVerifiedSeller) {
        this.initials = initials;
        this.isSeller = isSeller;
        this.isVerifiedSeller = isVerifiedSeller;
    }

    // Getters and Setters
    public String getInitials() {
        return initials;
    }

    public void setInitials(String initials) {
        this.initials = initials;
    }

    public boolean isSeller() {
        return isSeller;
    }

    public void setSeller(boolean seller) {
        isSeller = seller;
    }

    public boolean isVerifiedSeller() {
        return isVerifiedSeller;
    }

    public void setVerifiedSeller(boolean verifiedSeller) {
        isVerifiedSeller = verifiedSeller;
    }
}
