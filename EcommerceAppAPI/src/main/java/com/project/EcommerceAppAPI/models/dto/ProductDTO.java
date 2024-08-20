//package com.project.EcommerceAppAPI.models.dto;
//
//public class ProductDTO {
//
//    private Long id;
//    private String name;
//    private String description;
//    private double price;
//    private Long categoryId;
//    private String imagePath;
//
//    public Long getId() {
//        return id;
//    }
//
//    public String getImagePath() {
//        return imagePath;
//    }
//
//    public void setImagePath(String imagePath) {
//        this.imagePath = imagePath;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//
//    public String getDescription() {
//        return description;
//    }
//
//    public void setDescription(String description) {
//        this.description = description;
//    }
//
//    public double getPrice() {
//        return price;
//    }
//
//    public void setPrice(double price) {
//        this.price = price;
//    }
//
//    public Long getCategoryId() {
//        return categoryId;
//    }
//
//    public void setCategoryId(Long categoryId) {
//        this.categoryId = categoryId;
//    }
//}
//
//
//
////    @Override
////    public String toString() {
////        return "ProductDTO{" +
////                "id=" + id +
////                ", name='" + name + '\'' +
//////                ", description='" + description + '\'' +
////                ", price=" + price +
////                ", categoryId=" + categoryId +
////                '}';
////    }
//
//
package com.project.EcommerceAppAPI.models.dto;

public class ProductDTO {

    private Long id;
    private String name;
    private String description;
    private double price;
    private Long categoryId;
    private String imagePath;


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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    @Override
    public String toString() {
        return "ProductDTO{" +
                "id=" + id +
                ", name='" + name + '\'' +
//                ", description='" + description + '\'' +
                ", price=" + price +
                ", categoryId=" + categoryId +
                '}';
    }

}
//    @Override
//    public String toString() {
//        return "ProductDTO{" +
//                "id=" + id +
//                ", name='" + name + '\'' +
////                ", description='" + description + '\'' +
//                ", price=" + price +
//                ", categoryId=" + categoryId +
//                '}';
//    }
//
//}
