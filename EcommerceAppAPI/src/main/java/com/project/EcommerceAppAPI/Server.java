//package com.project.EcommerceAppAPI;
//
//import java.util.HashMap;
//import java.util.Map;
//import static spark.Spark.get;
//import static spark.Spark.post;
//import static spark.Spark.port;
//import static spark.Spark.staticFiles;
//import com.google.gson.Gson;
//import com.stripe.Stripe;
//import com.stripe.model.checkout.Session;
//import com.stripe.param.checkout.SessionCreateParams;
//
//public class Server {
//
//    public static void main(String[] args) {
//        port(4242);
//        Stripe.apiKey = "sk_test_51PgYz3CD9TYzROTCjFuXHgPXKWxFAOvYjJqBlYpkAmpnTRecvVPjHJYPbWCWCMJEm4In0a6nTdnsOKOdIDVdptBA00jRBd3ogA";
//
//        Gson gson = new Gson();
//
//        post("/create-checkout-session", (request, response) -> {
//
//            SessionCreateParams params =
//                    SessionCreateParams.builder()
//                            .setMode(SessionCreateParams.Mode.PAYMENT)
//                            .setUiMode(SessionCreateParams.UiMode.EMBEDDED)
//                            .setReturnUrl("localhost:4242?session_id={CHECKOUT_SESSION_ID}")
//                            .addLineItem(
//                                    SessionCreateParams.LineItem.builder()
//                                            .setQuantity(1L)
//                                            .setPriceData(
//                                                    SessionCreateParams.LineItem.PriceData.builder()
//                                                            .setCurrency("usd")
//                                                            .setUnitAmount(2000L)
//                                                            .setProductData(
//                                                                    SessionCreateParams.LineItem.PriceData.ProductData.builder()
//                                                                            .setName("T-shirt")
//                                                                            .build())
//                                                            .build())
//                                            .build())
//                            .build();
//
//            Session session = Session.create(params);
//
//            Map<String, String> map = new HashMap();
//            map.put("clientSecret", session.getRawJsonObject().getAsJsonPrimitive("client_secret").getAsString());
//
//            return map;
//        }, gson::toJson);
//    }
//}