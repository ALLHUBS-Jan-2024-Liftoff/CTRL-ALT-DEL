package com.project.EcommerceAppAPI.models;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.Objects;
@MappedSuperclass
public abstract class AbstractProducts {

    @Id
    @GeneratedValue
    private Long id;
    @NotBlank
    @Size(min = 1, max = 100, message = "Characters must be between 1-100")
    private String name;

    @NotBlank
    @Size(min = 1, max = 255, message = "Characters must be between 1-255")
    private String description;

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "Products{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AbstractProducts products = (AbstractProducts) o;
        return id == products.id && Objects.equals(name, products.name) && Objects.equals(description, products.description);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }
}
